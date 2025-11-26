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
import UserForm, { userFormSchema, type UserFormValues } from "@/forms/user-form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type z from "zod";
import { Form } from "../ui/form";
import { userService, type User } from "@/services/userService";

interface CreateUserModalProps {
  open: boolean;
  onClose?: () => void;
  onSuccess?: () => void;
}

const CreateUserModal = ({ open, onClose, onSuccess }: CreateUserModalProps) => {
  const { addAlert } = useAlert();

  const form = useForm<z.infer<typeof userFormSchema>>({
    resolver: zodResolver(userFormSchema),
    mode: "onChange",
    defaultValues: {
      username: "",
      email: "",
      role: "user",
      status: "active",
    },
  });

  const onSubmit = async (data: UserFormValues) => {
    try {
      await userService.create({
        username: data.username,
        email: data.email,
        role: data.role as User["role"],
        status: data.status as User["status"],
      });
      addAlert("성공", "사용자가 생성되었습니다", "success");
      onSuccess?.();
      onClose?.();
    } catch (error) {
      console.error(error);
      addAlert("실패", "사용자 생성에 실패했습니다", "error");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <DialogHeader>
              <DialogTitle>새 사용자 만들기</DialogTitle>
            </DialogHeader>
            <DialogBody>
              <UserForm form={form} />
            </DialogBody>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="secondary">취소</Button>
              </DialogClose>
              <Button
                disabled={!form.formState.isValid}
                type="submit"
                variant="primary"
              >
                생성
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateUserModal;
