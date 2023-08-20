#[derive(Copy, Drop, Serde)]
use tsubasa::components::Roles;


#[system]
mod create_card_system {
    use traits::Into;
    use dojo::world::Context;
    use starknet::ContractAddress;
    use tsubasa::components::{Game, Card};
    use array::{ArrayTrait};
    use tsubasa::components::Roles;
    use option::{Option, OptionTrait};
    use traits::TryInto;
    use debug::PrintTrait;

    //This part is for test prupose
    fn execute(
        ctx: Context,
        token_id: felt252,
        dribble: felt252,
        defense: felt252,
        cost: felt252,
        role: Roles
    ) { //TO-DO: add cost parameter,is capitain
        let mut value = Roles::Attacker;

        set!(
            ctx.world, Card {
                token_id: token_id.into(),
                dribble: dribble.try_into().unwrap(),
                current_dribble: dribble.try_into().unwrap(),
                defense: defense.try_into().unwrap(),
                current_defense: defense.try_into().unwrap(),
                cost: cost.try_into().unwrap(),
                role: role,
                is_captain: false
            }
        );
        let mut token_idz: u256 = token_id.into();
        let card = get!(ctx.world, token_idz, Card);
        card.defense.print();
    }
}
