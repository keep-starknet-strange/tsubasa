use tsubasa::models::Player;
use dojo::world::IWorldDispatcher;

#[starknet::interface]
trait IAttack<TContractState> {
    fn attack(self: @TContractState, world: IWorldDispatcher, game_id: felt252) -> ();
}

#[system]
mod attack_system {
    use tsubasa::models::PlayerTrait;
    use super::IAttack;
    use tsubasa::models::{Game, Placement, Player, Card};
    use tsubasa::systems::check_turn;
    use option::OptionTrait;
    use debug::PrintTrait;
    // use dojo::world::IWorldDispatcher;

    fn internal_attack(
        world: IWorldDispatcher,
        ref i: usize,
        ref j: usize,
        ref attacker: Player,
        ref defender: Player
    ) -> bool {
        let attacker_card_placement = attacker.get_card_placement(i);
        let defender_card_placement = defender.get_card_placement(j);
        if attacker_card_placement != Placement::Field {
            return false;
        }
        if defender_card_placement != Placement::Field && j == 0 {
            return true;
        }
        if defender_card_placement != Placement::Field {
            return false;
        }
        let attacker_card_token_id = attacker.get_card_token_id(i);
        let defender_card_token_id = defender.get_card_token_id(j);

        let mut attacker_card = get!(world, (attacker_card_token_id), Card);
        let mut defender_card = get!(world, (defender_card_token_id), Card);
        if attacker_card.current_dribble >= defender_card.current_defense {
            // Remove the passed defender from the board.
            defender.reset_card_placement(j);
        } else {
            defender_card.current_defense -= attacker_card.current_dribble;
        }
        if defender_card.current_dribble >= attacker_card.current_defense {
            // Remove the passed attacker from the board.
            attacker.reset_card_placement(i);
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

    #[external(v0)]
    impl AttackImpl of IAttack<ContractState> {
        fn attack(self: @ContractState, world: IWorldDispatcher, game_id: felt252) {
            let mut game = get!(world, game_id, Game);
            // check_turn(@game, @starknet::get_caller_address());
            let (attacker_address, defender_address) = if starknet::get_caller_address() == game
                .player1 {
                (game.player1, game.player2)
            } else {
                (game.player2, game.player1)
            };
            let mut attacker = get!(world, (game_id, attacker_address), Player);
            let mut defender = get!(world, (game_id, defender_address), Player);

            let mut i: usize = 3;
            let mut j: usize = 3;
            let has_scored = loop {
                let has_scored = internal_attack(world, ref i, ref j, ref attacker, ref defender);
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
                if starknet::get_caller_address() == game.player1 {
                    game.player1_score += 1;
                } else {
                    game.player2_score += 1;
                }
            }
            set!(world, (attacker, defender, game));
        }
    }
}

