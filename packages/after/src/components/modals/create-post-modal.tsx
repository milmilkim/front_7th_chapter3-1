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
} from "@/components/forms/post-form";
import { Form } from "../ui/form";
import { z } from "zod";
import { useForm, type FieldErrors } from "react-hook-form";

interface CreatePostModalProps {
  open: boolean;
  onClose?: () => void;
  onSubmit: (data: PostFormValues) => void | Promise<void>;
}

const CreatePostModal = ({ open, onClose, onSubmit }: CreatePostModalProps) => {
  const form = useForm<z.infer<typeof postFormSchema>>({
    resolver: zodResolver(postFormSchema),
    mode: "onChange",
    defaultValues: {
      title: "",
      author: "",
      category: "",
      content: "",
    },
  });

  const handleSubmit = async (data: PostFormValues) => {
    await onSubmit(data);
    form.reset();
    onClose?.();
  };

  const onError = (errors: FieldErrors<z.infer<typeof postFormSchema>>) => {
    console.log(errors);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit, onError)}>
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
