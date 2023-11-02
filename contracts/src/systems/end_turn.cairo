use starknet::ContractAddress;

use dojo::world::IWorldDispatcher;

#[starknet::interface]
trait IEndTurn<TContractState> {
    fn end_turn(self: @TContractState, world: IWorldDispatcher, game_id: felt252) -> ();
// fn draw_card(self: @TContractState,  world: IWorldDispatcher , remaining_cards: u128, player: ContractAddress) -> ();
}

#[dojo::contract]
mod end_turn_system {
    use super::IEndTurn;

    use array::ArrayTrait;
    use traits::Into;
    use starknet::info::{get_block_timestamp, get_block_number};
    use starknet::ContractAddress;

    use tsubasa::models::{Game, DeckCard, CardState, Player, Outcome, PlayerTrait, Placement};
    use tsubasa::systems::check_turn;

    #[event]
    #[derive(Copy, Drop, starknet::Event)]
    enum Event {
        EndTurn: EndTurn
    }

    #[derive(Copy, Drop, starknet::Event)]
    struct EndTurn {
        game_id: felt252,
        turn: u128,
    }

    /// Draw a random card from the deck.
    ///
    /// # Arguments
    ///
    /// * `world` - Dojo world.
    /// * `remaining_cards` - Number of cards remaining in the deck.
    /// * `player` - Current player address.
    fn draw_card(
        self: @ContractState,
        world: IWorldDispatcher,
        remaining_cards: u128,
        player: ContractAddress
    ) {
        let card_id: u256 = if remaining_cards > 0 {
            pedersen::pedersen(get_block_timestamp().into(), get_block_number().into())
                .into() % remaining_cards
                .into()
        } else {
            0
        };
        let mut cards_in_deck_seen = 0_u128;
        let mut i = 0_u128;
        loop {
            let mut deck_card = get!(world, (player, i), DeckCard);
            if cards_in_deck_seen == card_id.low {
                if deck_card.card_state == CardState::Hand {
                    i += 1;
                    continue;
                }
                deck_card.card_state = CardState::Hand;
                set!(world, (deck_card));
                break;
            }
            if deck_card.card_state == CardState::Deck {
                cards_in_deck_seen += 1;
            }
            i += 1;
        }
    }

    #[external(v0)]
    impl EndTurnImpl of IEndTurn<ContractState> {
        /// Ends a turn increments the energy of the player who ended the turn, draws a card
        /// for the oponent, places on the field all the cards that were on the side and checks
        /// if the game should end.
        ///
        /// # Arguemnt
        ///
        /// * `world` - Dojo world.
        /// * `game_id` - The current game id.
        fn end_turn(self: @ContractState, world: IWorldDispatcher, game_id: felt252) {
            let mut game = get!(world, game_id, Game);

            check_turn(@game, @starknet::get_caller_address());

            let mut cards_drawn = game.turn / 2;
            let drawer = if starknet::get_caller_address() == game.player2 {
                game.player1
            } else {
                game.player2
            };
            if cards_drawn < 8 {
                draw_card(self, world, 8 - cards_drawn, drawer);
            }

            emit!(world, EndTurn { game_id, turn: game.turn });

            game.turn += 1;
            // Increments the energy of the player 
            let mut player = get!(world, (game_id, starknet::get_caller_address()), Player);
            player.remaining_energy = game.turn / 2 + 2;
            player.goalkeeper_placement.update_card_placement();
            player.defender_placement.update_card_placement();
            player.midfielder_placement.update_card_placement();
            player.attacker_placement.update_card_placement();

            set!(world, (player));

            // End the Game
            // If one reached score 2, set winner 
            game
                .outcome =
                    if (game.player1_score == 2) {
                        Outcome::Player1
                    } else if (game.player2_score == 2) {
                        Outcome::Player2
                    } else {
                        Outcome::Pending
                    };

            set!(world, (game));
        }
    }
}

