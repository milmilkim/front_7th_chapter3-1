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
import { Textarea } from "@/components/ui/textarea";

interface CreatePostModalProps {
  open: boolean;
  onClose?: () => void;
}

const CreatePostModal = ({ open, onClose }: CreatePostModalProps) => {
  const { addAlert } = useAlert();

  const handleCreatePost = () => {
    addAlert("성공", "게시글이 생성되었습니다", "success");
    onClose?.();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="">
        <DialogHeader>
          <DialogTitle>새 게시글 만들기</DialogTitle>
        </DialogHeader>
        <DialogBody>
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

export default CreatePostModal;
