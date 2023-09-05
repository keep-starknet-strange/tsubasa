#[system]
mod create_card_system {
    use traits::Into;
    use dojo::world::Context;
    use tsubasa::components::{Game, Roles, Card};
    use dojo_erc::erc721::interface::IERC721ADispatcher;

    /// Creates a card.
    ///
    /// # Arguments
    ///
    /// * `ctx` - Dojo context.
    /// * `token_id` - The NFT token ID of the card being created.
    /// * `dribble` - The dribble stat of the card being created.
    /// * `defense` - The defense stat of the card being created.
    /// * `cost` - The cost of the card being created.
    /// * `role` - The role of the card being created.
    /// * `is_captain` - Whether the card being created is the captain.
    fn execute(
        ctx: Context,
        dribble: u8,
        defense: u8,
        cost: u8,
        role: Roles,
        is_captain: bool
    ) {
        let contract_address = get!();
        IERC721ADispatcher {contract_address: }
        set!(
            ctx.world,
            Card {
                token_id: token_id.into(),
                dribble,
                current_dribble: dribble,
                defense,
                current_defense: defense,
                cost,
                role,
            }
        );
    }
}
