import { GraphQLClient } from 'graphql-request';
import { GraphQLClientRequestHeaders } from 'graphql-request/build/cjs/types';
import { print } from 'graphql'
import gql from 'graphql-tag';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  ContractAddress: { input: any; output: any; }
  Cursor: { input: any; output: any; }
  DateTime: { input: any; output: any; }
  Enum: { input: any; output: any; }
  bool: { input: any; output: any; }
  felt252: { input: any; output: any; }
  u8: { input: any; output: any; }
  u128: { input: any; output: any; }
  u256: { input: any; output: any; }
};

export type Card = {
  __typename?: 'Card';
  cost?: Maybe<Scalars['u8']['output']>;
  current_defense?: Maybe<Scalars['u8']['output']>;
  current_dribble?: Maybe<Scalars['u8']['output']>;
  defense?: Maybe<Scalars['u8']['output']>;
  dribble?: Maybe<Scalars['u8']['output']>;
  entity?: Maybe<Entity>;
  role?: Maybe<Scalars['Enum']['output']>;
  token_id?: Maybe<Scalars['u256']['output']>;
};

export type CardConnection = {
  __typename?: 'CardConnection';
  edges?: Maybe<Array<Maybe<CardEdge>>>;
  total_count: Scalars['Int']['output'];
};

export type CardEdge = {
  __typename?: 'CardEdge';
  cursor?: Maybe<Scalars['Cursor']['output']>;
  node?: Maybe<Card>;
};

export type CardOrder = {
  direction: OrderDirection;
  field: CardOrderField;
};

export enum CardOrderField {
  Cost = 'COST',
  CurrentDefense = 'CURRENT_DEFENSE',
  CurrentDribble = 'CURRENT_DRIBBLE',
  Defense = 'DEFENSE',
  Dribble = 'DRIBBLE',
  Role = 'ROLE',
  TokenId = 'TOKEN_ID'
}

export type CardWhereInput = {
  cost?: InputMaybe<Scalars['u8']['input']>;
  costEQ?: InputMaybe<Scalars['u8']['input']>;
  costGT?: InputMaybe<Scalars['u8']['input']>;
  costGTE?: InputMaybe<Scalars['u8']['input']>;
  costLT?: InputMaybe<Scalars['u8']['input']>;
  costLTE?: InputMaybe<Scalars['u8']['input']>;
  costNEQ?: InputMaybe<Scalars['u8']['input']>;
  current_defense?: InputMaybe<Scalars['u8']['input']>;
  current_defenseEQ?: InputMaybe<Scalars['u8']['input']>;
  current_defenseGT?: InputMaybe<Scalars['u8']['input']>;
  current_defenseGTE?: InputMaybe<Scalars['u8']['input']>;
  current_defenseLT?: InputMaybe<Scalars['u8']['input']>;
  current_defenseLTE?: InputMaybe<Scalars['u8']['input']>;
  current_defenseNEQ?: InputMaybe<Scalars['u8']['input']>;
  current_dribble?: InputMaybe<Scalars['u8']['input']>;
  current_dribbleEQ?: InputMaybe<Scalars['u8']['input']>;
  current_dribbleGT?: InputMaybe<Scalars['u8']['input']>;
  current_dribbleGTE?: InputMaybe<Scalars['u8']['input']>;
  current_dribbleLT?: InputMaybe<Scalars['u8']['input']>;
  current_dribbleLTE?: InputMaybe<Scalars['u8']['input']>;
  current_dribbleNEQ?: InputMaybe<Scalars['u8']['input']>;
  defense?: InputMaybe<Scalars['u8']['input']>;
  defenseEQ?: InputMaybe<Scalars['u8']['input']>;
  defenseGT?: InputMaybe<Scalars['u8']['input']>;
  defenseGTE?: InputMaybe<Scalars['u8']['input']>;
  defenseLT?: InputMaybe<Scalars['u8']['input']>;
  defenseLTE?: InputMaybe<Scalars['u8']['input']>;
  defenseNEQ?: InputMaybe<Scalars['u8']['input']>;
  dribble?: InputMaybe<Scalars['u8']['input']>;
  dribbleEQ?: InputMaybe<Scalars['u8']['input']>;
  dribbleGT?: InputMaybe<Scalars['u8']['input']>;
  dribbleGTE?: InputMaybe<Scalars['u8']['input']>;
  dribbleLT?: InputMaybe<Scalars['u8']['input']>;
  dribbleLTE?: InputMaybe<Scalars['u8']['input']>;
  dribbleNEQ?: InputMaybe<Scalars['u8']['input']>;
  role?: InputMaybe<Scalars['Enum']['input']>;
  token_id?: InputMaybe<Scalars['u256']['input']>;
  token_idEQ?: InputMaybe<Scalars['u256']['input']>;
  token_idGT?: InputMaybe<Scalars['u256']['input']>;
  token_idGTE?: InputMaybe<Scalars['u256']['input']>;
  token_idLT?: InputMaybe<Scalars['u256']['input']>;
  token_idLTE?: InputMaybe<Scalars['u256']['input']>;
  token_idNEQ?: InputMaybe<Scalars['u256']['input']>;
};

export type DeckCard = {
  __typename?: 'DeckCard';
  card_index?: Maybe<Scalars['u8']['output']>;
  card_state?: Maybe<Scalars['Enum']['output']>;
  entity?: Maybe<Entity>;
  is_captain?: Maybe<Scalars['bool']['output']>;
  player?: Maybe<Scalars['ContractAddress']['output']>;
  token_id?: Maybe<Scalars['u256']['output']>;
};

export type DeckCardConnection = {
  __typename?: 'DeckCardConnection';
  edges?: Maybe<Array<Maybe<DeckCardEdge>>>;
  total_count: Scalars['Int']['output'];
};

export type DeckCardEdge = {
  __typename?: 'DeckCardEdge';
  cursor?: Maybe<Scalars['Cursor']['output']>;
  node?: Maybe<DeckCard>;
};

export type DeckCardOrder = {
  direction: OrderDirection;
  field: DeckCardOrderField;
};

export enum DeckCardOrderField {
  CardIndex = 'CARD_INDEX',
  CardState = 'CARD_STATE',
  IsCaptain = 'IS_CAPTAIN',
  Player = 'PLAYER',
  TokenId = 'TOKEN_ID'
}

export type DeckCardWhereInput = {
  card_index?: InputMaybe<Scalars['u8']['input']>;
  card_indexEQ?: InputMaybe<Scalars['u8']['input']>;
  card_indexGT?: InputMaybe<Scalars['u8']['input']>;
  card_indexGTE?: InputMaybe<Scalars['u8']['input']>;
  card_indexLT?: InputMaybe<Scalars['u8']['input']>;
  card_indexLTE?: InputMaybe<Scalars['u8']['input']>;
  card_indexNEQ?: InputMaybe<Scalars['u8']['input']>;
  card_state?: InputMaybe<Scalars['Enum']['input']>;
  is_captain?: InputMaybe<Scalars['bool']['input']>;
  is_captainEQ?: InputMaybe<Scalars['bool']['input']>;
  is_captainGT?: InputMaybe<Scalars['bool']['input']>;
  is_captainGTE?: InputMaybe<Scalars['bool']['input']>;
  is_captainLT?: InputMaybe<Scalars['bool']['input']>;
  is_captainLTE?: InputMaybe<Scalars['bool']['input']>;
  is_captainNEQ?: InputMaybe<Scalars['bool']['input']>;
  player?: InputMaybe<Scalars['ContractAddress']['input']>;
  playerEQ?: InputMaybe<Scalars['ContractAddress']['input']>;
  playerGT?: InputMaybe<Scalars['ContractAddress']['input']>;
  playerGTE?: InputMaybe<Scalars['ContractAddress']['input']>;
  playerLT?: InputMaybe<Scalars['ContractAddress']['input']>;
  playerLTE?: InputMaybe<Scalars['ContractAddress']['input']>;
  playerNEQ?: InputMaybe<Scalars['ContractAddress']['input']>;
  token_id?: InputMaybe<Scalars['u256']['input']>;
  token_idEQ?: InputMaybe<Scalars['u256']['input']>;
  token_idGT?: InputMaybe<Scalars['u256']['input']>;
  token_idGTE?: InputMaybe<Scalars['u256']['input']>;
  token_idLT?: InputMaybe<Scalars['u256']['input']>;
  token_idLTE?: InputMaybe<Scalars['u256']['input']>;
  token_idNEQ?: InputMaybe<Scalars['u256']['input']>;
};

export type Entity = {
  __typename?: 'Entity';
  created_at?: Maybe<Scalars['DateTime']['output']>;
  event_id?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  keys?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  model_names?: Maybe<Scalars['String']['output']>;
  models?: Maybe<Array<Maybe<ModelUnion>>>;
  updated_at?: Maybe<Scalars['DateTime']['output']>;
};

export type EntityConnection = {
  __typename?: 'EntityConnection';
  edges?: Maybe<Array<Maybe<EntityEdge>>>;
  total_count: Scalars['Int']['output'];
};

export type EntityEdge = {
  __typename?: 'EntityEdge';
  cursor?: Maybe<Scalars['Cursor']['output']>;
  node?: Maybe<Entity>;
};

export type Event = {
  __typename?: 'Event';
  created_at?: Maybe<Scalars['DateTime']['output']>;
  data?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  id?: Maybe<Scalars['ID']['output']>;
  keys?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  systemCall: SystemCall;
  transaction_hash?: Maybe<Scalars['String']['output']>;
};

export type EventConnection = {
  __typename?: 'EventConnection';
  edges?: Maybe<Array<Maybe<EventEdge>>>;
  total_count: Scalars['Int']['output'];
};

export type EventEdge = {
  __typename?: 'EventEdge';
  cursor?: Maybe<Scalars['Cursor']['output']>;
  node?: Maybe<Event>;
};

export type Game = {
  __typename?: 'Game';
  entity?: Maybe<Entity>;
  game_id?: Maybe<Scalars['felt252']['output']>;
  outcome?: Maybe<Scalars['Enum']['output']>;
  player1?: Maybe<Scalars['ContractAddress']['output']>;
  player1_score?: Maybe<Scalars['u8']['output']>;
  player2?: Maybe<Scalars['ContractAddress']['output']>;
  player2_score?: Maybe<Scalars['u8']['output']>;
  turn?: Maybe<Scalars['u128']['output']>;
};

export type GameConnection = {
  __typename?: 'GameConnection';
  edges?: Maybe<Array<Maybe<GameEdge>>>;
  total_count: Scalars['Int']['output'];
};

export type GameEdge = {
  __typename?: 'GameEdge';
  cursor?: Maybe<Scalars['Cursor']['output']>;
  node?: Maybe<Game>;
};

export type GameOrder = {
  direction: OrderDirection;
  field: GameOrderField;
};

export enum GameOrderField {
  GameId = 'GAME_ID',
  Outcome = 'OUTCOME',
  Player1 = 'PLAYER1',
  Player1Score = 'PLAYER1_SCORE',
  Player2 = 'PLAYER2',
  Player2Score = 'PLAYER2_SCORE',
  Turn = 'TURN'
}

export type GameWhereInput = {
  game_id?: InputMaybe<Scalars['felt252']['input']>;
  game_idEQ?: InputMaybe<Scalars['felt252']['input']>;
  game_idGT?: InputMaybe<Scalars['felt252']['input']>;
  game_idGTE?: InputMaybe<Scalars['felt252']['input']>;
  game_idLT?: InputMaybe<Scalars['felt252']['input']>;
  game_idLTE?: InputMaybe<Scalars['felt252']['input']>;
  game_idNEQ?: InputMaybe<Scalars['felt252']['input']>;
  outcome?: InputMaybe<Scalars['Enum']['input']>;
  player1?: InputMaybe<Scalars['ContractAddress']['input']>;
  player1EQ?: InputMaybe<Scalars['ContractAddress']['input']>;
  player1GT?: InputMaybe<Scalars['ContractAddress']['input']>;
  player1GTE?: InputMaybe<Scalars['ContractAddress']['input']>;
  player1LT?: InputMaybe<Scalars['ContractAddress']['input']>;
  player1LTE?: InputMaybe<Scalars['ContractAddress']['input']>;
  player1NEQ?: InputMaybe<Scalars['ContractAddress']['input']>;
  player1_score?: InputMaybe<Scalars['u8']['input']>;
  player1_scoreEQ?: InputMaybe<Scalars['u8']['input']>;
  player1_scoreGT?: InputMaybe<Scalars['u8']['input']>;
  player1_scoreGTE?: InputMaybe<Scalars['u8']['input']>;
  player1_scoreLT?: InputMaybe<Scalars['u8']['input']>;
  player1_scoreLTE?: InputMaybe<Scalars['u8']['input']>;
  player1_scoreNEQ?: InputMaybe<Scalars['u8']['input']>;
  player2?: InputMaybe<Scalars['ContractAddress']['input']>;
  player2EQ?: InputMaybe<Scalars['ContractAddress']['input']>;
  player2GT?: InputMaybe<Scalars['ContractAddress']['input']>;
  player2GTE?: InputMaybe<Scalars['ContractAddress']['input']>;
  player2LT?: InputMaybe<Scalars['ContractAddress']['input']>;
  player2LTE?: InputMaybe<Scalars['ContractAddress']['input']>;
  player2NEQ?: InputMaybe<Scalars['ContractAddress']['input']>;
  player2_score?: InputMaybe<Scalars['u8']['input']>;
  player2_scoreEQ?: InputMaybe<Scalars['u8']['input']>;
  player2_scoreGT?: InputMaybe<Scalars['u8']['input']>;
  player2_scoreGTE?: InputMaybe<Scalars['u8']['input']>;
  player2_scoreLT?: InputMaybe<Scalars['u8']['input']>;
  player2_scoreLTE?: InputMaybe<Scalars['u8']['input']>;
  player2_scoreNEQ?: InputMaybe<Scalars['u8']['input']>;
  turn?: InputMaybe<Scalars['u128']['input']>;
  turnEQ?: InputMaybe<Scalars['u128']['input']>;
  turnGT?: InputMaybe<Scalars['u128']['input']>;
  turnGTE?: InputMaybe<Scalars['u128']['input']>;
  turnLT?: InputMaybe<Scalars['u128']['input']>;
  turnLTE?: InputMaybe<Scalars['u128']['input']>;
  turnNEQ?: InputMaybe<Scalars['u128']['input']>;
};

export type Metadata = {
  __typename?: 'Metadata';
  id?: Maybe<Scalars['ID']['output']>;
  uri?: Maybe<Scalars['String']['output']>;
};

export type MetadataConnection = {
  __typename?: 'MetadataConnection';
  edges?: Maybe<Array<Maybe<MetadataEdge>>>;
  total_count: Scalars['Int']['output'];
};

export type MetadataEdge = {
  __typename?: 'MetadataEdge';
  cursor?: Maybe<Scalars['Cursor']['output']>;
  node?: Maybe<Metadata>;
};

export type Model = {
  __typename?: 'Model';
  class_hash?: Maybe<Scalars['felt252']['output']>;
  created_at?: Maybe<Scalars['DateTime']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  transaction_hash?: Maybe<Scalars['felt252']['output']>;
};

export type ModelConnection = {
  __typename?: 'ModelConnection';
  edges?: Maybe<Array<Maybe<ModelEdge>>>;
  total_count: Scalars['Int']['output'];
};

export type ModelEdge = {
  __typename?: 'ModelEdge';
  cursor?: Maybe<Scalars['Cursor']['output']>;
  node?: Maybe<Model>;
};

export type ModelUnion = Card | DeckCard | Game | Player;

export enum OrderDirection {
  Asc = 'ASC',
  Desc = 'DESC'
}

export type Player = {
  __typename?: 'Player';
  attacker_id?: Maybe<Scalars['u256']['output']>;
  attacker_placement?: Maybe<Scalars['Enum']['output']>;
  defender_id?: Maybe<Scalars['u256']['output']>;
  defender_placement?: Maybe<Scalars['Enum']['output']>;
  entity?: Maybe<Entity>;
  game_id?: Maybe<Scalars['felt252']['output']>;
  goalkeeper_id?: Maybe<Scalars['u256']['output']>;
  goalkeeper_placement?: Maybe<Scalars['Enum']['output']>;
  midfielder_id?: Maybe<Scalars['u256']['output']>;
  midfielder_placement?: Maybe<Scalars['Enum']['output']>;
  player?: Maybe<Scalars['ContractAddress']['output']>;
  remaining_energy?: Maybe<Scalars['u128']['output']>;
};

export type PlayerConnection = {
  __typename?: 'PlayerConnection';
  edges?: Maybe<Array<Maybe<PlayerEdge>>>;
  total_count: Scalars['Int']['output'];
};

export type PlayerEdge = {
  __typename?: 'PlayerEdge';
  cursor?: Maybe<Scalars['Cursor']['output']>;
  node?: Maybe<Player>;
};

export type PlayerOrder = {
  direction: OrderDirection;
  field: PlayerOrderField;
};

export enum PlayerOrderField {
  AttackerId = 'ATTACKER_ID',
  AttackerPlacement = 'ATTACKER_PLACEMENT',
  DefenderId = 'DEFENDER_ID',
  DefenderPlacement = 'DEFENDER_PLACEMENT',
  GameId = 'GAME_ID',
  GoalkeeperId = 'GOALKEEPER_ID',
  GoalkeeperPlacement = 'GOALKEEPER_PLACEMENT',
  MidfielderId = 'MIDFIELDER_ID',
  MidfielderPlacement = 'MIDFIELDER_PLACEMENT',
  Player = 'PLAYER',
  RemainingEnergy = 'REMAINING_ENERGY'
}

export type PlayerWhereInput = {
  attacker_id?: InputMaybe<Scalars['u256']['input']>;
  attacker_idEQ?: InputMaybe<Scalars['u256']['input']>;
  attacker_idGT?: InputMaybe<Scalars['u256']['input']>;
  attacker_idGTE?: InputMaybe<Scalars['u256']['input']>;
  attacker_idLT?: InputMaybe<Scalars['u256']['input']>;
  attacker_idLTE?: InputMaybe<Scalars['u256']['input']>;
  attacker_idNEQ?: InputMaybe<Scalars['u256']['input']>;
  attacker_placement?: InputMaybe<Scalars['Enum']['input']>;
  defender_id?: InputMaybe<Scalars['u256']['input']>;
  defender_idEQ?: InputMaybe<Scalars['u256']['input']>;
  defender_idGT?: InputMaybe<Scalars['u256']['input']>;
  defender_idGTE?: InputMaybe<Scalars['u256']['input']>;
  defender_idLT?: InputMaybe<Scalars['u256']['input']>;
  defender_idLTE?: InputMaybe<Scalars['u256']['input']>;
  defender_idNEQ?: InputMaybe<Scalars['u256']['input']>;
  defender_placement?: InputMaybe<Scalars['Enum']['input']>;
  game_id?: InputMaybe<Scalars['felt252']['input']>;
  game_idEQ?: InputMaybe<Scalars['felt252']['input']>;
  game_idGT?: InputMaybe<Scalars['felt252']['input']>;
  game_idGTE?: InputMaybe<Scalars['felt252']['input']>;
  game_idLT?: InputMaybe<Scalars['felt252']['input']>;
  game_idLTE?: InputMaybe<Scalars['felt252']['input']>;
  game_idNEQ?: InputMaybe<Scalars['felt252']['input']>;
  goalkeeper_id?: InputMaybe<Scalars['u256']['input']>;
  goalkeeper_idEQ?: InputMaybe<Scalars['u256']['input']>;
  goalkeeper_idGT?: InputMaybe<Scalars['u256']['input']>;
  goalkeeper_idGTE?: InputMaybe<Scalars['u256']['input']>;
  goalkeeper_idLT?: InputMaybe<Scalars['u256']['input']>;
  goalkeeper_idLTE?: InputMaybe<Scalars['u256']['input']>;
  goalkeeper_idNEQ?: InputMaybe<Scalars['u256']['input']>;
  goalkeeper_placement?: InputMaybe<Scalars['Enum']['input']>;
  midfielder_id?: InputMaybe<Scalars['u256']['input']>;
  midfielder_idEQ?: InputMaybe<Scalars['u256']['input']>;
  midfielder_idGT?: InputMaybe<Scalars['u256']['input']>;
  midfielder_idGTE?: InputMaybe<Scalars['u256']['input']>;
  midfielder_idLT?: InputMaybe<Scalars['u256']['input']>;
  midfielder_idLTE?: InputMaybe<Scalars['u256']['input']>;
  midfielder_idNEQ?: InputMaybe<Scalars['u256']['input']>;
  midfielder_placement?: InputMaybe<Scalars['Enum']['input']>;
  player?: InputMaybe<Scalars['ContractAddress']['input']>;
  playerEQ?: InputMaybe<Scalars['ContractAddress']['input']>;
  playerGT?: InputMaybe<Scalars['ContractAddress']['input']>;
  playerGTE?: InputMaybe<Scalars['ContractAddress']['input']>;
  playerLT?: InputMaybe<Scalars['ContractAddress']['input']>;
  playerLTE?: InputMaybe<Scalars['ContractAddress']['input']>;
  playerNEQ?: InputMaybe<Scalars['ContractAddress']['input']>;
  remaining_energy?: InputMaybe<Scalars['u128']['input']>;
  remaining_energyEQ?: InputMaybe<Scalars['u128']['input']>;
  remaining_energyGT?: InputMaybe<Scalars['u128']['input']>;
  remaining_energyGTE?: InputMaybe<Scalars['u128']['input']>;
  remaining_energyLT?: InputMaybe<Scalars['u128']['input']>;
  remaining_energyLTE?: InputMaybe<Scalars['u128']['input']>;
  remaining_energyNEQ?: InputMaybe<Scalars['u128']['input']>;
};

export type Query = {
  __typename?: 'Query';
  cardModels?: Maybe<CardConnection>;
  deckcardModels?: Maybe<DeckCardConnection>;
  entities?: Maybe<EntityConnection>;
  entity: Entity;
  events?: Maybe<EventConnection>;
  gameModels?: Maybe<GameConnection>;
  metadata: Metadata;
  metadatas?: Maybe<MetadataConnection>;
  model: Model;
  models?: Maybe<ModelConnection>;
  playerModels?: Maybe<PlayerConnection>;
  system: System;
  systemCall: SystemCall;
  systemCalls?: Maybe<SystemCallConnection>;
  systems?: Maybe<SystemConnection>;
};


export type QueryCardModelsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<CardOrder>;
  where?: InputMaybe<CardWhereInput>;
};


export type QueryDeckcardModelsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<DeckCardOrder>;
  where?: InputMaybe<DeckCardWhereInput>;
};


export type QueryEntitiesArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  keys?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  last?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryEntityArgs = {
  id: Scalars['ID']['input'];
};


export type QueryEventsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  keys?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  last?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryGameModelsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<GameOrder>;
  where?: InputMaybe<GameWhereInput>;
};


export type QueryMetadataArgs = {
  id: Scalars['ID']['input'];
};


export type QueryMetadatasArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryModelArgs = {
  id: Scalars['ID']['input'];
};


export type QueryModelsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryPlayerModelsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<PlayerOrder>;
  where?: InputMaybe<PlayerWhereInput>;
};


export type QuerySystemArgs = {
  id: Scalars['ID']['input'];
};


export type QuerySystemCallArgs = {
  id: Scalars['ID']['input'];
};


export type QuerySystemCallsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};


export type QuerySystemsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};

export type Subscription = {
  __typename?: 'Subscription';
  entityUpdated: Entity;
  modelRegistered: Model;
};


export type SubscriptionEntityUpdatedArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
};


export type SubscriptionModelRegisteredArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
};

export type System = {
  __typename?: 'System';
  class_hash?: Maybe<Scalars['felt252']['output']>;
  created_at?: Maybe<Scalars['DateTime']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  systemCalls: Array<SystemCall>;
  transaction_hash?: Maybe<Scalars['felt252']['output']>;
};

export type SystemCall = {
  __typename?: 'SystemCall';
  created_at?: Maybe<Scalars['DateTime']['output']>;
  data?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  system: System;
  system_id?: Maybe<Scalars['ID']['output']>;
  transaction_hash?: Maybe<Scalars['String']['output']>;
};

export type SystemCallConnection = {
  __typename?: 'SystemCallConnection';
  edges?: Maybe<Array<Maybe<SystemCallEdge>>>;
  total_count: Scalars['Int']['output'];
};

export type SystemCallEdge = {
  __typename?: 'SystemCallEdge';
  cursor?: Maybe<Scalars['Cursor']['output']>;
  node?: Maybe<SystemCall>;
};

export type SystemConnection = {
  __typename?: 'SystemConnection';
  edges?: Maybe<Array<Maybe<SystemEdge>>>;
  total_count: Scalars['Int']['output'];
};

export type SystemEdge = {
  __typename?: 'SystemEdge';
  cursor?: Maybe<Scalars['Cursor']['output']>;
  node?: Maybe<System>;
};

export type GetEntitiesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetEntitiesQuery = { __typename?: 'Query', entities?: { __typename?: 'EntityConnection', total_count: number, edges?: Array<{ __typename?: 'EntityEdge', node?: { __typename?: 'Entity', models?: Array<{ __typename: 'Card', token_id?: any | null, dribble?: any | null, current_dribble?: any | null, defense?: any | null, current_defense?: any | null, cost?: any | null, role?: any | null } | { __typename: 'DeckCard', player?: any | null, card_index?: any | null, token_id?: any | null, card_state?: any | null, is_captain?: any | null } | { __typename: 'Game', game_id?: any | null, player1?: any | null, player2?: any | null, player1_score?: any | null, player2_score?: any | null, turn?: any | null, outcome?: any | null } | { __typename: 'Player', game_id?: any | null, player?: any | null, goalkeeper_placement?: any | null, goalkeeper_id?: any | null, defender_placement?: any | null, defender_id?: any | null, midfielder_placement?: any | null, midfielder_id?: any | null, attacker_placement?: any | null, attacker_id?: any | null, remaining_energy?: any | null } | null> | null } | null } | null> | null } | null };


export const GetEntitiesDocument = gql`
    query getEntities {
  entities(keys: ["*"]) {
    total_count
    edges {
      node {
        models {
          __typename
          ... on Card {
            token_id
            dribble
            current_dribble
            defense
            current_defense
            cost
            role
          }
          ... on Game {
            game_id
            player1
            player2
            player1_score
            player2_score
            turn
            outcome
          }
          ... on DeckCard {
            player
            card_index
            token_id
            card_state
            is_captain
          }
          ... on Player {
            game_id
            player
            goalkeeper_placement
            goalkeeper_id
            defender_placement
            defender_id
            midfielder_placement
            midfielder_id
            attacker_placement
            attacker_id
            remaining_energy
          }
        }
      }
    }
  }
}
    `;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string, operationType?: string) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType) => action();
const GetEntitiesDocumentString = print(GetEntitiesDocument);
export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    getEntities(variables?: GetEntitiesQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<{ data: GetEntitiesQuery; extensions?: any; headers: Dom.Headers; status: number; }> {
        return withWrapper((wrappedRequestHeaders) => client.rawRequest<GetEntitiesQuery>(GetEntitiesDocumentString, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getEntities', 'query');
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;