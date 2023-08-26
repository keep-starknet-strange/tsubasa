#[system]
mod attack_system {
    use dojo::world::Context;
    use tsubasa::components::{Game, Placement, Player, Card, GetSetPlacementTrait};
    use tsubasa::systems::check_turn;
    use option::OptionTrait;
    use debug::PrintTrait;


    fn attack(
        world: IWorldDispatcher,
        ref i: usize,
        ref j: usize,
        ref attacker: Player,
        ref defender: Player
    ) -> bool {
        let attacker_card_token_id_opt = attacker.get_token_id(i);
        let defender_card_token_id_opt = defender.get_token_id(j);
        if attacker_card_token_id_opt.is_none() {
            return false;
        }
        if defender_card_token_id_opt.is_none() && j == 0 {
            return true;
        }
        if defender_card_token_id_opt.is_none() {
            return false;
        }
        let attacker_card_token_id = attacker_card_token_id_opt.unwrap();
        let defender_card_token_id = defender_card_token_id_opt.unwrap();

        let mut attacker_card = get!(world, (attacker_card_token_id), Card);
        let mut defender_card = get!(world, (defender_card_token_id), Card);
        if attacker_card.current_dribble >= defender_card.current_defense {
            // Remove the passed defender from the board.
            defender.set_placement(j, Option::None);
        } else {
            defender_card.current_defense -= attacker_card.current_dribble;
        }
        if defender_card.current_dribble >= attacker_card.current_defense {
            // Remove the passed attacker from the board.
            attacker.set_placement(i, Option::None);
        } else {
            attacker_card.current_defense -= defender_card.current_dribble;
        }
        if i != 0 {
            i -= 1
        } else {
            j = 0
        };
        set!(world, (attacker_card, defender_card));
        false
    }


    fn execute(ctx: Context, game_id: felt252) {
        let mut game = get!(ctx.world, game_id, Game);
        check_turn(@game, @ctx.origin);
        let (attacker_address, defender_address) = if ctx.origin == game.player1 {
            (game.player1, game.player2)
        } else {
            (game.player2, game.player1)
        };
        let mut attacker = get!(ctx.world, (game_id, attacker_address), Player);
        let mut defender = get!(ctx.world, (game_id, defender_address), Player);

        let mut i: usize = 3;
        let mut j: usize = 3;
        let has_scored = loop {
            let has_scored = attack(ctx.world, ref i, ref j, ref attacker, ref defender);
            if has_scored {
                break true;
            }
            if i == 0 && j == 0 {
                break false;
            }
            if j == 0 {
                j = 3;
                i -= 1;
            }
            j -= 1;
        };
        if has_scored {
            if ctx.origin == game.player1 {
                game.player1_score += 1;
            } else {
                game.player2_score += 1;
            }
        }
        set!(ctx.world, (attacker, defender, game));
    }
}

