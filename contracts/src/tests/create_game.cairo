use array::ArrayTrait;
use option::{Option, OptionTrait};
use serde::Serde;
use starknet::testing::set_contract_address;
use traits::Into;

use dojo::world::IWorldDispatcherTrait;
use dojo::test_utils::{deploy_contract};

use tsubasa::models::{Game, Player, Outcome};
use tsubasa::tests::utils::{get_players, create_game, spawn_world};
use tsubasa::systems::create_game_system;
use tsubasa::systems::{ICreateGameDispatcher, ICreateGameDispatcherTrait};

#[test]
#[available_gas(3000000000)]
fn test_create_game() {
    let (player1, player2, _) = get_players();
    let world = spawn_world();
    let game_id = create_game(world, player1, player2);

    // use player1 address
    set_contract_address(player1);
    let contract_Create_game = deploy_contract(
        create_game_system::TEST_CLASS_HASH, array![].span()
    );

    let create_game_system = ICreateGameDispatcher { contract_address: contract_Create_game };
    // create game
    create_game_system.create_game(world, player2);
    let expected_game_id = pedersen::pedersen(player1.into(), player2.into());
    let game = get!(world, expected_game_id, Game);

    assert(expected_game_id == game_id, 'invalid game_id');
    assert(game.game_id == expected_game_id, 'invalid game_id');
    assert(game.player1 == player1, 'invalid player 1');
    assert(game.player2 == player2, 'invalid player 2');
    assert(game.player1_score == 0, 'invalid player 1 score');
    assert(game.player2_score == 0, 'invalid player 2 score');
    assert(game.outcome == Outcome::Pending, 'invalid outcome');

    let player1 = get!(world, (game_id, game.player1), Player);
    let player2 = get!(world, (game_id, game.player2), Player);

    assert(player1.remaining_energy == 1, 'invalid player 1 energy');
    assert(player2.remaining_energy == 1, 'invalid player 2 energy');
}
