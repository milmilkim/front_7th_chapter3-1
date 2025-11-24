import { usePosts } from "@/hooks/usePosts";
import StatCard from "./stat-card";

const Post = () => {
  const { stats } = usePosts();

  return (
    <div className="flex w-full gap-4">
      <StatCard label="전체" value={stats.total} variant="primary" />
      <StatCard label="게시됨" value={stats.published} variant="success" />
      <StatCard label="임시저장" value={stats.draft} variant="warning" />
      <StatCard label="보관됨" value={stats.archived} variant="danger" />
      <StatCard label="총 조회수" value={stats.views} variant="secondary" />
    </div>
  );
};

export default Post;
