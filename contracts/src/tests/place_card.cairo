use traits::{Into, Default};
use array::ArrayTrait;
use serde::Serde;
use starknet::testing::set_contract_address;
use debug::PrintTrait;
use dojo::world::IWorldDispatcherTrait;

use tsubasa::systems::place_card_system;
use tsubasa::tests::utils::{create_game, get_players, spawn_world, count_cards_in_hand};
use tsubasa::models::{Card, Roles, Player, Placement};
use tsubasa::systems::{
    IPlaceCardDispatcher, IEndTurnDispatcher, IPlaceCardDispatcherTrait, IEndTurnDispatcherTrait
};
#[test]
#[available_gas(300000000)]
fn test_place_card() {
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
    let place_card_system_1 = IPlaceCardDispatcher { contract_address: player1 };

    set_contract_address(executor);
    set!(world, (card));
    set_contract_address(player1);

    let place_card_system_1 = IPlaceCardDispatcher { contract_address: player1 };

    // Card number in the deck, Roles::Defender
    let place_card_calldata = array![game_id, 1, 1];
    let player = get!(world, (game_id, player1), Player);

    assert(player.remaining_energy == 1, 'energy should be 1');

    place_card_system_1.place_card(world, game_id, 1, Roles::Defender);
    let player = get!(world, (game_id, player1), Player);

    assert(player.remaining_energy == 0, 'energy should be 0');

    match player.defender {
        Option::Some(tuple) => {
            let (id, placement): (u256, Placement) = tuple;
            assert(id == 2, 'Card id should be 2');
            match placement {
                Placement::Field => (),
                _ => panic_with_felt252('Wrong placement'),
            }
        },
        Option::None => panic_with_felt252('Should be some'),
    }
}
#[test]
#[should_panic]
#[available_gas(30000000)]
fn test_place_card_overflow() {
    let world = spawn_world();
    let (player1, player2, executor) = get_players();
    let game_id = create_game(:world, :player1, :player2);
    let card = Card {
        token_id: 1,
        dribble: 1,
        current_dribble: 1,
        defense: 2,
        current_defense: 2,
        cost: 2,
        role: Roles::Goalkeeper,
    };
    let place_card_system_1 = IPlaceCardDispatcher { contract_address: player1 };

    set_contract_address(executor);
    set!(world, (card));
    set_contract_address(player1);
    // card_id.low, card_id.high, Roles::Defender
    let place_card_calldata = array![game_id, 1, 0, 1];
    let player = get!(world, (game_id, player1), Player);

    assert(player.remaining_energy == 1, 'energy should be 1');
    place_card_system_1.place_card(world, game_id, 1, Roles::Defender);
}

#[test]
#[available_gas(300000000)]
fn test_place_card_on_its_role() {
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
        role: Roles::Attacker,
    };
    let place_card_system_1 = IPlaceCardDispatcher { contract_address: player1 };

    set_contract_address(executor);
    set!(world, (card));
    set_contract_address(player1);
    // Card number in the deck, Roles::Attacker

    assert(card.current_dribble == 1, 'current_dribble should be 1');
    assert(card.current_defense == 2, 'current_defense should be 2');

    place_card_system_1.place_card(world, game_id, 1, Roles::Attacker);
    let card = get!(world, (2, 0), Card);
    assert(card.current_dribble == 2, 'current_dribble should be 2');
    assert(card.current_defense == 3, 'current_defense should be 3');
}

#[test]
#[available_gas(300000000)]
fn test_place_card_not_on_its_role() {
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
        role: Roles::Attacker,
    };
    set_contract_address(executor);
    let place_card_system_1 = IPlaceCardDispatcher { contract_address: player1 };

    set!(world, (card));
    set_contract_address(player1);
    // card_id.low, card_id.high, Roles::Goalkeeper

    assert(card.current_dribble == 1, 'current_dribble should be 1');
    assert(card.current_defense == 2, 'current_defense should be 2');

    place_card_system_1.place_card(world, game_id, 1, Roles::Goalkeeper);
    let card = get!(world, (2, 0), Card);
    assert(card.current_dribble == 1, 'current_dribble should be 1');
    assert(card.current_defense == 2, 'current_defense should be 2');
}

#[test]
#[available_gas(300000000)]
fn test_place_card_is_not_captain() {
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
        role: Roles::Attacker,
    };
    set_contract_address(executor);
    set!(world, (card));
    set_contract_address(player1);
    let place_card_system_1 = IPlaceCardDispatcher { contract_address: player1 };

    assert(card.current_dribble == 1, 'current_dribble should be 1');
    assert(card.current_defense == 2, 'current_defense should be 2');

    // Card number in the deck, Roles::Goalkeeper
    place_card_system_1.place_card(world, game_id, 1, Roles::Goalkeeper);
    let card = get!(world, (2, 0), Card);
    assert(card.current_dribble == 1, 'current_dribble should be 1');
    assert(card.current_defense == 2, 'current_defense should be 2');
}

#[test]
#[available_gas(300000000)]
fn test_place_card_is_captain() {
    let world = spawn_world();
    let (player1, player2, executor) = get_players();
    let game_id = create_game(:world, :player1, :player2);
    let card = Card {
        token_id: 14,
        dribble: 1,
        current_dribble: 1,
        defense: 2,
        current_defense: 2,
        cost: 1,
        role: Roles::Attacker,
    };
    set_contract_address(executor);
    set!(world, (card));
    set_contract_address(player1);
    let place_card_system_1 = IPlaceCardDispatcher { contract_address: player1 };

    // Card number in the deck, Roles::Goalkeeper
    place_card_system_1.place_card(world, game_id, 7, Roles::Goalkeeper);

    let card = get!(world, (14, 0), Card);
    assert(card.current_dribble == 2, 'current_dribble should be 2');
    assert(card.current_defense == 3, 'current_defense should be 3');
}

#[test]
#[should_panic]
#[available_gas(30000000)]
fn test_place_card_wrong_player() {
    let world = spawn_world();
    let (player1, player2, executor) = get_players();
    let game_id = create_game(:world, :player1, :player2);
    let card = Card {
        token_id: 1,
        dribble: 1,
        current_dribble: 1,
        defense: 2,
        current_defense: 2,
        cost: 1,
        role: Roles::Attacker,
    };
    set_contract_address(executor);
    set!(world, (card));
    let place_card_system_1 = IPlaceCardDispatcher { contract_address: player1 };

    set_contract_address(player2);

    place_card_system_1.place_card(world, game_id, 0, Roles::Goalkeeper);
}
#[test]
#[available_gas(300000000)]
fn test_place_card_right_player() {
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
        role: Roles::Attacker,
    };
    set_contract_address(executor);
    let place_card_system_2 = IPlaceCardDispatcher { contract_address: player2 };
    let end_turn_system_1 = IEndTurnDispatcher { contract_address: player1 };

    set!(world, (card));
    set_contract_address(player1);
    end_turn_system_1.end_turn(world, game_id);
    assert(count_cards_in_hand(world, player2) == 1, 'Wrong nb of cards drawn player2');
    assert(count_cards_in_hand(world, player1) == 0, 'Wrong nb of cards drawn player1');
    set_contract_address(player2);
    // Card number in the deck, Roles::Goalkeeper
    place_card_system_2.place_card(world, game_id, 1, Roles::Goalkeeper);
}
