import type { Meta, StoryObj } from "@storybook/react-vite";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { FormSelect } from "@/components/form-select";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";

const formSchema = z.object({
  category: z.string().min(1, "카테고리를 선택하세요"),
  role: z.string().min(1, "역할을 선택하세요"),
  status: z.string().min(1, "상태를 선택하세요"),
});

const categoryOptions = [
  { value: "development", label: "개발" },
  { value: "design", label: "디자인" },
  { value: "accessibility", label: "접근성" },
];

const roleOptions = [
  { value: "admin", label: "관리자" },
  { value: "user", label: "사용자" },
  { value: "guest", label: "게스트" },
];

const statusOptions = [
  { value: "active", label: "활성" },
  { value: "inactive", label: "비활성" },
  { value: "pending", label: "대기중" },
];

const FormSelectDemo = ({
  name,
  label,
  options,
  placeholder,
  required,
}: {
  name: "category" | "role" | "status";
  label: string;
  options: { value: string; label: string }[];
  placeholder?: string;
  required?: boolean;
}) => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      category: "",
      role: "",
      status: "",
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(() => {})} className="w-[350px]">
        <FormSelect
          control={form.control}
          name={name}
          label={label}
          options={options}
          placeholder={placeholder}
          required={required}
        />
      </form>
    </Form>
  );
};

const meta = {
  title: "Components/FormSelect",
  component: FormSelectDemo,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof FormSelectDemo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Category: Story = {
  args: {
    name: "category",
    label: "카테고리",
    options: categoryOptions,
    placeholder: "카테고리를 선택하세요",
    required: true,
  },
};

export const Role: Story = {
  args: {
    name: "role",
    label: "역할",
    options: roleOptions,
    placeholder: "역할을 선택하세요",
    required: true,
  },
};

export const Status: Story = {
  args: {
    name: "status",
    label: "상태",
    options: statusOptions,
    placeholder: "상태를 선택하세요",
  },
};

const WithValidationComponent = () => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      category: "",
      role: "",
      status: "",
    },
  });

  return (
    <Form {...form}>
      <form className="w-[350px] space-y-4">
        <FormSelect
          control={form.control}
          name="category"
          label="카테고리"
          options={categoryOptions}
          placeholder="카테고리를 선택하세요"
          required
        />
        <FormSelect
          control={form.control}
          name="role"
          label="역할"
          options={roleOptions}
          placeholder="역할을 선택하세요"
          required
        />
        <FormSelect
          control={form.control}
          name="status"
          label="상태"
          options={statusOptions}
          placeholder="상태를 선택하세요"
          required
        />
        <Button type="submit">제출</Button>
      </form>
    </Form>
  );
};

export const WithValidation = {
  render: () => <WithValidationComponent />,
  parameters: {
    docs: {
      source: {
        code: 'See component source',
      },
    },
  },
};
