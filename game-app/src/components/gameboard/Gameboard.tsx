"use client";

import Image from "next/image";
import { useState } from "react";
import EndTurnButton from "../EndTurnButton";
import Card from "../card/Card";
import { useSpring, animated } from "@react-spring/web";

export default function Gameboard() {
  const [isWaiting, setIsWaiting] = useState(false);

  const springs = useSpring({
    from: { x: 0 },
    to: { x: 100 },
  });

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
                <animated.div style={{ ...springs }}>
                  <div className="md:-rotate-90">
                    <Card
                      kind="card"
                      size={"sm"}
                      color={"blue"}
                      hover={false}
                      captain={false}
                      dribble={0}
                      stamina={0}
                      energy={0}
                    />
                  </div>
                </animated.div>
              </div>
            </div>
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
