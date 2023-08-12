#[system]
mod end_turn_system {
    use dojo::world::Context;

    use tsubasa::components::{Game, Energy};
    use tsubasa::events::{EndTurn};
    use array::ArrayTrait;


    fn execute(ctx: Context, game_id: felt252) {
        let game = get!(ctx.world, game_id, Game);
        set!(
            ctx.world, Game {
                game_id,
                player1: game.player1,
                player2: game.player2,
                player1_score: game.player1_score,
                player2_score: game.player2_score,
                turn: game.turn + 1,
                outcome: game.outcome
            }
        );
        let game = get!(ctx.world, game_id, Game);
        set!(ctx.world, Energy { game_id, player: ctx.origin, remaining: game.turn / 2 + 2 });

        emit!(ctx.world, EndTurn { game_id, turn: game.turn + 1 })
    }
}

