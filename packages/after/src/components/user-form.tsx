import { FormInput } from "./form-input";
import { FormSelect } from "./form-select";
import { z } from "zod";
import type { UseFormReturn } from "react-hook-form";

// eslint-disable-next-line react-refresh/only-export-components
export const userFormSchema = z.object({
  username: z
    .string()
    .min(3, "사용자명은 3자 이상이어야 합니다")
    .max(20, "사용자명은 20자 이하여야 합니다")
    .regex(/^[a-zA-Z0-9_]+$/, "영문, 숫자, 언더스코어만 사용 가능합니다")
    .refine(
      (val) => {
        const reserved = ["admin", "root", "system", "administrator"];
        return !reserved.includes(val.toLowerCase());
      },
      { message: "예약된 사용자명입니다" },
    ),
  email: z
    .string()
    .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "올바른 이메일 형식이 아닙니다")
    .refine(
      (val) => val.endsWith("@company.com") || val.endsWith("@example.com"),
      {
        message:
          "회사 이메일(@company.com 또는 @example.com)만 사용 가능합니다",
      },
    ),
  role: z.string(),
  status: z.string(),
});

export type UserFormValues = z.infer<typeof userFormSchema>;

interface UserFormProps {
  form: UseFormReturn<UserFormValues>;
}

const UserForm = ({ form }: UserFormProps) => {
  const { control } = form;

  return (
    <div className="grid gap-4">
      <FormInput
        control={control}
        name="username"
        label="사용자명"
        placeholder="사용자명을 입력하세요"
        required
      />
      <FormInput
        control={control}
        name="email"
        label="이메일"
        placeholder="이메일을 입력하세요"
        type="email"
        required
      />
      <div className="grid grid-cols-2 items-start gap-3">
        <FormSelect
          control={control}
          name="role"
          label="역할"
          placeholder="역할 선택"
          options={[
            { value: "user", label: "사용자" },
            { value: "moderator", label: "운영자" },
            { value: "admin", label: "관리자" },
          ]}
        />
        <FormSelect
          control={control}
          name="status"
          label="상태"
          placeholder="상태 선택"
          options={[
            { value: "active", label: "활성" },
            { value: "inactive", label: "비활성" },
            { value: "suspended", label: "정지" },
          ]}
        />
      </div>
    </div>
  );
};

export default UserForm;
