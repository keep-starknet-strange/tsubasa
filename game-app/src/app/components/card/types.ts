export type CardColor = "red" | "blue" | "yellow";

export type CardSize = "xl" | "lg" | "md" | "sm" | "xs";

export type CardAttributeType = "dribble" | "stamina";

export type CardKind = "card-black" | "card";

export type CardState = "buffed" | "hurt" | "standard" | "pending";

export interface CardProps {
  kind: CardKind;
  size: CardSize;
  color: CardColor;
  hover: boolean;
  captain: boolean;
  dribble: number;
  stamina: number;
  energy: number;
  player?: string;
  state?: CardState;
}
