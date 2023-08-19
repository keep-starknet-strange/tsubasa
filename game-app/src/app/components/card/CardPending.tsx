import type { CardSize } from "./types";
import classNames from "classnames";
import { getCardSizeClassnames, getCardRadiusClassname } from "./utils";
import PendingIcon from "../icons/PendingIcon";

interface CardPendingProps {
  size: CardSize;
}

const CardPending = ({ size }: CardPendingProps) => {
  return (
    <div
      className={classNames(
        getCardSizeClassnames(size),
        getCardRadiusClassname(size),
        "absolute z-10 flex items-center justify-center bg-greenBlack opacity-50"
      )}
    >
      <div
        className={classNames({
          "h-16 w-16": size === "xl",
          "h-14 w-14": size === "lg",
          "h-10 w-10": size === "md",
          "h-6 w-6": size === "sm",
          "h-4 w-4": size === "xs",
        })}
      >
        <PendingIcon />
      </div>
    </div>
  );
};

export default CardPending;
