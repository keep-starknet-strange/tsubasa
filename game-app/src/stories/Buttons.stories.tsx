import Button from "../components/Button";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Buttons/Primary Button",
  component: Button,
  parameters: {},
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ButtonStory: Story = {
  args: {
    children: "End Turn",
    variant: "primary",
  },
};
