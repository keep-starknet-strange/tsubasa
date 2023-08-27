#[system]
mod create_game_system {
    use traits::Into;
    use starknet::ContractAddress;
    use array::ArrayTrait;

    use dojo::world::Context;

    use tsubasa::events::GameCreated;
    use tsubasa::components::{Game, Player};

    /// Creates a new game and initializes the 2 players with 1 energy.
    ///
    /// # Arguments
    ///
    /// * `ctx` - Dojo context.
    /// * `player2` - The second player of the game.
    fn execute(ctx: Context, player2: ContractAddress) {
        let player1 = ctx.origin;

        let game_id = pedersen(player1.into(), player2.into());

        set!(
            ctx.world,
            Game {
                game_id,
                player1,
                player2,
                player1_score: 0,
                player2_score: 0,
                turn: 0,
                outcome: Option::None
            }
        );

        set!(
            ctx.world,
            (
                Player {
                    game_id,
                    player: player1,
                    goalkeeper: Option::None,
                    defender: Option::None,
                    midfielder: Option::None,
                    attacker: Option::None,
                    remaining_energy: 1,
                },
                Player {
                    game_id,
                    player: player2,
                    goalkeeper: Option::None,
                    defender: Option::None,
                    midfielder: Option::None,
                    attacker: Option::None,
                    remaining_energy: 1,
                }
            )
        );

        emit!(ctx.world, GameCreated { game_id, player1, player2 })
    }
}
