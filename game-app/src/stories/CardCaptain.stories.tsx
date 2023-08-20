import CardCaptain from "../app/components/card/CardCaptain";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Icons/Captain",
  component: CardCaptain,
  parameters: {},
} satisfies Meta<typeof CardCaptain>;

export default meta;
type Story = StoryObj<typeof meta>;

export const CardCaptainStory: Story = {
  args: {
    color: "blue",
    pending: false,
    size: "xl",
  },
};
