use array::ArrayTrait;
use starknet::ContractAddress;
use traits::Into;

use dojo::world::{IWorldDispatcher, IWorldDispatcherTrait};
use dojo::test_utils::spawn_test_world;

use tsubasa::components::{Card, card, Game, game};
use tsubasa::systems::place_card_system;
use tsubasa::systems::attack_system;
use tsubasa::systems::create_game_system;
use tsubasa::systems::create_card_system;

use tsubasa::systems::end_turn_system;
use tsubasa::systems::end_game_system;


/// Spawns a mock dojo world.
fn spawn_world() -> IWorldDispatcher {
    // components
    let mut components = array![game::TEST_CLASS_HASH, card::TEST_CLASS_HASH];

    // systems
    let mut systems = array![
        create_game_system::TEST_CLASS_HASH,
        place_card_system::TEST_CLASS_HASH,
        attack_system::TEST_CLASS_HASH,
        end_turn_system::TEST_CLASS_HASH,
        create_card_system::TEST_CLASS_HASH,
    ];

    // deploy executor, world and register components/systems
    spawn_test_world(components, systems)
}

/// Returns 1_ContractAddress, 2_ContractAddress
fn get_players() -> (ContractAddress, ContractAddress, ContractAddress) {
    (
        starknet::contract_address_const::<0x19>(),
        starknet::contract_address_const::<0x32>(),
        starknet::contract_address_const::<0x1>()
    )
}

/// Creates a tsubasa game.
fn create_game(
    world: IWorldDispatcher, player1: ContractAddress, player2: ContractAddress
) -> felt252 {
    // use player1 address
    starknet::testing::set_contract_address(player1);

    let create_game_calldata = array![player2.into()];

    // create game
    world.execute('create_game_system', create_game_calldata);
    pedersen(player1.into(), player2.into())
}
