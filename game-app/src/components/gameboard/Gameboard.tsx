"use client";

import Image from "next/image";
import CardPlaceholder from "../CardPlaceholder";
import type { ExtendedCardProps } from "../card/types";
import Card from "../card/Card";
import { animated } from "@react-spring/web";
import { triggerAttackAnimation } from "../../animations/animations";
import { usePlayerAnimations } from "../../animations/usePlayerAnimations";
import { useEffect, useState } from "react";

interface Props {
  cardPositions: Record<string, ExtendedCardProps>;
  currentHoveredPlaceholder: string | undefined;
  currentPickedCard: string;
}

export default function Gameboard(props: Props) {
  const [isWaiting, setIsWaiting] = useState(false);
  const { animationApis, animationSprings } = usePlayerAnimations();
  const [currentDefenses, setCurrentDefenses] = useState<
    Record<string, number>
  >({});

  const [currentDribbles, setCurrentDribbles] = useState<
    Record<string, number>
  >({});

  const updateDribble = (cardId: string, value: number) => {
    setCurrentDribbles((prevDribbles) => {
      return {
        ...prevDribbles,
        [cardId]: value,
      };
    });
  };

  const updateDefense = (cardId: string, value: number, isAttack = false) => {
    setCurrentDefenses((prevDefenses) => {
      const currentDefense = prevDefenses[cardId] || 10;
      const newDefense = isAttack ? currentDefense - value : value;
      return {
        ...prevDefenses,
        [cardId]: newDefense,
      };
    });
  };

  useEffect(() => {
    updateDefense("player1-team1", 4);
    updateDefense("player4-team2", 10);
    updateDribble("player1-team1", 5);
    updateDribble("player4-team2", 6);
  }, []);

  const handleAttack = (fromPlayer: string, toPlayer: string) => {
    const dribbleValue = currentDribbles[fromPlayer];
    triggerAttackAnimation(fromPlayer, toPlayer, animationApis);

    setTimeout(() => {
      const dribbleElement = document.createElement("div");
      dribbleElement.innerHTML = `- ${dribbleValue}`;
      dribbleElement.className =
        "absolute z-50 ml-6 p-1 text-red font-bold text-xl transition-all duration-500 ease-in-out opacity-0";

      const defenderElement = document.getElementById(toPlayer);
      if (defenderElement) {
        const defenderRect = defenderElement.getBoundingClientRect();
        dribbleElement.style.left = `${defenderRect.left}px`;
        dribbleElement.style.top = `${defenderRect.top - 30}px`;
      }

      updateDefense(toPlayer, dribbleValue, true);
      document.body.appendChild(dribbleElement);
      void dribbleElement.offsetWidth;

      dribbleElement.style.opacity = "1";

      if (defenderElement) {
        const defenderRect = defenderElement.getBoundingClientRect();
        dribbleElement.style.top = `${defenderRect.top - 100}px`;
      }

      setTimeout(() => {
        dribbleElement.style.opacity = "0";
        setTimeout(() => {
          dribbleElement.remove();
        }, 500);
      }, 500);
    }, 500);
  };

  return (
    <div className="h-screen max-h-96 w-full md:m-auto md:h-[645px] md:max-h-[645px] md:w-11/12 md:max-w-[1296px]">
      {/* field */}
      <div className="relative mx-auto box-border flex h-full max-h-[645px] w-11/12 overflow-hidden rounded-xl border-[3px] border-solid border-[#97E8A9] bg-[#8ADD9D] md:h-full md:w-full ">
        {/* corners */}
        <div className="absolute -left-4 -top-4  h-9 w-9 rounded-full border-[3px] border-solid border-[#97E8A9] md:h-12 md:w-12" />
        <div className="absolute -right-4 -top-4  h-9 w-9 rounded-full border-[3px] border-solid border-[#97E8A9]  md:h-12 md:w-12 " />
        <div className="absolute -bottom-4 -left-4  h-9 w-9 rounded-full border-[3px] border-solid border-[#97E8A9]  md:h-12 md:w-12 " />
        <div className="absolute -bottom-4 -right-4  h-9 w-9 rounded-full border-[3px] border-solid border-[#97E8A9] md:h-12 md:w-12" />

        {/* left / bottom penalty box */}
        <div className="absolute bottom-0 left-2/4 -translate-x-2/4 md:bottom-auto md:left-0 md:top-2/4 md:-translate-x-0 md:-translate-y-2/4">
          {/* goal boxes */}
          <div className="relative z-20 h-12 w-32 rounded-t-xl border-[3px]  border-b-0  border-solid border-[#97E8A9]   bg-[#8ADD9D] md:h-96 md:w-24 md:rounded-l-none md:rounded-r-xl md:border-b-[3px] md:border-l-0" />
          {/* goal circle */}
          <div className="absolute bottom-1 left-2/4  z-10 h-20 w-20 -translate-x-2/4 rounded-full border-[3px]  border-solid  border-[#97E8A9] md:bottom-1/2 md:left-0 md:h-48 md:w-48 md:translate-x-0 md:translate-y-1/2" />
          {/* goalkeeper position */}
          <div className="absolute bottom-2 left-1/2 z-30  hidden -translate-x-1/2 md:bottom-1/2 md:left-2 md:block md:translate-x-0 md:translate-y-1/2">
            <CardPlaceholder
              id="goalkeeper-1"
              position="goalkeeper"
              {...props}
            />
          </div>
        </div>

        {/* defender position */}
        <div className="z-30 hidden md:absolute md:bottom-1/4 md:left-[12.5%] md:top-auto md:block">
          <CardPlaceholder id="defender-1" position="defender" {...props} />
        </div>

        {/* midfielder position */}
        <div className="absolute bottom-20 right-8 z-30 hidden md:bottom-auto md:left-[22%] md:right-auto md:top-1/4 md:block">
          <CardPlaceholder id="midfielder-1" position="midfielder" {...props} />
          <animated.div style={animationSprings["player4-team2"]}>
            <div id="player4-team2">
              <Card
                kind="card"
                size={"sm"}
                color={"blue"}
                hover={false}
                captain={false}
                dribble={currentDribbles["player4-team2"] || 10}
                defense={10}
                currentDefense={currentDefenses["player4-team2"] || 10}
                energy={0}
              />
            </div>
          </animated.div>
        </div>

        {/* forward position */}
        <div className="absolute bottom-1/4 left-1/2 z-30 hidden -translate-x-1/2 -translate-y-1 md:bottom-2/4 md:left-[40%] md:block md:-translate-x-1/2 md:translate-y-1/2">
          <CardPlaceholder id="forward-1" position="forward" {...props} />
        </div>

        {/* mobile view */}
        <div className="absolute bottom-8 left-1/2 z-30 flex w-full -translate-x-1/2 flex-row justify-center gap-2 md:hidden">
          <CardPlaceholder
            id="goalkeeper-1-mobile"
            position="goalkeeper"
            {...props}
          />
          <CardPlaceholder
            id="defender-1-mobile"
            position="defender"
            {...props}
          />
          <CardPlaceholder
            id="midfielder-1-mobile"
            position="midfielder"
            {...props}
          />
          <CardPlaceholder
            id="forward-1-mobile"
            position="forward"
            {...props}
          />
        </div>

        {/* center line */}
        <div className="absolute left-0 right-0 top-2/4  border-[1.5px] border-solid border-green-300"></div>

        {/* center circle */}
        <div className="absolute left-2/4 top-2/4 -translate-x-2/4 -translate-y-2/4 ">
          <div className="relative h-28 w-28 rounded-full border-[3px]	 border-solid border-green-300 md:h-48 md:w-48">
            <div className="absolute right-2/4 top-2/4 h-14 w-14 -translate-y-2/4 translate-x-2/4 rounded-full  border-[3px] border-solid border-green-300 bg-green-400 md:h-24 md:w-24">
              <Image
                src="/images/FieldCenter.svg"
                className="object-cover md:-rotate-90"
                width={120}
                height={120}
                alt="Wings center"
              />
            </div>
          </div>
        </div>

        {/* defender position */}
        <div className="absolute bottom-12 left-8 z-30 hidden md:bottom-1/4 md:left-auto md:right-[12.5%] md:block">
          <CardPlaceholder id="defender-2" position="defender" {...props} />
          <animated.div style={animationSprings["player1-team1"]}>
            <div id="player1-team1">
              <Card
                kind="card"
                size={"sm"}
                color={"blue"}
                onClick={() => handleAttack("player1-team1", "player4-team2")}
                hover={false}
                captain={false}
                dribble={currentDribbles["player1-team1"] || 10}
                currentDefense={currentDefenses["player1-team1"] || 10}
                defense={4}
                energy={5}
              />
            </div>
          </animated.div>
        </div>

        {/* midfielder position */}
        <div className="absolute right-8 top-20 z-30 hidden  md:left-auto md:right-[22%] md:top-1/4 md:block">
          <CardPlaceholder id="midfielder-2" position="midfielder" {...props} />
        </div>

        {/* forward position */}
        <div className="absolute left-1/2 top-1/4 z-30 hidden -translate-x-1/2 translate-y-1  md:left-auto md:right-[40%] md:top-2/4 md:block md:-translate-y-1/2 md:translate-x-1/2">
          <CardPlaceholder id="forward-2" position="forward" {...props} />
        </div>

        {/* right / top penalty box */}
        <div className="absolute left-2/4 top-0 -translate-x-2/4 md:left-auto md:right-0 md:top-2/4 md:-translate-y-2/4 md:translate-x-0">
          {/* goal boxes */}
          <div className="relative z-20 h-12 w-32 rounded-b-xl border-[3px] border-t-0 border-solid border-[#97E8A9] bg-[#8ADD9D] md:h-96 md:w-24 md:rounded-b-none md:rounded-l-xl md:border-r-0 md:border-t-[3px]" />
          {/* goal circle */}
          <div className="absolute left-2/4 top-1 z-10 h-20 w-20 -translate-x-2/4 rounded-full border-[3px]  border-solid  border-[#97E8A9] md:bottom-1/2 md:left-0 md:h-48 md:w-48 md:-translate-x-1/2 md:translate-y-1/2" />
          {/* goalkeeper position */}
          <div className="absolute left-1/2 top-2 z-30 hidden -translate-x-1/2 md:left-auto md:right-2 md:top-1/2 md:block md:-translate-y-1/2 md:translate-x-0">
            <CardPlaceholder
              id="goalkeeper-2"
              position="goalkeeper"
              {...props}
            />
          </div>
        </div>
        {/* mobile view */}
        <div className="absolute left-1/2 top-8 z-0 flex -translate-x-1/2 flex-row gap-2 md:hidden">
          <CardPlaceholder
            id="goalkeeper-2-mobile"
            position="goalkeeper"
            {...props}
          />
          <CardPlaceholder
            id="defender-2-mobile"
            position="defender"
            {...props}
          />
          <CardPlaceholder
            id="midfielder-2-mobile"
            position="midfielder"
            {...props}
          />
          <CardPlaceholder
            id="forward-2-mobile"
            position="forward"
            {...props}
          />
        </div>
      </div>
    </div>
  );
}
