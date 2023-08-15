import Card from "../components/card/Card";
import CardAttribute from "../components/card/CardAttribute";
import type { CardSize } from "../components/card/types";

const CardsPage = () => {
  return (
    <div className="p-10">
      <div className="mb-6 flex flex-nowrap gap-2">
        {["xl", "lg", "md", "sm", "xs"].map((size) => (
          <CardAttribute
            bonus={false}
            hurt={false}
            pending={false}
            size={size as CardSize}
            team="blue"
            type="dribble"
            value={3}
          />
        ))}
        {["xl", "lg", "md", "sm", "xs"].map((size) => (
          <CardAttribute
            bonus={false}
            hurt={false}
            pending={false}
            size={size as CardSize}
            team="yellow"
            type="stamina"
            value={3}
          />
        ))}
      </div>

      <div className="flex flex-nowrap gap-2">
        {["xl", "lg", "md", "sm", "xs"].map((size) => (
          <Card
            captain={false}
            dribble={1}
            energy={1}
            hover={false}
            pending={false}
            player="1"
            size={size as CardSize}
            stamina={1}
            team="yellow"
          />
        ))}
      </div>

      <div className="mt-20 flex flex-nowrap gap-2">
        {["xl", "lg", "md", "sm", "xs"].map((size) => (
          <Card
            captain={false}
            dribble={1}
            energy={1}
            hover={true}
            pending={false}
            player="1"
            size={size as CardSize}
            stamina={1}
            team="yellow"
          />
        ))}
      </div>
    </div>
  );
};

export default CardsPage;
