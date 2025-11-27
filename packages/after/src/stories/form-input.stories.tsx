import type { Meta, StoryObj } from "@storybook/react-vite";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { FormInput } from "@/components/form-input";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";

const formSchema = z.object({
  username: z.string().min(3, "사용자명은 3자 이상이어야 합니다"),
  email: z.string().email("올바른 이메일 주소를 입력하세요"),
  age: z.string().regex(/^\d+$/, "숫자만 입력 가능합니다"),
});

const FormInputDemo = ({
  name,
  label,
  placeholder,
  type,
  required
}: {
  name: "username" | "email" | "age";
  label: string;
  placeholder?: string;
  type?: string;
  required?: boolean;
}) => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      username: "",
      email: "",
      age: "",
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(() => {})} className="w-[350px]">
        <FormInput
          control={form.control}
          name={name}
          label={label}
          placeholder={placeholder}
          type={type}
          required={required}
        />
      </form>
    </Form>
  );
};

const meta = {
  title: "Components/FormInput",
  component: FormInputDemo,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof FormInputDemo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Text: Story = {
  args: {
    name: "username",
    label: "사용자명",
    placeholder: "사용자명을 입력하세요",
    required: true,
  },
};

export const Email: Story = {
  args: {
    name: "email",
    label: "이메일",
    placeholder: "your@email.com",
    type: "email",
    required: true,
  },
};

export const Number: Story = {
  args: {
    name: "age",
    label: "나이",
    placeholder: "나이를 입력하세요",
    type: "text",
  },
};

const WithValidationComponent = () => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      username: "ab", // Invalid - too short
      email: "invalid-email",
      age: "not-a-number",
    },
  });

  return (
    <Form {...form}>
      <form className="w-[350px] space-y-4">
        <FormInput
          control={form.control}
          name="username"
          label="사용자명"
          placeholder="최소 3자 이상"
          required
        />
        <FormInput
          control={form.control}
          name="email"
          label="이메일"
          placeholder="your@email.com"
          type="email"
          required
        />
        <FormInput
          control={form.control}
          name="age"
          label="나이"
          placeholder="숫자만 입력"
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
