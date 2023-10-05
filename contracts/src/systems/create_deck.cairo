use dojo::world::IWorldDispatcher;
use tsubasa::models::{DeckCard, CardState};
use array::SpanTrait;

trait ICreateDeck<TContractState> {
    fn execute(
        self: @TContractState, world: IWorldDispatcher, token_list: Span<u256>, captain_index: u8
    ) -> ();
}

#[system]
mod create_deck_system {
    use super::ICreateDeck;
    use tsubasa::models::{DeckCard, CardState};
    use array::SpanTrait;
    use starknet::ContractAddress;

    #[event]
    #[derive(Copy, Drop, starknet::Event)]
    enum Event {
        DeckCreated: DeckCreated
    }

    #[derive(Copy, Drop, starknet::Event)]
    struct DeckCreated {
        player: ContractAddress,
        token_list: Span<u256>, // Please ensure the StarkNet SDK supports Span<u256> in events.
    }

    impl CreateDeckImpl of ICreateDeck<ContractState> {
        fn execute(
            self: @ContractState, world: IWorldDispatcher, token_list: Span<u256>, captain_index: u8
        ) {
            assert(token_list.len() == 8, 'deck must have 8 cards');
            assert(captain_index < 8, 'Invalid captain index');

            let mut card_index: u8 = 0;
            loop {
                if card_index > 7 {
                    break;
                }
                let token_id: u256 = *token_list[card_index.into()];
                set!(
                    world,
                    DeckCard {
                        player: starknet::get_caller_address(),
                        card_index,
                        token_id,
                        card_state: CardState::Deck,
                        is_captain: captain_index == card_index
                    }
                );
                card_index += 1;
            };

            emit!(world, DeckCreated { player: starknet::get_caller_address(), token_list });
        }
    }
}
