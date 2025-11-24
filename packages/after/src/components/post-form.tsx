import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { SelectField } from "@/components/select-field";
import { Textarea } from "@/components/ui/textarea";

const PostForm = () => {
  return (
    <div className="grid gap-4">
      <div className="grid gap-3">
        <Label htmlFor="title">제목</Label>
        <Input
          id="title"
          name="title"
          defaultValue="게시글 제목을 입력하세요"
        />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div className="grid gap-3">
          <Label htmlFor="username">작성자</Label>
          <Input id="username" name="username" defaultValue="작성자명" />
        </div>
        <div className="grid gap-3">
          <Label htmlFor="username-1">카테고리</Label>
          <SelectField
            className="w-full"
            id="category"
            name="category"
            onChange={(value) => console.log(value)}
            placeholder="카테고리 선택"
            options={[
              { value: "development", label: "Development" },
              { value: "design", label: "Design" },
              { value: "accessibility", label: "Accessibility" },
            ]}
          />
        </div>
      </div>
      <div className="grid gap-3">
        <Label htmlFor="content">내용</Label>
        <Textarea
          id="content"
          name="content"
          defaultValue="내용을 입력하세요"
        />
      </div>
    </div>
  );
};

export default PostForm;
