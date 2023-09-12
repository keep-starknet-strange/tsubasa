use array::ArrayTrait;
use option::{Option, OptionTrait};
use serde::Serde;
use starknet::ContractAddress;
use starknet::testing::set_contract_address;
use dojo::world::IWorldDispatcherTrait;
use clone::Clone;
use debug::PrintTrait;
use tsubasa::components::{Game, Player, Outcome, Card, Roles, Placement};
use tsubasa::systems::{create_game_system, attack_system, end_turn_system, place_card_system};
use tsubasa::tests::utils::{get_players, create_game, spawn_world, count_cards_in_hand};

#[test]
#[available_gas(300000000)]
fn test_end_turn_unique() {
    let world = spawn_world();
    let (player1, player2, _) = get_players();
    let game_id = create_game(:world, :player1, :player2);
    // Card number in the deck, Roles::Goalkeeper
    let mut place_card_calldata = array![game_id, 0, 0];
    world.execute('place_card_system', place_card_calldata);

    let mut attack_calldata = array![game_id];
    world.execute('attack_system', attack_calldata);

    let end_turn_calldata = array![game_id];
    world.execute('end_turn_system', end_turn_calldata);
    assert(count_cards_in_hand(world, player2) == 1, 'Wrong nb of cards drawn player2');
    assert(count_cards_in_hand(world, player1) == 0, 'Wrong nb of cards drawn player1');

    let game = get!(world, game_id, Game);

    let expected_game = Game {
        game_id,
        player1,
        player2,
        player1_score: 0,
        player2_score: 0,
        turn: 1,
        outcome: Option::None
    };

    assert(game.game_id == expected_game.game_id, 'invalid game_id');
    assert(game.player1_score == expected_game.player1_score, 'Wrong player1 score');
    assert(game.player2_score == expected_game.player2_score, 'Wrong player2 score');
    assert(game.turn == expected_game.turn, 'Wrong turn value');
    // Check that option is None
    assert(game.outcome.is_none(), 'Wrong outcome value');
    assert(count_cards_in_hand(world, player2) == 1, 'Wrong nb of cards drawn player2');
    assert(count_cards_in_hand(world, player1) == 0, 'Wrong nb of cards drawn player1');
    let player = get!(world, (game_id, player1), Player);
    // Check that player energy is correclty incremented at the end of each turn.
    assert(player.remaining_energy == 2, 'Wrong player energy value');
}

#[test]
#[available_gas(300000000)]
fn test_end_game() {
    let world = spawn_world();
    let (player1, player2, _) = get_players();
    let game_id = create_game(:world, :player1, :player2);
    // Token_id, Dribble, Defense, Cost, Role
    let create_card_calldata = array![0, 0, 22, 17, 0, 1, 0];
    world.execute('create_card_system', create_card_calldata);

    // Card number in the deck, Roles::Goalkeeper
    let place_card_calldata = array![game_id, 0, 0];
    world.execute('place_card_system', place_card_calldata);

    let end_turn_calldata = array![game_id];
    world.execute('end_turn_system', end_turn_calldata);
    assert(count_cards_in_hand(world, player2) == 1, 'Wrong nb of cards drawn player2');
    assert(count_cards_in_hand(world, player1) == 0, 'Wrong nb of cards drawn player1');
    set_contract_address(player2);

    let end_turn_calldata = array![game_id];
    world.execute('end_turn_system', end_turn_calldata);
    assert(count_cards_in_hand(world, player2) == 1, 'Wrong nb of cards drawn player2');
    assert(count_cards_in_hand(world, player2) == 1, 'Wrong nb of cards drawn player1');

    set_contract_address(player1);
    let mut attack_calldata = array![game_id];
    world.execute('attack_system', attack_calldata);
    let mut attack_calldata_again = array![game_id];
    world.execute('attack_system', attack_calldata_again);

    let end_turn_calldata = array![game_id];
    world.execute('end_turn_system', end_turn_calldata);
    assert(count_cards_in_hand(world, player2) == 2, 'Wrong nb of cards drawn player2');
    assert(count_cards_in_hand(world, player1) == 1, 'Wrong nb of cards drawn player1');

    let mut game = get!(world, game_id, Game);

    let expected_game = Game {
        game_id,
        player1,
        player2,
        player1_score: 2,
        player2_score: 0,
        turn: 3,
        outcome: Option::Some(Outcome::Player2(player2)),
    };

    assert(game.game_id == expected_game.game_id, 'invalid game_id');
    assert(game.player1_score == expected_game.player1_score, 'Wrong player1 score');
    assert(game.player2_score == expected_game.player2_score, 'Wrong player2 score');
    assert(game.turn == expected_game.turn, 'Wrong turn value');

    // Check that option is Some
    assert(game.outcome.is_some(), 'Wrong outcome value');
    let outcome = game.outcome.unwrap();
    assert(outcome == Outcome::Player1(player1), 'Wrong winner');

    let player = get!(world, (game_id, player1), Player);
    // Check that player energy is correclty incremented at the end of each turn.
    assert(player.remaining_energy == 3, 'Wrong player energy value');
}

#[test]
#[should_panic]
#[available_gas(30000000)]
fn test_end_turn_wrong_player() {
    let world = spawn_world();
    let (player1, player2, _) = get_players();
    let game_id = create_game(:world, :player1, :player2);
    set_contract_address(player2);
    let end_turn_calldata = array![game_id];
    world.execute('end_turn_system', end_turn_calldata);
}

#[test]
#[should_panic]
#[available_gas(30000000)]
fn test_end_turn_right_player_then_wrong_player() {
    let world = spawn_world();
    let (player1, player2, _) = get_players();
    let game_id = create_game(:world, :player1, :player2);
    set_contract_address(player1);
    let end_turn_calldata = array![game_id];
    world.execute('end_turn_system', (@end_turn_calldata).clone());
    assert(count_cards_in_hand(world, player2) == 1, 'Wrong nb of cards drawn player2');
    assert(count_cards_in_hand(world, player1) == 0, 'Wrong nb of cards drawn player1');
    world.execute('end_turn_system', end_turn_calldata);
}

#[test]
#[available_gas(300000000)]
fn test_end_turn_right_players_twice() {
    let world = spawn_world();
    let (player1, player2, _) = get_players();
    let game_id = create_game(:world, :player1, :player2);
    set_contract_address(player1);
    let end_turn_calldata = array![game_id];
    world.execute('end_turn_system', (@end_turn_calldata).clone());
    assert(count_cards_in_hand(world, player2) == 1, 'Wrong nb of cards drawn player2');
    assert(count_cards_in_hand(world, player1) == 0, 'Wrong nb of cards drawn player1');
    set_contract_address(player2);
    world.execute('end_turn_system', (@end_turn_calldata).clone());
    assert(count_cards_in_hand(world, player2) == 1, 'Wrong nb of cards drawn player2');
    assert(count_cards_in_hand(world, player1) == 1, 'Wrong nb of cards drawn player1');
    set_contract_address(player1);
    world.execute('end_turn_system', (@end_turn_calldata).clone());
    assert(count_cards_in_hand(world, player2) == 2, 'Wrong nb of cards drawn player2');
    assert(count_cards_in_hand(world, player1) == 1, 'Wrong nb of cards drawn player1');
    set_contract_address(player2);
    world.execute('end_turn_system', end_turn_calldata);
    assert(count_cards_in_hand(world, player2) == 2, 'Wrong nb of cards drawn player2');
    assert(count_cards_in_hand(world, player1) == 2, 'Wrong nb of cards drawn player1');
}

#[test]
#[available_gas(300000000)]
fn test_end_turn_with_card_on_side() {
    let world = spawn_world();
    let (player1, player2, executor) = get_players();
    let game_id = create_game(:world, :player1, :player2);
    let card = Card {
        token_id: 2,
        dribble: 1,
        current_dribble: 1,
        defense: 2,
        current_defense: 2,
        cost: 1,
        role: Roles::Goalkeeper,
    };
    set_contract_address(executor);
    set!(world, (card));
    set_contract_address(player1);
    // Card number in the deck, Roles::Defender
    let place_card_calldata = array![game_id, 1, 1];
    world.execute('place_card_system', place_card_calldata);

    let player = get!(world, (game_id, player1), Player);
    match player.defender {
        Option::Some(placement) => {
            match placement {
                Placement::Side(id) => assert(id == 2, 'Token id should be 2'),
                Placement::Field(_) => panic_with_felt252('Wrong Placement'),
            }
        },
        Option::None => panic_with_felt252('Should be some'),
    }
    let end_turn_calldata: Array = array![game_id];
    world.execute('end_turn_system', (@end_turn_calldata).clone());
    assert(count_cards_in_hand(world, player2) == 1, 'Wrong nb of cards drawn player2');
    assert(count_cards_in_hand(world, player1) == 0, 'Wrong nb of cards drawn player1');

    let player = get!(world, (game_id, player1), Player);
    match player.defender {
        Option::Some(placement) => {
            match placement {
                Placement::Side(_) => panic_with_felt252('Wrong Placement'),
                Placement::Field(id) => assert(id == 2, 'Token id should be 2'),
            }
        },
        Option::None => panic_with_felt252('Should be some'),
    }
}
