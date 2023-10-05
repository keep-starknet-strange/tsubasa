#[system]
mod create_game_system {
    use traits::Into;
    use starknet::ContractAddress;
    use array::ArrayTrait;
    use tsubasa::events::GameCreated;
    use tsubasa::models::{Game, Player};
  
    /// Creates a new game and initializes the 2 players with 1 energy.
    ///
    /// # Arguments
    ///
    /// * world: IWorldDispatcher
    /// * `player2` - The second player of the game.
    fn execute(world: IWorldDispatcher, player2: ContractAddress) {
        let player1 = starknet::get_caller_address();

        let game_id = pedersen::pedersen(player1.into(), player2.into());

        set!(
            world,
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
            world,
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

        emit!(world, GameCreated { game_id, player1, player2 })
    }
}
