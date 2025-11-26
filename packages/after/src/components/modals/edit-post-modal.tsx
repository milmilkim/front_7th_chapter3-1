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

import PostForm, {
  postFormSchema,
  type PostFormValues,
} from "@/forms/post-form";
import { Alert, AlertDescription } from "../ui/alert";
import { useCallback, useEffect, useState } from "react";
import { postService, type Post } from "@/services/postService";
import { Form } from "../ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

interface EditPostModalProps {
  open: boolean;
  onClose?: () => void;
  onSuccess?: () => void;
  selectedId: number;
}

const EditPostModal = ({
  open,
  onClose,
  onSuccess,
  selectedId,
}: EditPostModalProps) => {
  const { addAlert } = useAlert();
  const [post, setPost] = useState<Post | null>(null);

  const form = useForm<PostFormValues>({
    resolver: zodResolver(postFormSchema),
    mode: "onChange",
  });

  const fetchPost = useCallback(async () => {
    const post = await postService.getById(selectedId);
    if (post) {
      setPost(post);
      form.reset({
        title: post.title,
        username: post.author,
        category: post.category,
        content: post.content,
      });
    }
  }, [selectedId, form]);

  const onSubmit = async (data: PostFormValues) => {
    try {
      await postService.update(selectedId, data);
      addAlert("성공", "게시글이 수정되었습니다", "success");
      onSuccess?.();
      onClose?.();
    } catch (error) {
      console.error(error);
      addAlert("실패", "게시글 수정에 실패했습니다", "error");
    }
  };

  useEffect(() => {
    fetchPost();
  }, [selectedId, fetchPost]);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <DialogHeader>
              <DialogTitle>게시글 수정</DialogTitle>
            </DialogHeader>
            <DialogBody>
              <Alert variant="info" className="mb-4">
                <AlertDescription>
                  ID: {post?.id} | 생성일: {post?.createdAt} | 조회수:{" "}
                  {post?.views}
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

export default EditPostModal;
