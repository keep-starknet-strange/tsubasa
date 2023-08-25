#[system]
mod end_turn_system {
    use array::ArrayTrait;

    use dojo::world::Context;

    use tsubasa::components::{Game, Player, Outcome, PlayerTrait, Placement};
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

        emit!(ctx.world, EndTurn { game_id, turn: game.turn });

        // Increments the energy of the player 
        let mut player = get!(ctx.world, (game_id, ctx.origin), Player);
        player.remaining_energy = game.turn / 2 + 2;
        let opponent_address = if game.player1 == ctx.origin {
            game.player2
        } else {
            game.player1
        };
        let mut opponent = get!(ctx.world, (game_id, opponent_address), Player);

        opponent.goalkeeper.update_card_placement();
        opponent.defender.update_card_placement();
        opponent.midfielder.update_card_placement();
        opponent.attacker.update_card_placement();

        set!(ctx.world, (player));
        set!(ctx.world, (opponent));

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

