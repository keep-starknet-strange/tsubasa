use starknet::ContractAddress;
use option::{Option, OptionTrait};
use dojo::database::schema::{
    Enum, Member, Ty, Struct, SchemaIntrospection, serialize_member, serialize_member_type
};

#[cfg(test)]
use debug::PrintTrait;

/// Represents a playing card. It only contains the token id of the NFT.
#[derive(Model, Copy, Drop, Serde, PartialEq)]
struct Card {
    /// The token id in the NFT contract of this card.
    #[key]
    token_id: u256,
    /// Dribble statistic of the card.
    dribble: u8,
    /// Current dribble stat, depending on card placement
    current_dribble: u8,
    /// Defense statistic of the card.
    defense: u8,
    /// Current defense stat, depending on card placement
    current_defense: u8,
    /// Energy cost of the card.
    cost: u8,
    /// Assigned role
    role: Roles,
}

// impl SchemaIntrospectionCard of SchemaIntrospection<Card> {
//     #[inline(always)]
//     fn size() -> usize {
//         SchemaIntrospection::<u256>::size()
//             + 5 * SchemaIntrospection::<u8>::size()
//             + SchemaIntrospection::<Roles>::size()

//     }

//     #[inline(always)]
//     fn layout(ref layout: Array<u8>) {
//         SchemaIntrospection::<u256>::layout(ref layout);
//         SchemaIntrospection::<u8>::layout(ref layout);
//         SchemaIntrospection::<u8>::layout(ref layout);
//         SchemaIntrospection::<u8>::layout(ref layout);
//         SchemaIntrospection::<u8>::layout(ref layout);
//         SchemaIntrospection::<u8>::layout(ref layout);
//         SchemaIntrospection::<Roles>::layout(ref layout);
//     }

//     #[inline(always)]
//     fn ty() -> Ty {
//         Ty::Struct(
//             Struct {
//                 name: 'Card',
//                 attrs: array![].span(),
//                 children: array![
//                     serialize_member(
//                         @Member {
//                             name: 'token_id',
//                             ty: SchemaIntrospection::<u256>::ty(),
//                             attrs: array![].span()
//                         }
//                     ),
//                     serialize_member(
//                         @Member {
//                             name: 'dribble',
//                             ty: SchemaIntrospection::<u8>::ty(),
//                             attrs: array![].span()
//                         }
//                     ),
//                     serialize_member(
//                         @Member {
//                             name: 'current_dribble',
//                             ty: SchemaIntrospection::<u8>::ty(),
//                             attrs: array![].span()
//                         }
//                     ),
//                     serialize_member(
//                         @Member {
//                             name: 'defense',
//                             ty: SchemaIntrospection::<u8>::ty(),
//                             attrs: array![].span()
//                         }
//                     ),
//                     serialize_member(
//                         @Member {
//                             name: 'current_defense',
//                             ty: SchemaIntrospection::<u8>::ty(),
//                             attrs: array![].span()
//                         }
//                     ),
//                     serialize_member(
//                         @Member {
//                             name: 'cost',
//                             ty: SchemaIntrospection::<u8>::ty(),
//                             attrs: array![].span()
//                         }
//                     ),
//                     serialize_member(
//                         @Member {
//                             name: 'role',
//                             ty: SchemaIntrospection::<Roles>::ty(),
//                             attrs: array![].span()
//                         }
//                     ),
//                 ]
//                 .span()
//             }
//         )
//     }
// }

/// Available roles for cards
#[derive(Copy, PartialEq, Drop, Serde)]
enum Roles {
    Goalkeeper,
    Defender,
    Midfielder,
    Attacker,
}

impl RolesSchemaIntrospectionImpl of SchemaIntrospection<Roles> {
    #[inline(always)]
    fn size() -> usize {
        1
    }

    // todo what is it doing?
    #[inline(always)]
    fn layout(ref layout: Array<u8>) {
        layout.append(8);
    }

    #[inline(always)]
    fn ty() -> Ty {
        Ty::Enum(
            Enum {
                name: 'Roles',
                attrs: array![].span(),
                children: array![
                    ('Goalkeeper', serialize_member_type(@Ty::Tuple(array![].span()))),
                    ('Defender', serialize_member_type(@Ty::Tuple(array![].span()))),
                    ('Midfielder', serialize_member_type(@Ty::Tuple(array![].span()))),
                    ('Attacker', serialize_member_type(@Ty::Tuple(array![].span()))),
                ]
                    .span()
            }
        )
    }
}

/// Represents a game. As long as the winner is `None` the game isn't considered as finished.
#[derive(Model, Copy, Drop, Serde)]
struct Game {
    /// Game id, computed as follows pedersen_hash(player1_address, player2_address) ??
    #[key]
    game_id: felt252,
    /// player 1 address.
    player1: ContractAddress,
    /// player 2 address.
    player2: ContractAddress,
    /// Rounds won by the player 1.
    player1_score: u8,
    /// Rounds won by the player 2.
    player2_score: u8,
    /// Current turn of the round.
    turn: u128,
    /// Winner of the game. As long as it is `None` it means that the game is playing.
    outcome: Option<Outcome>,
}

// impl SchemaIntrospectionGame of SchemaIntrospection<Game> {
//     #[inline(always)]
//     fn size() -> usize {
//         SchemaIntrospection::<felt252>::size()
//             + 2 * SchemaIntrospection::<ContractAddress>::size()
//             + 2 * SchemaIntrospection::<u8>::size()
//             + SchemaIntrospection::<u128>::size()
//             + SchemaIntrospection::<Option<Outcome>>::size()
//     }

//     #[inline(always)]
//     fn layout(ref layout: Array<u8>) {
//         SchemaIntrospection::<felt252>::layout(ref layout);
//         SchemaIntrospection::<ContractAddress>::layout(ref layout);
//         SchemaIntrospection::<ContractAddress>::layout(ref layout);
//         SchemaIntrospection::<u8>::layout(ref layout);
//         SchemaIntrospection::<u8>::layout(ref layout);
//         SchemaIntrospection::<u128>::layout(ref layout);
//         SchemaIntrospection::<Option<Outcome>>::layout(ref layout);
//     }

//     #[inline(always)]
//     fn ty() -> Ty {
//         Ty::Struct(
//             Struct {
//                 name: 'Game',
//                 attrs: array![].span(),
//                 children: array![
//                     serialize_member(
//                         @Member {
//                             name: 'game_id',
//                             ty: SchemaIntrospection::<felt252>::ty(),
//                             attrs: array![].span()
//                         }
//                     ),
//                     serialize_member(
//                         @Member {
//                             name: 'player1',
//                             ty: SchemaIntrospection::<ContractAddress>::ty(),
//                             attrs: array![].span()
//                         }
//                     ),
//                     serialize_member(
//                         @Member {
//                             name: 'player2',
//                             ty: SchemaIntrospection::<ContractAddress>::ty(),
//                             attrs: array![].span()
//                         }
//                     ),
//                     serialize_member(
//                         @Member {
//                             name: 'player1_score',
//                             ty: SchemaIntrospection::<u8>::ty(),
//                             attrs: array![].span()
//                         }
//                     ),
//                     serialize_member(
//                         @Member {
//                             name: 'player2_score',
//                             ty: SchemaIntrospection::<u8>::ty(),
//                             attrs: array![].span()
//                         }
//                     ),
//                     serialize_member(
//                         @Member {
//                             name: 'turn',
//                             ty: SchemaIntrospection::<u128>::ty(),
//                             attrs: array![].span()
//                         }
//                     ),
//                     serialize_member(
//                         @Member {
//                             name: 'outcome',
//                             ty: SchemaIntrospection::<Option<Outcome>>::ty(),
//                             attrs: array![].span()
//                         }
//                     ),
//                 ]
//                 .span()
//             }
//         )
//     }
// }

/// State for deck's cards
#[derive(Copy, PartialEq, Drop, Serde)]
enum CardState {
    Hand,
    Deck
}

/// Represents each card of the 8 that exists in a player's deck
#[derive(Model, Copy, Drop, Serde, PrintTrait)]
struct DeckCard {
    #[key]
    player: ContractAddress,
    #[key]
    card_index: u8,
    token_id: u256,
    card_state: CardState,
    is_captain: bool
}

// impl SchemaIntrospectionDeckCard of SchemaIntrospection<DeckCard> {
//     #[inline(always)]
//     fn size() -> usize {
//         SchemaIntrospection::<ContractAddress>::size()
//             + SchemaIntrospection::<u8>::size()
//             + SchemaIntrospection::<u256>::size()
//             + SchemaIntrospection::<CardState>::size()
//             + SchemaIntrospection::<bool>::size()
//     }

//     #[inline(always)]
//     fn layout(ref layout: Array<u8>) {
//         SchemaIntrospection::<ContractAddress>::layout(ref layout);
//         SchemaIntrospection::<u8>::layout(ref layout);
//         SchemaIntrospection::<u256>::layout(ref layout);
//         SchemaIntrospection::<CardState>::layout(ref layout);
//         SchemaIntrospection::<bool>::layout(ref layout);
//     }

//     #[inline(always)]
//     fn ty() -> Ty {
//         Ty::Struct(
//             Struct {
//                 name: 'DeckCard',
//                 attrs: array![].span(),
//                 children: array![
//                     serialize_member(
//                         @Member {
//                             name: 'player',
//                             ty: SchemaIntrospection::<ContractAddress>::ty(),
//                             attrs: array![].span()
//                         }
//                     ),
//                     serialize_member(
//                         @Member {
//                             name: 'card_index',
//                             ty: SchemaIntrospection::<u8>::ty(),
//                             attrs: array![].span()
//                         }
//                     ),
//                     serialize_member(
//                         @Member {
//                             name: 'token_id',
//                             ty: SchemaIntrospection::<u256>::ty(),
//                             attrs: array![].span()
//                         }
//                     ),
//                     serialize_member(
//                         @Member {
//                             name: 'card_state',
//                             ty: SchemaIntrospection::<CardState>::ty(),
//                             attrs: array![].span()
//                         }
//                     ),
//                     serialize_member(
//                         @Member {
//                             name: 'is_captain',
//                             ty: SchemaIntrospection::<bool>::ty(),
//                             attrs: array![].span()
//                         }
//                     ),
//                 ]
//                 .span()
//             }
//         )
//     }
// }

impl CardStateSchemaIntrospectionImpl of SchemaIntrospection<CardState> {
    #[inline(always)]
    fn size() -> usize {
        1
    }

    #[inline(always)]
    fn layout(ref layout: Array<u8>) {
        layout.append(8);
    }

    #[inline(always)]
    fn ty() -> Ty {
        Ty::Enum(
            Enum {
                name: 'CardState',
                attrs: array![].span(),
                children: array![
                    ('Hand', serialize_member_type(@Ty::Tuple(array![].span()))),
                    ('Deck', serialize_member_type(@Ty::Tuple(array![].span()))),
                ]
                    .span()
            }
        )
    }
}

#[derive(Model, Copy, Drop, Serde, PrintTrait)]
struct Player {
    #[key]
    game_id: felt252,
    #[key]
    player: ContractAddress,
    goalkeeper: Option<(u256, Placement)>,
    defender: Option<(u256, Placement)>,
    midfielder: Option<(u256, Placement)>,
    attacker: Option<(u256, Placement)>,
    remaining_energy: u128,
}

// impl SchemaIntrospectionPlayer of SchemaIntrospection<Player> {
//     #[inline(always)]
//     fn size() -> usize {
//         SchemaIntrospection::<felt252>::size()
//             + SchemaIntrospection::<ContractAddress>::size()
//             + 4 * SchemaIntrospection::<Option<Placement>>::size()
//             + SchemaIntrospection::<u128>::size()
//     }

//     #[inline(always)]
//     fn layout(ref layout: Array<u8>) {
//         SchemaIntrospection::<felt252>::layout(ref layout);
//         SchemaIntrospection::<ContractAddress>::layout(ref layout);
//         SchemaIntrospection::<Option<Placement>>::layout(ref layout);
//         SchemaIntrospection::<Option<Placement>>::layout(ref layout);
//         SchemaIntrospection::<Option<Placement>>::layout(ref layout);
//         SchemaIntrospection::<Option<Placement>>::layout(ref layout);
//         SchemaIntrospection::<u128>::layout(ref layout);
//     }

//     #[inline(always)]
//     fn ty() -> Ty {
//         Ty::Struct(
//             Struct {
//                 name: 'Player',
//                 attrs: array![].span(),
//                 children: array![
//                     serialize_member(
//                         @Member {
//                             name: 'game_id',
//                             ty: SchemaIntrospection::<felt252>::ty(),
//                             attrs: array![].span()
//                         }
//                     ),
//                     serialize_member(
//                         @Member {
//                             name: 'player',
//                             ty: SchemaIntrospection::<ContractAddress>::ty(),
//                             attrs: array![].span()
//                         }
//                     ),
//                     serialize_member(
//                         @Member {
//                             name: 'goalkeeper',
//                             ty: SchemaIntrospection::<Option<Placement>>::ty(),
//                             attrs: array![].span()
//                         }
//                     ),
//                     serialize_member(
//                         @Member {
//                             name: 'defender',
//                             ty: SchemaIntrospection::<Option<Placement>>::ty(),
//                             attrs: array![].span()
//                         }
//                     ),
//                     serialize_member(
//                         @Member {
//                             name: 'midfielder',
//                             ty: SchemaIntrospection::<Option<Placement>>::ty(),
//                             attrs: array![].span()
//                         }
//                     ),
//                     serialize_member(
//                         @Member {
//                             name: 'attacker',
//                             ty: SchemaIntrospection::<Option<Placement>>::ty(),
//                             attrs: array![].span()
//                         }
//                     ),
//                     serialize_member(
//                         @Member {
//                             name: 'remaining_energy',
//                             ty: SchemaIntrospection::<u128>::ty(),
//                             attrs: array![].span()
//                         }
//                     ),
//                 ]
//                 .span()
//             }
//         )
//     }
// }
#[generate_trait]
impl GetSetPlacement of GetSetPlacementTrait {
    #[inline(always)]
    fn get_token_id(self: Player, i: usize) -> Option<u256> {
        if i == 0 {
            match self.goalkeeper {
                Option::Some((id, _)) => Option::Some(id),
                Option::None => Option::None,
            }
        } else if i == 1 {
            match self.defender {
                Option::Some((id, _)) => Option::Some(id),
                Option::None => Option::None,
            }
        } else if i == 2 {
            match self.midfielder {
                Option::Some((id, _)) => Option::Some(id),
                Option::None => Option::None,
            }
        } else if i == 3 {
            match self.attacker {
                Option::Some((id, _)) => Option::Some(id),
                Option::None => Option::None,
            }
        } else {
            Option::None
        }
    }


    #[inline(always)]
    fn set_placement(ref self: Player, i: usize, val: Option<(u256, Placement)>) {
        if i == 0 {
            self.goalkeeper = val;
        } else if i == 1 {
            self.defender = val;
        } else if i == 2 {
            self.midfielder = val;
        } else if i == 3 {
            self.attacker = val;
        }
    }
}

#[derive(Drop, Copy, Serde)]
enum Placement {
    Side,
    Field
}

// #[generate_trait]
// impl GetTokenId of GetTokenIdTrait {
//     #[inline(always)]
//     fn get_token_id(self: Option<Placement>) -> Option<u256> {
//         match self {
//             Option::Some(placement) => {
//                 match placement {
//                     Placement::Side(_) => Option::None,
//                     Placement::Field(val) => Option::Some(val),
//                 }
//             },
//             Option::None => Option::None,
//         }
//     }
// }

#[derive(Model, Copy, Drop, Serde, PartialEq)]
enum Outcome {
    Player1,
    Player2,
    Draw,
}

impl OptionOutcomeIntrospection of SchemaIntrospection<Option<Outcome>> {
    #[inline(always)]
    fn size() -> usize {
        // 1 (option variant) + 1 (variant id size) + 1 (value contained by the variant)
        3
    }

    #[inline(always)]
    fn layout(ref layout: Array<u8>) {
        layout.append(8);
    }

    #[inline(always)]
    fn ty() -> Ty {
        Ty::Enum(
            Enum {
                name: 'Outcome',
                attrs: array![].span(),
                children: array![
                    ('Player1', serialize_member_type(@Ty::Tuple(array![].span()))),
                    ('Player2', serialize_member_type(@Ty::Tuple(array![].span()))),
                    ('Draw', serialize_member_type(@Ty::Tuple(array![].span()))),
                ]
                    .span()
            }
        )
    }
}

impl OptionPlacementSchemaIntrospectionImpl of SchemaIntrospection<Option<(u256, Placement)>> {
    #[inline(always)]
    fn size() -> usize {
        // 1 (option variant) +  1 (variant id size) + 2 (value contained by the variant)
        6
    }

    #[inline(always)]
    fn layout(ref layout: Array<u8>) {
        layout.append(128);
        layout.append(8);
    }

    #[inline(always)]
    fn ty() -> Ty {
        Ty::Tuple(array![array![].span()].span())
    // Ty::Enum(
    //     Enum {
    //         name: 'Outcome',
    //         attrs: array![].span(),
    //         children: array![
    //             ('Side', serialize_member_type(@Ty::Tuple(array![].span()))),
    //             ('Field', serialize_member_type(@Ty::Tuple(array![].span()))),]
    //             .span()
    //     }
    // )
    }
}
// #[generate_trait]
// impl PlayerImpl of PlayerTrait {
//     /// Moves a card on the field if necessary.
//     #[inline(always)]
//     fn update_card_placement(ref self: Option<Placement>) {
//         self = match self {
//             Option::Some(placement) => {
//                 match placement {
//                     Placement::Side(card_id) => Option::Some(Placement::Field(card_id)),
//                     Placement::Field(card_id) => Option::Some(Placement::Field(card_id)),
//                 }
//             },
//             Option::None => Option::None
//         }
//     }
// }

#[generate_trait]
impl PlayerImpl of PlayerTrait {
    /// Moves a card on the field if necessary.
    #[inline(always)]
    fn update_card_placement(ref self: Option<(u256, Placement)>) {
        self = match self {
            Option::Some(placement) => {
                let (id, placement) = placement;
                Option::Some((id, Placement::Field))
            },
            Option::None => Option::None
        }
    }
}


#[cfg(test)]
impl OutcomePrint of debug::PrintTrait<Option<Outcome>> {
    fn print(self: Option<Outcome>) {
        match self {
            Option::Some(Outcome) => {
                match Outcome {
                    Outcome::Player1(address) => {
                        'Player1 :'.print();
                    // address.print();
                    },
                    Outcome::Player2(address) => {
                        'Player2 :'.print();
                    // address.print();
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

#[cfg(test)]
impl RolesPrint of debug::PrintTrait<Roles> {
    fn print(self: Roles) {
        match self {
            Roles::Goalkeeper => 'Goalkeeper'.print(),
            Roles::Defender => 'Defender'.print(),
            Roles::Midfielder => 'Midfielder'.print(),
            Roles::Attacker => 'Attacker'.print(),
        }
    }
}

#[cfg(test)]
impl PlacementPrint of debug::PrintTrait<Option<Placement>> {
    fn print(self: Option<Placement>) {
        match self {
            Option::Some(val) => match val {
                Placement::Side(card_id) => {
                    ('Side '.print());
                },
                Placement::Field(card_id) => {
                    ('Field '.print());
                },
            },
            Option::None => 'None'.print(),
        }
    }
}

#[cfg(test)]
impl CardStatePrint of debug::PrintTrait<CardState> {
    fn print(self: CardState) {
        match self {
            CardState::Hand => 'Hand'.print(),
            CardState::Deck => 'Deck'.print(),
        }
    }
}
