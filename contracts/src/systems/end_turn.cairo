#[system]
mod end_turn_system {
    use array::ArrayTrait;
    use traits::Into;
    use starknet::ContractAddress;
    use starknet::info::{get_block_timestamp, get_block_number};

    use dojo::world::Context;

    use tsubasa::components::{Game, DeckCard, CardState, Player, Outcome, PlayerTrait, Placement};
    use tsubasa::events::EndTurn;
    use tsubasa::systems::check_turn;

    /// Ends a turn and increments the energy of the player who ended the turn.
    ///
    /// # Arguemnt
    ///
    /// * `ctx` - Dojo context.
    /// * `game_id` - The current game id.
    fn execute(ctx: Context, game_id: felt252) {
        let mut game = get!(ctx.world, game_id, Game);

        check_turn(@game, @ctx.origin);

        game.turn += 1;

        let mut cards_drawn = game.turn / 2;
        let drawer = if ctx.origin == game.player2 {
            cards_drawn += 1;
            game.player1
        } else {
            game.player2
        };
        if cards_drawn <= 8 {
            draw_card(ctx, 8 - cards_drawn, drawer);
        }
        emit!(ctx.world, EndTurn { game_id, turn: game.turn });

        // Increments the energy of the player 
        let mut player = get!(ctx.world, (game_id, ctx.origin), Player);
        player.remaining_energy = game.turn / 2 + 2;
        player.goalkeeper.update_card_placement();
        player.defender.update_card_placement();
        player.midfielder.update_card_placement();
        player.attacker.update_card_placement();

        set!(ctx.world, (player));

        // End the Game
        // If one reached score 2, set winner 
        game
            .outcome =
                if (game.player1_score == 2) {
                    Option::Some(Outcome::Player1(game.player1))
                } else if (game.player2_score == 2) {
                    Option::Some(Outcome::Player2(game.player2))
                } else {
                    Option::None
                };

        set!(ctx.world, (game));
    }

    /// Draw a card from the deck.
    ///
    /// # Arguments
    ///
    /// * `ctx` - Dojo context.
    /// * `remaining_cards` - Number of cards remaining in the deck.
    /// * `player` - Player drawing the card.
    fn draw_card(ctx: Context, remaining_cards: u128, player: ContractAddress) {
        let card_id: u256 = pedersen(get_block_timestamp().into(), get_block_number().into())
            .into() % remaining_cards
            .into();
        let mut cards_in_deck_seen = 0_u128;
        let mut i = 0_u128;
        loop {
            let mut deck_card = get!(ctx.world, (player, i), DeckCard);
            if cards_in_deck_seen == card_id.low {
                deck_card.card_state = CardState::Hand;
                set!(ctx.world, (deck_card));
                break;
            }
            if deck_card.card_state == CardState::Deck {
                cards_in_deck_seen += 1;
            }
            i += 1;
        }
    }
}

