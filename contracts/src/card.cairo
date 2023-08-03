/// Represents a playing card. It only contains the token id of the NFT.
#[derive(Component, Copy, Drop, Serde, SerdeLen)]
struct Card {
    attack: u8,
    defense: u8,
    cost: u8,
}

#[system]
mod place_card {
    use super::Card;
    use dojo::world::Context;

    /// This will place a card either on the left or on the right.
    fn execute(ctx: Context, card_id: u256) {}
}

#[cfg(test)]
mod tests {
    use core::traits::{Into, Default};
    use array::ArrayTrait;
    use serde::Serde;

    use dojo::world::IWorldDispatcherTrait;

    use dojo::test_utils::spawn_test_world;

    use tsubasa::game::{attack, game};
    use tsubasa::card::{card, Card, place_card};

    #[test]
    #[available_gas(30000000)]
    fn test_move() {
        let caller = starknet::contract_address_const::<0x0>();

        // components
        let mut components: Array = Default::default();
        components.append(game::TEST_CLASS_HASH);
        components.append(card::TEST_CLASS_HASH);
        // systems
        let mut systems: Array = Default::default();
        systems.append(place_card::TEST_CLASS_HASH);
        systems.append(attack::TEST_CLASS_HASH);

        // deploy executor, world and register components/systems
        let world = spawn_test_world(components, systems);

        let mut place_card_calldata: Array = Default::default();
        0_u256.serialize(ref place_card_calldata);
        world.execute('place_card'.into(), place_card_calldata.span());

        let mut attack_calldata: Array = Default::default();
        attack_calldata.append(0);
        world.execute('attack'.into(), attack_calldata.span());
    }
}
