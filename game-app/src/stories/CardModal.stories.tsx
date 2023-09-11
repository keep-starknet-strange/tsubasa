import CardModal from "../components/card/CardModal";
import type { Meta, StoryObj } from "@storybook/react";
import { ExtendedCardProps } from "@/components/card/types";

const meta = {
  title: "Card/Modal",
  component: CardModal,
  parameters: {},
} satisfies Meta<typeof CardModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const CardModalStory: Story = {
  args: {
    cardData: {
      id: "1",
      kind: "card",
      size: "xl",
      color: "blue",
      hover: false,
      captain: false,
      dribble: 1,
      defense: 2,
      energy: 3,
    },
    onAddToDeck: (cardDetails: ExtendedCardProps) => {
      console.log("Card added to deck:", cardDetails);
    },
  },
};
