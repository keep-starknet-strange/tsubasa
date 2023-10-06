use dojo::world::IWorldDispatcherTrait;
use starknet::testing::set_contract_address;
use option::OptionTrait;
use debug::PrintTrait;
use array::ArrayTrait;
use tsubasa::models::{Game, Card, Player, Roles, OutcomePrint, Placement};
use tsubasa::tests::utils::{create_game, get_players, spawn_world, count_cards_in_hand};
use serde::Serde;
use starknet::ContractAddress;
use traits::Into;
use tsubasa::systems::{
    IAttackDispatcher, IAttackDispatcherTrait, ICreateCardDispatcher, ICreateCardDispatcherTrait,
    IEndTurnDispatcher, IEndTurnDispatcherTrait, IPlaceCardDispatcher, IPlaceCardDispatcherTrait
};

#[test]
#[available_gas(3000000000)]
fn test_attack_player1_scores_against_empty_board() {
    let world = spawn_world();
    let (player1, player2, _) = get_players();
    let game_id = create_game(world, player1, player2);
    set_contract_address(player1);

    let create_card_system_1 = ICreateCardDispatcher { contract_address: player1 };
    let place_card_system_1 = IPlaceCardDispatcher { contract_address: player1 };
    let end_turn_system_1 = IEndTurnDispatcher { contract_address: player1 };
    let end_turn_system_2 = IEndTurnDispatcher { contract_address: player2 };
    let attack_system_1 = IAttackDispatcher { contract_address: player1 };
    // Token_id, Dribble, Defense, Cost, Role, is captain

    create_card_system_1.create_card(world, 0, 0, 22, 17, Roles::Attacker, true);

    // Player 1 plays
    // Card number in the deck, Roles::Defender
    place_card_system_1.place_card(world, game_id, 0, Roles::Defender);
    end_turn_system_1.end_turn(world, game_id);
    assert(count_cards_in_hand(world, player2) == 1, 'Wrong nb of cards drawn player2');
    assert(count_cards_in_hand(world, player1) == 0, 'Wrong nb of cards drawn player1');

    // Player 2 skips his turn
    set_contract_address(player2);
    end_turn_system_2.end_turn(world, game_id);
    assert(count_cards_in_hand(world, player2) == 1, 'Wrong nb of cards drawn player2');
    assert(count_cards_in_hand(world, player1) == 1, 'Wrong nb of cards drawn player1');
    // Player 1 attacks and should win against empty board

    set_contract_address(player1);

    attack_system_1.attack(world, game_id);
    end_turn_system_1.end_turn(world, game_id);
    assert(count_cards_in_hand(world, player2) == 2, 'Wrong nb of cards drawn player2');
    assert(count_cards_in_hand(world, player1) == 1, 'Wrong nb of cards drawn player1');
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
    let create_card_system_1 = ICreateCardDispatcher { contract_address: player1 };
    let place_card_system_1 = IPlaceCardDispatcher { contract_address: player1 };
    let end_turn_system_1 = IEndTurnDispatcher { contract_address: player1 };
    let attack_system_1 = IAttackDispatcher { contract_address: player1 };

    let place_card_system_2 = IPlaceCardDispatcher { contract_address: player2 };
    let end_turn_system_2 = IEndTurnDispatcher { contract_address: player2 };
    let attack_system_2 = IAttackDispatcher { contract_address: player2 };

    // Card for player 1
    // Token_id, Dribble, Defense, Cost, Role, is captain
    create_card_system_1.create_card(world, 0, 0, 45, 5, Roles::Defender, false);

    // Card for player 2
    create_card_system_1.create_card(world, 1, 0, 1, 2, Roles::Midfielder, false);

    // Player 1 plays
    // Card number in the deck, Roles::Defender
    place_card_system_1.place_card(world, game_id, 0, Roles::Defender);
    end_turn_system_1.end_turn(world, game_id);
    assert(count_cards_in_hand(world, player2) == 1, 'Wrong nb of cards drawn player2');
    assert(count_cards_in_hand(world, player1) == 0, 'Wrong nb of cards drawn player1');

    // Player 2 plays
    set_contract_address(player2);
    place_card_system_2.place_card(world, game_id, 0, Roles::Midfielder);
    end_turn_system_2.end_turn(world, game_id);
    assert(count_cards_in_hand(world, player2) == 1, 'Wrong nb of cards drawn player2');
    assert(count_cards_in_hand(world, player1) == 1, 'Wrong nb of cards drawn player1');

    // Player 1 attacks
    set_contract_address(player1);
    attack_system_1.attack(world, game_id);
    end_turn_system_1.end_turn(world, game_id);
    assert(count_cards_in_hand(world, player2) == 2, 'Wrong nb of cards drawn player2');
    assert(count_cards_in_hand(world, player1) == 1, 'Wrong nb of cards drawn player1');

    let game = get!(world, game_id, Game);
    assert(game.player1_score == 0, 'Player 1 passes midfielder');
    assert(game.player2_score == 0, 'Player 2 never attacked');

    let player1_board = get!(world, (game_id, player1), Player);
    assert(player1_board.goalkeeper_placement == Placement::Outside, 'Goalkeeper should be empty');
    assert(player1_board.defender_placement == Placement::Field, 'Defender should not be empty');
    assert(
        player1_board.midfielder_placement == Placement::Outside, 'Midfielder 1 should be empty'
    );
    assert(player1_board.attacker_placement == Placement::Outside, 'Attacker should be empty');

    let player2_board = get!(world, (game_id, player2), Player);
    assert(player2_board.goalkeeper_placement == Placement::Outside, 'Goalkeeper should be empty');
    assert(player2_board.defender_placement == Placement::Outside, 'Defender should be empty');
    assert(player2_board.midfielder_placement == Placement::Outside, 'Midfielder should be empty');
    assert(player2_board.attacker_placement == Placement::Outside, 'Attacker should be empty');

    let card = get!(world, (0, 0), Card);
    assert(card.token_id == 0, 'Wrong token id');
    assert(card.dribble == 45, 'Wrong dribble');
    assert(card.current_dribble == 45, 'Wrong current dribble');
    assert(card.defense == 5, 'Wrong defense');
    assert(card.current_defense == 3, 'Wrong current defense');
    assert(card.cost == 1, 'Wrong cost');
    assert(card.role == Roles::Attacker, 'Wrong role');
}

#[test]
#[available_gas(3000000000)]
fn test_attack_player1_goalkeeper_gets_passed_enemy_defender() {
    let world = spawn_world();
    let (player1, player2, _) = get_players();
    let game_id = create_game(world, player1, player2);
    set_contract_address(player1);
    let create_card_system_1 = ICreateCardDispatcher { contract_address: player1 };
    let place_card_system_1 = IPlaceCardDispatcher { contract_address: player1 };
    let end_turn_system_1 = IEndTurnDispatcher { contract_address: player1 };
    let attack_system_1 = IAttackDispatcher { contract_address: player1 };

    let place_card_system_2 = IPlaceCardDispatcher { contract_address: player2 };
    let end_turn_system_2 = IEndTurnDispatcher { contract_address: player2 };

    // Card for player 1
    // Token_id, Dribble, Defense, Cost, Role, is captain
    create_card_system_1.create_card(world, 0, 0, 2, 1, Roles::Defender, false);
    // Card for player 2
    create_card_system_1.create_card(world, 1, 0, 1, 2, Roles::Goalkeeper, false);

    // Player 1 plays
    // Card number in the deck, Roles::Goalkeeper
    place_card_system_1.place_card(world, game_id, 0, Roles::Goalkeeper);
    end_turn_system_1.end_turn(world, game_id);
    assert(count_cards_in_hand(world, player2) == 1, 'Wrong nb of cards drawn player2');
    assert(count_cards_in_hand(world, player1) == 0, 'Wrong nb of cards drawn player1');

    // Player 2 plays
    set_contract_address(player2);
    place_card_system_2.place_card(world, game_id, 0, Roles::Defender);
    end_turn_system_2.end_turn(world, game_id);
    assert(count_cards_in_hand(world, player2) == 1, 'Wrong nb of cards drawn player2');
    assert(count_cards_in_hand(world, player1) == 1, 'Wrong nb of cards drawn player1');

    // Player 1 attacks
    set_contract_address(player1);
    attack_system_1.attack(world, game_id);
    end_turn_system_1.end_turn(world, game_id);
    assert(count_cards_in_hand(world, player2) == 2, 'Wrong nb of cards drawn player2');
    assert(count_cards_in_hand(world, player1) == 1, 'Wrong nb of cards drawn player1');

    let game = get!(world, game_id, Game);
    assert(game.player1_score == 0, 'Player 1 passes midfielder');
    assert(game.player2_score == 0, 'Player 2 never attacked');

    let player1_board = get!(world, (game_id, player1), Player);
    assert(
        player1_board.goalkeeper_placement == Placement::Outside, 'Goalkeeper 1 should be empty'
    );
    assert(player1_board.defender_placement == Placement::Outside, 'Defender 1 should be empty');
    assert(
        player1_board.midfielder_placement == Placement::Outside, 'Midfielder 1 should be empty'
    );
    assert(player1_board.attacker_placement == Placement::Outside, 'Attacker 1 should be empty');

    let player2_board = get!(world, (game_id, player2), Player);
    assert(
        player2_board.goalkeeper_placement == Placement::Outside, 'Goalkeeper 2 should be empty'
    );
    assert(player2_board.defender_placement == Placement::Field, 'Defender 2 shouldnt be empty');
    assert(
        player2_board.midfielder_placement == Placement::Outside, 'Midfielder 2 should be empty'
    );
    assert(player2_board.attacker_placement == Placement::Outside, 'Attacker 2 should be empty');

    let card = get!(world, (1, 0), Card);
    assert(card.token_id == 1, 'Wrong token id');
    assert(card.dribble == 45, 'Wrong dribble');
    assert(card.current_dribble == 45, 'Wrong current dribble');
    assert(card.defense == 5, 'Wrong defense');
    assert(card.current_defense == 3, 'Wrong current defense');
    assert(card.cost == 1, 'Wrong cost');
    assert(card.role == Roles::Midfielder, 'Wrong role');
}

#[test]
#[available_gas(3000000000)]
fn test_attack_player1_goalkeeper_vs_goalkeeper_both_survive_then_both_get_passed() {
    let world = spawn_world();
    let (player1, player2, _) = get_players();
    let game_id = create_game(world, player1, player2);
    set_contract_address(player1);
    let create_card_system_1 = ICreateCardDispatcher { contract_address: player1 };
    let place_card_system_1 = IPlaceCardDispatcher { contract_address: player1 };
    let end_turn_system_1 = IEndTurnDispatcher { contract_address: player1 };
    let attack_system_1 = IAttackDispatcher { contract_address: player1 };

    let place_card_system_2 = IPlaceCardDispatcher { contract_address: player2 };
    let end_turn_system_2 = IEndTurnDispatcher { contract_address: player2 };
    let attack_system_2 = IAttackDispatcher { contract_address: player2 };
    // Card for player 1
    // Token_id, Dribble, Defense, Cost, Role, is captain
    create_card_system_1.create_card(world, 1, 0, 1, 2, Roles::Goalkeeper, false);
    // Card for player 2
    create_card_system_1.create_card(world, 0, 0, 1, 2, Roles::Goalkeeper, false);

    // Player 1 plays
    // Card number in the deck, Roles::Goalkeeper
    place_card_system_1.place_card(world, game_id, 0, Roles::Goalkeeper);
    end_turn_system_1.end_turn(world, game_id);
    assert(count_cards_in_hand(world, player2) == 1, 'Wrong nb of cards drawn player2');
    assert(count_cards_in_hand(world, player1) == 0, 'Wrong nb of cards drawn player1');

    // Player 2 plays
    set_contract_address(player2);
    place_card_system_2.place_card(world, game_id, 0, Roles::Goalkeeper);
    end_turn_system_2.end_turn(world, game_id);
    assert(count_cards_in_hand(world, player2) == 1, 'Wrong nb of cards drawn player2');
    assert(count_cards_in_hand(world, player1) == 1, 'Wrong nb of cards drawn player1');

    // Player 1 attacks
    set_contract_address(player1);
    attack_system_1.attack(world, game_id);
    end_turn_system_1.end_turn(world, game_id);
    assert(count_cards_in_hand(world, player2) == 2, 'Wrong nb of cards drawn player2');
    assert(count_cards_in_hand(world, player1) == 1, 'Wrong nb of cards drawn player1');

    let player1_board = get!(world, (game_id, player1), Player);
    assert(
        player1_board.goalkeeper_placement == Placement::Field, 'Goalkeeper 1 shouldnt be empty'
    );
    assert(player1_board.defender_placement == Placement::Outside, 'Defender 1 should be empty');
    assert(
        player1_board.midfielder_placement == Placement::Outside, 'Midfielder 1 should be empty'
    );
    assert(player1_board.attacker_placement == Placement::Outside, 'Attacker 1 should be empty');
    let player2_board = get!(world, (game_id, player2), Player);
    assert(
        player2_board.goalkeeper_placement == Placement::Field, 'Goalkeeper 2 shouldnt be empty'
    );
    assert(player2_board.defender_placement == Placement::Outside, 'Defender 2 should be empty');
    assert(
        player2_board.midfielder_placement == Placement::Outside, 'Midfielder 2 should be empty'
    );
    assert(player2_board.attacker_placement == Placement::Outside, 'Attacker 2 should be empty');
    let card = get!(world, (0, 0), Card);
    assert(card.current_dribble == 1, 'Wrong current dribble 1');
    assert(card.current_defense == 1, 'Wrong current defense 1');
    let card = get!(world, (1, 0), Card);
    assert(card.current_dribble == 1, 'Wrong current dribble 2');
    assert(card.current_defense == 1, 'Wrong current defense 2');
    // Player 2 attacks
    set_contract_address(player2);
    let attack_calldata = array![game_id];
    attack_system_2.attack(world, game_id);
    end_turn_system_2.end_turn(world, game_id);
    assert(count_cards_in_hand(world, player2) == 2, 'Wrong nb of cards drawn player2');
    assert(count_cards_in_hand(world, player1) == 2, 'Wrong nb of cards drawn player1');
    let player1_board = get!(world, (game_id, player1), Player);
    assert(
        player1_board.goalkeeper_placement == Placement::Outside, 'Goalkeeper 1 should be empty'
    );
    assert(player1_board.defender_placement == Placement::Outside, 'Defender 1 should be empty');
    assert(
        player1_board.midfielder_placement == Placement::Outside, 'Midfielder 1 should be empty'
    );
    assert(player1_board.attacker_placement == Placement::Outside, 'Attacker 1 should be empty');

    let player2_board = get!(world, (game_id, player2), Player);
    assert(
        player2_board.goalkeeper_placement == Placement::Outside, 'Goalkeeper 2 should be empty'
    );
    assert(player2_board.defender_placement == Placement::Outside, 'Defender 2 should be empty');
    assert(
        player2_board.midfielder_placement == Placement::Outside, 'Midfielder 2 should be empty'
    );
    assert(player2_board.attacker_placement == Placement::Outside, 'Attacker 2 should be empty');

    let game = get!(world, game_id, Game);
    assert(game.player1_score == 0, 'Player 1 passes midfielder');
    assert(game.player2_score == 0, 'Player 2 never attacked');
}

#[test]
#[available_gas(3000000000)]
fn test_attack_player2_full_board_all_die_in_2_turns() {
    let world = spawn_world();
    let (player1, player2, _) = get_players();
    let game_id = create_game(world, player1, player2);
    set_contract_address(player1);
    let create_card_system_1 = ICreateCardDispatcher { contract_address: player1 };
    let place_card_system_1 = IPlaceCardDispatcher { contract_address: player1 };
    let end_turn_system_1 = IEndTurnDispatcher { contract_address: player1 };
    let attack_system_1 = IAttackDispatcher { contract_address: player1 };

    let place_card_system_2 = IPlaceCardDispatcher { contract_address: player2 };
    let end_turn_system_2 = IEndTurnDispatcher { contract_address: player2 };
    let attack_system_2 = IAttackDispatcher { contract_address: player2 };
    // Card for player 1
    // Token_id, Dribble, Defense, Cost, Role, is captain
    create_card_system_1.create_card(world, 1, 0, 1, 2, Roles::Goalkeeper, false);
    create_card_system_1.create_card(world, 3, 0, 1, 2, Roles::Goalkeeper, false);
    create_card_system_1.create_card(world, 5, 0, 1, 2, Roles::Goalkeeper, false);
    create_card_system_1.create_card(world, 7, 0, 1, 2, Roles::Goalkeeper, false);

    // Card for player 2
    create_card_system_1.create_card(world, 0, 0, 1, 2, Roles::Goalkeeper, false);
    create_card_system_1.create_card(world, 2, 0, 1, 2, Roles::Goalkeeper, false);
    create_card_system_1.create_card(world, 4, 0, 1, 2, Roles::Goalkeeper, false);
    create_card_system_1.create_card(world, 6, 0, 1, 2, Roles::Goalkeeper, false);

    // Player 1 plays
    // Card number in the deck, Roles::Goalkeeper
    place_card_system_1.place_card(world, game_id, 0, Roles::Goalkeeper);
    place_card_system_1.place_card(world, game_id, 1, Roles::Goalkeeper);
    place_card_system_1.place_card(world, game_id, 2, Roles::Goalkeeper);
    place_card_system_1.place_card(world, game_id, 3, Roles::Goalkeeper);
    end_turn_system_1.end_turn(world, game_id);
    assert(count_cards_in_hand(world, player2) == 1, 'Wrong nb of cards drawn player2');
    assert(count_cards_in_hand(world, player1) == 0, 'Wrong nb of cards drawn player1');

    // Player 2 plays
    set_contract_address(player2);
    place_card_system_2.place_card(world, game_id, 0, Roles::Goalkeeper);
    place_card_system_2.place_card(world, game_id, 1, Roles::Goalkeeper);
    place_card_system_2.place_card(world, game_id, 2, Roles::Goalkeeper);
    place_card_system_2.place_card(world, game_id, 3, Roles::Goalkeeper);
    end_turn_system_2.end_turn(world, game_id);
    assert(count_cards_in_hand(world, player2) == 1, 'Wrong nb of cards drawn player2');
    assert(count_cards_in_hand(world, player1) == 1, 'Wrong nb of cards drawn player1');

    // Player 1 attacks
    set_contract_address(player1);
    let attack_calldata = array![game_id];
    attack_system_1.attack(world, game_id);
    end_turn_system_1.end_turn(world, game_id);
    assert(count_cards_in_hand(world, player2) == 2, 'Wrong nb of cards drawn player2');
    assert(count_cards_in_hand(world, player1) == 1, 'Wrong nb of cards drawn player1');

    let player1_board = get!(world, (game_id, player1), Player);
    assert(
        player1_board.goalkeeper_placement == Placement::Field, 'Goalkeeper 1 shouldnt be empty'
    );
    assert(player1_board.defender_placement == Placement::Field, 'Defender 1 shouldnt be empty');
    assert(
        player1_board.midfielder_placement == Placement::Field, 'Midfielder 1 shouldnt be empty'
    );
    assert(player1_board.attacker_placement == Placement::Field, 'Attacker 1 shouldnt be empty');
    let player2_board = get!(world, (game_id, player2), Player);
    assert(
        player2_board.goalkeeper_placement == Placement::Field, 'Goalkeeper 2 shouldnt be empty'
    );
    assert(player2_board.defender_placement == Placement::Field, 'Defender 2 shouldnt be empty');
    assert(
        player2_board.midfielder_placement == Placement::Field, 'Midfielder 2 shouldnt be empty'
    );
    assert(player2_board.attacker_placement == Placement::Field, 'Attacker 2 shouldnt be empty');
    // Player 2 attacks
    set_contract_address(player2);
    attack_system_2.attack(world, game_id);
    end_turn_system_2.end_turn(world, game_id);
    assert(count_cards_in_hand(world, player2) == 2, 'Wrong nb of cards drawn player2');
    assert(count_cards_in_hand(world, player1) == 2, 'Wrong nb of cards drawn player1');

    let player1_board = get!(world, (game_id, player1), Player);
    assert(
        player1_board.goalkeeper_placement == Placement::Outside, 'Goalkeeper 1 should be empty'
    );
    assert(player1_board.defender_placement == Placement::Outside, 'Defender 1 should be empty');
    assert(
        player1_board.midfielder_placement == Placement::Outside, 'Midfielder 1 should be empty'
    );
    assert(player1_board.attacker_placement == Placement::Outside, 'Attacker 1 should be empty');

    let player2_board = get!(world, (game_id, player2), Player);

    assert(
        player2_board.goalkeeper_placement == Placement::Outside, 'Goalkeeper 2 should be empty'
    );
    assert(player2_board.defender_placement == Placement::Outside, 'Defender 2 should be empty');
    assert(
        player2_board.midfielder_placement == Placement::Outside, 'Midfielder 2 should be empty'
    );
    assert(player2_board.attacker_placement == Placement::Outside, 'Attacker 2 should be empty');

    let game = get!(world, game_id, Game);
    assert(game.player1_score == 0, 'Player 1 passes midfielder');
    assert(game.player2_score == 0, 'Player 2 never attacked');
}

