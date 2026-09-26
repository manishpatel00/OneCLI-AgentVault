export type SetupErrorCode = "oauth-misconfigured" | "missing-encryption-key";

/** Never silently fall back to unauthenticated local mode when OAuth is half configured. */
export const checkAuthSetup = ({
  isCloud,
  nextAuthSecret,
  googleClientId,
  googleClientSecret,
  encryptionKey,
}: {
  isCloud: boolean;
  nextAuthSecret: string;
  googleClientId: string;
  googleClientSecret: string;
  encryptionKey: string;
}): SetupErrorCode | null => {
  if (isCloud) return null;
  if (
    (nextAuthSecret || googleClientId || googleClientSecret) &&
    !(nextAuthSecret && googleClientId && googleClientSecret)
  ) {
    return "oauth-misconfigured";
  }
  if (!encryptionKey) return "missing-encryption-key";
  return null;
};
