use dojo::world::IWorldDispatcherTrait;
use starknet::testing::set_contract_address;
use option::OptionTrait;
use debug::PrintTrait;
use tsubasa::components::{Game, Card, Player, Roles, OutcomePrint};
use tsubasa::tests::utils::{create_game, get_players, spawn_world};


#[test]
#[available_gas(3000000000)]
fn test_attack_player1_scores_against_empty_board() {
    let world = spawn_world();
    let (player1, player2, _) = get_players();
    let game_id = create_game(world, player1, player2);
    set_contract_address(player1);
    // Token_id, Dribble, Defense, Cost, Role, is captain
    let create_card_calldata = array![0, 0, 22, 17, 1, 3, 1];
    world.execute('create_card_system', create_card_calldata);
    // Player 1 plays
    // 0_u256.low, 0_u256.high, Roles::Defender
    let place_card_calldata = array![game_id, 0, 0, 1];
    world.execute('place_card_system', place_card_calldata);
    world.execute('end_turn_system', array![game_id]);

    // Player 2 skips his turn
    set_contract_address(player2);
    world.execute('end_turn_system', array![game_id]);
    // Player 1 attacks and should win against empty board
    let attack_calldata = array![game_id];
    set_contract_address(player1);
    world.execute('attack_system', attack_calldata);
    world.execute('end_turn_system', array![game_id]);
    let game = get!(world, game_id, Game);
    assert(game.player1_score == 1, 'Player 1 wins vs empty board');
}
#[test]
#[available_gas(3000000000)]
fn test_attack_player1_defender_passes_enemy_midfielder() {
    let world = spawn_world();
    let (player1, player2, _) = get_players();
    let game_id = create_game(world, player1, player2);
    set_contract_address(player1);
    // Card for player 1
    // Token_id, Dribble, Defense, Cost, Role, is captain
    let create_card_calldata = array![0, 0, 45, 5, 1, 3, 0];
    world.execute('create_card_system', create_card_calldata);

    // Card for player 2
    let create_card_calldata = array![1, 0, 2, 1, 1, 3, 0];
    world.execute('create_card_system', create_card_calldata);

    // Player 1 plays
    // 0_u256.low, 0_u256.high, Roles::Defender
    let place_card_calldata = array![game_id, 0, 0, 1];
    world.execute('place_card_system', place_card_calldata);
    world.execute('end_turn_system', array![game_id]);

    // Player 2 plays
    set_contract_address(player2);
    let place_card_calldata = array![game_id, 1, 0, 2];
    world.execute('place_card_system', place_card_calldata);
    world.execute('end_turn_system', array![game_id]);

    // Player 1 attacks
    set_contract_address(player1);
    let attack_calldata = array![game_id];
    world.execute('attack_system', attack_calldata);
    world.execute('end_turn_system', array![game_id]);

    let game = get!(world, game_id, Game);
    assert(game.player1_score == 0, 'Player 1 passes midfielder');
    assert(game.player2_score == 0, 'Player 2 never attacked');

    let player1_board = get!(world, (game_id, player1), Player);
    assert(player1_board.goalkeeper.is_none(), 'Goalkeeper should be empty');
    assert(player1_board.defender.is_some(), 'Defender should not be empty');
    assert(player1_board.midfielder.is_none(), 'Midfielder 1 should be empty');
    assert(player1_board.attacker.is_none(), 'Attacker should be empty');

    let player2_board = get!(world, (game_id, player2), Player);
    assert(player2_board.goalkeeper.is_none(), 'Goalkeeper should be empty');
    assert(player2_board.defender.is_none(), 'Defender should be empty');
    assert(player2_board.midfielder.is_none(), 'Midfielder should be empty');
    assert(player2_board.attacker.is_none(), 'Attacker should be empty');

    let card = get!(world, (0, 0), Card);
    assert(card.token_id == 0, 'Wrong token id');
    assert(card.dribble == 45, 'Wrong dribble');
    assert(card.current_dribble == 45, 'Wrong current dribble');
    assert(card.defense == 5, 'Wrong defense');
    assert(card.current_defense == 3, 'Wrong current defense');
    assert(card.cost == 1, 'Wrong cost');
    assert(card.role == Roles::Attacker, 'Wrong role');
    assert(!card.is_captain, 'Wrong captain');
}


#[test]
#[available_gas(3000000000)]
fn test_attack_player1_goalkeeper_gets_passed_enemy_defender() {
    let world = spawn_world();
    let (player1, player2, _) = get_players();
    let game_id = create_game(world, player1, player2);
    set_contract_address(player1);
    // Card for player 1
    // Token_id, Dribble, Defense, Cost, Role, is captain
    let create_card_calldata = array![0, 0, 2, 1, 1, 1, 0];
    world.execute('create_card_system', create_card_calldata);

    // Card for player 2
    let create_card_calldata = array![1, 0, 45, 5, 1, 2, 0];
    world.execute('create_card_system', create_card_calldata);

    // Player 1 plays
    // 0_u256.low, 0_u256.high, Roles::Goalkeeper
    let place_card_calldata = array![game_id, 0, 0, 0];
    world.execute('place_card_system', place_card_calldata);
    world.execute('end_turn_system', array![game_id]);

    // Player 2 plays
    set_contract_address(player2);
    let place_card_calldata = array![game_id, 1, 0, 1];
    world.execute('place_card_system', place_card_calldata);
    world.execute('end_turn_system', array![game_id]);

    // Player 1 attacks
    set_contract_address(player1);
    let attack_calldata = array![game_id];
    world.execute('attack_system', attack_calldata);
    world.execute('end_turn_system', array![game_id]);

    let game = get!(world, game_id, Game);
    assert(game.player1_score == 0, 'Player 1 passes midfielder');
    assert(game.player2_score == 0, 'Player 2 never attacked');

    let player1_board = get!(world, (game_id, player1), Player);
    assert(player1_board.goalkeeper.is_none(), 'Goalkeeper 1 should be empty');
    assert(player1_board.defender.is_none(), 'Defender 1 should be empty');
    assert(player1_board.midfielder.is_none(), 'Midfielder 1 should be empty');
    assert(player1_board.attacker.is_none(), 'Attacker 1 should be empty');

    let player2_board = get!(world, (game_id, player2), Player);
    assert(player2_board.goalkeeper.is_none(), 'Goalkeeper 2 should be empty');
    assert(player2_board.defender.is_some(), 'Defender 2 should be empty');
    assert(player2_board.midfielder.is_none(), 'Midfielder 2 should be empty');
    assert(player2_board.attacker.is_none(), 'Attacker 2 should be empty');

    let card = get!(world, (1, 0), Card);
    assert(card.token_id == 1, 'Wrong token id');
    assert(card.dribble == 45, 'Wrong dribble');
    assert(card.current_dribble == 45, 'Wrong current dribble');
    assert(card.defense == 5, 'Wrong defense');
    assert(card.current_defense == 3, 'Wrong current defense');
    assert(card.cost == 1, 'Wrong cost');
    assert(card.role == Roles::Midfielder, 'Wrong role');
    assert(!card.is_captain, 'Wrong captain');
}

