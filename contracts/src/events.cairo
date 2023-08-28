use starknet::ContractAddress;

use dojo::world::{Context, IWorldDispatcherTrait};
use serde::Serde;
use array::{ArrayTrait, SpanTrait};
use tsubasa::components::Roles;

#[derive(Drop, starknet::Event)]
struct GameCreated {
    game_id: felt252,
    player1: ContractAddress,
    player2: ContractAddress,
}

#[derive(Drop, starknet::Event)]
struct EndTurn {
    game_id: felt252,
    turn: u128,
}

#[derive(Drop, starknet::Event)]
struct CardPlaced {
    game_id: felt252,
    player: ContractAddress,
    card_id: u256,
    position: Roles,
}

#[derive(Drop, starknet::Event)]
struct DeckCreated {
    player: ContractAddress,
    token_list: Array<u256>,
}
