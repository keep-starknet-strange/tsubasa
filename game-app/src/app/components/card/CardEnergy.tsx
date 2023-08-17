import type { CardSize } from "../card/types";
import classNames from "classnames";
import EnergyIcon from "../icons/EnergyIcon";

interface CardEnergyProps {
  size: CardSize;
  hideValue: boolean;
  energy: number;
}

const CardEnergy = ({ size, hideValue, energy }: CardEnergyProps) => {
  return (
    <div
      className={classNames(
        "absolute z-10 flex w-full items-center justify-center",
        {
          "bottom-[-41px]": size === "xl",
          "bottom-[-32px]": size === "lg",
          "bottom-[-23px]": size === "md",
          "bottom-[-19px]": size === "sm",
          "bottom-[-15px]": size === "xs",
        }
      )}
    >
      <div className="relative flex  items-center justify-center">
        <div
          className={classNames("relative", {
            "h-[72px] w-[72px]": size === "xl",
            "h-[56px] w-[56px]": size === "lg",
            "h-[40px] w-[40px]": size === "md",
            "h-[32px] w-[32px]": size === "sm",
            "h-[24px] w-[24px]": size === "xs",
          })}
        >
          <EnergyIcon />
        </div>
        {!hideValue && (
          <div
            className={classNames(
              "absolute font-agrandir text-lg font-bold text-black",
              {
                "text-[28px]": size === "xl",
                "text-xl": size === "lg",
                "text-base": size === "md",
                "text-xs": size === "sm",
                "text-xxs": size === "xs",
              }
            )}
          >
            {energy}
          </div>
        )}
      </div>
    </div>
  );
};

export default CardEnergy;
