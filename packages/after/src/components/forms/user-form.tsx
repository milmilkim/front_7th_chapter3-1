import type { UseFormReturn } from "react-hook-form";
import { FormInput } from "@/components/form-input";
import { FormSelect } from "@/components/form-select";
import { userFormSchema, type UserFormValues } from "./schemas";

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
export { userFormSchema, type UserFormValues };
