import ConnectButton from "./components/ConnectButton";
import Gameboard from "./components/Gameboard/Gameboard";
import Scoreboard from "./components/Scoreboard";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center gap-4">
      <div className="flex w-full items-end justify-end">
        <div className="p-2">
          <ConnectButton />
        </div>
      </div>
      <div className="absolute flex h-screen w-screen flex-col items-center justify-center">
        <div className="w-full md:relative md:h-full">
          <div className="z-10 m-2 mx-auto w-max md:absolute md:left-1/2 md:top-0 md:m-0 md:-translate-x-1/2">
            <Scoreboard />
          </div>
          <Gameboard />
        </div>
      </div>
    </main>
  );
}
