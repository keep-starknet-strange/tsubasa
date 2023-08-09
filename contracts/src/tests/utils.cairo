use array::ArrayTrait;

use dojo::world::{IWorldDispatcher, IWorldDispatcherTrait};
use dojo::test_utils::spawn_test_world;

use tsubasa::components::{Card, card, Game, game};
use tsubasa::systems::place_card_system;
use tsubasa::systems::attack_system;
use tsubasa::systems::create_game_system;
use tsubasa::systems::end_turn_system;


fn spawn_world() -> IWorldDispatcher {
    // components
    let mut components = array![game::TEST_CLASS_HASH, card::TEST_CLASS_HASH];

    // systems
    let mut systems = array![
        create_game_system::TEST_CLASS_HASH,
        place_card_system::TEST_CLASS_HASH,
        attack_system::TEST_CLASS_HASH,
        end_turn_system::TEST_CLASS_HASH,
    ];

    // deploy executor, world and register components/systems
    let world = spawn_test_world(components, systems);
    world
}
