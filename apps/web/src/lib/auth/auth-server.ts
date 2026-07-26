import { auth } from "@/lib/auth/nextauth-config";
import { db } from "@agentvault/db";
import {
  findUserDefaultProject,
  bootstrapOrganization,
  joinSharedOrganization,
} from "@agentvault/api/services/organization-service";
import { CAPS } from "@/lib/env";
import { getAuthMode } from "./auth-mode";
import type { AuthUser } from "./types";
import { LOCAL_AUTH_ID, LOCAL_USER } from "./local-user";

let localUserEnsured = false;
let ensureLocalUserPromise: Promise<void> | null = null;

const runWithRetry = async <T>(
  fn: () => Promise<T>,
  retries = 5,
  delay = 1000,
): Promise<T> => {
  let lastErr: unknown;
  for (let attempt = 0; attempt < retries; attempt++) {
    try {
      return await fn();
    } catch (err) {
      lastErr = err;
      if (attempt < retries - 1) {
        await new Promise((resolve) => setTimeout(resolve, delay));
      }
    }
  }
  throw lastErr;
};

const ensureLocalUser = (): Promise<void> => {
  if (localUserEnsured) return Promise.resolve();
  if (ensureLocalUserPromise) return ensureLocalUserPromise;

  ensureLocalUserPromise = (async () => {
    try {
      await runWithRetry(async () => {
        const user = await db.user.upsert({
          where: { externalAuthId: LOCAL_AUTH_ID },
          create: {
            externalAuthId: LOCAL_AUTH_ID,
            email: LOCAL_USER.email,
            name: LOCAL_USER.name,
          },
          update: {},
          select: { id: true },
        });

        const existing = await findUserDefaultProject(user.id);
        if (!existing) {
          // Mirror the /v1/auth/session gate: onprem (single shared org) joins the one
          // shared org — which also seeds the bootstrap org API key — while OSS keeps a
          // per-user org. Without this, local auth always bootstraps the OSS way and the
          // onprem org key is never seeded.
          if (CAPS.tenancy === "single-org-shared") {
            await joinSharedOrganization(user.id, LOCAL_USER.email);
          } else {
            await bootstrapOrganization(user.id, LOCAL_USER.email, LOCAL_USER.name);
          }
        }
      });

      localUserEnsured = true;
    } catch (err) {
      ensureLocalUserPromise = null;
      throw err;
    }
  })();

  return ensureLocalUserPromise;
};

export const getServerSessionImpl = async (): Promise<AuthUser | null> => {
  if (getAuthMode() === "local") {
    await ensureLocalUser();
    return LOCAL_USER;
  }

  const session = await auth();
  if (!session?.user?.id || !session.user.email) return null;

  return {
    id: session.user.id,
    email: session.user.email,
    name: session.user.name ?? undefined,
  };
};
