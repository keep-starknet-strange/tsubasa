#[system]
mod place_card_system {
    use dojo::world::Context;

    use tsubasa::components::Card;

    /// This will place a card either on the left or on the right.
    fn execute(ctx: Context, card_id: u256) {}
}

#[cfg(test)]
mod tests {
    use array::ArrayTrait;
    use traits::Into;
    use serde::Serde;

    use dojo::world::IWorldDispatcherTrait;
    use dojo::test_utils::spawn_test_world;

    use tsubasa::components::{card, game};

    use super::place_card_system;


    #[test]
    #[available_gas(30000000)]
    fn test_place_card() {
        let caller = starknet::contract_address_const::<0x0>();

        // components
        let mut components = array![game::TEST_CLASS_HASH, card::TEST_CLASS_HASH];
        // systems
        let mut systems = array![place_card_system::TEST_CLASS_HASH];

        // deploy executor, world and register components/systems
        let world = spawn_test_world(components, systems);

        let mut place_card_calldata = array![];
        0_u256.serialize(ref place_card_calldata);
        world.execute('place_card_system'.into(), place_card_calldata.span());
    }
}
