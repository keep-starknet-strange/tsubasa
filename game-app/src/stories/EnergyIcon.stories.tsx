import EnergyIcon from "../app/components/icons/EnergyIcon";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "EnergyIcon",
  component: EnergyIcon,
  parameters: {},
} satisfies Meta<typeof EnergyIcon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const EnergyIconStory: Story = {
  args: {
    energy: 3,
    hideValue: false,
    size: "xl",
  },
};
