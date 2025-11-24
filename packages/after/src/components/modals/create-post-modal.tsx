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

import PostForm from "@/components/post-form";

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
      <DialogContent>
        <DialogHeader>
          <DialogTitle>새 게시글 만들기</DialogTitle>
        </DialogHeader>
        <DialogBody>
          <PostForm />
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
