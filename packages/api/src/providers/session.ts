import type { SessionProvider } from "./types";
import { logger } from "../lib/logger";

let _session: SessionProvider | null = null;

/**
 * Initialize the session provider. Call this during app bootstrapping.
 */
export const initSession = (s: SessionProvider) => {
  _session = s;
};

/**
 * A safe fallback provider used when the real provider hasn't been initialized.
 * It treats every request as unauthenticated (returns null).
 */
const fallbackSessionProvider: SessionProvider = {
  getSession: async () => null,
};

/**
 * Return the initialized SessionProvider, or a safe fallback if none has been
 * registered. The fallback avoids throwing on uninitialized state (which
 * previously produced an internal 500) and logs a warning to aid debugging.
 */
export const getSessionProvider = (): SessionProvider => {
  if (_session == null) {
    // Log a clear warning so the operator sees the misconfiguration in logs.
    logger.warn(
      { route: "providers.getSessionProvider" },
      "SessionProvider not initialized; using fallback provider that treats requests as unauthenticated",
    );
    return fallbackSessionProvider;
  }
  return _session;
};
