import type { UseFormReturn } from "react-hook-form";
import { FormInput } from "./form-input";
import { FormSelect } from "./form-select";
import { FormTextarea } from "./form-textarea";
import { z } from "zod";

export interface PostFormValues {
  title: string;
  username: string;
  category: string;
  content: string;
}

interface PostFormProps {
  form: UseFormReturn<PostFormValues>;
}

// eslint-disable-next-line react-refresh/only-export-components
export const postFormSchema = z.object({
  title: z
    .string()
    .min(5, "제목은 5자 이상이어야 합니다")
    .max(100, "제목은 100자 이하여야 합니다"),
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
      {
        message: "예약된 사용자명입니다",
      },
    ),
  category: z.string(),
  content: z.string(),
});

const PostForm = ({ form }: PostFormProps) => {
  const { control } = form;
  return (
    <div className="grid gap-4">
      <FormInput
        control={control}
        name="title"
        label="제목"
        placeholder="게시글 제목을 입력하세요"
      />
      <div className="grid grid-cols-2 items-start gap-3">
        <FormInput
          control={control}
          name="username"
          label="작성자"
          placeholder="작성자명"
        />
        <FormSelect
          control={control}
          name="category"
          label="카테고리"
          placeholder="카테고리 선택"
          className="w-full"
          options={[
            { value: "development", label: "Development" },
            { value: "design", label: "Design" },
            { value: "accessibility", label: "Accessibility" },
          ]}
        />
      </div>
      <FormTextarea
        control={control}
        name="content"
        label="내용"
        placeholder="내용을 입력하세요"
        rows={5}
      />
    </div>
  );
};

export default PostForm;
