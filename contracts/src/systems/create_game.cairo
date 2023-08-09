#[system]
mod create_game_system {
    use dojo::world::Context;
    use starknet::ContractAddress;

    fn execute(ctx: Context, player1: ContractAddress, player2: ContractAddress) {}
}
