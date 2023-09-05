#[systems]
mod mint_cards {
    use dojo::world::Context;
    fn execute(ctx: Context) {
        // dribble, defense, cost, role, is_captain
        let cards_stats = array![
            (1, 2, 1, 1, 0), (2, 1, 1, 3, 0), (4, 5, 4, 0, 0), (5, 4, 4, 2, 0)
        ];
    }
}
