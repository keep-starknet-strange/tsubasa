"use client";

import Image from "next/image";
import Link from "next/link";
import GenericButton from "../components/buttons/GenericButton";
import React, { useState } from "react";
import SocialLinks from "../components/SocialLinks";
import {
  DeckIcon,
  StarkwareIcon,
  CartridgeIcon,
  DojoIcon,
} from "../components/icons";

import RulesModale from "../components/RulesModale";

export default function Home() {
  const [isRulesOpen, setIsRulesOpen] = useState(false);

  return (
    <main className="flex min-h-screen flex-col items-center gap-4">
      <div className="mx-auto font-agrandir md:container">
        <div className="fixed left-0 right-0 z-40 md:left-5 md:right-5">
          <div className="mx-auto mt-0 flex max-w-[1024px] justify-between md:mt-6">
            <div>
              <GenericButton
                onClick={() => {}}
                label="login"
                customStyles="rounded-br-3xl"
              />
            </div>

            <div>
              <SocialLinks />
            </div>
          </div>

          <Image
            className="mx-auto my-12  hidden md:my-0 md:flex"
            src="/images/tsubasa.svg"
            width={240}
            height={30}
            alt={"Tsubasa"}
          />
        </div>

        <Image
          className="mx-auto my-12 flex pt-6 md:my-0 md:hidden"
          src="/images/tsubasa.svg"
          width={240}
          height={30}
          alt={"Tsubasa"}
        />

        <div className="hidden md:mt-24 md:flex">&nbsp;</div>

        <div className="container mx-auto my-12 mt-24 flex max-w-[300px] flex-col-reverse items-center justify-center rounded-2xl bg-greenBlack md:my-36 md:mt-36 md:max-w-[800px] md:flex-row">
          <div className=" py-6 text-center text-xl font-bold md:text-left md:text-3xl">
            <div className="py-0 md:py-2">
              Onchain <span className="text-cyan-300">Football!</span>
            </div>
            <div className="py-0 md:py-2">
              Onchain <span className="text-yellow-300">Strategy!</span>
            </div>
            <div className="py-0 md:py-2">
              Onchain <span className="text-salmon-300">Collectibles!</span>
            </div>
          </div>
          <div className="mt-24 w-1/2 md:mt-0">
            <Image
              className="absolute  hidden md:flex"
              style={{ transform: "translate3d(50px, -50%, 0)" }}
              src="/images/home-cards.png"
              width={430}
              height={265}
              alt={"Tsubasa cards"}
            />
            <Image
              className="absolute mx-auto md:hidden"
              src="/images/home-cards-mobile.png"
              style={{ transform: "translate3d(-15px, -90%, 0px)" }}
              width={180}
              height={200}
              alt={"Tsubasa team"}
            />
          </div>
        </div>

        <div className="mb-24 md:mb-48">
          <h2 className="mb-12 text-center text-2xl font-bold text-green-900 md:mb-24 md:text-4xl">
            BUILD YOUR TEAM
          </h2>

          <button className="mx-auto mb-12 flex w-auto cursor-default flex-row items-center rounded-full border border-green-600 bg-green-500 p-2 px-3 font-bold text-greenBlack drop-shadow-sm md:p-3 md:px-4 ">
            <DeckIcon />
            <span className="mx-2"> 8 / 8</span>
          </button>

          <Image
            className="mx-auto  px-3 "
            src="/images/home-team.png"
            width={800}
            height={400}
            alt={"Tsubasa team"}
          />
        </div>

        <div className="mb-24 md:mb-48">
          <h2 className="mb-12 text-center text-2xl font-bold text-green-900 md:mb-24 md:text-4xl">
            TAKE THE FIELD
          </h2>
          <Image
            className="mx-auto hidden md:flex"
            src="/images/home-board.png"
            width={700}
            height={353}
            alt={"Tsubasa board"}
          />
          <Image
            className="mx-auto md:hidden"
            src="/images/home-board-mobile.png"
            width={311}
            height={276}
            alt={"Tsubasa board"}
          />
        </div>

        <div className="mb-24 md:mb-48">
          <h2 className="mb-12 text-center text-2xl font-bold text-green-900 md:mb-24 md:text-4xl">
            COMPETE FOR GLORY
          </h2>
          <div className="w-xl mx-auto flex justify-center">
            <Image
              className="mx-auto px-3"
              src="/images/home-scoreboard.png"
              width={640}
              height={168}
              alt={"Tsubasa scoreboard"}
            />
          </div>
        </div>

        <div className="mb-24 flex flex-col items-center md:mb-48">
          <button
            onClick={() => setIsRulesOpen(true)}
            className="mb-12 flex flex-row items-center rounded-full bg-green-300 p-2 px-4 font-bold text-greenBlack drop-shadow-lg hover:bg-green-200 md:mb-24 md:p-3  md:px-6"
          >
            RULES
          </button>
          <RulesModale
            isOpen={isRulesOpen}
            close={() => setIsRulesOpen(false)}
          />

          <div className="mb-3 text-green-700">Brought to you by...</div>

          <div className="my-3 flex gap-12 text-green-900">
            <Link
              target="_blank"
              href="https://starkware.co/"
              className="hover:text-starkwareBlue"
            >
              <StarkwareIcon />
            </Link>
            <Link
              target="_blank"
              href="https://cartridge.gg/"
              className="hover:text-cartridgeYellow"
            >
              <CartridgeIcon />
            </Link>
          </div>

          <div className="mb-12 text-green-700">
            and{" "}
            <Link
              className="hover:text-green-900"
              target="_blank"
              href="https://github.com/keep-starknet-strange/tsubasa#contributors-"
            >
              friends
            </Link>
          </div>

          <div className="mb-24">
            <Link
              target="_blank"
              href="https://www.dojoengine.org/"
              className="flex justify-center rounded-md bg-greenBlack p-2 px-3 text-green-700 hover:text-dojoRed"
            >
              <span className="mr-2">Built with </span>
              <DojoIcon />
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
