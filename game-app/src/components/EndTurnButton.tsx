"use client";

interface EndTurnProps {
  isWaiting: boolean;
}

export default function EndTurnButton({ isWaiting = false }: EndTurnProps) {
  return (
    <button
      className="flex flex-row items-center rounded-full border border-green-600 bg-neon p-3 px-6  font-bold text-greenBlack drop-shadow-lg hover:bg-green-200"
      onClick={() => {
        // end turn logic
      }}
    >
      {isWaiting ? "WAITING ..." : "END TURN"}
    </button>
  );
}
