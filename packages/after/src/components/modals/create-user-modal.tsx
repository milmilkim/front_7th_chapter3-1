import { useAlert } from "@/hooks/useAlert";
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
import UserForm from "../user-form";

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
          <UserForm />
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
