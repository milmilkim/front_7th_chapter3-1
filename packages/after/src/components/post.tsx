import { postService } from "@/services/postService";
import { useEffect, useState } from "react";
import type { Post } from "@/services/postService";
import StatCard from "./stat-card";

const Post = () => {
  const loadData = async () => {
    const posts = await postService.getAll();
    setPosts(posts);
    setPostStats({
      total: posts.length,
      published: posts.filter((post) => post.status === "published").length,
      archived: posts.filter((post) => post.status === "archived").length,
      draft: posts.filter((post) => post.status === "draft").length,
      views: posts.reduce((sum, post) => sum + post.views, 0),
    });
  };

  const [posts, setPosts] = useState<Post[]>([]);
  const [postStats, setPostStats] = useState<{
    total: number;
    published: number;
    archived: number;
    draft: number;
    views: number;
  }>({
    total: 0,
    published: 0,
    archived: 0,
    draft: 0,
    views: 0,
  });

  useEffect(() => {
    loadData();
  }, []);
  return (
    <div className="flex w-full gap-4">
      <StatCard label="전체" value={postStats.total} variant="primary" />
      <StatCard label="게시됨" value={postStats.total} variant="success" />
      <StatCard
        label="임시저장"
        value={postStats.published}
        variant="warning"
      />
      <StatCard label="보관됨" value={postStats.archived} variant="danger" />
      <StatCard label="총 조회수" value={postStats.views} variant="secondary" />
    </div>
  );
};

export default Post;
