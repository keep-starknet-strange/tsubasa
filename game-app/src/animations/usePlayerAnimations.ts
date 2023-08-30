import { SpringRef, useSpring } from "@react-spring/web";

interface AnimationApis {
  [key: string]: SpringRef<{
    transform: string;
  }>;
}

export const usePlayerAnimations = () => {
  const [springPlayer1Team1, apiPlayer1Team1] = useSpring(() => ({
    from: { transform: "x" },
  }));
  const [springPlayer2Team1, apiPlayer2Team1] = useSpring(() => ({
    from: { transform: "x" },
  }));
  const [springPlayer3Team1, apiPlayer3Team1] = useSpring(() => ({
    from: { transform: "x" },
  }));
  const [springPlayer4Team1, apiPlayer4Team1] = useSpring(() => ({
    from: { transform: "x" },
  }));
  const [springPlayer1Team2, apiPlayer1Team2] = useSpring(() => ({
    from: { transform: "x" },
  }));
  const [springPlayer2Team2, apiPlayer2Team2] = useSpring(() => ({
    from: { transform: "x" },
  }));
  const [springPlayer3Team2, apiPlayer3Team2] = useSpring(() => ({
    from: { transform: "x" },
  }));
  const [springPlayer4Team2, apiPlayer4Team2] = useSpring(() => ({
    from: { transform: "x" },
  }));

  const animationApis: AnimationApis = {
    "player1-team1": apiPlayer1Team1,
    "player2-team1": apiPlayer2Team1,
    "player3-team1": apiPlayer3Team1,
    "player4-team1": apiPlayer4Team1,
    "player1-team2": apiPlayer1Team2,
    "player2-team2": apiPlayer2Team2,
    "player3-team2": apiPlayer3Team2,
    "player4-team2": apiPlayer4Team2,
  };

  const animationSprings = {
    "player1-team1": springPlayer1Team1,
    "player2-team1": springPlayer2Team1,
    "player3-team1": springPlayer3Team1,
    "player4-team1": springPlayer4Team1,
    "player1-team2": springPlayer1Team2,
    "player2-team2": springPlayer2Team2,
    "player3-team2": springPlayer3Team2,
    "player4-team2": springPlayer4Team2,
  };

  return { animationApis, animationSprings };
};
