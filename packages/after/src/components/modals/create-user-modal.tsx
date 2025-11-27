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

interface CreateUserModalProps {
  open: boolean;
  onClose?: () => void;
  onSubmit: (data: UserFormValues) => void | Promise<void>;
}

const CreateUserModal = ({ open, onClose, onSubmit }: CreateUserModalProps) => {
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

  const handleSubmit = async (data: UserFormValues) => {
    await onSubmit(data);
    form.reset();
    onClose?.();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)}>
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
