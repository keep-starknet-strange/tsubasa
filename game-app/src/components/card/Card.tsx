import classNames from "classnames";
import type { CardData } from "./types";
import CardEnergy from "./CardEnergy";
import CardSticker from "./CardSticker";
import CardHover from "./CardHover";
import CardCaptain from "./CardCaptain";
import CardHeader from "./CardHeader";
import { animated, useSpring } from "@react-spring/web";
import { getCardSizeClassnames } from "./utils";
import CardPending from "./CardPending";
import CardBackground from "./CardBackground";
import CardEmpty from "./CardEmpty";
import { useEffect, useState } from "react";

interface CardProps extends CardData {
  onClick?: (data: CardData) => void;
}

const Card = (props: CardProps) => {
  const { onClick, ...data } = props;
  const {
    color,
    player,
    hover,
    captain,
    size,
    dribble,
    defense,
    currentDefense,
    energy,
    kind,
    state = "standard",
  } = data;

  const [cardSpring, api] = useSpring(() => ({
    from: { transform: "rotate(0deg)", opacity: "1" },
  }));

  useEffect(() => {
    if (currentDefense == 0) {
      api.start({ transform: "rotate(45deg)", opacity: "0" });
    }
  }, [currentDefense]);

  if (kind === "card-black") {
    return <CardEmpty color={color} size={size} />;
  }

  return (
    <animated.div style={cardSpring}>
      <div className="relative" onClick={() => onClick && onClick(data)}>
        {state === "pending" && <CardPending size={size} />}
        <CardBackground
          color={color}
          size={size}
          state={state}
          player={player}
        />

        <div
          className={classNames(getCardSizeClassnames(size), "relative z-10", {
            "p-0.5": state === "pending",
            "border-2 border-white": state !== "pending",
          })}
        >
          {captain && (
            <div
              className={classNames(
                "absolute z-10 flex w-full justify-center",
                {
                  "top-[-20px]": size === "xl",
                  "top-[-16px]": size === "lg",
                  "top-[-12px]": size === "md",
                  "top-[-10px]": size === "sm",
                  "top-[-9px]": size === "xs",
                }
              )}
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
                defense={defense}
                currentDefense={currentDefense}
                color={color}
                state={state}
              />
              {size === "xl" && !hover && state !== "pending" && (
                <CardSticker />
              )}
            </div>
          </div>
          {state !== "pending" && (
            <CardEnergy hideValue={hover} energy={energy} size={size} />
          )}
        </div>
      </div>
    </animated.div>
  );
};

export default Card;
