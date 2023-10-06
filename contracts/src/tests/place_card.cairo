use traits::{Into, Default};
use array::ArrayTrait;
use serde::Serde;
use starknet::testing::set_contract_address;
use debug::PrintTrait;
use dojo::world::IWorldDispatcherTrait;
use dojo::test_utils::{deploy_contract};
use tsubasa::systems::place_card_system;
use tsubasa::tests::utils::{create_game, get_players, spawn_world, count_cards_in_hand};
use tsubasa::models::{Card, Roles, Player, Placement};
use tsubasa::systems::{
    IPlaceCardDispatcher, IEndTurnDispatcher, IPlaceCardDispatcherTrait, IEndTurnDispatcherTrait,
    end_turn_system
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

    let contract_place_card = deploy_contract(place_card_system::TEST_CLASS_HASH, array![].span());
    let contract_end_turn = deploy_contract(end_turn_system::TEST_CLASS_HASH, array![].span());
    let place_card_system = IPlaceCardDispatcher { contract_address: contract_place_card };
    let end_turn_system = IEndTurnDispatcher { contract_address: contract_end_turn };

    set_contract_address(executor);
    set!(world, (card));
    set_contract_address(player1);

    // Card number in the deck, Roles::Defender
    let place_card_calldata = array![game_id, 1, 1];
    let player = get!(world, (game_id, player1), Player);

    assert(player.remaining_energy == 1, 'energy should be 1');

    place_card_system.place_card(world, game_id, 1, Roles::Defender);
    let player = get!(world, (game_id, player1), Player);

    assert(player.remaining_energy == 0, 'energy should be 0');

    end_turn_system.end_turn(world, game_id);

    let player = get!(world, (game_id, player1), Player);

    assert(player.defender_placement == Placement::Field, 'Defender should be on the field');
    assert(player.defender_id == 2, 'Token id should be 2')
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

    let contract_place_card = deploy_contract(place_card_system::TEST_CLASS_HASH, array![].span());
    let place_card_system = IPlaceCardDispatcher { contract_address: contract_place_card };

    set_contract_address(executor);
    set!(world, (card));
    set_contract_address(player1);
    // card_id.low, card_id.high, Roles::Defender
    let place_card_calldata = array![game_id, 1, 0, 1];
    let player = get!(world, (game_id, player1), Player);

    assert(player.remaining_energy == 1, 'energy should be 1');
    place_card_system.place_card(world, game_id, 1, Roles::Defender);
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

    let contract_place_card = deploy_contract(place_card_system::TEST_CLASS_HASH, array![].span());

    let place_card_system = IPlaceCardDispatcher { contract_address: contract_place_card };

    set_contract_address(executor);
    set!(world, (card));
    set_contract_address(player1);
    // Card number in the deck, Roles::Attacker

    assert(card.current_dribble == 1, 'current_dribble should be 1');
    assert(card.current_defense == 2, 'current_defense should be 2');

    place_card_system.place_card(world, game_id, 1, Roles::Attacker);
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

    let contract_place_card = deploy_contract(place_card_system::TEST_CLASS_HASH, array![].span());
    let place_card_system = IPlaceCardDispatcher { contract_address: contract_place_card };

    set!(world, (card));
    set_contract_address(player1);
    // card_id.low, card_id.high, Roles::Goalkeeper

    assert(card.current_dribble == 1, 'current_dribble should be 1');
    assert(card.current_defense == 2, 'current_defense should be 2');

    place_card_system.place_card(world, game_id, 1, Roles::Goalkeeper);
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
    let contract_place_card = deploy_contract(place_card_system::TEST_CLASS_HASH, array![].span());

    let place_card_system = IPlaceCardDispatcher { contract_address: contract_place_card };

    assert(card.current_dribble == 1, 'current_dribble should be 1');
    assert(card.current_defense == 2, 'current_defense should be 2');

    // Card number in the deck, Roles::Goalkeeper
    place_card_system.place_card(world, game_id, 1, Roles::Goalkeeper);
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
    let contract_place_card = deploy_contract(place_card_system::TEST_CLASS_HASH, array![].span());

    let place_card_system = IPlaceCardDispatcher { contract_address: contract_place_card };

    // Card number in the deck, Roles::Goalkeeper
    place_card_system.place_card(world, game_id, 7, Roles::Goalkeeper);

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
    let contract_place_card = deploy_contract(place_card_system::TEST_CLASS_HASH, array![].span());

    let place_card_system = IPlaceCardDispatcher { contract_address: contract_place_card };

    set_contract_address(player2);

    place_card_system.place_card(world, game_id, 0, Roles::Goalkeeper);
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
    let contract_place_card = deploy_contract(place_card_system::TEST_CLASS_HASH, array![].span());
    let contract_end_turn = deploy_contract(end_turn_system::TEST_CLASS_HASH, array![].span());
    let place_card_system = IPlaceCardDispatcher { contract_address: contract_place_card };
    let end_turn_system = IEndTurnDispatcher { contract_address: contract_end_turn };

    set!(world, (card));
    set_contract_address(player1);
    end_turn_system.end_turn(world, game_id);
    assert(count_cards_in_hand(world, player2) == 1, 'Wrong nb of cards drawn player2');
    assert(count_cards_in_hand(world, player1) == 0, 'Wrong nb of cards drawn player1');
    set_contract_address(player2);
    // Card number in the deck, Roles::Goalkeeper
    place_card_system.place_card(world, game_id, 1, Roles::Goalkeeper);
}
