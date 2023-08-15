#[system]
mod attack_system {
    use dojo::world::Context;
    use traits::Into;
    use traits::TryInto;
    use option::{Option, OptionTrait};
    use tsubasa::components::{Game, Energy, Card};
    use tsubasa::components::Roles;
    use tsubasa::events::{EndTurn};
    use debug::PrintTrait;

    fn execute(
        ctx: Context, game_id: felt252, token_id_player1: felt252, token_id_player2: felt252
    ) {
        let game = get!(ctx.world, game_id, Game);

        let mut token_id_player1: u256 = token_id_player1.into(); 
        let mut token_id_player2: u256 = token_id_player2.into();

        let card_player1 = get!(ctx.world, token_id_player1, Card);
        let card_player2 = get!(ctx.world, token_id_player2, Card);


        //We set a value as boolean replacement to match the Roles
        let mut value = 1;
        match card_player1.role {
            Roles::Goalkeeper => 'Goalkeepers'.print(),
            Roles::Defender => 'Defender'.print(),
            Roles::Midfielder => 'Midfielder'.print(),
            Roles::Attacker => value = 1,
        }


        if value == 1 {
            //If the card_player1 can dribble the current card_player2
            if card_player1.dribble > card_player2.defense {
                //If the card_player2 have more dribble stat than the player1 defense ,we set the current defense to 0 to avoid an underflow
                if card_player2.dribble >= card_player1.current_defense {
                    set!(
                        ctx.world, Card {
                            token_id: token_id_player1.into(),
                            dribble: card_player1.dribble,
                            current_dribble: card_player1.current_dribble,
                            defense: card_player1.defense,
                            current_defense: 0,
                            cost: card_player1.cost,
                            role: card_player1.role,
                            is_captain: card_player1.is_captain
                        }
                    );
                    'Attack condition 1'.print();
                } else {
                    set!(
                        ctx.world, Card {
                            token_id: token_id_player1.into(),
                            dribble: card_player1.dribble,
                            current_dribble: card_player1.current_dribble,
                            defense: card_player1.defense,
                            current_defense: card_player1.current_defense - card_player2.dribble,
                            cost: card_player1.cost,
                            role: card_player1.role,
                            is_captain: card_player1.is_captain
                        }
                    );
                    'Attack condition 2'.print();
                }
            // TO-DO : Add an remove  card_player2 function
            } else {
                //If the Attacker didn't pass the card_player2 => end of the turn 
                let game = get!(ctx.world, game_id, Game);

                set!(
                    ctx.world, Game {
                        game_id,
                        player1: game.player1,
                        player2: game.player2,
                        player1_score: game.player1_score,
                        player2_score: game.player2_score,
                        turn: game.turn + 1,
                        outcome: game.outcome
                    }
                );
            }
        }
    }
}

