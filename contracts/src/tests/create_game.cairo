use core::traits::{Into, Default};
use array::ArrayTrait;
use serde::Serde;
use option::{Option, OptionTrait};

use dojo::world::IWorldDispatcherTrait;

use tsubasa::components::{Game};
use tsubasa::tests::utils::spawn_world;
use tsubasa::systems::create_game_system;

#[test]
#[available_gas(30000000)]
fn test_create_game() {
    let player1 = starknet::contract_address_const::<0x1>();
    let player2 = starknet::contract_address_const::<0x2>();

    let world = spawn_world();

    // use player1 address
    starknet::testing::set_contract_address(player1);

    let mut create_game_calldata: Array<felt252> = ArrayTrait::new();
    create_game_calldata.append(player2.into());

    // create game
    world.execute('create_game_system'.into(), create_game_calldata.span());
    let expected_game_id = pedersen(player1.into(), player2.into());
    let game = get !(world, expected_game_id, (Game));

    assert(game.game_id == expected_game_id, 'invalid game_id');
    assert(game.player1 == player1, 'invalid player 1');
    assert(game.player2 == player2, 'invalid player 2');
    assert(game.player1_score == 0, 'invalid player 1 score');
    assert(game.player2_score == 0, 'invalid player 2 score');
    assert(game.outcome.is_none(), 'invalid outcome');
}
