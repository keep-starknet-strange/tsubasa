#[starknet::interface]
trait ICaptainTsubasa<TContractState> {
    fn shoot(ref self: TContractState, amount: felt252);
    fn get_score(self: @TContractState) -> felt252;
}

#[starknet::contract]
mod CaptainTsubasa {
    #[storage]
    struct Storage {
        // The score of the team.
        score: felt252,
    }

    #[external(v0)]
    impl CaptainTsubasaImpl of super::ICaptainTsubasa<ContractState> {
        fn shoot(ref self: ContractState, amount: felt252) {
            assert(amount != 0, 'Amount cannot be 0');
            self.score.write(self.score.read() + amount);
        }

        fn get_score(self: @ContractState) -> felt252 {
            self.score.read()
        }
    }
}
