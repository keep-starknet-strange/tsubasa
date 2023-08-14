#[system]
mod create_card_system {
    use traits::Into;
    use dojo::world::Context;
    use starknet::ContractAddress;
    use tsubasa::events::{GameCreated};
    use tsubasa::components::{Game, Energy, Card};
    use option::Option;
    use array::{ArrayTrait};
    use tsubasa::components::Roles;


    fn execute(ctx: Context, token_id: u256, role: felt252) {
        let mut value = Roles::Attacker;
        match role {
            0 => value = Roles::Attacker,
            _ => value = Roles::Midfielder,
        }

        set!(
            ctx.world, Card {
                token_id: token_id,
                dribble: 11,
                current_dribble: 0,
                defense: 10,
                current_defense: 0,
                cost: 0,
                role: value,
                is_captain: false
            }
        );
    //emit!(ctx.world, GameCreated { game_id, player1, player2 })
    }
}
