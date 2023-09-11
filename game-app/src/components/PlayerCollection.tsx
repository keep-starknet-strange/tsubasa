import Card from "./card/Card";
import type { CardData, ExtendedCardProps } from "./card/types";
import { useCardModal } from "./card/CardModalContext";

import CardModal from "./card/CardModal";

interface PlayerCollectionProps {
  playerCollection: ExtendedCardProps[];
  handleAddToDeckPage: (cardDetails: ExtendedCardProps) => void;
}

export default function PlayerCollection(props: PlayerCollectionProps) {
  const { playerCollection } = props;
  const { show } = useCardModal();

  const handleAddToDeck = (cardDetails: ExtendedCardProps) => {
    props.handleAddToDeckPage(cardDetails);
  };

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
            <CardModal onAddToDeck={handleAddToDeck} cardData={cardData} />
          </div>
        </div>
      ))}
    </div>
  );
}
