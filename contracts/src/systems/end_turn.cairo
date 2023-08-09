use core::option::OptionTrait;
#[system]
mod end_turn_system {
    use dojo::world::Context;

    use tsubasa::components::Game;

    fn execute(ctx: Context, game_id: felt252) {
        // set!(
        //     ctx.world,
        //     (Game {
        //         game_id: 0, player1_score: 0, player2_score: 0, turn: 0, outcome: Option::None
        //     })
        // );
        // Remove macro above once we have game initilization.
        let game = get!(ctx.world, game_id, Game);

        set!(
            ctx.world,
            (Game {
                game_id: game_id,
                player1_score: game.player1_score,
                player2_score: game.player2_score,
                turn: game.turn + 1,
                outcome: game.outcome
            })
        );
    }
}

