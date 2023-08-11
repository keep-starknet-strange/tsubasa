"use client";

import { useState } from "react";

export default function Gameboard(props: any) {
  return (
    // TODO: Extract colors to the Tailwind theme once properly defined
    <div className="flex min-h-screen w-full items-center justify-center ">
      {/* corner */}
      <div className="relative h-[656px] max-h-[656px] min-h-[656px] w-9/12 min-w-[816px] max-w-[1096px] overflow-hidden rounded-xl border-[3px]	 border-solid border-[#97E8A9] bg-[#8ADD9D]	">
        <div className="absolute -left-4 -top-4	h-8 w-8 rounded-full border-[3px] border-solid border-[#97E8A9]" />
        <div className="absolute -right-4 -top-4	h-8 w-8 rounded-full border-[3px] border-solid border-[#97E8A9] " />
        <div className="absolute -bottom-4 -left-4	h-8 w-8 rounded-full border-[3px] border-solid border-[#97E8A9] " />
        <div className="absolute -bottom-4 -right-4	h-8 w-8 rounded-full border-[3px] border-solid border-[#97E8A9] " />

        {/* left penalty box */}
        <div className="absolute left-0 top-2/4 -translate-y-2/4">
          {/* goal boxes */}
          <div className="relative z-20 h-96 w-32  rounded-r-xl  border-[3px] border-l-0	 border-solid border-[#97E8A9] bg-[#8ADD9D]" />
          {/* goal circle */}
          <div className="absolute top-2/4  z-10 m-auto h-[240px] w-[240px] -translate-y-2/4   rounded-full border-[3px]  border-solid	border-[#97E8A9] " />
        </div>

        {/* center line */}
        <div className="absolute bottom-0 left-2/4 top-0  border-[1.5px] border-solid border-[#97E8A9]" />

        {/* center circle */}
        <div className="absolute left-2/4 top-2/4 -translate-x-2/4 -translate-y-2/4 ">
          <div className=" h-[240px] w-[240px] rounded-full border-[3px]	 border-solid border-[#97E8A9]">
            <div className=" h-[120px] w-[120px] translate-x-2/4 translate-y-2/4 rounded-full border-solid border-[#97E8A9] bg-[#8ADD9D]">
              <img src="/images/FieldCenter.svg" className="object-cover" />
            </div>
          </div>
        </div>

        {/* right penalty box */}
        <div className="absolute right-0 top-2/4 -translate-y-2/4">
          {/* goal boxes */}
          <div className="relative top-1/4 z-20 h-96 w-32  rounded-l-xl  border-[3px] border-r-0	 border-solid border-[#97E8A9] bg-[#8ADD9D]" />
          {/* goal circle */}
          <div className="absolute right-0 top-2/4 z-10 m-auto h-[240px] w-[240px] -translate-y-2/4  rounded-full border-[3px]  border-solid	border-[#97E8A9] " />
        </div>
      </div>
    </div>
  );
}
