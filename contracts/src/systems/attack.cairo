#[system]
mod attack_system {
    use dojo::world::Context;

    fn execute(ctx: Context, player: u8) {}
}

#[cfg(test)]
mod tests {
    use traits::Into;
    use array::ArrayTrait;
    use serde::Serde;

    use dojo::world::IWorldDispatcherTrait;
    use dojo::test_utils::spawn_test_world;

    use tsubasa::components::{card, game};
    use tsubasa::systems::{attack_system, place_card_system};


    #[test]
    #[available_gas(30000000)]
    fn test_attack() {
        let caller = starknet::contract_address_const::<0x0>();

        // components
        let components = array![game::TEST_CLASS_HASH, card::TEST_CLASS_HASH];

        // systems
        let systems = array![place_card_system::TEST_CLASS_HASH, attack_system::TEST_CLASS_HASH];

        // deploy executor, world and register components/systems
        let world = spawn_test_world(components, systems);

        let mut place_card_calldata = ArrayTrait::new();
        0_u256.serialize(ref place_card_calldata);
        world.execute('place_card_system'.into(), place_card_calldata.span());

        let attack_calldata = array![0];
        world.execute('attack_system'.into(), attack_calldata.span());
    }
}
