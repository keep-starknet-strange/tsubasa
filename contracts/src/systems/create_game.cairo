#[system]
mod create_game_system {
    use traits::Into;
    use dojo::world::Context;
    use starknet::ContractAddress;
    use tsubasa::events::{emit, GameCreated};
    use tsubasa::components::{Game, Energy};
    use option::Option;
    use array::{ArrayTrait};

    fn execute(ctx: Context, player2: ContractAddress) {
        let player1 = ctx.origin;

        let game_id = pedersen(player1.into(), player2.into());

        set!(
            ctx.world, Game {
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
                Energy {
                    game_id, player: player1, remaining: 1
                    }, Energy {
                    game_id, player: player2, remaining: 1
                }
            )
        );

        // emit GameCreated
        let mut values = array::ArrayTrait::new();
        serde::Serde::serialize(@GameCreated { game_id, player1, player2 }, ref values);
        emit(ctx, 'GameCreated', values.span());
    }
}
