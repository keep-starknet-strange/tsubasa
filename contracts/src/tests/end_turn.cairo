use array::ArrayTrait;
use option::{Option, OptionTrait};
use serde::Serde;
use starknet::ContractAddress;

use dojo::world::IWorldDispatcherTrait;

use tsubasa::components::{Game, Player};
use tsubasa::systems::{create_game_system, attack_system, end_turn_system, place_card_system};
use tsubasa::tests::utils::{get_players, create_game, spawn_world};

#[test]
#[available_gas(30000000)]
fn test_end_turn() {
    let world = spawn_world();
    let (player1, player2) = get_players();
    let game_id = create_game(:world, :player1, :player2);

    let mut place_card_calldata: Array<felt252> = ArrayTrait::new();
    place_card_calldata.append(game_id);
    place_card_calldata.append(0); // card_id.low
    place_card_calldata.append(0); // card_id.high
    place_card_calldata.append(0); // Roles::Goalkeeper
    world.execute('place_card_system', place_card_calldata);

    let mut attack_calldata: Array<felt252> = ArrayTrait::new();
    attack_calldata.append(0);
    //world.execute('attack_system', attack_calldata);

    let mut end_turn_calldata: Array<felt252> = ArrayTrait::new();
    end_turn_calldata.append(game_id);
    world.execute('end_turn_system', end_turn_calldata);

    let game = get!(world, game_id, Game);

    let expected_game = Game {
        game_id,
        player1,
        player2,
        player1_score: 0,
        player2_score: 0,
        turn: 1,
        outcome: Option::None
    };

    assert(game.game_id == expected_game.game_id, 'invalid game_id');
    assert(game.player1_score == expected_game.player1_score, 'Wrong player1 score');
    assert(game.player2_score == expected_game.player2_score, 'Wrong player2 score');
    assert(game.turn == expected_game.turn, 'Wrong turn value');
    // Check that option is None
    assert(game.outcome.is_none(), 'Wrong outcome value');

    let player = get!(world, (game_id, player1), Player);
    // Check that player energy is correclty incremented at the end of each turn.
   // assert(player_energy.remaining == expected_energy.remaining, 'Wrong player energy value');
}
