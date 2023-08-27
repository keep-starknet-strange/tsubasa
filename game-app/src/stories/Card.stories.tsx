import Card from "../components/card/Card";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Card",
  component: Card,
  parameters: {},
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const CardStory: Story = {
  args: {
    color: "yellow",
    player: "1",
    hover: false,
    captain: false,
    size: "xl",
    dribble: 1,
    stamina: 3,
    energy: 1,
    kind: "card",
    state: "standard",
  },
};
