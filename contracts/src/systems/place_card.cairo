#[system]
mod place_card_system {
    use array::ArrayTrait;
    use option::OptionTrait;
    use serde::Serde;
    use starknet::ContractAddress;
    use traits::Into;
    use array::SpanTrait;
    use traits::Index;

    use tsubasa::models::{Card, CardState, DeckCard, Game, Roles, Placement, Player};
    [#event]
    use tsubasa::events::CardPlaced;
    use tsubasa::systems::check_turn;
    use debug::PrintTrait;
    /// Places a card and puts it in pending state. Deducts its energy cost from the 
    /// remaining energy of the player. Will fail if the player doesn't have enough energy
    ///
    /// # Arguments
    ///
    /// * world: IWorldDispatcher
    /// * `game_id` - The current game_id.
    /// * `card_id` - The position in the player's deck of the card to be placed.
    /// * `position` - The position at which the card will be placed
    fn execute(world: IWorldDispatcher, game_id: felt252, card_id: u8, position: Roles) {
        let game = get!(world, game_id, Game);
        check_turn(@game, @starknet::get_caller_address());
        let game_player_key: (felt252, felt252) = (game_id, starknet::get_caller_address().into());
        let mut player = get!(world, starknet::get_caller_address(), game_player_key, Player);
        let deck_card = get!(
            world, (Into::<ContractAddress, felt252>::into(starknet::get_caller_address()), card_id), DeckCard
        );
        let mut card = get!(world, (deck_card.token_id), Card);
        assert(player.remaining_energy >= card.cost.into(), 'Not enough energy');

        let is_on_its_role = match position {
            Roles::Goalkeeper => {
                assert(player.goalkeeper.is_none(), 'Goalkeeper already placed');
                player.goalkeeper = Option::Some((deck_card.token_id,Placement::Side));
                card.role == Roles::Goalkeeper
            },
            Roles::Defender => {
                assert(player.defender.is_none(), 'Defender already placed');
                player.defender = Option::Some((deck_card.token_id,Placement::Side));
                card.role == Roles::Defender
            },
            Roles::Midfielder => {
                assert(player.midfielder.is_none(), 'Midfielder already placed');
                player.midfielder = Option::Some((deck_card.token_id,Placement::Side));
                card.role == Roles::Midfielder
            },
            Roles::Attacker => {
                assert(player.attacker.is_none(), 'Attacker already placed');
                player.attacker = Option::Some((deck_card.token_id,Placement::Side));
                card.role == Roles::Attacker
            }
        };

        if (is_on_its_role) {
            card.current_dribble += 1;
            card.current_defense += 1;
        }
        if (deck_card.is_captain) {
            card.current_dribble += 1;
            card.current_defense += 1;
        }

        player.remaining_energy -= card.cost.into();
        set!(world, (card));
        set!(world, (player));
        emit!(
            world,
            CardPlaced { game_id, player: starknet::get_caller_address(), card_id: deck_card.token_id, position }
        )
    }
}

