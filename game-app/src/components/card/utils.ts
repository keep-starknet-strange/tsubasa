import classNames from "classnames";
import type { CardColor, CardSize, CardState } from "./types";

export function getCardSizeClassnames(size: CardSize) {
  return classNames({
    "h-[320px] min-h-[320px] w-[224px] min-w-[224px] rounded-lg": size === "xl",
    "h-[240px] min-h-[240px] w-[168px] min-w-[168px] rounded-lg": size === "lg",
    "h-[160px] min-h-[160px] w-[112px] min-w-[112px] rounded-lg": size === "md",
    "h-[120px] min-h-[120px] w-[84px] min-w-[84px] rounded": size === "sm",
    "h-[80px] min-h-[80px] w-[56px] min-w-[56px] rounded": size === "xs",
  });
}

export function getCardRadiusClassname(size: CardSize) {
  return classNames({
    "rounded-lg": size === "xl" || size === "lg" || size === "md",
    rounded: size === "sm" || size === "xs",
  });
}

export function getCardBackgroundColorClassname(
  color: CardColor,
  state: CardState
) {
  const pending = state === "pending";
  return classNames({
    "bg-cyan-700": color === "blue" && pending,
    "bg-yellow-700": color === "yellow" && pending,
    "bg-salmon-700": color === "red" && pending,
    "bg-cyan-500": color === "blue" && !pending,
    "bg-yellow-500": color === "yellow" && !pending,
    "bg-salmon-500": color === "red" && !pending,
  });
}
