use traits::Into;
use debug::PrintTrait;
use dojo::world::IWorldDispatcherTrait;
use starknet::ContractAddress;

use starknet::testing::set_contract_address;

use tsubasa::components::{Game, Roles, DeckCard};
use tsubasa::tests::utils::{spawn_world, get_players, create_game};
use tsubasa::systems::create_deck_system;

#[test]
#[available_gas(300000000)]
fn test_create_deck() {
    let (player1, player2, _) = get_players();

    let world = spawn_world();

    let game_id = create_game(world, player1, player2);

    let mut create_deck_calldata = array![8, 0, 0, 1, 0, 2, 0, 3, 0, 4, 0, 5, 0, 6, 0, 7, 0, 3];

    // create deck

    world.execute('create_deck_system', create_deck_calldata);
}
#[test]
#[should_panic]
#[available_gas(300000000)]
fn test_create_deck_not_enough_cards() {
    let (player1, player2, _) = get_players();

    let world = spawn_world();

    let game_id = create_game(world, player1, player2);

    let mut create_deck_calldata = array![7, 1, 0, 2, 0, 3, 0, 4, 0, 5, 0, 6, 0, 7, 0, 5];

    // create deck

    world.execute('create_deck_system', create_deck_calldata);
}
