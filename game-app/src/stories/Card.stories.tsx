import Card from "@/app/components/card/Card";
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
    team: "yellow",
    player: "1",
    hover: false,
  },
};
