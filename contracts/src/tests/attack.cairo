use traits::{Into, TryInto, Default};
use option::{Option, OptionTrait};
use serde::Serde;
use array::ArrayTrait;
use debug::PrintTrait;

use dojo::world::IWorldDispatcherTrait;

use tsubasa::components::{Game, Player, Card};
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

    //Create Card For test prupose
    let mut create_card_calldata: Array<felt252> = ArrayTrait::new();
    create_card_calldata.append(1);
    create_card_calldata.append(0);
    create_card_calldata.append(20);
    create_card_calldata.append(27);

    world.execute('create_card_system', create_card_calldata);

    let token_id_player1: u256 = 1;
    let card_player1 = get!(world, token_id_player1, Card);
    assert(card_player1.dribble == 20, 'stat 1 is wrong');

    let mut create_card_calldata_player2: Array<felt252> = ArrayTrait::new();
    create_card_calldata_player2.append(2);
    create_card_calldata_player2.append(0);
    create_card_calldata_player2.append(10);
    create_card_calldata_player2.append(12);

    world.execute('create_card_system', create_card_calldata_player2);

    let token_id_player2: u256 = 2;
    let card_player2 = get!(world, token_id_player2, Card);
    assert(card_player2.dribble == 10, 'stat 2 is wrong');
    //Create card passed--------------

    // let place_card_calldata = array![0, 0]; // u256 { low: 0, high: 0 }
    let mut place_card_calldata: Array<felt252> = ArrayTrait::new();
    place_card_calldata.append(game_id); // * `game_id` - The current game_id.
    place_card_calldata.append(token_id_player1.try_into().unwrap()); //card_id
    place_card_calldata.append(1);
    place_card_calldata.append(1); /// * `position` - The position at which the card will be placed
    let player = get!(world, (game_id, player1), Player);
    world.execute('place_card_system', place_card_calldata);

    starknet::testing::set_contract_address(
        player2
    ); //We change the address to fit player2 ctx.origin condition

    let mut place_card_player2_calldata: Array<felt252> = ArrayTrait::new();
    place_card_player2_calldata.append(game_id); // * `game_id` - The current game_id.
    place_card_player2_calldata.append(token_id_player2.try_into().unwrap()); //card_id
    place_card_player2_calldata.append(1);
    place_card_player2_calldata.append(1);
    let player2 = get!(world, (game_id, player2), Player);
    world.execute('place_card_system', place_card_player2_calldata);

    starknet::testing::set_contract_address(player1); //switch back to player 1

    //Attack part -----------------
    let mut attack_calldata: Array<felt252> = ArrayTrait::new();
    attack_calldata.append(game.game_id);
    attack_calldata.append(1);
    attack_calldata.append(2);
    world.execute('attack_system', attack_calldata);

    let token_id_player1: u256 = 1;
    let token_id_player2: u256 = 2;

    let card_player1 = get!(world, token_id_player1, Card);
    let card_player2 = get!(world, token_id_player2, Card);

    let expected_remaining_defense = card_player1.defense - card_player2.dribble;
    assert(
        card_player1.current_defense == expected_remaining_defense, 'invalid Attack logic execution'
    );

    //We check if the opposing card has been removed
    assert(player2.attacker.is_none(), 'Card not remove');
}
