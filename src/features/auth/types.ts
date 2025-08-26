// src/features/auth/types.ts
export interface User {
  id: string;
  name?: string;
  email: string;
  role: "admin" | "sender" | "receiver";
}
