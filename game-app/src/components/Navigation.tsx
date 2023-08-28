"use client";

import Link from "next/link";
import { HomeIcon, DeckIcon, FilterIcon } from "./icons";

const NavigationItem = ({
  href,
  icon,
  label,
}: {
  href: string;
  icon: React.FC;
  label: string;
}) => {
  return (
    <Link
      href={href}
      className="flex flex-row items-center border border-solid border-green-600 p-2 px-4 font-bold hover:bg-green-200 active:bg-green-300 md:p-3 md:px-5"
    >
      {icon({})}
      <span className="ml-1 hidden md:flex">{label}</span>
    </Link>
  );
};

export default function Navigation() {
  return (
    <div className="flex w-auto flex-row items-center overflow-hidden rounded-t-2xl border border-solid border-green-600  bg-green-400 text-greenBlack drop-shadow-lg md:rounded-full">
      <NavigationItem href="/" icon={HomeIcon} label={"HOME"} />
      <NavigationItem href="/cards" icon={DeckIcon} label={"DECK"} />
      <NavigationItem href="/playground" icon={FilterIcon} label={"GAME"} />
    </div>
  );
}
