mod attack;
mod end_turn;
mod place_card;
mod create_game;
mod join_game;
mod create_card;
mod create_deck;

use attack::attack_system;
use attack::IAttackDispatcher;
use attack::IAttackDispatcherTrait;

use end_turn::end_turn_system;
use end_turn::IEndTurnDispatcher;
use end_turn::IEndTurnDispatcherTrait;

use place_card::place_card_system;
use place_card::IPlaceCardDispatcher;
use place_card::IPlaceCardDispatcherTrait;

use create_game::create_game_system;
use create_game::ICreateGameDispatcher;
use create_game::ICreateGameDispatcherTrait;

use join_game::join_game_system;
use join_game::IJoinGameDispatcher;
use join_game::IJoinGameDispatcherTrait;

use create_card::create_card_system;
use create_card::ICreateCardDispatcher;
use create_card::ICreateCardDispatcherTrait;

use utils::check_turn;
use create_deck::create_deck_system;
use create_deck::ICreateDeckDispatcher;
use create_deck::ICreateDeckDispatcherTrait;


mod utils {
    use starknet::{ContractAddress, get_caller_address};
    use integer::U128Rem;

    use tsubasa::models::Game;

    #[inline(always)]
    fn check_turn(game: @Game, origin: @ContractAddress) {
        let is_player2_turn = U128Rem::rem(*game.turn, 2);
        if is_player2_turn == 1 {
            assert(origin == game.player2, 'Player 2\'s turn');
        } else {
            assert(origin == game.player1, 'Player 1\'s turn')
        }
    }
}
