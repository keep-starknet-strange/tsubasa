use array::ArrayTrait;
use starknet::ContractAddress;
use traits::Into;
use serde::Serde;

use dojo::world::{IWorldDispatcher, IWorldDispatcherTrait};
use dojo::test_utils::spawn_test_world;

use tsubasa::components::{Card, card, Game, game};
use tsubasa::systems::place_card_system;
use tsubasa::systems::attack_system;
use tsubasa::systems::create_game_system;
use tsubasa::systems::create_card_system;
use tsubasa::systems::create_deck_system;

use tsubasa::systems::end_turn_system;


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
        create_deck_system::TEST_CLASS_HASH,
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

    let mut create_deck_calldata1 = array![];
    let token_ids1 = array![0_u256, 2, 4, 6, 8, 10, 12, 14];
    token_ids1.serialize(ref create_deck_calldata1);
    // Captain index.
    create_deck_calldata1.append(7);
    world.execute('create_deck_system', create_deck_calldata1);

    starknet::testing::set_contract_address(player2);
    let mut create_deck_calldata2 = array![];
    let token_ids2 = array![1_u256, 3, 5, 7, 9, 11, 13, 15];
    token_ids2.serialize(ref create_deck_calldata2);
    // Captain index.
    create_deck_calldata2.append(7);
    world.execute('create_deck_system', create_deck_calldata2);

    starknet::testing::set_contract_address(player1);
    pedersen(player1.into(), player2.into())
}
