#[system]
mod attack_system {
    use debug::PrintTrait;
    use dojo::world::Context;
    use tsubasa::components::Game;

    fn execute(ctx: Context, game_id: felt252, player: u8) {
        let mut game = get!(ctx.world, game_id, Game);

        // TODO: Need to switch into real logic that update score when goal.
        if player == 1 {
            game.player2_score += 1;
        }
        set!(ctx.world, (game));
    }
}

