use traits::{Into, Default};
use option::{Option, OptionTrait};
use serde::Serde;
use debug::PrintTrait;
use array::ArrayTrait;

use dojo::world::IWorldDispatcherTrait;

use tsubasa::components::{Game, Outcome};
use tsubasa::systems::{
    create_game_system, attack_system, end_turn_system, place_card_system, end_game_system
};

use tsubasa::tests::utils::spawn_world;

#[test]
#[available_gas(30000000)]
fn test_end_game() {
    let player1 = starknet::contract_address_const::<0x1>();
    let player2 = starknet::contract_address_const::<0x2>();

    // use player1 address
    starknet::testing::set_contract_address(player1);

    let world = spawn_world();

    let game_id = pedersen(player1.into(), player2.into());

    // let create_game_calldata: Array<felt252> = array![player2.into()];
    let mut create_game_calldata: Array<felt252> = ArrayTrait::new();
    create_game_calldata.append(player2.into());
    world.execute('create_game_system', create_game_calldata.span());

    // let place_card_calldata = array![0, 0]; // u256 { low: 0, high: 0 }
    let mut place_card_calldata: Array<felt252> = ArrayTrait::new();
    place_card_calldata.append(0);
    place_card_calldata.append(0);
    world.execute('place_card_system', place_card_calldata.span());

    // let attack_calldata = array![0];
    let mut attack_calldata: Array<felt252> = ArrayTrait::new();
    attack_calldata.append(0);
    world.execute('attack_system', attack_calldata.span());

    // let end_turn_calldata = array![game_id];
    let mut end_turn_calldata: Array<felt252> = ArrayTrait::new();
    end_turn_calldata.append(game_id);
    world.execute('end_turn_system', end_turn_calldata.span());

    // let end_game_calldata = array![game_id, scored_player];
    let mut end_game_calldata: Array<felt252> = ArrayTrait::new();
    end_game_calldata.append(game_id);
    end_game_calldata.append(player2.into());
    world.execute('end_game_system', end_game_calldata.span());

    let game = get!(world, game_id, Game);
    let expected_game = Game {
        game_id: 0,
        player1,
        player2,
        player1_score: 0,
        player2_score: 1,
        turn: 0,
        outcome: Option::None
    };
    assert(game.player1_score == expected_game.player1_score, 'Wrong player1 score');
    assert(game.player2_score == expected_game.player2_score, 'Wrong player2 score');
    assert(game.turn == expected_game.turn, 'Wrong turn value');
    // Check that option is None
    assert(game.outcome.is_none(), 'Wrong outcome value');

    // Player 2 score goal one more
    world.execute('end_game_system', end_game_calldata.span());
    let game = get!(world, game_id, Game);
    let expected_game = Game {
        game_id: 0,
        player1,
        player2,
        player1_score: 0,
        player2_score: 2,
        turn: 0,
        outcome: Option::Some(Outcome::Player2(player2))
    };
    assert(game.player1_score == expected_game.player1_score, 'Wrong player1 score');
    assert(game.player2_score == expected_game.player2_score, 'Wrong player2 score');
    assert(game.turn == expected_game.turn, 'Wrong turn value');
    // Check that outcome is player2
    assert(expected_game.outcome.unwrap() == expected_game.outcome.unwrap(), 'Wrong outcome value');
}
