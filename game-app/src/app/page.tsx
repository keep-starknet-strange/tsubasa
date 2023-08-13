import Card from "./components/card/Card";
import ConnectButton from "./components/ConnectButton";
import Gameboard from "./components/gameboard/Gameboard";
import Scoreboard from "./components/Scoreboard";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center gap-4">
      <div>
        <Card hover={true} player="1" team="yellow" />
      </div>

      <div className="flex w-full items-end justify-end md:fixed">
        <div className="p-2">
          <ConnectButton />
        </div>
      </div>
      <div className="flex h-full w-screen flex-col ">
        <div className="w-full flex-1 md:relative md:h-full">
          <div className="z-10 m-2 mx-auto w-max md:absolute md:left-1/2 md:top-0 md:m-0 md:-translate-x-1/2">
            <Scoreboard />
          </div>

          <div className="absolute inset-3.5">
            <Card hover={false} player="1" team="blue" />
          </div>

          <Gameboard />
        </div>
      </div>
    </main>
  );
}
