"use client";

import Image from "next/image";
import { useState } from "react";
import EndTurnButton from "../EndTurnButton";
import Card from "../card/Card";
import { useSpring, animated } from "@react-spring/web";

export default function Gameboard() {
  const [isWaiting, setIsWaiting] = useState(false);

  const [springs, api] = useSpring(() => ({
    from: { transform: "x" },
  }));

  const [springs2, api2] = useSpring(() => ({
    from: { transform: "x" },
  }));

  // attack
  const triggerAttackAnimation = () => {
    api.start({
      from: { transform: "translate3d(0px, 0px, 0px)" },
      to: [
        { transform: "translate3d(0px, 20px, 0px)" }, // go backward
        { transform: "translate3d(0px, -150px, 0px)" }, // hit
        { transform: "translate3d(0px, 0px, 0px)" }, // Initial position
      ],
      config: { tension: 210, friction: 20, clamp: true }, // possible to add mass here
    });
  };

  const triggerTakeDamangeAnimation = () => {
    api2.start({
      from: { transform: "translate3d(0px, 0px, 0px)" },
      to: [
        { transform: "translate3d(0px, 20px, 0px)" }, // go backward
      ],
      config: { tension: 210, friction: 20, clamp: true }, // possible to add mass here
    });
  };

  return (
    <div className=" h-screen max-h-96 w-full flex-1 md:m-auto md:max-h-[1096px] md:min-h-[768px] md:max-w-[656px]">
      <div className="md:rotate-90">
        {/* field */}
        <div className="relative mx-auto box-border flex h-[368px] w-11/12 overflow-hidden rounded-xl border-[3px] border-solid border-green-300 bg-green-400 md:h-screen md:w-full ">
          {/* corners */}
          <div className="absolute -left-4 -top-4	h-9 w-9 rounded-full border-[3px] border-solid border-green-300 md:h-12 md:w-12" />
          <div className="absolute -right-4 -top-4	h-9 w-9 rounded-full border-[3px] border-solid border-green-300  md:h-12 md:w-12 " />
          <div className="absolute -bottom-4 -left-4	h-9 w-9 rounded-full border-[3px] border-solid border-green-300  md:h-12 md:w-12 " />
          <div className="absolute -bottom-4 -right-4	h-9 w-9 rounded-full border-[3px] border-solid border-green-300 md:h-12 md:w-12" />

          {/* left penalty box */}
          <div className="absolute bottom-0 left-2/4 -translate-x-2/4">
            {/* goal boxes */}
            <div className="relative z-20 h-12 w-32 rounded-t-xl border-[3px]  border-b-0  border-solid border-green-300	 bg-green-400 md:h-32 md:w-96" />
            {/* goal circle */}
            <div className="absolute bottom-1/4 left-2/4  z-10 h-20 w-20 -translate-x-2/4    rounded-full border-[3px]  border-solid	border-green-300 md:h-48 md:w-48 " />
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

          {/* Team1 */}
          <div className="absolute left-[20rem] top-[30rem]" id="player1-team1">
            {/* PLAYER 1 */}
            <animated.div style={{ ...springs }}>
              <div className="md:-rotate-90">
                <Card
                  kind="card"
                  size={"sm"}
                  color={"blue"}
                  onClick={triggerAttackAnimation}
                  hover={false}
                  captain={false}
                  dribble={0}
                  stamina={0}
                  energy={0}
                />
              </div>
            </animated.div>
          </div>
          <div className="absolute left-[16rem] top-[36rem]" id="player2-team1">
            {/* PLAYER 2 */}
          </div>
          <div className="absolute left-[20rem] top-[42rem]" id="player3-team1">
            {/* PLAYER3 */}
          </div>
          <div className="absolute left-[16rem] top-[48rem]" id="player4-team1">
            {/* PLAYER 4 */}
          </div>

          {/* Team2 */}
          <div className="absolute left-[20rem] z-50" id="player1-team2">
            {/* PLAYER 5 */}
          </div>
          <div
            className="absolute left-[16rem] top-[6rem] z-50"
            id="player2-team2"
          >
            {/* PLAYER 6 */}
          </div>
          <div className="absolute left-[20rem] top-[12rem]" id="player3-team2">
            {/* PLAYER 7 */}
          </div>
          <div className="absolute left-[16rem] top-[18rem]" id="player4-team2">
            {/* PLAYER 8 */}
            <animated.div style={{ ...springs2 }}>
              <div className="md:-rotate-90">
                <Card
                  kind="card"
                  size={"sm"}
                  color={"blue"}
                  onClick={triggerTakeDamangeAnimation}
                  hover={false}
                  captain={false}
                  dribble={0}
                  stamina={0}
                  energy={0}
                />
              </div>
            </animated.div>
          </div>

          <div className="absolute left-2/4 top-0 -translate-x-2/4">
            {/* goal boxes */}
            <div className="relative z-20 h-12 w-32  rounded-b-xl  border-[3px] border-t-0	 border-solid border-green-300 bg-green-400 md:h-32 md:w-96" />
            {/* goal circle */}
            <div className="absolute left-2/4 top-1/4  z-10 h-20 w-20 -translate-x-2/4    rounded-full border-[3px]  border-solid	border-green-300 md:h-48 md:w-48" />
          </div>
        </div>
      </div>
      <EndTurnButton isWaiting={isWaiting} />
    </div>
  );
}
