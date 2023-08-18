use dojo::world::IWorldDispatcherTrait;

use tsubasa::tests::utils::{create_game, get_players, spawn_world};


#[test]
#[available_gas(30000000)]
fn test_attack() {
    let world = spawn_world();
    let (player1, player2) = get_players();
    let game_id = create_game(world, player1, player2);
    // 0_u256.low, 0_u256.high, Roles::Defender
    let place_card_calldata: Array = array![game_id, 0, 0, 1];
    world.execute('place_card_system', place_card_calldata);

    let attack_calldata = array![0];
    world.execute('attack_system', attack_calldata);
}
