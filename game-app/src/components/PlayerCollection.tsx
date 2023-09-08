import DraggableCard from "@/components/dragAndDrop/DraggableCard";
import Card from "./card/Card";
import type { ExtendedCardProps } from "./card/types";

interface PlayerCollectionProps {
  playerCollection: ExtendedCardProps[];
}

export default function PlayerCollection(props: PlayerCollectionProps) {
  const { playerCollection } = props;

  return (
    <div className="flex flex-wrap items-start justify-center p-4">
      {playerCollection.map((cardData, index) => (
        <div key={index} className="m-2">
          <DraggableCard id={cardData.id} data={cardData}>
            <Card {...cardData} />
          </DraggableCard>
        </div>
      ))}
    </div>
  );
}
