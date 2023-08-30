#[system]
mod create_deck_system {
    use array::ArrayTrait;
    use clone::Clone;
    use array::ArrayTCloneImpl;

    use option::OptionTrait;
    use serde::Serde;
    use starknet::ContractAddress;
    use traits::Into;
    use box::BoxTrait;

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
    fn execute(ctx: Context, player: ContractAddress, token_list: Array::<u256>){
        
        let new_token_list = token_list.clone();
        let deck_len = new_token_list.len();
        assert( deck_len == 8, 'deck must have 8 cards' );
        let mut card_index: u8 = 0;
        loop {
            if card_index > 7 {
                break();
            }
            let token_id = *new_token_list.get(card_index.into()).unwrap().unbox();
            set!(
                ctx.world,
                DeckCard {
                    player,
                    card_index,
                    token_id,
                    card_state: CardState::Deck
                }
            );
            card_index += 1;
        };

        emit!(ctx.world, DeckCreated {player, token_list});
    }
}