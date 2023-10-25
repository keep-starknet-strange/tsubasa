use starknet::ContractAddress;

use dojo::world::{IWorldDispatcher, IWorldDispatcherTrait};

#[starknet::interface]
trait IJoinGame<TContractState> {
    fn join_game(self: @TContractState, world: IWorldDispatcher, game_id: felt252) -> ();
}

#[starknet::contract]
mod join_game_system {
    use dojo::world::{IWorldDispatcher, IWorldDispatcherTrait};
    
    use super::IJoinGame;

    use traits::Into;
    use starknet::ContractAddress;

    use tsubasa::models::{Game, Player, Placement, Outcome};

    #[event]
    #[derive(Copy, Drop, starknet::Event)]
    enum Event {
        GameJoined: GameJoined
    }

    #[derive(Copy, Drop, starknet::Event)]
    struct GameJoined {
        game_id: felt252,
        player2: ContractAddress
    }

    #[external(v0)]
    impl JoinGameImpl of IJoinGame<ContractState> {
        /// Allows a player to join a previously created game.
        ///
        /// # Arguments
        ///
        /// * `world` - Dojo world.
        /// * `game_id` - The id of the game to be joined.
        fn join_game(self: @ContractState, world: IWorldDispatcher, game_id: felt252) {
            let player2 = starknet::get_caller_address();
            let mut game = get!(world, game_id, Game);

            game.player2 = player2;
            game.outcome = Outcome::Pending;

            set!(world, (game_id, game));
            emit!(world, GameJoined { game_id, player2 });
        }
    }

    #[storage]
    struct Storage {
    }
}
