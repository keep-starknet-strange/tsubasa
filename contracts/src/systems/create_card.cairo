use dojo::world::IWorldDispatcher;
use tsubasa::models::{Card, Roles};

#[starknet::interface]
trait ICreateCard<TContractState> {
    fn create_card(
        self: @TContractState,
        world: IWorldDispatcher,
        token_id: u256,
        dribble: u8,
        defense: u8,
        cost: u8,
        role: Roles,
        is_captain: bool
    ) -> ();
}

#[system]
mod create_card_system {
    use super::ICreateCard;
    use tsubasa::models::{Card, Roles};

    impl CreateCardImpl of ICreateCard<ContractState> {
        fn create_card(
            self: @ContractState,
            world: IWorldDispatcher,
            token_id: u256,
            dribble: u8,
            defense: u8,
            cost: u8,
            role: Roles,
            is_captain: bool
        ) {
            set!(
                world,
                Card {
                    token_id: token_id.into(),
                    dribble,
                    current_dribble: dribble,
                    defense,
                    current_defense: defense,
                    cost,
                    role,
                }
            );
        }
    }
}
