import Image from "next/image";

const CardSticker = () => {
  return (
    <div className="absolute bottom-0 left-0 z-10">
      <Image src="/images/Sticker.png" width={48} height={32} alt="sticker" />
    </div>
  );
};

export default CardSticker;
