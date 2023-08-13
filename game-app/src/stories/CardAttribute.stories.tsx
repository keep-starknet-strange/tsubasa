import type { Meta, StoryObj } from "@storybook/react";
import CardAttribute from "../app/components/card/CardAttribute";

const meta = {
  title: "CardAttribute",
  component: CardAttribute,
  parameters: {},
} satisfies Meta<typeof CardAttribute>;

export default meta;
type Story = StoryObj<typeof meta>;

export const CardAttributeStory: Story = {
  args: {
    value: 3,
    type: "stamina",
    team: "yellow",
    pending: false,
    hurt: false,
    bonus: false,
  },
};
