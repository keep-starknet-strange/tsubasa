use starknet::ContractAddress;
use debug::PrintTrait;


/// Represents a playing card. It only contains the token id of the NFT.
#[derive(Component, Copy, Drop, Serde, SerdeLen)]
struct Card {
    /// The token id in the NFT contract of this card.
    #[key]
    token_id: u256,
    /// Attack statistic of the card.
    attack: u8,
    /// Defense statistic of the card.
    defense: u8,
    /// Energy cost of the card.
    cost: u8,
}

/// Represents a game. As long as the winner is `None` the game isn't considered as finished.
#[derive(Component, Copy, Drop, Serde, SerdeLen)]
struct Game {
    /// Game id, computed as follows pedersen_hash(player1_address, player2_address)
    #[key]
    game_id: felt252,
    /// Rounds won by the player 1.
    player1_score: u8,
    /// Rounds won by the player 2.
    player2_score: u8,
    /// Current turn of the round.
    turn: felt252,
    /// Winner of the game. As long as it is `None` it means that the game is playing.
    outcome: Option<Outcome>,
}

#[derive(Component, Copy, Drop, Serde)]
enum Outcome {
    Player1: ContractAddress,
    Player2: ContractAddress,
    Draw: bool,
}

impl PlayerSerdeLen of dojo::SerdeLen<Option<Outcome>> {
    #[inline(always)]
    fn len() -> usize {
        // 1 (variant id size) + 1 (value contained by the variant)
        2
    }
}

impl OutcomePrint of debug::PrintTrait<Option<Outcome>> {
    fn print(self: Option<Outcome>) {
        match self {
            Option::Some(Outcome) => {
                match Outcome {
                    Outcome::Player1(address) => {
                        'Player1 :'.print();
                        address.print();
                    },
                    Outcome::Player2(address) => {
                        'Player2 :'.print();
                        address.print();
                    },
                    Outcome::Draw => {
                        'Is Draw:'.print();
                    }
                }
            },
            Option::None(_) => {
                'None'.print();
            },
        }
    }
}
