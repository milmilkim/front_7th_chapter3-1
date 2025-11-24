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

import { Alert, AlertDescription } from "../ui/alert";
import { useCallback, useEffect, useState } from "react";
import { userService, type User } from "@/services/userService";
import { Form } from "../ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import UserForm, { userFormSchema, type UserFormValues } from "../user-form";

interface EditUserModalProps {
  open: boolean;
  onClose?: () => void;
  onSuccess?: () => void;
  id: number;
}

const EditUserModal = ({ open, onClose, onSuccess, id }: EditUserModalProps) => {
  const { addAlert } = useAlert();
  const [user, setUser] = useState<User | null>(null);

  const form = useForm<UserFormValues>({
    resolver: zodResolver(userFormSchema),
    mode: "onChange",
    defaultValues: {
      username: "",
      email: "",
      role: "",
      status: "",
    },
  });

  const fetchUser = useCallback(async () => {
    const user = await userService.getById(id);
    if (user) {
      setUser(user);
      form.reset({
        username: user.username,
        email: user.email,
        role: user.role,
        status: user.status,
      });
    }
  }, [id, form]);

  const onSubmit = async (data: UserFormValues) => {
    try {
      await userService.update(id, {
        username: data.username,
        email: data.email,
        role: data.role as User["role"],
        status: data.status as User["status"],
      });
      addAlert("성공", "사용자가 수정되었습니다", "success");
      onSuccess?.();
      onClose?.();
    } catch (error) {
      console.error(error);
      addAlert("실패", "사용자 수정에 실패했습니다", "error");
    }
  };

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
              <UserForm form={form} />
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
