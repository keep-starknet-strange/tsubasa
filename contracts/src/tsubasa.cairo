use starknet::ContractAddress;

#[starknet::interface]
trait ICaptainTsubasa<TContractState> {
    fn start_game(ref self: TContractState, player1: ContractAddress, player2: ContractAddress);
    fn register_deck(ref self: TContractState, deck: Array<u256>);
    fn get_deck(self: @TContractState, player: ContractAddress) -> Array<u256>;
    fn get_card(self: @TContractState, player: ContractAddress, card_nb: u8) -> u256;
    fn get_game_class_hash(self: @TContractState) -> felt252;
}

#[starknet::contract]
mod CaptainTsubasa {
    use starknet::ContractAddress;
    use array::{Array, ArrayTrait};


    #[storage]
    struct Storage {
        /// Games registry. Each contract saved here represents a game. the game id is
        /// pedersen(player1, player2). Before starting a new game with the same id
        /// we'll check that the previous game ended. A new game with the same players
        /// but where the order is reversed can be played though.
        games: LegacyMap<felt252, ContractAddress>,
        /// The main contract will deploy a new game contract at each game so we need
        /// to have the class hash.
        game_contract_class_hash: felt252,
        /// Each player can have only 1 deck of 11 cards.
        /// Each card is saved at the (Player, card_nb) key.
        decks: LegacyMap<(ContractAddress, u8), u256>
    }

    #[constructor]
    fn constructor(ref self: ContractState, game_contract_class_hash_: felt252) {
        self.game_contract_class_hash.write(game_contract_class_hash_);
    }

    #[external(v0)]
    impl CaptainTsubasaImpl of super::ICaptainTsubasa<ContractState> {
        fn start_game(
            ref self: ContractState, player1: ContractAddress, player2: ContractAddress
        ) {}

        fn register_deck(ref self: ContractState, deck: Array<u256>) {}

        fn get_deck(self: @ContractState, player: ContractAddress) -> Array<u256> {
            ArrayTrait::new()
        }
        fn get_card(self: @ContractState, player: ContractAddress, card_nb: u8) -> u256 {
            0
        }
        fn get_game_class_hash(self: @ContractState) -> felt252 {
            self.game_contract_class_hash.read()
        }
    }
}
