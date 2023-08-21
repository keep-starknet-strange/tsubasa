use traits::{Into, Default};
use array::ArrayTrait;
use serde::Serde;
use starknet::testing::set_caller_address;

use dojo::world::IWorldDispatcherTrait;

use tsubasa::systems::place_card_system;
use tsubasa::tests::utils::{create_game, get_players, spawn_world};
use tsubasa::components::{Card, Roles, Player, Placement};

#[test]
#[available_gas(30000000)]
fn test_place_card() {
    let world = spawn_world();
    let (player1, player2) = get_players();
    let game_id = create_game(:world, :player1, :player2);
    let card = Card {
        token_id: 1,
        dribble: 1,
        current_dribble: 1,
        defense: 2,
        current_defense: 2,
        cost: 1,
        role: Roles::Goalkeeper,
        is_captain: false
    };
    set!(world, (card));
    set_caller_address(player1);
    let mut place_card_calldata: Array = Default::default();
    place_card_calldata.append(game_id);
    place_card_calldata.append(1); // card_id.low
    place_card_calldata.append(0); // card_id.high
    place_card_calldata.append(1); // Roles::Defender
    let player = get!(world, (game_id, player1), Player);

    assert(player.remaining_energy == 1, 'energy should be 1');
    world.execute('place_card_system', place_card_calldata);
    let player = get!(world, (game_id, player1), Player);

    assert(player.remaining_energy == 0, 'energy should be 0');

    match player.defender {
        Option::Some(placement) => {
            match placement {
                Placement::Side(id) => assert(id == 1, 'Card id should be 1'),
                Placement::Field(_) => assert(false, 'Wrong Placement')
            }
        },
        Option::None => assert(false, 'Should be some'),
    }
}
#[test]
#[should_panic]
#[available_gas(30000000)]
fn test_place_card_overflow() {
    let world = spawn_world();
    let (player1, player2) = get_players();
    let game_id = create_game(:world, :player1, :player2);
    let card = Card {
        token_id: 1,
        dribble: 1,
        current_dribble: 1,
        defense: 2,
        current_defense: 2,
        cost: 2,
        role: Roles::Goalkeeper,
        is_captain: false
    };
    set!(world, (card));
    set_caller_address(player1);
    let mut place_card_calldata: Array = Default::default();
    place_card_calldata.append(game_id);
    place_card_calldata.append(1); // card_id.low
    place_card_calldata.append(0); // card_id.high
    place_card_calldata.append(1); // Roles::Defender
    let player = get!(world, (game_id, player1), Player);

    assert(player.remaining_energy == 1, 'energy should be 1');
    world.execute('place_card_system', place_card_calldata);
}

#[test]
#[available_gas(30000000)]
fn test_place_card_on_its_role() {
    let world = spawn_world();
    let (player1, player2) = get_players();
    let game_id = create_game(:world, :player1, :player2);
    let card = Card {
        token_id: 1,
        dribble: 1,
        current_dribble: 1,
        defense: 2,
        current_defense: 2,
        cost: 1,
        role: Roles::Attacker,
        is_captain: false
    };
    set!(world, (card));
    set_caller_address(player1);
    let mut place_card_calldata: Array = Default::default();
    place_card_calldata.append(game_id);
    place_card_calldata.append(1); // card_id.low
    place_card_calldata.append(0); // card_id.high
    place_card_calldata.append(3); // Roles::Attacker

    assert(card.current_dribble == 1, 'current_dribble should be 1');
    assert(card.current_defense == 2, 'current_defense should be 2');

    world.execute('place_card_system', place_card_calldata);

    let card = get!(world, (1, 0), Card);
    assert(card.current_dribble == 2, 'current_dribble should be 2');
    assert(card.current_defense == 3, 'current_defense should be 3');
}

#[test]
#[available_gas(30000000)]
fn test_place_card_not_on_its_role() {
    let world = spawn_world();
    let (player1, player2) = get_players();
    let game_id = create_game(:world, :player1, :player2);
    let card = Card {
        token_id: 1,
        dribble: 1,
        current_dribble: 1,
        defense: 2,
        current_defense: 2,
        cost: 1,
        role: Roles::Attacker,
        is_captain: false
    };
    set!(world, (card));
    set_caller_address(player1);
    let mut place_card_calldata: Array = Default::default();
    place_card_calldata.append(game_id);
    place_card_calldata.append(1); // card_id.low
    place_card_calldata.append(0); // card_id.high
    place_card_calldata.append(0); // Roles::Goalkeeper

    assert(card.current_dribble == 1, 'current_dribble should be 1');
    assert(card.current_defense == 2, 'current_defense should be 2');

    world.execute('place_card_system', place_card_calldata);

    let card = get!(world, (1, 0), Card);
    assert(card.current_dribble == 1, 'current_dribble should be 1');
    assert(card.current_defense == 2, 'current_defense should be 2');
}

#[test]
#[available_gas(30000000)]
fn test_place_card_is_not_captain() {
    let world = spawn_world();
    let (player1, player2) = get_players();
    let game_id = create_game(:world, :player1, :player2);
    let card = Card {
        token_id: 1,
        dribble: 1,
        current_dribble: 1,
        defense: 2,
        current_defense: 2,
        cost: 1,
        role: Roles::Attacker,
        is_captain: false
    };
    set!(world, (card));
    set_caller_address(player1);
    let mut place_card_calldata: Array = Default::default();
    place_card_calldata.append(game_id);
    place_card_calldata.append(1); // card_id.low
    place_card_calldata.append(0); // card_id.high
    place_card_calldata.append(0); // Roles::Goalkeeper

    assert(card.current_dribble == 1, 'current_dribble should be 1');
    assert(card.current_defense == 2, 'current_defense should be 2');

    world.execute('place_card_system', place_card_calldata);

    let card = get!(world, (1, 0), Card);
    assert(card.current_dribble == 1, 'current_dribble should be 1');
    assert(card.current_defense == 2, 'current_defense should be 2');
}

#[test]
#[available_gas(30000000)]
fn test_place_card_is_captain() {
    let world = spawn_world();
    let (player1, player2) = get_players();
    let game_id = create_game(:world, :player1, :player2);
    let card = Card {
        token_id: 1,
        dribble: 1,
        current_dribble: 1,
        defense: 2,
        current_defense: 2,
        cost: 1,
        role: Roles::Attacker,
        is_captain: true
    };
    set!(world, (card));
    set_caller_address(player1);
    let mut place_card_calldata: Array = Default::default();
    place_card_calldata.append(game_id);
    place_card_calldata.append(1); // card_id.low
    place_card_calldata.append(0); // card_id.high
    place_card_calldata.append(0); // Roles::Goalkeeper

    assert(card.current_dribble == 1, 'current_dribble should be 1');
    assert(card.current_defense == 2, 'current_defense should be 2');

    world.execute('place_card_system', place_card_calldata);

    let card = get!(world, (1, 0), Card);
    assert(card.current_dribble == 2, 'current_dribble should be 2');
    assert(card.current_defense == 3, 'current_defense should be 3');
}
