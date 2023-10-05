use array::ArrayTrait;
use option::{Option, OptionTrait};
use serde::Serde;
use starknet::ContractAddress;
use starknet::testing::set_contract_address;
use dojo::world::IWorldDispatcherTrait;
use clone::Clone;
use debug::PrintTrait;
use tsubasa::models::{Game, Player, Outcome, Card, Roles, Placement};
use tsubasa::systems::{create_game_system, attack_system, end_turn_system, place_card_system};
use tsubasa::tests::utils::{get_players, create_game, spawn_world, count_cards_in_hand};
use tsubasa::systems::{
    IAttackDispatcher, IAttackDispatcherTrait, ICreateCardDispatcher, ICreateCardDispatcherTrait,
    IEndTurnDispatcher, IEndTurnDispatcherTrait, IPlaceCardDispatcher, IPlaceCardDispatcherTrait
};

#[test]
#[available_gas(300000000)]
fn test_end_turn() {
    let world = spawn_world();
    let (player1, player2, _) = get_players();
    let game_id = create_game(:world, :player1, :player2);
    let place_card_system_1 = IPlaceCardDispatcher { contract_address: player1 };
    let end_turn_system_1 = IEndTurnDispatcher { contract_address: player1 };
    let attack_system_1 = IAttackDispatcher { contract_address: player1 };
    // Card number in the deck, Roles::Goalkeeper

    place_card_system_1.place_card(world, game_id, 0, Roles::Goalkeeper);
    attack_system_1.attack(world, game_id);

    end_turn_system_1.end_turn(world, game_id);
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

    let create_card_system_1 = ICreateCardDispatcher { contract_address: player1 };
    let place_card_system_1 = IPlaceCardDispatcher { contract_address: player1 };
    let end_turn_system_1 = IEndTurnDispatcher { contract_address: player1 };
    let end_turn_system_2 = IEndTurnDispatcher { contract_address: player2 };
    let attack_system_1 = IAttackDispatcher { contract_address: player1 };

    // Token_id, Dribble, Defense, Cost, Role
    create_card_system_1.create_card(world, 0, 0, 22, 17, Roles::Goalkeeper, true);
    // Card number in the deck, Roles::Goalkeeper
    place_card_system_1.place_card(world, game_id, 0, Roles::Goalkeeper);

    end_turn_system_1.end_turn(world, game_id);
    assert(count_cards_in_hand(world, player2) == 1, 'Wrong nb of cards drawn player2');
    assert(count_cards_in_hand(world, player1) == 0, 'Wrong nb of cards drawn player1');
    set_contract_address(player2);

    end_turn_system_2.end_turn(world, game_id);
    assert(count_cards_in_hand(world, player2) == 1, 'Wrong nb of cards drawn player2');
    assert(count_cards_in_hand(world, player2) == 1, 'Wrong nb of cards drawn player1');

    set_contract_address(player1);
    attack_system_1.attack(world, game_id);
    attack_system_1.attack(world, game_id);

    end_turn_system_1.end_turn(world, game_id);
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
        outcome: Option::Some(Outcome::Player2),
    };

    assert(game.game_id == expected_game.game_id, 'invalid game_id');
    assert(game.player1_score == expected_game.player1_score, 'Wrong player1 score');
    assert(game.player2_score == expected_game.player2_score, 'Wrong player2 score');
    assert(game.turn == expected_game.turn, 'Wrong turn value');

    // Check that option is Some
    assert(game.outcome.is_some(), 'Wrong outcome value');
    let outcome = game.outcome.unwrap();
    assert(outcome == Outcome::Player1, 'Wrong winner');

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
    let end_turn_system_2 = IEndTurnDispatcher { contract_address: player2 };

    end_turn_system_2.end_turn(world, game_id);
}

#[test]
#[should_panic]
#[available_gas(30000000)]
fn test_end_turn_right_player_then_wrong_player() {
    let world = spawn_world();
    let (player1, player2, _) = get_players();
    let game_id = create_game(:world, :player1, :player2);
    set_contract_address(player1);
    let end_turn_system_1 = IEndTurnDispatcher { contract_address: player1 };

    end_turn_system_1.end_turn(world, game_id);
    assert(count_cards_in_hand(world, player2) == 1, 'Wrong nb of cards drawn player2');
    assert(count_cards_in_hand(world, player1) == 0, 'Wrong nb of cards drawn player1');
    end_turn_system_1.end_turn(world, game_id);
}

#[test]
#[available_gas(300000000)]
fn test_end_turn_right_players_twice() {
    let world = spawn_world();
    let (player1, player2, _) = get_players();
    let game_id = create_game(:world, :player1, :player2);
    set_contract_address(player1);
    let end_turn_system_1 = IEndTurnDispatcher { contract_address: player1 };

    let end_turn_system_2 = IEndTurnDispatcher { contract_address: player2 };

    end_turn_system_1.end_turn(world, game_id);
    assert(count_cards_in_hand(world, player2) == 1, 'Wrong nb of cards drawn player2');
    assert(count_cards_in_hand(world, player1) == 0, 'Wrong nb of cards drawn player1');
    set_contract_address(player2);
    end_turn_system_2.end_turn(world, game_id);
    assert(count_cards_in_hand(world, player2) == 1, 'Wrong nb of cards drawn player2');
    assert(count_cards_in_hand(world, player1) == 1, 'Wrong nb of cards drawn player1');
    set_contract_address(player1);
    end_turn_system_1.end_turn(world, game_id);
    assert(count_cards_in_hand(world, player2) == 2, 'Wrong nb of cards drawn player2');
    assert(count_cards_in_hand(world, player1) == 1, 'Wrong nb of cards drawn player1');
    set_contract_address(player2);
    end_turn_system_2.end_turn(world, game_id);
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

    let place_card_system_1 = IPlaceCardDispatcher { contract_address: player1 };
    let end_turn_system_1 = IEndTurnDispatcher { contract_address: player1 };

    // Card number in the deck, Roles::Defender
    place_card_system_1.place_card(world, game_id, 1, Roles::Defender);
    let player = get!(world, (game_id, player1), Player);
    match player.defender {
        Option::Some(tuple) => {
            let (id, placement): (u256, Placement) = tuple;
            assert(id == 2, 'Token id should be 2');
            match placement {
                Placement::Side => panic_with_felt252('Wrong placement'),
                Placement::Field => {},
            }
        },
        Option::None => panic_with_felt252('Should be some'),
    }
    end_turn_system_1.end_turn(world, game_id);
    assert(count_cards_in_hand(world, player2) == 1, 'Wrong nb of cards drawn player2');
    assert(count_cards_in_hand(world, player1) == 0, 'Wrong nb of cards drawn player1');

    let player = get!(world, (game_id, player1), Player);
    match player.defender {
        Option::Some(placement) => {
            let (id, place): (u256, Placement) = placement;
            assert(id == 2, 'Wrong token id');
            match place {
                Placement::Side => {},
                Placement::Field => panic_with_felt252('Wrong placement'),
            }
        },
        Option::None => panic_with_felt252('Should be some'),
    }
}
#[test]
#[available_gas(3000000000)]
fn test_end_turn_draw_card_capped_at_max() {
    let world = spawn_world();
    let (player1, player2, executor) = get_players();
    let game_id = create_game(:world, :player1, :player2);
    let end_turn_system_1 = IEndTurnDispatcher { contract_address: player1 };
    let end_turn_system_2 = IEndTurnDispatcher { contract_address: player2 };

    end_turn_system_1.end_turn(world, game_id);
    assert(count_cards_in_hand(world, player2) == 1, 'Wrong cards nb player2 turn 1');
    assert(count_cards_in_hand(world, player1) == 0, 'Wrong cards nb player1 turn 1');

    set_contract_address(player2);
    end_turn_system_2.end_turn(world, game_id);
    assert(count_cards_in_hand(world, player2) == 1, 'Wrong cards nb player2 turn 2');
    assert(count_cards_in_hand(world, player1) == 1, 'Wrong cards nb player1 turn 2');

    set_contract_address(player1);
    end_turn_system_1.end_turn(world, game_id);
    assert(count_cards_in_hand(world, player2) == 2, 'Wrong cards nb player2 turn 3');
    assert(count_cards_in_hand(world, player1) == 1, 'Wrong cards nb player1 turn 3');

    set_contract_address(player2);
    end_turn_system_2.end_turn(world, game_id);
    assert(count_cards_in_hand(world, player2) == 2, 'Wrong cards nb player2 turn 4');
    assert(count_cards_in_hand(world, player1) == 2, 'Wrong cards nb player1 turn 4');

    set_contract_address(player1);
    end_turn_system_1.end_turn(world, game_id);
    assert(count_cards_in_hand(world, player2) == 3, 'Wrong cards nb player2 turn 5');
    assert(count_cards_in_hand(world, player1) == 2, 'Wrong cards nb player1 turn 5');

    set_contract_address(player2);
    end_turn_system_2.end_turn(world, game_id);
    assert(count_cards_in_hand(world, player2) == 3, 'Wrong cards nb player2 turn 6');
    assert(count_cards_in_hand(world, player1) == 3, 'Wrong cards nb player1 turn 6');

    set_contract_address(player1);
    end_turn_system_1.end_turn(world, game_id);
    assert(count_cards_in_hand(world, player2) == 4, 'Wrong cards nb player2 turn 7');
    assert(count_cards_in_hand(world, player1) == 3, 'Wrong cards nb player1 turn 7');

    set_contract_address(player2);
    end_turn_system_2.end_turn(world, game_id);
    assert(count_cards_in_hand(world, player2) == 4, 'Wrong cards nb player2 turn 8');
    assert(count_cards_in_hand(world, player1) == 4, 'Wrong cards nb player1 turn 8');

    set_contract_address(player1);
    end_turn_system_1.end_turn(world, game_id);
    assert(count_cards_in_hand(world, player2) == 5, 'Wrong cards nb player2 turn 9');
    assert(count_cards_in_hand(world, player1) == 4, 'Wrong cards nb player1 turn 9');

    set_contract_address(player2);
    end_turn_system_2.end_turn(world, game_id);
    assert(count_cards_in_hand(world, player2) == 5, 'Wrong cards nb player2 turn 10');
    assert(count_cards_in_hand(world, player1) == 5, 'Wrong cards nb player1 turn 10');

    set_contract_address(player1);
    end_turn_system_1.end_turn(world, game_id);
    assert(count_cards_in_hand(world, player2) == 6, 'Wrong cards nb player2 turn 11');
    assert(count_cards_in_hand(world, player1) == 5, 'Wrong cards nb player1 turn 11');

    set_contract_address(player2);
    end_turn_system_2.end_turn(world, game_id);
    assert(count_cards_in_hand(world, player2) == 6, 'Wrong cards nb player2 turn 12');
    assert(count_cards_in_hand(world, player1) == 6, 'Wrong cards nb player1 turn 12');

    set_contract_address(player1);
    end_turn_system_1.end_turn(world, game_id);
    assert(count_cards_in_hand(world, player2) == 7, 'Wrong cards nb player2 turn 13');
    assert(count_cards_in_hand(world, player1) == 6, 'Wrong cards nb player1 turn 13');

    set_contract_address(player2);
    end_turn_system_2.end_turn(world, game_id);
    assert(count_cards_in_hand(world, player2) == 7, 'Wrong cards nb player2 turn 14');
    assert(count_cards_in_hand(world, player1) == 7, 'Wrong cards nb player1 turn 14');

    set_contract_address(player1);
    end_turn_system_1.end_turn(world, game_id);
    assert(count_cards_in_hand(world, player2) == 8, 'Wrong cards nb player2 turn 15');
    assert(count_cards_in_hand(world, player1) == 7, 'Wrong cards nb player1 turn 15');

    set_contract_address(player2);
    end_turn_system_2.end_turn(world, game_id);
    assert(count_cards_in_hand(world, player2) == 8, 'Wrong cards nb player2 turn 16');
    assert(count_cards_in_hand(world, player1) == 8, 'Wrong cards nb player1 turn 16');

    set_contract_address(player1);
    end_turn_system_1.end_turn(world, game_id);
    assert(count_cards_in_hand(world, player2) == 8, 'Wrong cards nb player2 turn 17');
    assert(count_cards_in_hand(world, player1) == 8, 'Wrong cards nb player1 turn 17');

    set_contract_address(player2);
    end_turn_system_2.end_turn(world, game_id);
    assert(count_cards_in_hand(world, player2) == 8, 'Wrong cards nb player2 turn 18');
    assert(count_cards_in_hand(world, player1) == 8, 'Wrong cards nb player1 turn 18');

    set_contract_address(player1);
    end_turn_system_1.end_turn(world, game_id);
    assert(count_cards_in_hand(world, player2) == 8, 'Wrong cards nb player2 turn 19');
    assert(count_cards_in_hand(world, player1) == 8, 'Wrong cards nb player1 turn 19');

    set_contract_address(player2);
    end_turn_system_2.end_turn(world, game_id);
    assert(count_cards_in_hand(world, player2) == 8, 'Wrong cards nb player2 turn 20');
    assert(count_cards_in_hand(world, player1) == 8, 'Wrong cards nb player1 turn 20');
}
