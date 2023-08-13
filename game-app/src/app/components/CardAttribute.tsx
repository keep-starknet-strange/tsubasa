import classNames from "classnames";
import { FC } from "react";

type CardAttributeType = "dribble" | "stamina";

interface CardAttributeProps {
  value: String | number;
  type: CardAttributeType;
  team: CardAttributeTeam;
  pending: boolean;
  bonus: boolean;
  hurt: boolean;
}

type CardAttributeTeam = "red" | "blue" | "yellow";

const CardAttribute: FC<CardAttributeProps> = (props) => {
  const { value, type, team, pending, bonus, hurt } = props;

  return (
    <div
      className={classNames(
        "inline-flex flex-col items-center justify-center rounded p-1 pt-2 font-new-airport font-medium shadow",
        {
          "bg-mint-green": bonus,
          "bg-cherry-red": hurt,
          "text-black": bonus || !pending,
          "text-white": (pending || hurt) && !bonus,
          "bg-pine-green": team === "blue" && pending && !bonus && !hurt,
          "bg-turquoise": team === "blue" && !pending && !bonus && !hurt,
          "bg-mustard-seed": team === "yellow" && pending && !bonus && !hurt,
          "bg-sunny-yellow": team === "yellow" && !pending && !bonus && !hurt,
          "bg-cocoa": team === "red" && pending && !bonus && !hurt,
          "bg-peach-pink": team === "red" && !pending && !bonus && !hurt,
        }
      )}
    >
      <div
        className={classNames("font-extrabold", {
          "opacity-50": pending && !bonus && !hurt,
        })}
      >
        {value}
      </div>
      <div
        className={classNames({ "opacity-25": !hurt, "opacity-50": pending })}
      >
        {type === "dribble" && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 40 40"
          >
            <path
              d="M17.8462 15.4858L9.41709 7.05664L4 12.4737L11.5263 20L4 27.5263L9.41709 32.9434L17.8462 24.5142C20.3393 22.0211 20.3393 17.9789 17.8462 15.4858Z"
              fill="currentColor"
            />
            <path
              d="M34.1301 15.4858L25.701 7.05664L20.2839 12.4737L27.8102 20L20.2839 27.5263L25.701 32.9434L34.1301 24.5142C36.6233 22.0211 36.6233 17.9789 34.1301 15.4858Z"
              fill="currentColor"
            />
          </svg>
        )}

        {type === "stamina" && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <g opacity="0.5">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M10.0189 19.7145C10.3609 19.9344 10.7049 20.1555 11.0485 20.3796L12.0004 21.002L12.9523 20.3796C13.2959 20.1554 13.64 19.9343 13.9821 19.7144C15.7496 18.5781 17.4648 17.4755 18.7992 16.1722C20.4677 14.5424 21.6004 12.4818 21.6004 9.72508C21.6004 8.0403 21.0431 6.40003 20.011 5.14404C18.967 3.87347 17.4042 2.99805 15.5557 2.99805C14.1011 2.99805 12.8902 3.48501 12.0005 4.04106C11.1108 3.48503 9.89967 2.99805 8.44508 2.99805C6.59654 2.99805 5.03388 3.87328 3.98975 5.14407C2.95767 6.4002 2.40039 8.04039 2.40039 9.72508C2.40039 12.4818 3.53319 14.5424 5.20157 16.1721C6.53607 17.4757 8.25097 18.5781 10.0189 19.7145ZM7.6426 13.6687C8.68877 14.6911 10.1669 15.6483 12.0001 16.8334C13.8333 15.6482 15.3115 14.691 16.3578 13.6686C17.5169 12.5361 18.1055 11.4411 18.1055 9.72516C18.1055 8.79836 17.7898 7.94381 17.3128 7.3633C16.8455 6.79464 16.2671 6.4927 15.5555 6.4927C15.07 6.4927 14.5743 6.64218 14.1325 6.86095C13.6847 7.08268 13.3683 7.33773 13.2508 7.45755L13.2485 7.45998L12.0003 8.72627L10.7497 7.45757C10.6323 7.33772 10.3158 7.08267 9.86808 6.86095C9.42628 6.64218 8.93037 6.4927 8.44485 6.4927C7.73321 6.4927 7.1548 6.79465 6.68753 7.3633C6.21051 7.9438 5.89481 8.79846 5.89481 9.72516C5.89481 11.4411 6.48347 12.5361 7.6426 13.6687Z"
                fill="currentColor"
              />
            </g>
          </svg>
        )}
      </div>
    </div>
  );
};

export default CardAttribute;
