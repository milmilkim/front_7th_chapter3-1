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

import PostForm, { type PostFormValues } from "@/components/post-form";
import { Alert, AlertDescription } from "../ui/alert";
import { useCallback, useEffect, useState } from "react";
import { userService, type User } from "@/services/userService";
import { Form } from "../ui/form";
import { useForm } from "react-hook-form";

interface EditUserModalProps {
  open: boolean;
  onClose?: () => void;
  id: number;
}

const EditUserModal = ({ open, onClose, id }: EditUserModalProps) => {
  const { addAlert } = useAlert();
  const [user, setUser] = useState<User | null>(null);

  const form = useForm<PostFormValues>({
    defaultValues: {
      title: "",
      username: "",
      category: "",
      content: "",
    },
  });

  const onSubmit = (data: PostFormValues) => {
    console.log(data);
    addAlert("성공", "사용자가 수정되었습니다", "success");
    onClose?.();
  };

  const fetchUser = useCallback(async () => {
    const user = await userService.getById(id);
    if (user) {
      setUser(user);
    }
  }, [id]);

  useEffect(() => {
    fetchUser();
  }, [id, fetchUser]);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <DialogHeader>
              <DialogTitle>사용자 수정</DialogTitle>
            </DialogHeader>
            <DialogBody>
              <Alert variant="info" className="mb-4">
                <AlertDescription>
                  ID: {user?.id} | 생성일: {user?.createdAt}
                </AlertDescription>
              </Alert>
              <PostForm form={form} />
            </DialogBody>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="secondary">취소</Button>
              </DialogClose>
              <Button type="submit" variant="primary">
                수정 완료
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default EditUserModal;
