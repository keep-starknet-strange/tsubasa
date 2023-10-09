use array::ArrayTrait;
use starknet::ContractAddress;
use traits::Into;
use serde::Serde;

use dojo::world::{IWorldDispatcher, IWorldDispatcherTrait};
use dojo::test_utils::spawn_test_world;
use dojo::test_utils::{deploy_contract};
use debug::PrintTrait;

use tsubasa::models::{Card, DeckCard, CardState, card, Game, game};
use tsubasa::systems::{
    place_card_system, attack_system, create_card_system, create_game_system, create_deck_system,
    end_turn_system, ICreateGameDispatcher, ICreateGameDispatcherTrait, ICreateDeckDispatcher,
    ICreateDeckDispatcherTrait
};

/// Spawns a mock dojo world.
fn spawn_world() -> IWorldDispatcher {
    // components
    let mut components = array![game::TEST_CLASS_HASH, card::TEST_CLASS_HASH];

    // deploy executor, world and register components/systems
    spawn_test_world(components)
}

/// Returns 1_ContractAddress, 2_ContractAddress
fn get_players() -> (ContractAddress, ContractAddress, ContractAddress) {
    (
        starknet::contract_address_const::<0x19>(),
        starknet::contract_address_const::<0x32>(),
        starknet::contract_address_const::<0x1>()
    )
}

/// Creates a tsubasa game.
fn create_game(
    world: IWorldDispatcher, player1: ContractAddress, player2: ContractAddress
) -> felt252 {
    // use player1 address
    starknet::testing::set_contract_address(player1);

    let contract_address_game = deploy_contract(
        create_game_system::TEST_CLASS_HASH, array![].span()
    );
    let create_game_system = ICreateGameDispatcher { contract_address: contract_address_game };

    // create game
    create_game_system.create_game(world, player2);

    let token_ids1 = array![0, 2, 4, 6, 8, 10, 12, 14];
    let contract_address_deck = deploy_contract(
        create_deck_system::TEST_CLASS_HASH, array![].span()
    );
    let create_deck_system = ICreateDeckDispatcher { contract_address: contract_address_deck };
    create_deck_system.create_deck(world, token_ids1.span(), 7);

    starknet::testing::set_contract_address(player2);
    let create_deck_system2 = ICreateDeckDispatcher { contract_address: contract_address_deck };
    let token_ids2 = array![1, 3, 5, 7, 9, 11, 13, 15];
    // Captain index.

    create_deck_system2.create_deck(world, token_ids2.span(), 7);

    starknet::testing::set_contract_address(player1);
    pedersen::pedersen(player1.into(), player2.into())
}

fn count_cards_in_hand(world: IWorldDispatcher, player: ContractAddress) -> u8 {
    let mut i = 0_usize;
    let mut res = 0_u8;
    loop {
        if i == 8 {
            break res;
        }
        let cond = get!(world, (player, i), DeckCard).card_state;
        if cond == CardState::Hand {
            res += 1;
        }
        i += 1;
    }
}
