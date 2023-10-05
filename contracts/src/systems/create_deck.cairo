#[system]
mod create_deck_system {
    use array::{ArrayTrait, SpanTrait};
    use starknet::ContractAddress;
    use traits::{Into, IndexView};

    use tsubasa::models::DeckCard;
    use tsubasa::models::CardState;
    use tsubasa::events::DeckCreated;

    /// Assigns a card to an index in the deck pile
    ///
    /// # Arguments
    ///
    /// * world: IWorldDispatcher
    /// * `token_list` - a list Card NFT token_id 
    fn execute(world: IWorldDispatcher, token_list: Span<u256>, captain_index: u8) {
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
