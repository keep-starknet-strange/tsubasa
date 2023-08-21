#[system]
mod place_card_system {
    use array::ArrayTrait;
    use option::OptionTrait;
    use serde::Serde;
    use starknet::ContractAddress;
    use traits::Into;

    use dojo::world::Context;

    use tsubasa::components::{Card, Roles, Placement, Player};
    use tsubasa::events::CardPlaced;

    /// Places a card and puts it in pending state. Deducts its energy cost from the 
    /// remaining energy of the player. Will fail if the player doesn't have enough energy
    ///
    /// # Arguments
    ///
    /// * `ctx` - Dojo context.
    /// * `game_id` - The current game_id.
    /// * `card_id` - The token id of the card that has to be placed.
    /// * `position` - The position at which the card will be placed
    fn execute(ctx: Context, game_id: felt252, card_id: u256, position: Roles) {
        let game_player_key: (felt252, felt252) = (game_id, ctx.origin.into());
        let mut player = get!(ctx.world, game_player_key, Player);
        let mut card = get!(ctx.world, (card_id), Card);
        assert(player.remaining_energy >= card.cost.into(), 'Not enough energy');

        let mut is_on_its_role = false;
        match position {
            Roles::Goalkeeper => {
                assert(player.goalkeeper.is_none(), 'Goalkeeper already placed');
                player.goalkeeper = Option::Some(Placement::Side(card_id));
                match card.role {
                    Roles::Goalkeeper => {
                        is_on_its_role = true;
                    },
                    Roles::Defender => (),
                    Roles::Midfielder => (),
                    Roles::Attacker => (),
                }
            },
            Roles::Defender => {
                assert(player.defender.is_none(), 'Defender already placed');
                player.defender = Option::Some(Placement::Side(card_id));
                match card.role {
                    Roles::Goalkeeper => (),
                    Roles::Defender => {
                        is_on_its_role = true;
                    },
                    Roles::Midfielder => (),
                    Roles::Attacker => (),
                }
            },
            Roles::Midfielder => {
                assert(player.midfielder.is_none(), 'Midfielder already placed');
                player.midfielder = Option::Some(Placement::Side(card_id));
                match card.role {
                    Roles::Goalkeeper => (),
                    Roles::Defender => (),
                    Roles::Midfielder => {
                        is_on_its_role = true;
                    },
                    Roles::Attacker => (),
                }
            },
            Roles::Attacker => {
                assert(player.attacker.is_none(), 'Attacker already placed');
                player.attacker = Option::Some(Placement::Side(card_id));
                match card.role {
                    Roles::Goalkeeper => (),
                    Roles::Defender => (),
                    Roles::Midfielder => (),
                    Roles::Attacker => {
                        is_on_its_role = true;
                    },
                }
            }
        }

        if (is_on_its_role) {
            card.current_dribble += 1;
            card.current_defense += 1;
        }
        if (card.is_captain) {
            card.current_dribble += 1;
            card.current_defense += 1;
        }

        player.remaining_energy -= card.cost.into();
        set!(ctx.world, (card));
        set!(ctx.world, (player));
        emit!(ctx.world, CardPlaced { game_id, player: ctx.origin, card_id, position })
    }
}

