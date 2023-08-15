import classNames from "classnames";
import type { FC } from "react";
import { CardSize } from "../card/types";
import EnergyIcon from "../icons/EnergyIcon";

interface CardEnergyProps {
  size: CardSize;
  hideValue: boolean;
  energy: number;
}

const CardEnergy: FC<CardEnergyProps> = ({ size, hideValue, energy }) => {
  return (
    <div
      className={classNames(
        "absolute z-10 flex w-full items-center justify-center",
        {
          "bottom-[-41px]": size === "xl",
          "bottom-[-33px]": size === "lg",
          "bottom-[-25px]": size === "md",
          "bottom-[-21px]": size === "sm",
          "bottom-[-17px]": size === "xs",
        }
      )}
    >
      <div
        className={classNames("relative", {
          "h-[72px] w-[72px]": size === "xl",
          "h-[56px] w-[56px]": size === "lg",
          "h-[40px] w-[40px]": size === "md",
          "h-[32px] w-[32px]": size === "sm",
          "h-[24px] w-[24px]": size === "xs",
        })}
      >
        <div className="absolute left-1/2 top-1/2 flex w-full -translate-x-1/2 -translate-y-1/2 transform">
          <EnergyIcon />
        </div>
        {!hideValue && (
          <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 transform items-center justify-center font-agrandir text-lg font-bold">
            <div
              className={classNames({
                "text-2xl": size === "xl",
                "text-xl": size === "lg",
                "text-base": size === "md",
                "text-sm": size === "sm",
                "text-xs": size === "xs",
              })}
            >
              {energy}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CardEnergy;
