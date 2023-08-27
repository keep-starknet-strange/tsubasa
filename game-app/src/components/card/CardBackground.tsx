import classNames from "classnames";
import type { CardColor, CardSize, CardState } from "./types";
import {
  getCardBackgroundColorClassname,
  getCardRadiusClassname,
  getCardSizeClassnames,
} from "./utils";

interface CardBackgroundProps {
  color: CardColor;
  state: CardState;
  player?: string;
  size: CardSize;
}

const CardBackground = (props: CardBackgroundProps) => {
  const { color, state, player, size } = props;
  const bgColorClassnames = getCardBackgroundColorClassname(color, state);
  const sizeClassnames = getCardSizeClassnames(size);
  const radiusClassname = getCardRadiusClassname(size);

  return (
    <div
      style={{
        backgroundImage: player
          ? `url('/images/players/${player}.png')`
          : undefined,
      }}
      className={classNames(
        sizeClassnames,
        bgColorClassnames,
        radiusClassname,
        "absolute z-0 shadow-md",
        {
          "bg-cover bg-center bg-no-repeat": !!player,
          "border-2 border-white": state !== "pending",
        }
      )}
    />
  );
};

export default CardBackground;
