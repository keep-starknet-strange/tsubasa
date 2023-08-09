use traits::{Into, Default};
use option::OptionTrait;
use array::ArrayTrait;

use dojo::world::IWorldDispatcherTrait;
use dojo::test_utils::spawn_test_world;

use tsubasa::components::{card, Game, game};
use tsubasa::systems::{attack_system, end_turn_system, place_card_system};

use tsubasa::tests::utils::spawn_world;


#[test]
#[available_gas(30000000)]
fn test_end_turn() {
    let caller = starknet::contract_address_const::<0x0>();

    let world = spawn_world();

    let place_card_calldata = array![0, 0]; // u256 { low: 0, high: 0 }
    world.execute('place_card_system', place_card_calldata.span());

    let attack_calldata = array![0];
    world.execute('attack_system', attack_calldata.span());

    let end_turn_calldata = array![0];
    world.execute('end_turn_system', end_turn_calldata.span());

    //let game = world.entity('Game', array![0].span(), 0, dojo::SerdeLen::<Game>::len());
    //let game = get!(world)
    let expected_game = Game {
        game_id: 0, player1_score: 0, player2_score: 0, turn: 1, outcome: Option::None
    };

    assert(*game[0] == expected_game.player1_score.into(), 'Wrong player1 score');
    assert(*game[1] == expected_game.player2_score.into(), 'Wrong player2 score');
    assert(*game[2] == expected_game.turn.into(), 'Wrong turn value');
    // Check that option is None
    assert(*game[3] == 1, 'Wrong outcome value');
    // Check that it holds no value
    assert(*game[4] == 0, 'Wrong outcome value');
}
