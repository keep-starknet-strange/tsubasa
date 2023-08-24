#[system]
mod end_turn_system {
    use array::ArrayTrait;

    use dojo::world::Context;
    use tsubasa::components::{Game, Player, Outcome};
    use tsubasa::events::EndTurn;
    use tsubasa::systems::check_turn;


    /// Ends a turn and increments the energy of the player who ended the turn.
    ///
    /// # Arguemnt
    ///
    /// * `ctx` - Dojo context.
    /// * `game_id` - The current game id.
    fn execute(ctx: Context, game_id: felt252) {
        let mut game = get!(ctx.world, game_id, Game);

        check_turn(@game, @ctx.origin);

        game.turn += 1;

        emit!(ctx.world, EndTurn { game_id, turn: game.turn })

        // Increments the energy of the player 
        let mut player = get!(ctx.world, (game_id, ctx.origin), Player);
        player.remaining_energy = game.turn / 2 + 2;
        set!(ctx.world, (player));

        // End the Game
        // If one reached score 2, set winner 
        game
            .outcome =
                if (game.player1_score == 2) {
                    Option::Some(Outcome::Player1(game.player1))
                } else if (game.player2_score == 2) {
                    Option::Some(Outcome::Player2(game.player2))
                } else {
                    Option::None
                };

        set!(ctx.world, (game));
    }
}

