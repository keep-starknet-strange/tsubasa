#[system]
mod attack_system {
    use dojo::world::Context;
    use traits::Into;
    use traits::TryInto;
    use option::{Option, OptionTrait};
    use tsubasa::components::{Game, Card, Roles, Placement, Player};
    use tsubasa::events::EndTurn;
    use debug::PrintTrait;

    /// * `ctx` - Dojo context.
    /// * `game_id` - The current game_id.
    /// * `card_id_player1` - The token id of the card placed.
    /// * `card_id_player2` - The token id of the card placed.
    /// Placement, Player
    fn execute(ctx: Context, game_id: felt252, card_id_player1: felt252, card_id_player2: felt252) {
        let game = get!(ctx.world, game_id, Game);

        let mut card_id_player1: u256 = card_id_player1.into();
        let mut card_id_player2: u256 = card_id_player2.into();

        let card_player1 = get!(ctx.world, card_id_player1, Card);
        let card_player2 = get!(ctx.world, card_id_player2, Card);

        let game_player_key: (felt252, felt252) = (game_id, ctx.origin.into());
        let game_player2_key: (felt252, felt252) = (game_id, game.player2.into());

        let mut player1 = get!(ctx.world, game_player_key, Player);
        let mut player2 = get!(ctx.world, game_player2_key, Player);

        //We set a value as boolean replacement to match the Roles
        let mut value = 0;
        match card_player1.role {
            Roles::Goalkeeper => value = 0,
            Roles::Defender => value = 0,
            Roles::Midfielder => value = 0,
            Roles::Attacker => value = 1,
        }

        if value == 1 {
            //If the card_player1 can dribble the current card_player2
            if card_player1.dribble > card_player2.defense {
                //If the card_player2 have more dribble stat than the player1 defense ,we set the current defense to 0 to avoid an underflow
                if card_player2.dribble >= card_player1.current_defense {
                    set!(
                        ctx.world, Card {
                            token_id: card_id_player1.into(),
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
                            token_id: card_id_player1.into(),
                            dribble: card_player1.dribble,
                            current_dribble: card_player1.current_dribble,
                            defense: card_player1.defense,
                            current_defense: card_player1.current_defense - card_player2.dribble,
                            cost: card_player1.cost,
                            role: card_player1.role,
                            is_captain: card_player1.is_captain
                        }
                    );
                    'Attack condition 2'.print(); //print for test prupose
                }

                //We remove the card_id_player2 from the field depending on is position
                match card_player2.role {
                    Roles::Goalkeeper => {
                        //assert(!player2.goalkeeper.is_none(), 'Goalkeeper already remove');
                        player2.goalkeeper = Option::None(());
                    },
                    Roles::Defender => {
                        //assert(!player2.defender.is_none(), 'Defender already remove');
                        player2.defender = Option::None(());
                    },
                    Roles::Midfielder => {
                        //assert(!player2.midfielder.is_none(), 'Midfielder already remove');
                        player2.midfielder = Option::None(());
                    },
                    Roles::Attacker => {
                        //assert(!player2.attacker.is_none(), 'Attacker already remove');
                        player2.attacker = Option::None(());
                    }
                }
                set!(ctx.world, (player2));
            } else {
                //If the Attacker didn't pass the card_player2 => Remove player1Card From the field, end of the turn 
                player1.attacker = Option::None(());
                set!(ctx.world, (player1));

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

