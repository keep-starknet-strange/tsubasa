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


    let mut create_card_calldata = array![1, 22, 17, 10, 3, 0];
    world.execute('create_card_system', create_card_calldata);

    let mut create_card_calldata_player2 = array![2, 10, 15, 10, 1, 0];
    world.execute('create_card_system', create_card_calldata_player2);

    let mut token_id_player1: u256 = 1;
    let mut token_id_player2: u256 = 2;

    let card_player1 = get!(world, token_id_player1, Card);
    let card_player2 = get!(world, token_id_player2, Card);

    assert(card_player1.is_captain == false, 'is_captain is wrong');
    assert(card_player1.defense == 17, 'defense is wrong');
    assert(card_player1.dribble >= card_player2.defense, 'invalid Card create execution');
}
