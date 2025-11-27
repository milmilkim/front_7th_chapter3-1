import { useState } from "react";
import { useUsers } from "@/hooks/useUsers";
import StatCard from "@/components/stat-card";
import { DataTable, type Column } from "@/components/data-table";
import { userService, type User as UserType } from "@/services/userService";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useAlert } from "@/hooks/useAlert";
import EditUserModal from "@/components/modals/edit-user-modal";
import CreateUserModal from "@/components/modals/create-user-modal";
import type { UserFormValues } from "@/components/forms/user-form";

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

const RoleBadge = ({ role }: { role: UserType["role"] }) => {
  const { label, variant } = getRoleInfo(role);
  return <Badge variant={variant}>{label}</Badge>;
};

const StatusBadge = ({ status }: { status: UserType["status"] }) => {
  const { label, variant } = getStatusInfo(status);
  return <Badge variant={variant}>{label}</Badge>;
};

const User = () => {
  const { users, stats, fetchUsers } = useUsers();
  const { addAlert } = useAlert();
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [isEditUserModalOpen, setIsEditUserModalOpen] = useState(false);
  const [isCreateUserModalOpen, setIsCreateUserModalOpen] = useState(false);

  const handleDelete = async (id: number) => {
    const confirmed = confirm("정말 삭제하시겠습니까?");
    if (confirmed) {
      await userService.delete(id);
      addAlert("성공", "삭제되었습니다", "success");
      fetchUsers();
    }
  };

  const handleEdit = (id: number) => {
    setSelectedUserId(id);
    setIsEditUserModalOpen(true);
  };

  const handleCreateUser = async (data: UserFormValues) => {
    try {
      await userService.create({
        username: data.username,
        email: data.email,
        role: data.role as UserType["role"],
        status: data.status as UserType["status"],
      });
      addAlert("성공", "사용자가 생성되었습니다", "success");
      fetchUsers();
    } catch (error) {
      console.error(error);
      addAlert("실패", "사용자 생성에 실패했습니다", "error");
    }
  };

  const columns: Column<UserType>[] = [
    { key: "id", label: "ID" },
    { key: "username", label: "이름" },
    { key: "email", label: "이메일" },
    {
      key: "role",
      label: "역할",
      render: (row) => <RoleBadge role={row.role} />,
    },
    {
      key: "status",
      label: "상태",
      render: (row) => <StatusBadge status={row.status} />,
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
      render: (row) => (
        <>
          <Button size="sm" onClick={() => handleEdit(row.id)}>
            수정
          </Button>{" "}
          <Button
            variant="danger"
            size="sm"
            onClick={() => handleDelete(row.id)}
          >
            삭제
          </Button>
        </>
      ),
    },
  ];

  return (
    <div className="flex w-full flex-col gap-4">
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-5">
        <StatCard label="전체" value={stats.total} variant="primary" />
        <StatCard label="활성" value={stats.active} variant="success" />
        <StatCard label="비활성" value={stats.inactive} variant="warning" />
        <StatCard label="정지" value={stats.suspended} variant="danger" />
        <StatCard label="관리자" value={stats.admin} variant="secondary" />
      </div>
      <div className="flex justify-end">
        <Button
          onClick={() => setIsCreateUserModalOpen(true)}
          variant="primary"
        >
          새로 만들기
        </Button>
      </div>
      <DataTable columns={columns} data={users} keyField="id" />
      {selectedUserId && (
        <EditUserModal
          open={isEditUserModalOpen && !!selectedUserId}
          onClose={() => setIsEditUserModalOpen(false)}
          selectedId={selectedUserId!}
          onSuccess={fetchUsers}
        />
      )}
      <CreateUserModal
        open={isCreateUserModalOpen}
        onClose={() => setIsCreateUserModalOpen(false)}
        onSubmit={handleCreateUser}
      />
    </div>
  );
};

export default User;
