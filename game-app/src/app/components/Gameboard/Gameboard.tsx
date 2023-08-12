"use client";

import Image from "next/image";

export default function Gameboard() {
  return (
    // TODO: Extract colors to the Tailwind theme once properly defined

    <div className="mx-[10px] h-screen max-h-96 w-full flex-1 md:max-h-[1096px] md:min-h-[768px] md:max-w-[656px] md:rotate-90">
      {/* field */}
      <div className="relative box-border flex h-screen w-full overflow-hidden rounded-xl border-[3px] border-solid border-[#97E8A9] bg-[#8ADD9D] ">
        {/* corners */}
        <div className="absolute -left-4 -top-4	h-9 w-9 rounded-full border-[3px] border-solid border-[#97E8A9] md:h-12 md:w-12" />
        <div className="absolute -right-4 -top-4	h-9 w-9 rounded-full border-[3px] border-solid border-[#97E8A9]  md:h-12 md:w-12 " />
        <div className="absolute -bottom-4 -left-4	h-9 w-9 rounded-full border-[3px] border-solid border-[#97E8A9]  md:h-12 md:w-12 " />
        <div className="absolute -bottom-4 -right-4	h-9 w-9 rounded-full border-[3px] border-solid border-[#97E8A9] md:h-12 md:w-12" />

        {/* left penalty box */}
        <div className="absolute bottom-0 left-2/4 -translate-x-2/4">
          {/* goal boxes */}
          <div className="relative z-20 h-14 w-44 rounded-t-xl border-[3px]  border-b-0  border-solid border-[#97E8A9]	 bg-[#8ADD9D] md:h-32 md:w-96" />
          {/* goal circle */}
          <div className="absolute left-2/4 top-0  z-10 h-28 w-28 -translate-x-2/4 -translate-y-2/4   rounded-full border-[3px]  border-solid	border-[#97E8A9] md:h-60 md:w-60 " />
        </div>

        {/* center line */}
        <div className="absolute left-0 right-0 top-2/4  border-[1.5px] border-solid border-[#97E8A9]" />

        {/* center circle */}
        <div className="absolute left-2/4 top-2/4 -translate-x-2/4 -translate-y-2/4 ">
          <div className="relative h-28 w-28 rounded-full border-[3px]	 border-solid border-[#97E8A9] md:h-60 md:w-60">
            <div className="absolute right-2/4 top-2/4 h-14 w-14 -translate-y-2/4 translate-x-2/4 rounded-full  border-[3px] border-solid border-[#97E8A9] bg-[#8ADD9D] md:h-32 md:w-32">
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

        <div className="absolute left-2/4 top-0 -translate-x-2/4">
          {/* goal boxes */}
          <div className="relative z-20 h-14 w-44  rounded-b-xl  border-[3px] border-t-0	 border-solid border-[#97E8A9] bg-[#8ADD9D] md:h-32 md:w-96" />
          {/* goal circle */}
          <div className="absolute left-2/4 top-0  z-10 h-28 w-28 -translate-x-2/4    rounded-full border-[3px]  border-solid	border-[#97E8A9] md:h-60 md:w-60" />
        </div>
      </div>
    </div>
  );
}
