"use client";

import Image from "next/image";
import PlayerPlaceholder from "../CardPlaceholder";

interface Props {
  playerPositions: object;
}

export default function Gameboard(props: Props) {
  const { playerPositions } = props;
  return (
    <div className="h-screen max-h-96 w-full md:m-auto md:h-[645px] md:max-h-[645px] md:w-11/12 md:max-w-[1296px]">
      {/* field */}
      <div className="relative mx-auto box-border flex h-full max-h-[645px] w-11/12 overflow-hidden rounded-xl border-[3px] border-solid border-[#97E8A9] bg-[#8ADD9D] md:h-full md:w-full ">
        {/* corners */}
        <div className="absolute -left-4 -top-4	h-9 w-9 rounded-full border-[3px] border-solid border-[#97E8A9] md:h-12 md:w-12" />
        <div className="absolute -right-4 -top-4	h-9 w-9 rounded-full border-[3px] border-solid border-[#97E8A9]  md:h-12 md:w-12 " />
        <div className="absolute -bottom-4 -left-4	h-9 w-9 rounded-full border-[3px] border-solid border-[#97E8A9]  md:h-12 md:w-12 " />
        <div className="absolute -bottom-4 -right-4	h-9 w-9 rounded-full border-[3px] border-solid border-[#97E8A9] md:h-12 md:w-12" />

        {/* left / bottom penalty box */}
        <div className="absolute bottom-0 left-2/4 -translate-x-2/4 md:bottom-auto md:left-0 md:top-2/4 md:-translate-x-0 md:-translate-y-2/4">
          {/* goal boxes */}
          <div className="relative z-20 h-12 w-32 rounded-t-xl border-[3px]  border-b-0  border-solid border-[#97E8A9]	 bg-[#8ADD9D] md:h-96 md:w-24 md:rounded-r-xl md:rounded-t-none md:border-b-[3px] md:border-l-0" />
          {/* goal circle */}
          <div className="absolute bottom-1 left-2/4  z-10 h-20 w-20 -translate-x-2/4 rounded-full border-[3px]  border-solid	border-[#97E8A9] md:bottom-1/2 md:left-0 md:h-48 md:w-48 md:translate-x-0 md:translate-y-1/2" />
          {/* goalkeeper position */}
          <div className="absolute bottom-2 left-1/2 z-30 -translate-x-1/2 md:bottom-1/2 md:left-2 md:translate-x-0 md:translate-y-1/2">
            <PlayerPlaceholder
              id="goalkeeper-1"
              position="goalkeeper"
              playerPositions={playerPositions}
            />
          </div>
        </div>

        {/* defender position */}
        <div className="absolute left-8 top-12 z-30 md:left-[12.5%] md:top-1/4">
          <PlayerPlaceholder
            id="defender-1"
            position="defender"
            playerPositions={playerPositions}
          />
        </div>

        {/* midfielder position */}
        <div className="absolute bottom-20 right-8 z-30 md:bottom-1/4 md:left-[22%] md:right-auto">
          <PlayerPlaceholder
            id="midfielder-1"
            position="midfielder"
            playerPositions={playerPositions}
          />
        </div>

        {/* forward position */}
        <div className="absolute bottom-1/4 left-1/2 z-30 -translate-x-1/2 -translate-y-1 md:bottom-2/4 md:left-[40%] md:-translate-x-1/2 md:translate-y-1/2 ">
          <PlayerPlaceholder
            id="forward-1"
            position="forward"
            playerPositions={playerPositions}
          />
        </div>

        {/* center line */}
        <div className="absolute left-0 right-0 top-2/4  border-[1.5px] border-solid border-[#97E8A9] md:bottom-0 md:left-2/4 md:top-0" />

        {/* center circle */}
        <div className="absolute left-2/4 top-2/4 -translate-x-2/4 -translate-y-2/4 ">
          <div className="relative h-28 w-28 rounded-full border-[3px]	 border-solid border-[#97E8A9] md:h-48 md:w-48">
            <div className="absolute right-2/4 top-2/4 h-14 w-14 -translate-y-2/4 translate-x-2/4 rounded-full  border-[3px] border-solid border-[#97E8A9] bg-[#8ADD9D] md:h-24 md:w-24">
              <Image
                src="/images/FieldCenter.svg"
                className="object-cover"
                width={120}
                height={120}
                alt="Wings center"
              />
            </div>
          </div>
        </div>

        {/* defender position */}
        <div className="absolute bottom-12 left-8 z-30 md:left-auto md:right-[12.5%] md:top-1/4 ">
          <PlayerPlaceholder
            id="defender-2"
            position="defender"
            playerPositions={playerPositions}
          />
        </div>

        {/* midfielder position */}
        <div className="absolute right-8 top-20 z-30  md:bottom-1/4 md:left-auto md:right-[22%] md:top-auto">
          <PlayerPlaceholder
            id="midfielder-2"
            position="midfielder"
            playerPositions={playerPositions}
          />
        </div>

        {/* forward position */}
        <div className="absolute left-1/2 top-1/4 z-30 -translate-x-1/2 translate-y-1  md:left-auto md:right-[40%] md:top-2/4 md:-translate-y-1/2 md:translate-x-1/2">
          <PlayerPlaceholder
            id="forward-2"
            position="forward"
            playerPositions={playerPositions}
          />
        </div>

        {/* right / top penalty box */}
        <div className="absolute left-2/4 top-0 -translate-x-2/4 md:left-auto md:right-0 md:top-2/4 md:-translate-y-2/4 md:translate-x-0">
          {/* goal boxes */}
          <div className="relative z-20 h-12 w-32 rounded-b-xl border-[3px] border-t-0 border-solid border-[#97E8A9] bg-[#8ADD9D] md:h-96 md:w-24 md:rounded-b-none md:rounded-l-xl md:border-r-0 md:border-t-[3px]" />
          {/* goal circle */}
          <div className="absolute left-2/4 top-1 z-10 h-20 w-20 -translate-x-2/4 rounded-full border-[3px]  border-solid	border-[#97E8A9] md:bottom-1/2 md:left-0 md:h-48 md:w-48 md:-translate-x-1/2 md:translate-y-1/2" />
          {/* goalkeeper position */}
          <div className="absolute left-1/2 top-2 z-30 -translate-x-1/2 md:left-auto md:right-2 md:top-1/2 md:-translate-y-1/2 md:translate-x-0">
            <PlayerPlaceholder
              id="goalkeeper-2"
              position="goalkeeper"
              playerPositions={playerPositions}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
