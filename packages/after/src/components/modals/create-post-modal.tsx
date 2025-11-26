import { useAlert } from "@/hooks/useAlert";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogBody,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import PostForm, {
  postFormSchema,
  type PostFormValues,
} from "@/forms/post-form";
import { Form } from "../ui/form";
import { z } from "zod";
import { useForm, type FieldErrors } from "react-hook-form";

interface CreatePostModalProps {
  open: boolean;
  onClose?: () => void;
  onSuccess?: () => void;
}

const CreatePostModal = ({ open, onClose, onSuccess }: CreatePostModalProps) => {
  const { addAlert } = useAlert();

  const form = useForm<z.infer<typeof postFormSchema>>({
    resolver: zodResolver(postFormSchema),
    mode: "onChange",
    defaultValues: {
      title: "",
      username: "",
      category: "",
      content: "",
    },
  });

  const onSubmit = (data: PostFormValues) => {
    console.log(data);
    addAlert("성공", "게시글이 생성되었습니다", "success");
    onSuccess?.();
    onClose?.();
  };

  const onError = (errors: FieldErrors<z.infer<typeof postFormSchema>>) => {
    console.log(errors);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit, onError)}>
            <DialogHeader>
              <DialogTitle>새 게시글 만들기</DialogTitle>
            </DialogHeader>
            <DialogBody>
              <PostForm form={form} />
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

export default CreatePostModal;
