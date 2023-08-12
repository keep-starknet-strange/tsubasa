use starknet::ContractAddress;

use dojo::world::{Context, IWorldDispatcherTrait};
use serde::Serde;
use array::{ArrayTrait, SpanTrait};

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
