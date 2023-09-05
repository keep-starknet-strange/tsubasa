use core::traits::{Into, Default};
use array::ArrayTrait;
use serde::Serde;
use option::{Option, OptionTrait};
use debug::PrintTrait;
use dojo::world::IWorldDispatcherTrait;

use tsubasa::components::{Game, Roles, Card};
use tsubasa::tests::utils::spawn_world;
use tsubasa::systems::create_card_system;

#[test]
#[available_gas(30000000)]
fn test_create_card() {
    let player1 = starknet::contract_address_const::<0x1>();
    let player2 = starknet::contract_address_const::<0x2>();

    let world = spawn_world();

    // Token_id, Dribble, Defense, Cost, Role, is captain
    let mut create_card_calldata = array![1, 0, 22, 17, 10, 3, 1];
    world.execute('create_card_system', create_card_calldata);

    let mut create_card_calldata_player2 = array![2, 0, 10, 15, 15, 1, 0];
    world.execute('create_card_system', create_card_calldata_player2);

    let mut token_id_player1: u256 = 1;
    let mut token_id_player2: u256 = 2;

    let card_player1 = get!(world, token_id_player1, Card);
    let card_player2 = get!(world, token_id_player2, Card);

    assert(card_player1.dribble == 22, 'dribble is wrong');
    assert(card_player1.current_dribble == 22, 'dribble is wrong');

    assert(card_player1.defense == 17, 'defense is wrong');
    assert(card_player1.current_defense == 17, 'current defense is wrong');
    assert(card_player1.cost == 10, 'cost is wrong');
    assert(card_player1.role == Roles::Attacker, 'role is wrong');

    assert(card_player2.dribble == 10, 'p2_dribble is wrong');
    assert(card_player2.defense == 15, 'p2_defense is wrong');
    assert(card_player2.cost == 15, 'p2_cost is wrong');
    assert(card_player2.role == Roles::Defender, 'role is wrong');

    assert(card_player1.dribble >= card_player2.defense, 'invalid Card create execution');
    assert(card_player2.cost >= card_player1.cost, 'invalid Cost comparison');
    assert(card_player1.defense >= card_player2.defense, 'invalid Defense comparison');
}
