import type { Meta, StoryObj } from "@storybook/react";
import CardAttribute from "../components/card/CardAttribute";

const meta = {
  title: "Card/Attribute",
  component: CardAttribute,
  parameters: {},
} satisfies Meta<typeof CardAttribute>;

console.log("meta", meta);

export default meta;
type Story = StoryObj<typeof meta>;

export const CardAttributeStory: Story = {
  args: {
    value: 3,
    type: "stamina",
    color: "blue",
    pending: false,
    hurt: false,
    buffed: false,
    size: "xl",
  },
};
