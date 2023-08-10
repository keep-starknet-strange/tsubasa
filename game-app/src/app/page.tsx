import ConnectButton from "./components/ConnectButton";
import Scoreboard from "./components/Scoreboard";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center gap-4">
      <Scoreboard />
      <ConnectButton />
    </main>
  );
}
