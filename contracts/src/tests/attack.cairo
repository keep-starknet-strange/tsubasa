use core::traits::{Into, Default};
use array::ArrayTrait;
use serde::Serde;

use dojo::world::IWorldDispatcherTrait;

use tsubasa::systems::place_card_system;
use tsubasa::systems::attack_system;
use tsubasa::tests::utils::spawn_world;


#[test]
#[available_gas(30000000)]
fn test_attack() {
    let caller = starknet::contract_address_const::<0x0>();
    let world = spawn_world();

    let mut place_card_calldata: Array = Default::default();
    0_u256.serialize(ref place_card_calldata);
    world.execute('place_card_system'.into(), place_card_calldata.span());

    let attack_calldata = array![0];
    world.execute('attack_system'.into(), attack_calldata.span());
}
