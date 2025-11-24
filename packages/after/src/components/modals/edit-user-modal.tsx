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
import { Alert, AlertDescription } from "../ui/alert";
import { useCallback, useEffect, useState } from "react";
import { userService, type User } from "@/services/userService";

interface EditUserModalProps {
  open: boolean;
  onClose?: () => void;
  id: number;
}

const EditUserModal = ({ open, onClose, id }: EditUserModalProps) => {
  const { addAlert } = useAlert();
  const [user, setUser] = useState<User | null>(null);
  const handleCreatePost = () => {
    addAlert("성공", "게시글이 수정되었습니다", "success");
    onClose?.();
  };

  const fetchPost = useCallback(async () => {
    const user = await userService.getById(id);
    if (user) {
      setUser(user);
    }
  }, [id]);

  useEffect(() => {
    fetchPost();
  }, [id, fetchPost]);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="">
        <DialogHeader>
          <DialogTitle>게시글 수정</DialogTitle>
        </DialogHeader>
        <DialogBody>
          <Alert variant="info" className="mb-4">
            <AlertDescription>
              ID: {user?.id} | 생성일: {user?.createdAt}
            </AlertDescription>
          </Alert>
          <PostForm />
        </DialogBody>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="secondary">취소</Button>
          </DialogClose>
          <Button onClick={handleCreatePost} variant="primary">
            수정 완료
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditUserModal;
