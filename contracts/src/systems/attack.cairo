#[system]
mod attack_system {
    use dojo::world::Context;
    use traits::Into;
    use traits::TryInto;
    use option::{Option, OptionTrait};
    use tsubasa::components::{Game, Card, Roles, Placement, Player};
    use tsubasa::events::EndTurn;
    use debug::PrintTrait;


    fn return_cardId(self: Option<Placement>) -> u256 {
        match self {
            Option::Some(val) => match val {
                Placement::Side(card_id) => {
                    // ( card_id.print());
                    card_id
                },
                Placement::Field(card_id) => {
                    //('Field '.print(), card_id.print());
                    card_id
                },
            },
            Option::None => 0
        }
    }

    fn remove_card(ctx: Context, player_role: Roles, game_player_key: felt252) -> bool {
        let mut player = get!(ctx.world, game_player_key, Player);

        match player_role {
            Roles::Goalkeeper => {
                //assert(!player2.goalkeeper.is_none(), 'Goalkeeper already remove');
                player.goalkeeper = Option::None(());
            },
            Roles::Defender => {
                //assert(!player2.defender.is_none(), 'Defender already remove');
                player.defender = Option::None(());
            },
            Roles::Midfielder => {
                player.midfielder = Option::None(());
            },
            Roles::Attacker => {
                player.attacker = Option::None(());
            }
        }
        set!(ctx.world, (player));
        true
    }

    fn attack_execute(
        ctx: Context, game_id: felt252, card_id_player1: u256, card_id_player2: u256
    ) {
        let game = get!(ctx.world, game_id, Game);

        let card_player1 = get!(ctx.world, card_id_player1, Card);
        let card_player2 = get!(ctx.world, card_id_player2, Card);

        let game_player_key: (felt252, felt252) = (game_id, game.player1.into());
        let game_player2_key: (felt252, felt252) = (game_id, game.player2.into());

        let mut player1 = get!(ctx.world, game_player_key, Player);
        let mut player2 = get!(ctx.world, game_player2_key, Player);

        if card_player1.dribble > card_player2.defense {
            // If the card_player2 has more dribbling status than the player1 defense ,we set the current defense to 0 to avoid an underflow
            if card_player2.dribble >= card_player1.current_defense {
                set!(
                    ctx.world, Card {
                        token_id: card_id_player1,
                        dribble: card_player1.dribble,
                        current_dribble: card_player1.current_dribble,
                        defense: card_player1.defense,
                        current_defense: 0,
                        cost: card_player1.cost,
                        role: card_player1.role,
                        is_captain: card_player1.is_captain
                    }
                );
                // we remove the player1 attacker
                // player1.attacker = Option::None(());
                // set!(ctx.world, (player2));
                'Attack condition 1'.print();
            } else {
                set!(
                    ctx.world, Card {
                        token_id: card_id_player1,
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

            // We remove the card_id_player2 from the field according to its position
            match card_player2.role {
                Roles::Goalkeeper => {
                    //assert(!player2.goalkeeper.is_none(), 'Goalkeeper already remove');
                    player2.goalkeeper = Option::None(());
                },
                Roles::Defender => {
                    //assert(!player2.defender.is_none(), 'Defender already remove');
                    player2.defender = Option::None(());
                    'defender remove'.print(); //print for test prupose
                },
                Roles::Midfielder => {
                    player2.midfielder = Option::None(());
                    'midfielder remove'.print(); //print for test prupose
                },
                Roles::Attacker => {
                    player2.attacker = Option::None(());
                }
            }
            set!(ctx.world, (player2));
            'afet set'.print(); //print for test prupose
        } else {
            'Attack condition 3'.print(); //print for test prupose

            // If the Attacker did not dribble the card_player2 => Remove player1 Card From the field + end of the turn 
            player1.attacker = Option::None(());
            set!(ctx.world, (player1));

            let game = get!(ctx.world, game_id, Game);
        }
    }


    /// * `ctx` - Dojo context.
    /// * `game_id` - The current game_id.
    /// * `card_id_player1` - The token id of the card placed.
    /// * `card_id_player2` - The token id of the card placed.
    fn execute(ctx: Context, game_id: felt252) {
        let game = get!(ctx.world, game_id, Game);

        let game_player_key: (felt252, felt252) = (game_id, ctx.origin.into());
        let game_player2_key: (felt252, felt252) = (game_id, game.player2.into());

        let mut player1 = get!(ctx.world, game_player_key, Player);
        let mut player2 = get!(ctx.world, game_player2_key, Player);

        let Player1_Goalkeeper_Id = return_cardId(player1.goalkeeper);
        let Player1_Defender_Id = return_cardId(player1.defender);
        let Player1_Midfielder_Id = return_cardId(player1.midfielder);
        let Player1_Attacker_Id = return_cardId(player1.attacker);

        let Playe2_Goalkeeper_Id = return_cardId(player2.goalkeeper);
        let Player2_Defender_Id = return_cardId(player2.defender);
        let Player2_Midfielder_Id = return_cardId(player2.midfielder);
        let Player2_Attacker_Id = return_cardId(player2.attacker);

        let Player1_Attacker_Card = get!(ctx.world, Player1_Attacker_Id, Card);

        // => midfielder => defense => goalkeeper
        if (Player1_Attacker_Id != 0 && Player2_Midfielder_Id != 0) {
            // If the card_player1 can dribble the current card_player2
            attack_execute(ctx, game_id, Player1_Attacker_Id, Player2_Midfielder_Id);
        }

        if (Player1_Attacker_Card.current_defense != 0 && Player2_Defender_Id != 0) {
            // If the card_player1 can dribble the current card_player2
            attack_execute(ctx, game_id, Player1_Attacker_Id, Player2_Defender_Id);
        }

        if (Player1_Attacker_Card.current_defense != 0 && Playe2_Goalkeeper_Id != 0) {
            // If the card_player1 can dribble the current card_player2
            attack_execute(ctx, game_id, Player1_Attacker_Id, Playe2_Goalkeeper_Id);
        }

        //if the player2 goalkeeper is none, the player1 passed and win
        if (player2.goalkeeper.is_none()) { 
            
        //let mut game = get!(ctx.world, game_id, Game);
        //game.outcome = Option::Some(game.player1,game.player2,true);
        //set!(ctx.world, (game));
        }
    }
}
