use core::traits::{Into, Default};
use array::ArrayTrait;
use serde::Serde;
use option::{Option, OptionTrait};

use dojo::world::IWorldDispatcherTrait;

use tsubasa::components::{Game, Card};
use tsubasa::tests::utils::spawn_world;
use tsubasa::systems::create_card_system;

#[test]
#[available_gas(30000000)]
fn test_create_card() {
    let player1 = starknet::contract_address_const::<0x1>();
    let player2 = starknet::contract_address_const::<0x2>();

    let world = spawn_world();

    //Create Card For test prupose
    let mut create_card_calldata: Array<felt252> = ArrayTrait::new();
    create_card_calldata.append(1);
    create_card_calldata.append(0);
    create_card_calldata.append(20);
    create_card_calldata.append(20);

    world.execute('create_card_system', create_card_calldata);

    let mut create_card_calldata_player2: Array<felt252> = ArrayTrait::new();
    create_card_calldata_player2.append(2);
    create_card_calldata_player2.append(0);
    create_card_calldata_player2.append(10);
    create_card_calldata_player2.append(15);

    world.execute('create_card_system', create_card_calldata_player2);

    let card_player1 = get!(world, 1, Card);
    let card_player2 = get!(world, 2, Card);

    assert(card_player1.dribble >= card_player2.defense, 'invalid Card create execution');
//assert(card_player1.dribble != 11, 'defense is wrong');
}
