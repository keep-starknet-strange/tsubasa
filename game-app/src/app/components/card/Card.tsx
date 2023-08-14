import CardAttribute from "./CardAttribute";

const Card = () => {
  return (
    <div className="flex h-[320px] w-[224px] items-start justify-between rounded bg-[#F4C844] p-4 shadow-md">
      <CardAttribute
        bonus={false}
        hurt={false}
        pending={false}
        team="yellow"
        type="dribble"
        value={3}
      />
      <CardAttribute
        bonus={false}
        hurt={true}
        pending={false}
        team="yellow"
        type="stamina"
        value={10}
      />
    </div>
  );
};

export default Card;
