import { usePosts } from "@/hooks/usePosts";
import StatCard from "@/components/stat-card";
import { DataTable, type Column } from "@/components/data-table";
import type { Post as PostType } from "@/services/postService";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const getStatusInfo = (status: PostType["status"]) => {
  switch (status) {
    case "published":
      return { label: "게시됨", variant: "success" } as const;
    case "draft":
      return { label: "임시저장", variant: "warning" } as const;
    case "archived":
      return { label: "보관됨", variant: "danger" } as const;
    default:
      return { label: status, variant: "secondary" } as const;
  }
};

const getCategoryVariant = (category: string) => {
  switch (category) {
    case "development":
      return "primary";
    case "design":
      return "info";
    case "accessibility":
      return "danger";
    default:
      return "secondary";
  }
};

const columns: Column<PostType>[] = [
  { key: "id", label: "ID" },
  { key: "title", label: "제목" },
  { key: "author", label: "작성자" },
  {
    key: "category",
    label: "카테고리",
    render: (row) => (
      <Badge variant={getCategoryVariant(row.category)}>{row.category}</Badge>
    ),
  },
  {
    key: "status",
    label: "상태",
    render: (row) => {
      const { label, variant } = getStatusInfo(row.status);
      return <Badge variant={variant}>{label}</Badge>;
    },
  },
  {
    key: "views",
    label: "조회수",
    render: (row) => row.views.toLocaleString(),
  },
  { key: "createdAt", label: "작성일" },
  {
    key: "actions",
    label: "관리",
    render: (row) => {
      return (
        <div className="flex gap-1">
          <Button size="sm">수정</Button>
          {row.status === "published" && (
            <Button variant="secondary" size="sm">
              보관
            </Button>
          )}
          {row.status === "archived" && (
            <Button variant="primary" size="sm">
              복원
            </Button>
          )}
          {row.status === "draft" && (
            <Button variant="success" size="sm">
              게시
            </Button>
          )}
          <Button variant="danger" size="sm">
            삭제
          </Button>
        </div>
      );
    },
  },
];

const Post = () => {
  const { posts, stats } = usePosts();

  return (
    <div className="flex w-full flex-col gap-4">
      <div className="flex w-full gap-4">
        <StatCard label="전체" value={stats.total} variant="primary" />
        <StatCard label="게시됨" value={stats.published} variant="success" />
        <StatCard label="임시저장" value={stats.draft} variant="warning" />
        <StatCard label="보관됨" value={stats.archived} variant="danger" />
        <StatCard label="총 조회수" value={stats.views} variant="secondary" />
      </div>
      <DataTable columns={columns} data={posts} keyField="id" />
    </div>
  );
};

export default Post;
