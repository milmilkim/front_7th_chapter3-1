import { userService } from "@/services/userService";
import { useEffect, useState } from "react";
import type { User } from "@/services/userService";
import StatCard from "@/components/stat-card";

const User = () => {
  const loadData = async () => {
    const users = await userService.getAll();
    setUsers(users);
    setUserStats({
      total: users.length,
      active: users.filter((user) => user.status === "active").length,
      inactive: users.filter((user) => user.status === "inactive").length,
      suspended: users.filter((user) => user.status === "suspended").length,
      admin: users.filter((user) => user.role === "admin").length,
    });
  };

  const [, setUsers] = useState<User[]>([]);
  const [userStats, setUserStats] = useState<{
    total: number;
    active: number;
    inactive: number;
    suspended: number;
    admin: number;
  }>({
    total: 0,
    active: 0,
    inactive: 0,
    suspended: 0,
    admin: 0,
  });

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="flex w-full gap-4">
      <StatCard label="전체" value={userStats.total} variant="primary" />
      <StatCard label="활성" value={userStats.active} variant="success" />
      <StatCard label="비활성" value={userStats.inactive} variant="warning" />
      <StatCard label="정지" value={userStats.suspended} variant="danger" />
      <StatCard label="관리자" value={userStats.admin} variant="secondary" />
    </div>
  );
};

export default User;
