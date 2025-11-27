import { useEffect, useState } from "react";
import {
  userService,
  calculateUserStats,
  type User,
  type UserStats,
} from "@/services/userService";
import { useAlert } from "./useAlert";

export const useUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [stats, setStats] = useState<UserStats>({
    total: 0,
    active: 0,
    inactive: 0,
    suspended: 0,
    admin: 0,
  });
  const { addAlert } = useAlert();

  const fetchUsers = async () => {
    try {
      const data = await userService.getAll();
      setUsers(data);
      setStats(calculateUserStats(data));
    } catch (error) {
      console.error(error);
      addAlert("실패", "데이터를 불러오는데 실패했습니다", "error");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return { users, stats, fetchUsers };
};
