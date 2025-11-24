import { useEffect, useState } from "react";
import {
  postService,
  calculatePostStats,
  type Post,
  type PostStats,
} from "@/services/postService";

export const usePosts = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [stats, setStats] = useState<PostStats>({
    total: 0,
    published: 0,
    archived: 0,
    draft: 0,
    views: 0,
  });

  const fetchPosts = async () => {
    const data = await postService.getAll();
    setPosts(data);
    setStats(calculatePostStats(data));
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return { posts, stats, fetchPosts };
};
