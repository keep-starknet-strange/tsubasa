use core::traits::{Into, Default};
use array::ArrayTrait;
use serde::Serde;
use option::{Option, OptionTrait};
use debug::PrintTrait;
use dojo::world::IWorldDispatcherTrait;

use tsubasa::components::{Game, Roles, Card};
use tsubasa::tests::utils::spawn_world;
use tsubasa::systems::create_card_system;
use core::traits::TryInto;

#[test]
#[available_gas(30000000)]
fn test_create_card() {
    let player1 = starknet::contract_address_const::<0x1>();
    let player2 = starknet::contract_address_const::<0x2>();

    let world = spawn_world();

    //Create Card For test prupose
    let mut create_card_calldata: Array = ArrayTrait::new();
    create_card_calldata.append(1); //Token_id
    create_card_calldata.append(22); //Dribble
    create_card_calldata.append(17); //Defense
    create_card_calldata.append(10); //cost
    create_card_calldata.append(3); //Role 0:Goalkeeper / 1:Defender etc..
    create_card_calldata.append(0); //is_captain 0:false - 1:true 

    world.execute('create_card_system', create_card_calldata);

    let mut create_card_calldata_player2: Array<felt252> = ArrayTrait::new();
    create_card_calldata_player2.append(2); //Token_id
    create_card_calldata_player2.append(10); //Dribble
    create_card_calldata_player2.append(15); //Defense
    create_card_calldata_player2.append(10); //cost
    create_card_calldata_player2.append(1); //Role 0:Goalkeeper / 1:Defender etc..
    create_card_calldata_player2.append(0); //is_captain 0:false - 1:true 

    // world.execute('create_card_system', create_card_calldata_player2);
    let mut token_id_player1: u256 = 1;
    let mut token_id_player2: u256 = 2;

    let card_player1 = get!(world, token_id_player1, Card);
    let card_player2 = get!(world, token_id_player2, Card);
    card_player1.role.print();
    //card_player2.token_id.print();
    assert(card_player1.is_captain == false, 'is_captain is wrong');
    //assert(card_player1.dribble >= card_player2.defense, 'invalid Card create execution');
    assert(card_player1.defense == 17, 'defense is wrong');
}
