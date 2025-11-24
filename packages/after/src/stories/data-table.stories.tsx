import type { Meta, StoryObj } from "@storybook/react-vite";
import { DataTable } from "@/components/data-table";

const meta = {
  title: "UI/DataTable",
  component: DataTable,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof DataTable>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    columns: [
      { key: "name", label: "이름" },
      {
        key: "email",
        label: "이메일",
        render: (value: string) => (
          <span className="text-primary">{value}</span>
        ),
      },
    ],
    data: [
      { name: "치이카와", email: "chiika@example.com" },
      { name: "하치와레", email: "hachiware@example.com" },
      { name: "우사기", email: "usagi@example.com" },
    ],
  },
};
