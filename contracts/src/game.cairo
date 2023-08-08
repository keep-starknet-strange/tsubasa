use starknet::ContractAddress;

/// Represents a game. As long as the winner is `None` the game isn't considered as finished.
#[derive(Component, Copy, Drop, Serde, SerdeLen)]
struct Game {
    /// Game id, computed as follows pedersen_hash(player1_address, player2_address)
    #[key]
    game_id: felt252,
    /// Rounds won by the player 1.
    player1_score: u8,
    /// Rounds won by the player 2.
    player2_score: u8,
    /// Current turn of the round.
    turn: felt252,
    /// Winner of the game. As long as it is `None` it means that the game is playing.
    outcome: Option<Outcome>,
}

#[derive(Component, Copy, Drop, Serde)]
enum Outcome {
    Player1: ContractAddress,
    Player2: ContractAddress,
    Draw,
}

impl PlayerSerdeLen of dojo::SerdeLen<Option<Outcome>> {
    #[inline(always)]
    fn len() -> usize {
        // 1 (variant id size) + 1 (value contained by the variant)
        2
    }
}

#[system]
mod attack {
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
