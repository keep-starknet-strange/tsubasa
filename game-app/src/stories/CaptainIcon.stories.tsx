import CaptainIcon from "../app/components/icons/CaptainIcon";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "CaptainIcon",
  component: CaptainIcon,
  parameters: {},
} satisfies Meta<typeof CaptainIcon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const CaptainIconStory: Story = {
  args: {
    team: "blue",
    pending: false,
    size: "xl",
  },
};
