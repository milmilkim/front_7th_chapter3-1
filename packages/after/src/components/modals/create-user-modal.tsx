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
import UserForm, { userFormSchema, type UserFormValues } from "../user-form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type z from "zod";
import { Form } from "../ui/form";

interface CreateUserModalProps {
  open: boolean;
  onClose?: () => void;
}

const CreateUserModal = ({ open, onClose }: CreateUserModalProps) => {
  const { addAlert } = useAlert();

  const form = useForm<z.infer<typeof userFormSchema>>({
    resolver: zodResolver(userFormSchema),
    mode: "onChange",
    defaultValues: {
      username: "",
      email: "",
      role: "",
      status: "",
    },
  });

  const onSubmit = (data: UserFormValues) => {
    console.log(data);
    addAlert("성공", "사용자가 생성되었습니다", "success");
    onClose?.();
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
