#[system]
mod assign_card_system {
    use array::ArrayTrait;
    use option::OptionTrait;
    use serde::Serde;
    use starknet::ContractAddress;
    use traits::Into;

    use dojo::world::Context;

    use tsubasa::components::{Card, Roles, Placement, Player};

    /// Creates deck after the game is initialized.
    ///
    /// # Arguments
    ///
    /// * `ctx` - Dojo context.
    /// * `player` - Player who owns the deck.
    fn execute(ctx: Context, game_id: felt252, player: ContractAddress){
        let game_player_key: (felt252, felt252) = (game_id, player.into());
        let mut player = get!(ctx.world, game_player_key, Player);
        // assert(player.deck.is_none(), 'Player already has a deck');

        // emit!(ctx.world, DeckCreated {})
    }
}