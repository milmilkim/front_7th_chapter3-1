import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { SelectField } from "@/components/select-field";

const UserForm = () => {
  return (
    <div className="grid gap-4">
      <div className="grid gap-3">
        <Label htmlFor="username">사용자명</Label>
        <Input
          id="username"
          name="username"
          defaultValue="사용자명을 입력하세요"
        />
      </div>
      <div className="grid gap-3">
        <Label htmlFor="email">이메일</Label>
        <Input
          id="email"
          name="email"
          defaultValue="이메일을 입력하세요"
          type="email"
        />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div className="grid gap-3">
          <Label htmlFor="role">역할</Label>
          <SelectField
            className="w-full"
            id="role"
            name="role"
            onChange={(value) => console.log(value)}
            placeholder="역할 선택"
            options={[
              { value: "user", label: "사용자" },
              { value: "moderator", label: "운영자" },
              { value: "admin", label: "관리자" },
            ]}
          />
        </div>
        <div className="grid gap-3">
          <Label htmlFor="status">상태</Label>
          <SelectField
            className="w-full"
            id="status"
            name="status"
            onChange={(value) => console.log(value)}
            placeholder="상태 선택"
            options={[
              { value: "active", label: "활성" },
              { value: "inactive", label: "비활성" },
              { value: "suspended", label: "정지" },
            ]}
          />
        </div>
      </div>
    </div>
  );
};

export default UserForm;
