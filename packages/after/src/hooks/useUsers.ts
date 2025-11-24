import { useEffect, useState } from "react";
import {
  userService,
  calculateUserStats,
  type User,
  type UserStats,
} from "@/services/userService";

export const useUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [stats, setStats] = useState<UserStats>({
    total: 0,
    active: 0,
    inactive: 0,
    suspended: 0,
    admin: 0,
  });

  useEffect(() => {
    const loadData = async () => {
      const data = await userService.getAll();
      setUsers(data);
      setStats(calculateUserStats(data));
    };
    loadData();
  }, []);

  return { users, stats };
};
