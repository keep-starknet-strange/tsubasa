import type { FC } from "react";
import type { CardSize, TeamColor } from "../card/types";
import classNames from "classnames";

interface CaptainIconProps {
  team: TeamColor;
  size: CardSize;
  pending: boolean;
}

const CaptainIcon: FC<CaptainIconProps> = ({ team, size, pending }) => {
  return (
    <div
      className={classNames(
        "flex items-center justify-center rounded-full shadow",
        {
          "text-black": !pending,
          "text-white": pending,
          "bg-cyan-700": team === "blue" && pending,
          "bg-cyan-200": team === "blue" && !pending,
          "bg-yellow-700": team === "yellow" && pending,
          "bg-yellow-200": team === "yellow" && !pending,
          "bg-salmon-700": team === "red" && pending,
          "bg-salmon-200": team === "red" && !pending,

          "h-[40px] w-[40px]": size === "xl",
          "h-[32px] w-[32px]": size === "lg",
          "h-[24px] w-[24px]": size === "md",
          "h-[20px] w-[20px]": size === "sm",
          "h-[16px] w-[16px]": size === "xs",
        }
      )}
    >
      <svg
        className={classNames({
          "h-[24px] w-[24px]": size === "xl",
          "h-[20px] w-[20px]": size === "lg",
          "h-[16px] w-[16px]": size === "md",
          "h-[12px] w-[12px]": size === "sm" || size === "xs",
          "opacity-50": pending,
        })}
        viewBox="0 0 24 25"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M17.482 14.4918L19.8536 12.1822C20.5512 11.5045 20.416 10.8422 20.3264 10.5884C20.2351 10.3345 19.9191 9.73502 18.9395 9.62884L16.0802 9.31944C15.7783 9.28792 15.3021 8.97852 15.1537 8.71993L13.4159 5.67319C13.0907 5.10498 12.5756 4.78003 11.9999 4.78003C11.4242 4.78003 10.9091 5.10623 10.584 5.67547L8.84617 8.72241C8.69769 8.98101 8.22073 9.28917 7.91714 9.32172L5.06036 9.63113C4.08072 9.73751 3.76303 10.3383 3.67344 10.5909C3.58468 10.8445 3.44865 11.5056 4.14625 12.1837L6.51861 14.492C6.70773 14.6757 6.83714 15.1543 6.76829 15.4032L5.66008 19.3563C5.46847 20.0452 5.66008 20.4876 5.85501 20.7377C6.26893 21.2696 7.05363 21.3735 7.79603 20.9396L11.5304 18.7581C11.6092 18.7122 11.7917 18.6888 11.9775 18.6869C12.1791 18.6851 12.3856 18.7085 12.4694 18.7568L16.2046 20.9384C16.5215 21.1234 16.8342 21.2163 17.1337 21.2163C17.4132 21.2163 17.6745 21.1333 17.8877 20.9826C17.9847 20.9141 18.0718 20.8316 18.1465 20.7366C18.3414 20.4876 18.533 20.0452 18.3414 19.3551L17.2332 15.4042C17.1644 15.1529 17.2938 14.6743 17.482 14.4918Z"
          fill="currentColor"
        />
      </svg>
    </div>
  );
};

export default CaptainIcon;