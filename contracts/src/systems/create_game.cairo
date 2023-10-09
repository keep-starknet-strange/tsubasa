use starknet::ContractAddress;

use dojo::world::IWorldDispatcher;

use tsubasa::models::{Game, Player};

#[starknet::interface]
trait ICreateGame<TContractState> {
    fn create_game(self: @TContractState, world: IWorldDispatcher, player2: ContractAddress) -> ();
}

#[system]
mod create_game_system {
    use super::ICreateGame;

    use traits::Into;
    use starknet::ContractAddress;

    use tsubasa::models::{Game, Player, Placement, Outcome};

    #[event]
    #[derive(Copy, Drop, starknet::Event)]
    enum Event {
        GameCreated: GameCreated
    }

    #[derive(Copy, Drop, starknet::Event)]
    struct GameCreated {
        game_id: felt252,
        player1: ContractAddress,
        player2: ContractAddress
    }

    #[external(v0)]
    impl CreateGameImpl of ICreateGame<ContractState> {
        /// Creates a new tsubasa game.
        ///
        /// # Arguments
        ///
        /// * `world` - Dojo world.
        /// * `player2` - The 2nd player.
        fn create_game(self: @ContractState, world: IWorldDispatcher, player2: ContractAddress) {
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
                    outcome: Outcome::Pending,
                }
            );

            set!(
                world,
                (
                    Player {
                        game_id,
                        player: player1,
                        goalkeeper_placement: Placement::Outside,
                        goalkeeper_id: 0,
                        defender_placement: Placement::Outside,
                        defender_id: 0,
                        midfielder_placement: Placement::Outside,
                        midfielder_id: 0,
                        attacker_placement: Placement::Outside,
                        attacker_id: 0,
                        remaining_energy: 1,
                    },
                    Player {
                        game_id,
                        player: player2,
                        goalkeeper_placement: Placement::Outside,
                        goalkeeper_id: 0,
                        defender_placement: Placement::Outside,
                        defender_id: 0,
                        midfielder_placement: Placement::Outside,
                        midfielder_id: 0,
                        attacker_placement: Placement::Outside,
                        attacker_id: 0,
                        remaining_energy: 1,
                    }
                )
            );
            emit!(world, GameCreated { game_id, player1, player2 })
        }
    }
}
