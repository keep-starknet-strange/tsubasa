"use client";

import Image from "next/image";
import PlayerPlaceholder from "../CardPlaceholder";

export default function Gameboard() {
  return (
    <div className="h-screen max-h-96 w-full lg:m-auto lg:h-[645px] lg:max-h-[645px] lg:w-11/12 lg:max-w-[1296px]">
      {/* field */}
      <div className="relative mx-auto box-border flex h-[368px] w-11/12 overflow-hidden rounded-xl border-[3px] border-solid border-[#97E8A9] bg-[#8ADD9D] lg:h-full lg:w-full ">
        {/* corners */}
        <div className="absolute -left-4 -top-4	h-9 w-9 rounded-full border-[3px] border-solid border-[#97E8A9] lg:h-12 lg:w-12" />
        <div className="absolute -right-4 -top-4	h-9 w-9 rounded-full border-[3px] border-solid border-[#97E8A9]  lg:h-12 lg:w-12 " />
        <div className="absolute -bottom-4 -left-4	h-9 w-9 rounded-full border-[3px] border-solid border-[#97E8A9]  lg:h-12 lg:w-12 " />
        <div className="absolute -bottom-4 -right-4	h-9 w-9 rounded-full border-[3px] border-solid border-[#97E8A9] lg:h-12 lg:w-12" />

        {/* left / top penalty box */}
        <div className="absolute bottom-0 left-2/4 -translate-x-2/4 lg:bottom-auto lg:left-0 lg:top-2/4 lg:-translate-x-0 lg:-translate-y-2/4">
          {/* goal boxes */}
          <div className="relative z-20 h-12 w-32 rounded-t-xl border-[3px]  border-b-0  border-solid border-[#97E8A9]	 bg-[#8ADD9D] lg:h-96 lg:w-24 lg:rounded-r-xl lg:rounded-t-none lg:border-b-[3px] lg:border-l-0" />
          {/* goal circle */}
          <div className="absolute bottom-1 left-2/4  z-10 h-20 w-20 -translate-x-2/4 rounded-full border-[3px]  border-solid	border-[#97E8A9] lg:bottom-1/2 lg:left-0 lg:h-48 lg:w-48 lg:translate-x-0 lg:translate-y-1/2" />
          {/* goalkeeper position */}
          <div className="absolute bottom-2 left-1/2 z-30 -translate-x-1/2 lg:bottom-1/2 lg:left-2 lg:translate-x-0 lg:translate-y-1/2">
            <PlayerPlaceholder position="goalkeeper" />
          </div>
        </div>

        {/* defender position */}
        <div className="absolute left-8 top-12 z-30 lg:left-[12.5%] lg:top-1/4">
          <PlayerPlaceholder position="defender" />
        </div>

        {/* midfielder position */}
        <div className="absolute bottom-20 right-8 z-30 lg:bottom-1/4 lg:left-[22%] lg:right-auto">
          <PlayerPlaceholder position="midfielder" />
        </div>

        {/* forward position */}
        <div className="absolute bottom-1/2 left-1/2 z-30 -translate-x-1/2 translate-y-32 lg:bottom-2/4 lg:left-[40%] lg:-translate-x-1/2 lg:translate-y-1/2 ">
          <PlayerPlaceholder position="forward" />
        </div>

        {/* center line */}
        <div className="absolute left-0 right-0 top-2/4  border-[1.5px] border-solid border-[#97E8A9] lg:bottom-0 lg:left-2/4 lg:top-0" />

        {/* center circle */}
        <div className="absolute left-2/4 top-2/4 -translate-x-2/4 -translate-y-2/4 ">
          <div className="relative h-28 w-28 rounded-full border-[3px]	 border-solid border-[#97E8A9] lg:h-48 lg:w-48">
            <div className="absolute right-2/4 top-2/4 h-14 w-14 -translate-y-2/4 translate-x-2/4 rounded-full  border-[3px] border-solid border-[#97E8A9] bg-[#8ADD9D] lg:h-24 lg:w-24">
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
        <div className="absolute left-8 top-12 z-30 lg:left-auto lg:right-[12.5%] lg:top-1/4 ">
          <PlayerPlaceholder position="defender" />
        </div>

        {/* midfielder position */}
        <div className="absolute right-8 top-20 z-30  lg:bottom-1/4 lg:left-auto lg:right-[22%] lg:top-auto">
          <PlayerPlaceholder position="midfielder" />
        </div>

        {/* forward position */}
        <div className="absolute left-1/2 top-1/4 z-30 -translate-x-1/2 translate-y-1  lg:left-auto lg:right-[40%] lg:top-2/4 lg:-translate-y-1/2 lg:translate-x-1/2">
          <PlayerPlaceholder position="forward" />
        </div>

        {/* right / bottom penalty box */}
        <div className="absolute left-2/4 top-0 -translate-x-2/4 lg:left-auto lg:right-0 lg:top-2/4 lg:-translate-y-2/4 lg:translate-x-0">
          {/* goal boxes */}
          <div className="relative z-20 h-12 w-32 rounded-b-xl border-[3px] border-t-0 border-solid border-[#97E8A9] bg-[#8ADD9D] lg:h-96 lg:w-24 lg:rounded-b-none lg:rounded-l-xl lg:border-r-0 lg:border-t-[3px]" />
          {/* goal circle */}
          <div className="absolute left-2/4 top-1 z-10 h-20 w-20 -translate-x-2/4 rounded-full border-[3px]  border-solid	border-[#97E8A9] lg:bottom-1/2 lg:left-0 lg:h-48 lg:w-48 lg:-translate-x-1/2 lg:translate-y-1/2" />
          {/* goalkeeper position */}
          <div className="absolute left-1/2 top-2 z-30 -translate-x-1/2 lg:left-auto lg:right-2 lg:top-1/2 lg:-translate-y-1/2 lg:translate-x-0">
            <PlayerPlaceholder position="goalkeeper" />
          </div>
        </div>
      </div>
    </div>
  );
}
