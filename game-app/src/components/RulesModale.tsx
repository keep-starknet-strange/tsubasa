"use client";

import CloseIcon from "./icons/CloseIcon";

const RulesModale = ({
  isOpen,
  close,
}: {
  isOpen: boolean;
  close: () => void;
}) => {
  if (!isOpen) return null;
  return (
    <div className="fixed bottom-0 left-0 right-0 top-0 z-[100]">
      <div className="absolute  bottom-0 left-0 right-0 top-0 bg-black opacity-90"></div>
      <div className="absolute right-10 top-10 cursor-pointer" onClick={() => close()}>
          <CloseIcon />
        </div>
      <div className="relative top-20 mx-auto flex max-w-[800px]">
       
        <div className="container max-h-[80vh] overflow-y-auto px-9 pb-6 ">
          <h3 className="mb-12 text-center text-2xl">RULES</h3>
          <ol className="flex list-decimal flex-col justify-start gap-2 pl-3">
            <li>A game is composed of multiple rounds</li>
            <li>The first player to win 2 rounds wins the game</li>
            <li>To win a round a player has to score a goal</li>
            <li>Each player can place 4 cards at most on the field</li>
            <li>
              When you place a card on the board it&apos;ll wait on side until
              your next turn to enter the field
            </li>
            <li>
              To place a card you&apos;ll need to spend the amount of energy
              specified on it
            </li>
            <li>The energy level is reset and increased at each turn</li>
            <li>You can place multiple cards on the board during 1 turn</li>
            <li>Each card has 2 statistics dribble/defense</li>
            <li>
              If you place your card in its real role it will have +1 in dribble
              and in defense
            </li>
            <li>
              {
                "The defense is the ability to counter a dribble. If a card A (6 dribble, 3 defense) attacks a card B (2 dribble, 4 defense). The card A will dribble B for sure because 6 >= 4 and will go out of the game. A will stay in the game because 3 >= 2 but A’s defense will be decremented to 1."
              }
            </li>
            <li>
              You can define your team captain while creating your deck. Your
              team captain will have +1 in dribble and defense.
            </li>
            <li>
              When the adversary board is empty, your cards will score a goal
              and you&apos;ll win the round
            </li>
            <li>
              If both players don&apos;t have cards anymore the round is a draw
            </li>
            <li>The number of rounds played to finish a game is unlimited</li>
          </ol>
        </div>
      </div>
    </div>
  );
};

export default RulesModale;
