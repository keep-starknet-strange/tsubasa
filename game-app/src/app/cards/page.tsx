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
          <div className="m-1" key={`card-attribute-0-${index}`}>
            <CardAttribute
              buffed={false}
              hurt={false}
              pending={false}
              size={size as CardSize}
              color="blue"
              type="dribble"
              value={randomNumber()}
            />
          </div>
        ))}
        {["xl", "lg", "md", "sm", "xs"].map((size, index) => (
          <div className="m-1" key={`card-attribute-1-${index}`}>
            <CardAttribute
              buffed={false}
              hurt={false}
              pending={false}
              size={size as CardSize}
              color="yellow"
              type="stamina"
              value={randomNumber()}
            />
          </div>
        ))}
        {["xl", "lg", "md", "sm", "xs"].map((size, index) => (
          <div className="m-1" key={`card-attribute-2-${index}`}>
            <CardAttribute
              hurt={true}
              pending={false}
              size={size as CardSize}
              color="yellow"
              type="stamina"
              value={randomNumber()}
            />
          </div>
        ))}
        {["xl", "lg", "md", "sm", "xs"].map((size, index) => (
          <div className="m-1" key={`card-attribute-2-${index}`}>
            <CardAttribute
              buffed={true}
              pending={false}
              size={size as CardSize}
              color="yellow"
              type="stamina"
              value={randomNumber()}
            />
          </div>
        ))}
      </div>

      <div className="flex flex-wrap">
        {["xl", "lg", "md", "sm", "xs"].map((size, index) => (
          <div className="mx-2 my-10" key={`card-1-${index}`}>
            <Card
              captain={true}
              dribble={1}
              energy={1}
              hover={false}
              player="1"
              size={size as CardSize}
              stamina={randomNumber()}
              color="yellow"
              kind="card"
            />
          </div>
        ))}

        <div className="flex flex-wrap">
          {["xl", "lg", "md", "sm", "xs"].map((size, index) => (
            <div className="mx-2 my-10" key={`card-2-${index}`}>
              <Card
                captain={true}
                dribble={1}
                energy={1}
                hover={false}
                player="1"
                size={size as CardSize}
                stamina={randomNumber()}
                color="yellow"
                kind="card"
                state="pending"
              />
            </div>
          ))}
        </div>

        <div className="flex flex-wrap">
          {["xl", "lg", "md", "sm", "xs"].map((size, index) => (
            <div className="mx-2 my-10" key={`card-3-${index}`}>
              <Card
                captain={true}
                dribble={randomNumber()}
                energy={randomNumber()}
                hover={true}
                size={size as CardSize}
                stamina={randomNumber()}
                color="yellow"
                player="1"
                kind="card"
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
                size={size as CardSize}
                stamina={1}
                color="blue"
                kind="card"
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
                size={size as CardSize}
                stamina={randomNumber()}
                color="red"
                kind="card"
                state="buffed"
              />
            </div>
          ))}
        </div>

        <div className="flex flex-wrap">
          {["xl", "lg", "md", "sm", "xs"].map((size, index) => (
            <div className="mx-2 my-10" key={`card-6-${index}`}>
              <Card
                captain={true}
                dribble={randomNumber()}
                energy={randomNumber()}
                hover={false}
                size={size as CardSize}
                stamina={randomNumber()}
                color="blue"
                kind="card-black"
              />
            </div>
          ))}
        </div>
        <div className="flex flex-wrap">
          {["xl", "lg", "md", "sm", "xs"].map((size, index) => (
            <div className="mx-2 my-10" key={`card-7-${index}`}>
              <Card
                captain={true}
                dribble={randomNumber()}
                energy={randomNumber()}
                hover={false}
                size={size as CardSize}
                stamina={randomNumber()}
                color="red"
                kind="card-black"
              />
            </div>
          ))}
        </div>
        <div className="flex flex-wrap">
          {["xl", "lg", "md", "sm", "xs"].map((size, index) => (
            <div className="mx-2 my-10" key={`card-8-${index}`}>
              <Card
                captain={true}
                dribble={randomNumber()}
                energy={randomNumber()}
                hover={false}
                size={size as CardSize}
                stamina={randomNumber()}
                color="yellow"
                kind="card-black"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CardsPage;
