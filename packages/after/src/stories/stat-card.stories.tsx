import type { Meta, StoryObj } from "@storybook/react-vite";
import StatCard from "@/components/stat-card";

const meta = {
  title: "UI/StatCard",
  component: StatCard,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "secondary", "danger", "success", "warning", "info"],
    },
  },
} satisfies Meta<typeof StatCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "Label",
    value: "Value",
    variant: "primary",
  },
};

export const AllVariants: Story = {
  args: {
    label: "Label",
    value: "Value",
    variant: "primary",
  },
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <div className="flex gap-2">
      <StatCard label="Label" value="Value" variant="primary" />
      <StatCard label="Label" value="Value" variant="secondary" />
      <StatCard label="Label" value="Value" variant="danger" />
      <StatCard label="Label" value="Value" variant="success" />
      <StatCard label="Label" value="Value" variant="warning" />
      <StatCard label="Label" value="Value" variant="info" />
    </div>
  ),
};
