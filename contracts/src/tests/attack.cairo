use traits::{Into, Default};
use option::{Option, OptionTrait};
use serde::Serde;
use array::ArrayTrait;

use dojo::world::IWorldDispatcherTrait;

use tsubasa::components::{Game, Energy, Card};
use tsubasa::components::Roles;
use tsubasa::systems::{
    create_game_system, attack_system, end_turn_system, place_card_system, create_card_system,
};

use tsubasa::tests::utils::spawn_world;


#[test]
#[available_gas(30000000)]
fn test_attack_turn() {
    let player1 = starknet::contract_address_const::<0x1>();
    let player2 = starknet::contract_address_const::<0x2>();

    // use player1 address
    starknet::testing::set_contract_address(player1);

    let world = spawn_world();

    //Create Game Part
    let mut create_game_calldata: Array<felt252> = ArrayTrait::new();
    create_game_calldata.append(player2.into());

    world.execute('create_game_system', create_game_calldata);
    let expected_game_id = pedersen(player1.into(), player2.into());
    let game_id = pedersen(player1.into(), player2.into());
    let game = get!(world, expected_game_id, Game);

    assert(game.game_id == expected_game_id, 'invalid game_id');
    assert(game.player1 == player1, 'invalid player 1');
    assert(game.player2 == player2, 'invalid player 2');
    assert(game.player1_score == 0, 'invalid player 1 score');
    assert(game.player2_score == 0, 'invalid player 2 score');
    assert(game.outcome.is_none(), 'invalid outcome');

    // let place_card_calldata = array![0, 0]; // u256 { low: 0, high: 0 }
    let mut place_card_calldata: Array<felt252> = ArrayTrait::new();
    place_card_calldata.append(0);
    place_card_calldata.append(0);
    world.execute('place_card_system', place_card_calldata);

    //Create Card For test prupose
    let mut create_card_calldata: Array<felt252> = ArrayTrait::new();
    create_card_calldata.append(1);
    create_card_calldata.append(0);
    world.execute('create_card_system', create_card_calldata);

    let mut create_card_calldata_player2: Array<felt252> = ArrayTrait::new();
    create_card_calldata_player2.append(2);
    create_card_calldata_player2.append(0);
    world.execute('create_card_system', create_card_calldata_player2);

    //Attack logic test part
    let mut attack_calldata: Array<felt252> = ArrayTrait::new();
    attack_calldata.append(game.game_id);
    attack_calldata.append(1);
    attack_calldata.append(2);
    world.execute('attack_system', attack_calldata);

    let card_player1 = get!(world, 1, Card);
    let card_player2 = get!(world, 2, Card);
    let expected_remaining_defense = card_player1.dribble - card_player2.defense;
    assert(card_player1.defense != expected_remaining_defense, 'invalid Attack logic execution');
}
