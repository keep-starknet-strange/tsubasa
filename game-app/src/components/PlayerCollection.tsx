import DraggableCard from "@/components/dragAndDrop/DraggableCard";
import Card from "./card/Card";
import type { ExtendedCardProps } from "./card/types";
import { useCardModal } from "./card/CardModalContext";

import CardModal from "./card/CardModal";

interface PlayerCollectionProps {
  playerCollection: ExtendedCardProps[];
}

export default function PlayerCollection(props: PlayerCollectionProps) {
  const { playerCollection } = props;
  const { show } = useCardModal();

  return (
    <div className="flex flex-wrap items-start justify-center p-4">
      {playerCollection.map((cardData, index) => (
        <div key={index} className="m-2">
          <div
            onClick={() => {
              show(cardData);
            }}
          >
            <Card {...cardData} />
          </div>
        </div>
      ))}
      <CardModal />
    </div>
  );
}
