import type { UseFormReturn } from "react-hook-form";
import { FormInput } from "@/components/form-input";
import { FormSelect } from "@/components/form-select";
import { FormTextarea } from "@/components/form-textarea";
import { postFormSchema, type PostFormValues } from "./schemas";

interface PostFormProps {
  form: UseFormReturn<PostFormValues>;
}

const PostForm = ({ form }: PostFormProps) => {
  const { control } = form;
  return (
    <div className="grid gap-4">
      <FormInput
        control={control}
        name="title"
        label="제목"
        placeholder="게시글 제목을 입력하세요"
        required
      />
      <div className="grid grid-cols-2 items-start gap-3">
        <FormInput
          control={control}
          name="author"
          label="작성자"
          placeholder="작성자명"
          required
        />
        <FormSelect
          control={control}
          name="category"
          label="카테고리"
          placeholder="카테고리 선택"
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
// eslint-disable-next-line react-refresh/only-export-components
export { postFormSchema, type PostFormValues };
