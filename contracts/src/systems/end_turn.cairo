#[system]
mod end_turn_system {
    use array::ArrayTrait;

    use dojo::world::Context;
    use tsubasa::components::{Game, Player};
    use tsubasa::events::EndTurn;
    use tsubasa::systems::check_turn;


    /// Ends a turn and increments the energy of the player who ended the turn.
    ///
    /// # Arguemnt
    ///
    /// * `ctx` - Dojo context.
    /// * `game_id` - The current game id.
    fn execute(ctx: Context, game_id: felt252) {
        let game = get!(ctx.world, game_id, Game);
        check_turn(@game, @ctx.origin);
        set!(
            ctx.world,
            Game {
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
        let mut player = get!(ctx.world, (game_id, ctx.origin), Player);
        player.remaining_energy = game.turn / 2 + 2;
        set!(ctx.world, (player));

        emit!(ctx.world, EndTurn { game_id, turn: game.turn + 1 })
    }
}

