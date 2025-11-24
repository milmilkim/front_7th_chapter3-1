import { useUsers } from "@/hooks/useUsers";
import StatCard from "@/components/stat-card";
import { DataTable, type Column } from "@/components/data-table";
import type { User as UserType } from "@/services/userService";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const getRoleInfo = (role: UserType["role"]) => {
  switch (role) {
    case "admin":
      return { label: "관리자", variant: "danger" } as const;
    case "moderator":
      return { label: "운영자", variant: "warning" } as const;
    case "user":
      return { label: "사용자", variant: "primary" } as const;
    default:
      return { label: role, variant: "secondary" } as const;
  }
};

const getStatusInfo = (status: UserType["status"]) => {
  switch (status) {
    case "active":
      return { label: "활성", variant: "success" } as const;
    case "inactive":
      return { label: "비활성", variant: "secondary" } as const;
    case "suspended":
      return { label: "정지", variant: "danger" } as const;
    default:
      return { label: status, variant: "secondary" } as const;
  }
};

const columns: Column<UserType>[] = [
  { key: "id", label: "ID" },
  { key: "username", label: "이름" },
  { key: "email", label: "이메일" },
  {
    key: "role",
    label: "역할",
    render: (row) => {
      const { label, variant } = getRoleInfo(row.role);
      return <Badge variant={variant}>{label}</Badge>;
    },
  },
  {
    key: "status",
    label: "상태",
    render: (row) => {
      const { label, variant } = getStatusInfo(row.status);
      return <Badge variant={variant}>{label}</Badge>;
    },
  },
  { key: "createdAt", label: "가입일" },
  {
    key: "lastLogin",
    label: "마지막 로그인",
    render: (row) => row.lastLogin || "-",
  },
  {
    key: "actions",
    label: "관리",
    render: () => {
      return (
        <>
          <Button size="sm">수정</Button>{" "}
          <Button variant="danger" size="sm">
            삭제
          </Button>
        </>
      );
    },
  },
];

const User = () => {
  const { users, stats } = useUsers();

  return (
    <div className="flex w-full flex-col gap-4">
      <div className="flex w-full gap-4">
        <StatCard label="전체" value={stats.total} variant="primary" />
        <StatCard label="활성" value={stats.active} variant="success" />
        <StatCard label="비활성" value={stats.inactive} variant="warning" />
        <StatCard label="정지" value={stats.suspended} variant="danger" />
        <StatCard label="관리자" value={stats.admin} variant="secondary" />
      </div>
      <DataTable columns={columns} data={users} keyField="id" />
    </div>
  );
};

export default User;
