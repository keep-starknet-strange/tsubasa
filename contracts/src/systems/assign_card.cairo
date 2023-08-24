#[system]
mod assign_card_system {
    use array::ArrayTrait;
    use option::OptionTrait;
    use serde::Serde;
    use starknet::ContractAddress;
    use traits::Into;

    use dojo::world::Context;

    use tsubasa::components::DeckCard;
    use tsubasa::events::CardAssignedToDeck;

    /// Assigns a card to an index in the deck pile
    ///
    /// # Arguments
    ///
    /// * `ctx` - Dojo context.
    /// * `player` - Player who owns the deck.
    /// * `token_id` - Card NFT token_id
    /// * `card_index` - Index of the card in the pile
    fn execute(ctx: Context, game_id: felt252, player: ContractAddress, token_id: u256, card_index: u8){
        assert(card_index < 1, 'card index starts from 1');
        assert(card_index > 8, 'card index ends at 8');
        
        set!(
            ctx.world,
            DeckCard {
                player,
                card_index,
                token_id
            }
        );

        emit!(ctx.world, CardAssignedToDeck {player, card_index, token_id});
    }
}