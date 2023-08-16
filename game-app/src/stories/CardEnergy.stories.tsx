import CardEnergy from "../app/components/card/CardEnergy";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "CardEnergy",
  component: CardEnergy,
  parameters: {},
} satisfies Meta<typeof CardEnergy>;

export default meta;
type Story = StoryObj<typeof meta>;

export const CardEnergyStory: Story = {
  args: {
    energy: 3,
    hideValue: false,
    size: "xl",
  },
};
