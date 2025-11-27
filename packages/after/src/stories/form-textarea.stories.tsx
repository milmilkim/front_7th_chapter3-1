import type { Meta, StoryObj } from "@storybook/react-vite";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { FormTextarea } from "@/components/form-textarea";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";

const formSchema = z.object({
  content: z.string().min(10, "내용은 최소 10자 이상이어야 합니다"),
  description: z.string().max(200, "설명은 200자 이하여야 합니다"),
  bio: z.string(),
});

const FormTextareaDemo = ({
  name,
  label,
  placeholder,
  rows,
  required,
}: {
  name: "content" | "description" | "bio";
  label: string;
  placeholder?: string;
  rows?: number;
  required?: boolean;
}) => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      content: "",
      description: "",
      bio: "",
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(() => {})} className="w-[450px]">
        <FormTextarea
          control={form.control}
          name={name}
          label={label}
          placeholder={placeholder}
          rows={rows}
          required={required}
        />
      </form>
    </Form>
  );
};

const meta = {
  title: "Components/FormTextarea",
  component: FormTextareaDemo,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof FormTextareaDemo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: "content",
    label: "내용",
    placeholder: "내용을 입력하세요...",
    required: true,
  },
};

export const WithRows: Story = {
  args: {
    name: "description",
    label: "설명",
    placeholder: "간단한 설명을 입력하세요...",
    rows: 5,
  },
};

export const Bio: Story = {
  args: {
    name: "bio",
    label: "자기소개",
    placeholder: "자신에 대해 소개해주세요...",
    rows: 8,
  },
};

export const WithValidation: Story = {
  render: () => {
    const form = useForm({
      resolver: zodResolver(formSchema),
      mode: "onChange",
      defaultValues: {
        content: "짧음", // Invalid - too short
        description: "",
        bio: "",
      },
    });

    return (
      <Form {...form}>
        <form className="w-[450px] space-y-4">
          <FormTextarea
            control={form.control}
            name="content"
            label="내용 (최소 10자)"
            placeholder="최소 10자 이상 입력하세요..."
            required
          />
          <FormTextarea
            control={form.control}
            name="description"
            label="설명 (최대 200자)"
            placeholder="최대 200자까지 입력 가능합니다..."
            rows={5}
          />
          <FormTextarea
            control={form.control}
            name="bio"
            label="자기소개"
            placeholder="선택사항입니다..."
            rows={6}
          />
        </form>
      </Form>
    );
  },
};
