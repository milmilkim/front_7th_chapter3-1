import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "@/components/ui/button";

const meta = {
  title: "버튼",
  component: Button,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  decorators: [(Story) => <Story />],
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  name: "primary",
  args: {
    variant: "primary", 
    children: "버튼",
  },
};


export const Secondary: Story = {
  name: "secondary",
  args: {
    variant: "secondary", 
    children: "버튼",
  },
};

export const Danger: Story = {
  name: "danger",
  args: {
    variant: "danger", 
    children: "버튼",
  },
};

export const Success: Story = {
  name: "success",
  args: {
    variant: "success", 
    children: "버튼",
  },
};