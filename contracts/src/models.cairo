use starknet::ContractAddress;

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

/// Available roles for cards
#[derive(Copy, PartialEq, Drop, Serde)]
enum Roles {
    Goalkeeper,
    Defender,
    Midfielder,
    Attacker,
}

impl RolesSchemaIntrospectionImpl of SchemaIntrospection<Roles> {
    /// The [Roles] enum is a simple enum where each variant doesn't hold
    /// any data so it's size is only the size of the variant which is 1.
    #[inline(always)]
    fn size() -> usize {
        1
    }

    /// The [Roles] enum is a simple enum with less than 255 variants so
    /// the max variant value will be less than u8::MAX.
    #[inline(always)]
    fn layout(ref layout: Array<u8>) {
        layout.append(8);
    }

    /// Dojo type definition of the enum.
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

/// Represents a game. As long as the outcome is `Pending` the game isn't considered as finished.
/// We're not using an [Option] here because it makes everything harder with dojo.
#[derive(Model, Copy, Drop, Serde)]
struct Game {
    /// Game id, computed as follows pedersen_hash(player1_address, player2_address) 
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
    /// Winner of the game. As long as it is `Pending` it means that the game is playing.
    outcome: Outcome,
}

/// State for deck's cards
#[derive(Copy, PartialEq, Drop, Serde)]
enum CardState {
    /// The player has drawn the card.
    Hand,
    /// The player hasn't draw the card.
    Deck
}

/// Represents each card of the 8 that exists in a player's deck
#[derive(Model, Copy, Drop, Serde, PrintTrait)]
struct DeckCard {
    /// Owner.
    #[key]
    player: ContractAddress,
    /// Index of the card in the player's deck.
    #[key]
    card_index: u8,
    /// Token id of the NFT representing the card.
    token_id: u256,
    /// Card is in the Hand | Deck.
    card_state: CardState,
    /// Is the card captain of the team (+1/+1).
    is_captain: bool
}

impl CardStateSchemaIntrospectionImpl of SchemaIntrospection<CardState> {
    /// The [CardState] enum is a simple enum where each variant doesn't hold
    /// any data so it's size is only the size of the variant which is 1.
    #[inline(always)]
    fn size() -> usize {
        1
    }

    /// The [CardState] enum is a simple enum with less than 255 variants so
    /// the max variant value will be less than u8::MAX.
    #[inline(always)]
    fn layout(ref layout: Array<u8>) {
        layout.append(8);
    }

    /// Dojo type definition of the enum.
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

/// Reprensents a player's board during a game.
#[derive(Model, Copy, Drop, Serde, PrintTrait)]
struct Player {
    /// Id of the game.
    #[key]
    game_id: felt252,
    /// Address of the player.
    #[key]
    player: ContractAddress,
    /// Where is the goalkeeper.
    goalkeeper_placement: Placement,
    /// Token id of the card placed on the goalkeeper slot.
    goalkeeper_id: u256,
    /// Where is the defender.
    defender_placement: Placement,
    /// Token id of the card placed on the defender slot.
    defender_id: u256,
    /// Where is the midfielder.
    midfielder_placement: Placement,
    /// Token id of the card placed on the midfielder slot.
    midfielder_id: u256,
    /// Where is the attacker.
    attacker_placement: Placement,
    /// Token id of the card placed on the goalkeeper slot.
    attacker_id: u256,
    /// Remaining energy of the player for the current turn.
    remaining_energy: u128,
}

/// Represents the placement of a card during a game.
#[derive(Drop, Copy, Serde, PartialEq, SchemaIntrospection)]
enum Placement {
    /// Card is waiting for the begining of the next turn to be active.
    Side,
    /// Card is active on the field.
    Field,
    /// Nothing is on this slot. (Replaces the option which is not very convinient with dojo).
    Outside
}

impl PlacementSchemaIntrospectionImpl of SchemaIntrospection<Placement> {
    /// The [Placement] enum is a simple enum where each variant doesn't hold
    /// any data so it's size is only the size of the variant which is 1.
    #[inline(always)]
    fn size() -> usize {
        1
    }

    /// The [Placement] enum is a simple enum with less than 255 variants so
    /// the max variant value will be less than u8::MAX.
    #[inline(always)]
    fn layout(ref layout: Array<u8>) {
        layout.append(8);
    }

    /// Dojo type definition of the enum.
    #[inline(always)]
    fn ty() -> Ty {
        Ty::Enum(
            Enum {
                name: 'Placement',
                attrs: array![].span(),
                children: array![
                    ('Side', serialize_member_type(@Ty::Tuple(array![].span()))),
                    ('Field', serialize_member_type(@Ty::Tuple(array![].span()))),
                    ('Outside', serialize_member_type(@Ty::Tuple(array![].span()))),
                ]
                    .span()
            }
        )
    }
}

/// Reprensents the outcome of a game.
#[derive(Model, Copy, Drop, Serde, PartialEq, SchemaIntrospection)]
enum Outcome {
    /// Player 1 won.
    Player1,
    /// Player 2 won.
    Player2,
    /// Game is still playing.
    Pending,
}

impl OutcomeIntrospection of SchemaIntrospection<Outcome> {
    /// The [Outcome] enum is a simple enum where each variant doesn't hold
    /// any data so it's size is only the size of the variant which is 1.
    #[inline(always)]
    fn size() -> usize {
        // 1 (option variant) + 1 (variant id size) + 1 (value contained by the variant)
        1
    }

    /// The [Outcome] enum is a simple enum with less than 255 variants so
    /// the max variant value will be less than u8::MAX.
    #[inline(always)]
    fn layout(ref layout: Array<u8>) {
        layout.append(8);
    }

    /// Dojo type definition of the enum.
    #[inline(always)]
    fn ty() -> Ty {
        Ty::Enum(
            Enum {
                name: 'Outcome',
                attrs: array![].span(),
                children: array![
                    ('Player1', serialize_member_type(@Ty::Tuple(array![].span()))),
                    ('Player2', serialize_member_type(@Ty::Tuple(array![].span()))),
                    ('Pending', serialize_member_type(@Ty::Tuple(array![].span()))),
                    ('Draw', serialize_member_type(@Ty::Tuple(array![].span()))),
                ]
                    .span()
            }
        )
    }
}

#[generate_trait]
impl PlayerImpl of PlayerTrait {
    /// Moves a card on the field if necessary.
    #[inline(always)]
    fn update_card_placement(ref self: Placement) {
        self = match self {
            Placement::Side => Placement::Field,
            Placement::Field => Placement::Field,
            Placement::Outside => Placement::Outside,
        }
    }

    /// Returns the card [Placement].
    ///
    /// # Arguments
    ///
    /// * `card_nb` - The number of the card (0 => goalkeeper, 1 => defender, 2 => midfielder, 3 => attacker)
    ///
    /// # Returns
    ///
    /// `[Placement]` - The placement of the card.
    #[inline(always)]
    fn get_card_placement(self: Player, card_nb: usize) -> Placement {
        if card_nb == 0 {
            self.goalkeeper_placement
        } else if card_nb == 1 {
            self.defender_placement
        } else if card_nb == 2 {
            self.midfielder_placement
        } else if card_nb == 3 {
            self.attacker_placement
        } else {
            panic_with_felt252('Out of bound card nb')
        }
    }

    /// Returns the card token id.
    ///
    /// # Arguments
    ///
    /// * `card_nb` - The number of the card (0 => goalkeeper, 1 => defender, 2 => midfielder, 3 => attacker)
    ///
    /// # Returns
    ///
    /// `[u256]` - The token id of the card.
    #[inline(always)]
    fn get_card_token_id(self: Player, card_nb: usize) -> u256 {
        if card_nb == 0 {
            self.goalkeeper_id
        } else if card_nb == 1 {
            self.defender_id
        } else if card_nb == 2 {
            self.midfielder_id
        } else if card_nb == 3 {
            self.attacker_id
        } else {
            panic_with_felt252('Out of bound card nb')
        }
    }

    /// Set the card placement to [Placement::Outside].
    ///
    /// # Arguments
    ///
    /// * `card_nb` - The number of the card (0 => goalkeeper, 1 => defender, 2 => midfielder, 3 => attacker)
    #[inline(always)]
    fn reset_card_placement(ref self: Player, card_nb: usize) {
        if card_nb == 0 {
            self.goalkeeper_placement = Placement::Outside;
        } else if card_nb == 1 {
            self.defender_placement = Placement::Outside;
        } else if card_nb == 2 {
            self.midfielder_placement = Placement::Outside;
        } else if card_nb == 3 {
            self.attacker_placement = Placement::Outside;
        } else {
            panic_with_felt252('Out of bound card nb');
        }
    }
}


#[cfg(test)]
impl OutcomePrint of debug::PrintTrait<Outcome> {
    fn print(self: Outcome) {
        match self {
            Outcome::Player1(address) => {
                'Player1 :'.print(); // address.print();
            },
            Outcome::Player2(address) => {
                'Player2 :'.print(); // address.print();
            },
            Outcome::Pending => { 'Pending'.print(); },
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
impl PlacementPrint of debug::PrintTrait<Placement> {
    fn print(self: Placement) {
        match self {
            Placement::Side => { ('Side '.print()); },
            Placement::Field => { ('Field '.print()); },
            Placement::Outside => { ('Outside '.print()); },
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
