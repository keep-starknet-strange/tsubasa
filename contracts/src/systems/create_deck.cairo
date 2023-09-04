#[system]
mod create_deck_system {
    use array::{ArrayTrait, SpanTrait};
    use starknet::ContractAddress;
    use traits::{Into, IndexView};

    use dojo::world::Context;

    use tsubasa::components::DeckCard;
    use tsubasa::components::CardState;
    use tsubasa::events::DeckCreated;

    /// Assigns a card to an index in the deck pile
    ///
    /// # Arguments
    ///
    /// * `ctx` - Dojo context.
    /// * `player` - Player who owns the deck.
    /// * `token_list` - a list Card NFT token_id 
    fn execute(ctx: Context, token_list: Span<u256>) {
        assert(token_list.len() == 8, 'deck must have 8 cards');
        let mut card_index: u8 = 0;
        loop {
            if card_index > 7 {
                break;
            }
            let token_id: u256 = *token_list[card_index.into()];
            set!(
                ctx.world,
                DeckCard { player: ctx.origin, card_index, token_id, card_state: CardState::Deck }
            );
            card_index += 1;
        };

        emit!(ctx.world, DeckCreated { player: ctx.origin, token_list });
    }
}
