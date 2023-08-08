#[system]
mod attack_system {
    use dojo::world::Context;

    fn execute(ctx: Context, player: u8) {}
}

#[cfg(test)]
mod tests {
    use core::traits::{Into, Default};
    use array::ArrayTrait;
    use serde::Serde;

    use dojo::world::IWorldDispatcherTrait;

    use dojo::test_utils::spawn_test_world;
    use tsubasa::components::{Card, card, Game, game};
    use tsubasa::systems::place_card_system;
    use tsubasa::systems::attack_system;


    #[test]
    #[available_gas(30000000)]
    fn test_attack() {
        let caller = starknet::contract_address_const::<0x0>();

        // components
        let mut components: Array = Default::default();
        components.append(game::TEST_CLASS_HASH);
        components.append(card::TEST_CLASS_HASH);
        // systems
        let mut systems: Array = Default::default();
        systems.append(place_card_system::TEST_CLASS_HASH);
        systems.append(attack_system::TEST_CLASS_HASH);

        // deploy executor, world and register components/systems
        let world = spawn_test_world(components, systems);

        let mut place_card_calldata: Array = Default::default();
        0_u256.serialize(ref place_card_calldata);
        world.execute('place_card_system'.into(), place_card_calldata.span());

        let mut attack_calldata: Array = Default::default();
        attack_calldata.append(0);
        world.execute('attack_system'.into(), attack_calldata.span());
    }
}
