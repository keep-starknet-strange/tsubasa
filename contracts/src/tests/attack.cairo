use traits::{Into, TryInto, Default};
use option::{Option, OptionTrait};
use serde::Serde;
use array::ArrayTrait;
use debug::PrintTrait;

use dojo::world::IWorldDispatcherTrait;

use tsubasa::components::{Game, Player, Card, Placement};
use tsubasa::components::Roles;
use tsubasa::systems::{
    create_game_system, attack_system, end_turn_system, place_card_system, create_card_system,
};

use tsubasa::tests::utils::spawn_world;


#[test]
#[available_gas(100000000)]
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

    //Create card --------------
    // Token_id, Dribble, Defense, Cost, Role
    let mut create_card_calldata_goalkeeper = array![1, 22, 17, 0, 0, 1];
    world.execute('create_card_system', create_card_calldata_goalkeeper);

    let mut create_card_calldata_defenser = array![2, 10, 15, 0, 1, 0];
    world.execute('create_card_system', create_card_calldata_defenser);

    let mut create_card_calldata_midfielder = array![3, 12, 17, 0, 2, 0];
    world.execute('create_card_system', create_card_calldata_midfielder);
    let mut create_card_calldata_attacker = array![4, 35, 25, 0, 3, 0];
    world.execute('create_card_system', create_card_calldata_attacker);
    /// -----Player 2 card-----

    let mut create_card_calldata_goalkeeper2 = array![5, 22, 17, 0, 0, 1];
    world.execute('create_card_system', create_card_calldata_goalkeeper2);

    let mut create_card_calldata_defenser2 = array![6, 10, 15, 0, 1, 0];
    world.execute('create_card_system', create_card_calldata_defenser2);

    let mut create_card_calldata_midfielder2 = array![7, 12, 17, 0, 2, 0];
    world.execute('create_card_system', create_card_calldata_midfielder2);

    let mut create_card_calldata_attacker2 = array![8, 35, 25, 0, 3, 0];
    world.execute('create_card_system', create_card_calldata_attacker2);

    //  let token_id_player1: u256 = 4;
    //  let mut card_player1 = get!(world, token_id_player1, Card);
    //  card_player1.defense.print();
    //  card_player1.current_defense.print();

    //Place card --------------
    let place_goalkeeper_calldata = array![game_id, 1, 0, 0];
    world.execute('place_card_system', place_goalkeeper_calldata);

    let place_defender_calldata = array![game_id, 2, 0, 1];
    world.execute('place_card_system', place_defender_calldata);

    let place_midfielder_calldata = array![game_id, 3, 0, 2];
    world.execute('place_card_system', place_midfielder_calldata);

    let place_attacker_calldata = array![game_id, 4, 0, 3];
    world.execute('place_card_system', place_attacker_calldata);

    let end_turn_calldata = array![game_id];
    world.execute('end_turn_system', end_turn_calldata); //check turn condition

    starknet::testing::set_contract_address(player2); //switch address to fit player2 ctx.origin 

    let place_goalkeeper_player2_calldata = array![game_id, 5, 0, 0];
    world.execute('place_card_system', place_goalkeeper_player2_calldata);

    let place_defender_player2_calldata = array![game_id, 6, 0, 1];
    world.execute('place_card_system', place_defender_player2_calldata);

    let place_midfielder_player2_calldata = array![game_id, 7, 0, 2];
    world.execute('place_card_system', place_midfielder_player2_calldata);

    let place_attacker_player2_calldata = array![game_id, 8, 0, 3];
    world.execute('place_card_system', place_attacker_player2_calldata);

    starknet::testing::set_contract_address(player1); //switch back to player 1

    let player = get!(world, (game_id, player1), Player);
    let player2 = get!(world, (game_id, player2), Player);
    // player2.player.print();

    //Attack part -----------------

 

    let attack_calldata = array![game_id];
    world.execute('attack_system', attack_calldata);
    let token_id_player1: u256 = 4;
    let token_id_player2: u256 = 6;

    let card_player1 = get!(world, token_id_player1, Card);
    let card_player2 = get!(world, token_id_player2, Card);

    // let expected_remaining_defense = (card_player1.defense+1) - card_player2.dribble;
    // assert(
    //     card_player1.current_defense == expected_remaining_defense, 'invalid Attack logic execution'
    // );
    assert(card_player1.current_defense == 0, 'invalid Attack logic execution');

    //We check if the opposing card has been removed
    assert(player2.defender.is_none(), 'Card not remove');
}
