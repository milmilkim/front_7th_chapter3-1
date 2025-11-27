import { useEffect, useState } from "react";
import {
  postService,
  calculatePostStats,
  type Post,
  type PostStats,
} from "@/services/postService";
import { useAlert } from "./useAlert";

export const usePosts = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [stats, setStats] = useState<PostStats>({
    total: 0,
    published: 0,
    archived: 0,
    draft: 0,
    views: 0,
  });
  const { addAlert } = useAlert();

  const fetchPosts = async () => {
    try {
      const data = await postService.getAll();
      setPosts(data);
      setStats(calculatePostStats(data));
    } catch (error) {
      console.error(error);
      addAlert("실패", "데이터를 불러오는데 실패했습니다", "error");
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return { posts, stats, fetchPosts };
};
