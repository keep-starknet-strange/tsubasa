import type { Meta, StoryObj } from "@storybook/react";
import Scoreboard from "../components/Scoreboard";

const meta = {
  title: "Scoreboard",
  component: Scoreboard,
  parameters: {},
} satisfies Meta<typeof Scoreboard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ScoreboardStory: Story = {
  args: {},
};
