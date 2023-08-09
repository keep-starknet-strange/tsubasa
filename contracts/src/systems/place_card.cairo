/// Available roles for cards
enum Roles {
    Goalkeeper: felt252,
    Defender: felt252,
    Midfielder: felt252,
    Attacker: felt252,
}

/// Represents a playing card. It only contains the token id of the NFT.
#[derive(Component, Copy, Drop, Serde, SerdeLen)]
struct Card {
    /// The token id in the NFT contract of this card.
    #[key]
    token_id: u256,
    /// Dribble statistic of the card.
    dribble: u8,
    /// Current dribble stat, depending on card placement
    current_dribble: u8,
    /// Defense statistic of the card.
    defense: u8,
    /// Current defense stat, depending on card placement
    current_defense: u8,
    /// Energy cost of the card.
    cost: u8,
    /// Assigned role
    role: Roles,
    /// Card is currently captain of the team
    is_captain: bool,
}

#[system]
mod place_card_system {
    use tsubasa::components::Card;
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

    use tsubasa::components::{Card, card, Game, game};
    use tsubasa::systems::place_card_system;


    #[test]
    #[available_gas(30000000)]
    fn test_place_card() {
        let caller = starknet::contract_address_const::<0x0>();

        // components
        let mut components: Array = Default::default();
        components.append(game::TEST_CLASS_HASH);
        components.append(card::TEST_CLASS_HASH);
        // systems
        let mut systems: Array = Default::default();
        systems.append(place_card_system::TEST_CLASS_HASH);

        // deploy executor, world and register components/systems
        let world = spawn_test_world(components, systems);

        let mut place_card_calldata: Array = Default::default();
        0_u256.serialize(ref place_card_calldata);
        world.execute('place_card_system'.into(), place_card_calldata.span());
    }
}
