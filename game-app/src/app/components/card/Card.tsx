import classNames from "classnames";
import type { CardKind, CardSize, CardColor, CardState } from "./types";
import CardEnergy from "./CardEnergy";
import CardSticker from "./CardSticker";
import CardHover from "./CardHover";
import CardCaptain from "./CardCaptain";
import CardHeader from "./CardHeader";
import { getCardSizeClassnames } from "./utils";
import CardPending from "./CardPending";
import CardBackground from "./CardBackground";
import CardEmpty from "./CardEmpty";

interface CardProps {
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

const Card = (props: CardProps) => {
  const {
    color,
    player,
    hover,
    captain,
    size,
    dribble,
    stamina,
    energy,
    kind,
    state = "standard",
  } = props;

  if (kind === "card-black") {
    return <CardEmpty color={color} size={size} />;
  }

  return (
    <div className="relative">
      {state === "pending" && <CardPending size={size} />}
      <CardBackground color={color} size={size} state={state} player={player} />

      <div
        className={classNames(
          getCardSizeClassnames(size),
          "relative z-10 min-h-[80px] min-w-[56px]",
          {
            "p-0.5": state === "pending",
            "border-2 border-white": state !== "pending",
          }
        )}
      >
        {captain && (
          <div
            className={classNames("absolute z-10 flex w-full justify-center", {
              "top-[-20px]": size === "xl",
              "top-[-16px]": size === "lg",
              "top-[-12px]": size === "md",
              "top-[-10px]": size === "sm",
              "top-[-9px]": size === "xs",
            })}
          >
            <CardCaptain
              pending={state === "pending"}
              size={size}
              color={color}
            />
          </div>
        )}

        {hover && <CardHover size={size} />}
        <div
          className={classNames("h-full", {
            "p-2.5": size === "xl",
            "p-2": size === "lg",
            "p-1.5": size === "md",
            "p-1": size === "sm",
            "p-0.5": size === "xs",
          })}
        >
          <div className="relative h-full w-full">
            <CardHeader
              dribble={dribble}
              pending={state === "pending"}
              size={size}
              stamina={stamina}
              color={color}
              state={state}
            />
            {size === "xl" && !hover && state !== "pending" && <CardSticker />}
          </div>
        </div>
        {state !== "pending" && (
          <CardEnergy hideValue={hover} energy={energy} size={size} />
        )}
      </div>
    </div>
  );
};

export default Card;
