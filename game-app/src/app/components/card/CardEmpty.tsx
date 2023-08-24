import classNames from "classnames";
import { getCardRadiusClassname, getCardSizeClassnames } from "./utils";
import type { CardColor, CardSize } from "./types";

interface CardEmptyProps {
  size: CardSize;
  color: CardColor;
}

const CardEmpty = ({ size, color }: CardEmptyProps) => {
  const sizeClassnames = getCardSizeClassnames(size);
  const radiusClassname = getCardRadiusClassname(size);
  return (
    <div
      className={classNames(
        sizeClassnames,
        radiusClassname,
        "opacity-20 shadow-md",
        {
          "bg-yellow-300": color === "yellow",
          "bg-cyan-300": color === "blue",
          "bg-[#FC548C]": color === "red",
        }
      )}
    />
  );
};

export default CardEmpty;
