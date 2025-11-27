import type { Meta, StoryObj } from "@storybook/react-vite";
import { Textarea } from "@/components/ui/textarea";

const meta = {
  title: "UI/Textarea",
  component: Textarea,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Textarea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: "메시지를 입력하세요.",
  },
};

export const Disabled: Story = {
  args: {
    placeholder: "비활성화된 텍스트 영역",
    disabled: true,
  },
};

export const WithValue: Story = {
  args: {
    value: "텍스트 영역에 입력된 샘플 텍스트입니다.\n여러 줄을 지원합니다.",
    readOnly: true,
  },
};

export const Invalid: Story = {
  args: {
    placeholder: "유효하지 않은 텍스트 영역",
    "aria-invalid": true,
  },
};

export const WithRows: Story = {
  args: {
    placeholder: "10줄 텍스트 영역",
    rows: 10,
  },
};
