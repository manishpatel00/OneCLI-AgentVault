import type { AuthUser } from "./types";
import { getServerSessionImpl } from "@/lib/auth/auth-server";

export const getServerSession = async (): Promise<AuthUser | null> =>
  getServerSessionImpl();
