import { useAlert } from "@/hooks/useAlert";
import { SelectField } from "@/components/select-field";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogBody,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface CreateUserModalProps {
  open: boolean;
  onClose?: () => void;
}

const CreateUserModal = ({ open, onClose }: CreateUserModalProps) => {
  const { addAlert } = useAlert();

  const handleCreatePost = () => {
    addAlert("성공", "사용자가 생성되었습니다", "success");
    onClose?.();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="">
        <DialogHeader>
          <DialogTitle>새 사용자 만들기</DialogTitle>
        </DialogHeader>
        <DialogBody>
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
        </DialogBody>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="secondary">취소</Button>
          </DialogClose>
          <Button onClick={handleCreatePost} variant="primary">
            생성
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateUserModal;
