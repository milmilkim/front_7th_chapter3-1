import { useUsers } from "@/hooks/useUsers";
import StatCard from "@/components/stat-card";

const User = () => {
  const { stats } = useUsers();

  return (
    <div className="flex w-full gap-4">
      <StatCard label="전체" value={stats.total} variant="primary" />
      <StatCard label="활성" value={stats.active} variant="success" />
      <StatCard label="비활성" value={stats.inactive} variant="warning" />
      <StatCard label="정지" value={stats.suspended} variant="danger" />
      <StatCard label="관리자" value={stats.admin} variant="secondary" />
    </div>
  );
};

export default User;
