#[derive(Copy, Drop, Serde)]
use tsubasa::components::Roles;


#[system]
mod create_card_system {
    use traits::Into;
    use dojo::world::Context;
    use starknet::ContractAddress;
    use tsubasa::components::{Game,Roles, Card};
    use option::{Option, OptionTrait};


    fn execute(
        ctx: Context,
        token_id: felt252,
        dribble: u8,
        defense: u8,
        cost: u8,
        role: Roles,
        is_captain: bool
    ) {
        set!(
            ctx.world, Card {
                token_id: token_id.into(),
                dribble: dribble,
                current_dribble: dribble,
                defense: defense,
                current_defense: defense,
                cost: cost,
                role: role,
                is_captain: is_captain
            }
        );
    }
}
