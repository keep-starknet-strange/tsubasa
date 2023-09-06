"use client";

import { useCardModal } from "../../components/card/CardModalContext";
import Card from "../../components/card/Card";
import CardAttribute from "../../components/card/CardAttribute";
import type { CardSize } from "../../components/card/types";

function randomNumber() {
  return Math.floor(Math.random() * 9) + 1;
}

const CardsPage = () => {
  const { show } = useCardModal();

  return (
    <>
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
                value={3}
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
                type="defense"
                value={3}
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
                type="defense"
                value={3}
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
                type="defense"
                value={3}
              />
            </div>
          ))}
        </div>

        <div className="flex flex-wrap">
          {["xl", "lg", "md", "sm", "xs"].map((size, index) => (
            <div className="mx-2 my-10 cursor-pointer" key={`card-1-${index}`}>
              <Card
                onClick={show}
                captain={true}
                dribble={1}
                energy={1}
                hover={false}
                player="1"
                size={size as CardSize}
                defense={3}
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
                  defense={3}
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
                  dribble={3}
                  energy={3}
                  hover={true}
                  size={size as CardSize}
                  defense={3}
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
                  dribble={3}
                  energy={3}
                  hover={false}
                  size={size as CardSize}
                  defense={1}
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
                  dribble={3}
                  energy={3}
                  hover={false}
                  size={size as CardSize}
                  defense={3}
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
                  dribble={3}
                  energy={3}
                  hover={false}
                  size={size as CardSize}
                  defense={3}
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
                  dribble={3}
                  energy={3}
                  hover={false}
                  size={size as CardSize}
                  defense={3}
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
                  dribble={3}
                  energy={3}
                  hover={false}
                  size={size as CardSize}
                  defense={3}
                  color="yellow"
                  kind="card-black"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default CardsPage;
