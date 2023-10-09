use debug::PrintTrait;
use starknet::ContractAddress;
use starknet::testing::set_contract_address;
use traits::Into;

use dojo::world::IWorldDispatcherTrait;
use dojo::test_utils::{deploy_contract};


use tsubasa::models::{Game, Roles, DeckCard};
use tsubasa::tests::utils::{spawn_world, get_players, create_game};
use tsubasa::systems::create_deck_system;
use tsubasa::systems::{ICreateDeckDispatcher, ICreateDeckDispatcherTrait};


#[test]
#[available_gas(300000000)]
fn test_create_deck() {
    let (player1, player2, _) = get_players();

    let world = spawn_world();

    let game_id = create_game(world, player1, player2);
    let contract_ceate_deck = deploy_contract(create_deck_system::TEST_CLASS_HASH, array![].span());
    let mut create_deck_calldata = array![0, 1, 2, 3, 4, 5, 6, 7];
    let create_deck_system = ICreateDeckDispatcher { contract_address: contract_ceate_deck };

    // create deck
    create_deck_system.create_deck(world, create_deck_calldata.span(), 2);
}

#[test]
#[should_panic(expected: ('deck must have 8 cards', 'ENTRYPOINT_FAILED'))]
#[available_gas(300000000)]
fn test_create_deck_not_enough_cards() {
    let (player1, player2, _) = get_players();

    let world = spawn_world();

    let game_id = create_game(world, player1, player2);

    let contract_ceate_deck = deploy_contract(create_deck_system::TEST_CLASS_HASH, array![].span());
    let mut create_deck_calldata = array![0, 1, 2, 3, 4, 5, 6];
    let create_deck_system = ICreateDeckDispatcher { contract_address: contract_ceate_deck };

    // create deck
    create_deck_system.create_deck(world, create_deck_calldata.span(), 2);
}
