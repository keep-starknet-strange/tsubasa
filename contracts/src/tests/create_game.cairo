use array::ArrayTrait;
use option::{Option, OptionTrait};
use serde::Serde;
use starknet::testing::set_caller_address;
use traits::Into;

use dojo::world::IWorldDispatcherTrait;

use tsubasa::components::{Game, Player};
use tsubasa::tests::utils::{get_players, create_game, spawn_world};
use tsubasa::systems::create_game_system;

#[test]
#[available_gas(30000000)]
fn test_create_game() {
    let (player1, player2) = get_players();
    let world = spawn_world();
    let game_id = create_game(world, player1, player2);

    // use player1 address
    set_caller_address(player1);

    let mut create_game_calldata: Array<felt252> = ArrayTrait::new();
    create_game_calldata.append(player2.into());

    // create game
    world.execute('create_game_system', create_game_calldata);
    let expected_game_id = pedersen(player1.into(), player2.into());
    let game = get!(world, expected_game_id, Game);

    assert(expected_game_id == game_id, 'invalid game_id');
    assert(game.game_id == expected_game_id, 'invalid game_id');
    assert(game.player1 == player1, 'invalid player 1');
    assert(game.player2 == player2, 'invalid player 2');
    assert(game.player1_score == 0, 'invalid player 1 score');
    assert(game.player2_score == 0, 'invalid player 2 score');
    assert(game.outcome.is_none(), 'invalid outcome');

    let player1 = get!(world, (game_id, game.player1), Player);
    let player2 = get!(world, (game_id, game.player2), Player);

    assert(player1.remaining_energy == 1, 'invalid player 1 energy');
    assert(player2.remaining_energy == 1, 'invalid player 2 energy');
}
