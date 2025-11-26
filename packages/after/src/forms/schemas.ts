import { z } from "zod";

// User Form Schema
export const userFormSchema = z.object({
  username: z
    .string()
    .min(3, "사용자명은 3자 이상이어야 합니다")
    .max(20, "사용자명은 20자 이하여야 합니다")
    .regex(/^[a-zA-Z0-9_]+$/, "영문, 숫자, 언더스코어만 사용 가능합니다")
    .refine(
      (val) => {
        const reserved = ["admin", "root", "system", "administrator"];
        return !reserved.includes(val.toLowerCase());
      },
      { message: "예약된 사용자명입니다" },
    ),
  email: z
    .string()
    .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "올바른 이메일 형식이 아닙니다")
    .refine(
      (val) => val.endsWith("@company.com") || val.endsWith("@example.com"),
      {
        message:
          "회사 이메일(@company.com 또는 @example.com)만 사용 가능합니다",
      },
    ),
  role: z.string(),
  status: z.string(),
});

export type UserFormValues = z.infer<typeof userFormSchema>;

// Post Form Schema
export const postFormSchema = z.object({
  title: z
    .string()
    .min(5, "제목은 5자 이상이어야 합니다")
    .max(100, "제목은 100자 이하여야 합니다"),
  username: z
    .string()
    .min(3, "사용자명은 3자 이상이어야 합니다")
    .max(20, "사용자명은 20자 이하여야 합니다")
    .regex(/^[a-zA-Z0-9_]+$/, "영문, 숫자, 언더스코어만 사용 가능합니다")
    .refine(
      (val) => {
        const reserved = ["admin", "root", "system", "administrator"];
        return !reserved.includes(val.toLowerCase());
      },
      {
        message: "예약된 사용자명입니다",
      },
    ),
  category: z.string(),
  content: z.string(),
});

export type PostFormValues = z.infer<typeof postFormSchema>;
