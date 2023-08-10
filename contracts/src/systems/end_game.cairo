#[system]
mod end_game_system {
    use dojo::world::Context;
    use starknet::ContractAddress;
    use tsubasa::components::{Game, Outcome};
    use tsubasa::events::{emit, EndGame};
    use array::ArrayTrait;

    fn execute(ctx: Context, game_id: felt252, scored_player: ContractAddress) {
        let mut game = get!(ctx.world, game_id, Game);

        // Reset round and update player score
        game.turn = 0;
        if (scored_player == game.player1) {
            game.player1_score += 1;
        } else if (scored_player == game.player2) {
            game.player2_score += 1;
        }

        /// A player has won 2 rounds the game ends
        let mut game_outcome = game.outcome;
        if (game.player1_score == 2) {
            let winner = Outcome::Player1((game.player1));
            game_outcome = Option::Some(winner);
        } else if (game.player2_score == 2) {
            let winner = Outcome::Player2((game.player2));
            game_outcome = Option::Some(winner);
        }

        set!(
            ctx.world, Game {
                game_id: game_id,
                player1: game.player1,
                player2: game.player2,
                player1_score: game.player1_score,
                player2_score: game.player2_score,
                turn: game.turn,
                outcome: game_outcome,
            }
        );

        // emit EndGame
        let mut values = ArrayTrait::new();
        serde::Serde::serialize(
            @EndGame { game_id, round_number: game.player1_score + game.player2_score }, ref values
        );
        emit(ctx, 'EndGame', values.span());
    }
}
