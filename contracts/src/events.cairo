use starknet::ContractAddress;

use dojo::world::{Context, IWorldDispatcherTrait};
use serde::Serde;
use array::{ArrayTrait, SpanTrait};

// helper function to emit events, eventually dojo will 
// have framework level event/logging
fn emit(ctx: Context, name: felt252, values: Span<felt252>) {
    let keys = array![name];
    ctx.world.emit(keys.span(), values);
}

#[derive(Drop, Serde)]
struct GameCreated {
    game_id: felt252,
    player1: ContractAddress,
    player2: ContractAddress,
}

#[derive(Drop, Serde)]
struct EndTurn {
    game_id: felt252,
    turn: felt252,
}
