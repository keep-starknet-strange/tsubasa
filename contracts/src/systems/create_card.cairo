#[system]
mod create_card_system {
    use traits::Into;
    use dojo::world::Context;
    use tsubasa::components::{Game, Roles, Card};

    /// Creates a card.
    /// *`ctx` - Dojo context.
    /// * `token_id: The NFT token ID of the card being created.
    /// * `dribble`: The dribble stat of the card being created.
    /// *`defense`: The defense stat of the card being created.
    /// *`cost`: The cost of the card being created.
    /// *`role`: The role of the card being created.
    /// *`is_captain`: Whether the card being created is the captain.
    fn execute(
        ctx: Context,
        token_id: felt252,
        dribble: u8,
        defense: u8,
        cost: u8,
        role: Roles,
        is_captain: bool
    ) {
        set!(
            ctx.world, Card {
                token_id: token_id.into(),
                dribble: dribble,
                current_dribble: dribble,
                defense: defense,
                current_defense: defense,
                cost: cost,
                role: role,
                is_captain: is_captain
            }
        );
    }
}
