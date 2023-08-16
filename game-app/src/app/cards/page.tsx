import Card from "../components/card/Card";
import CardAttribute from "../components/card/CardAttribute";
import type { CardSize } from "../components/card/types";

function randomNumber() {
  return Math.floor(Math.random() * 9) + 1;
}

const CardsPage = () => {
  return (
    <div className="p-10">
      <div className="flex flex-wrap">
        {["xl", "lg", "md", "sm", "xs"].map((size, index) => (
          <div className="m-1" key={`card-0-${index}`}>
            <CardAttribute
              bonus={false}
              hurt={false}
              pending={false}
              size={size as CardSize}
              team="blue"
              type="dribble"
              value={randomNumber()}
            />
          </div>
        ))}
        {["xl", "lg", "md", "sm", "xs"].map((size, index) => (
          <div className="m-1" key={`card-1-${index}`}>
            <CardAttribute
              bonus={false}
              hurt={false}
              pending={false}
              size={size as CardSize}
              team="yellow"
              type="stamina"
              value={randomNumber()}
            />
          </div>
        ))}
      </div>

      <div className="flex flex-wrap">
        {["xl", "lg", "md", "sm", "xs"].map((size, index) => (
          <div className="mx-2 my-10" key={`card-2-${index}`}>
            <Card
              captain={true}
              dribble={1}
              energy={1}
              hover={false}
              pending={false}
              player="1"
              size={size as CardSize}
              stamina={randomNumber()}
              team="yellow"
            />
          </div>
        ))}

        <div className="flex flex-wrap">
          {["xl", "lg", "md", "sm", "xs"].map((size, index) => (
            <div className="mx-2 my-10" key={`card-3-${index}`}>
              <Card
                captain={true}
                dribble={randomNumber()}
                energy={randomNumber()}
                hover={true}
                pending={false}
                size={size as CardSize}
                stamina={randomNumber()}
                team="yellow"
                player="1"
              />
            </div>
          ))}
        </div>

        <div className="flex flex-wrap">
          {["xl", "lg", "md", "sm", "xs"].map((size, index) => (
            <div className="mx-2 my-10" key={`card-4-${index}`}>
              <Card
                captain={true}
                dribble={randomNumber()}
                energy={randomNumber()}
                hover={false}
                pending={false}
                size={size as CardSize}
                stamina={1}
                team="blue"
              />
            </div>
          ))}
        </div>

        <div className="flex flex-wrap">
          {["xl", "lg", "md", "sm", "xs"].map((size, index) => (
            <div className="mx-2 my-10" key={`card-5-${index}`}>
              <Card
                captain={true}
                dribble={randomNumber()}
                energy={randomNumber()}
                hover={false}
                pending={false}
                size={size as CardSize}
                stamina={randomNumber()}
                team="red"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CardsPage;
