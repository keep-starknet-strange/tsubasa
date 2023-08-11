use traits::{Into, Default};
use option::{Option, OptionTrait};
use serde::Serde;
use array::ArrayTrait;

use dojo::world::IWorldDispatcherTrait;

use tsubasa::components::{Game, Energy};
use tsubasa::systems::{create_game_system, attack_system, end_turn_system, place_card_system};

use tsubasa::tests::utils::spawn_world;

#[test]
#[available_gas(30000000)]
fn test_end_turn() {
    let player1 = starknet::contract_address_const::<0x1>();
    let player2 = starknet::contract_address_const::<0x2>();

    // use player1 address
    starknet::testing::set_contract_address(player1);

    let world = spawn_world();

    let game_id = pedersen(player1.into(), player2.into());

    // let create_game_calldata: Array<felt252> = array![player2.into()];
    let mut create_game_calldata: Array<felt252> = ArrayTrait::new();
    create_game_calldata.append(player2.into());
    world.execute('create_game_system', create_game_calldata);

    // let place_card_calldata = array![0, 0]; // u256 { low: 0, high: 0 }
    let mut place_card_calldata: Array<felt252> = ArrayTrait::new();
    place_card_calldata.append(0);
    place_card_calldata.append(0);
    world.execute('place_card_system', place_card_calldata);

    // let attack_calldata = array![0];
    let mut attack_calldata: Array<felt252> = ArrayTrait::new();
    attack_calldata.append(0);
    world.execute('attack_system', attack_calldata);

    // let end_turn_calldata = array![game_id];
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

    let expected_energy = Energy { game_id, player: player1, remaining: 2 };
    let player_energy = get!(world, (expected_energy.game_id, expected_energy.player), Energy);
    // Check that player energy is correclty incremented at the end of each turn.
    assert(player_energy.remaining == expected_energy.remaining, 'Wrong player energy value');
}
