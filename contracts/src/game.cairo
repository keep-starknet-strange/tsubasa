use starknet::ContractAddress;
use array::Array;

#[starknet::interface]
trait IGame<TContractState> {
    fn play_card(ref self: TContractState, card_id: u256);
    fn turn(self: @TContractState) -> Player;
}

#[derive(Serde, Drop)]
enum Player {
    Player1: ContractAddress,
    Player2: ContractAddress,
}
#[starknet::contract]
mod Game {
    use starknet::storage_access::StorageAccess;
    use super::Player;
    use traits::Into;
    use starknet::ContractAddress;
    use zeroable::Zeroable;
    use option::OptionTrait;
    use hash::pedersen;
    use array::ArrayTrait;


    #[storage]
    struct Storage {
        /// Current round during the game.
        round: felt252,
        /// Current turn during the round.
        turn: felt252,
    }


    #[external(v0)]
    impl GameImpl of super::IGame<ContractState> {
        fn play_card(ref self: ContractState, card_id: u256) {}

        fn turn(self: @ContractState) -> Player {
            Player::Player1(Zeroable::<ContractAddress>::zero())
        }
    }
}
