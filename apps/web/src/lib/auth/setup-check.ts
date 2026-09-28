export type SetupErrorCode = "oauth-misconfigured" | "missing-encryption-key";

/** Never silently fall back to unauthenticated local mode when OAuth is half configured. */
export const checkAuthSetup = ({
  isCloud,
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
  // If one of Google Client ID or Secret is set without the other, OAuth is misconfigured
  if (
    (googleClientId || googleClientSecret) &&
    !(googleClientId && googleClientSecret)
  ) {
    return "oauth-misconfigured";
  }
  if (!encryptionKey) return "missing-encryption-key";
  return null;
};
