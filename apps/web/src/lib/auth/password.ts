import { randomBytes, scryptSync, timingSafeEqual } from "crypto";

/**
 * Hashes a password using scrypt with a unique random salt.
 * Output format: `<salt_hex>:<hash_hex>`
 */
export const hashPassword = (password: string): string => {
  const salt = randomBytes(16).toString("hex");
  const hash = scryptSync(password, salt, 64).toString("hex");
  return `${salt}:${hash}`;
};

/**
 * Verifies a password against a stored `<salt_hex>:<hash_hex>` string.
 * Uses timingSafeEqual to protect against timing attacks.
 */
export const verifyPassword = (password: string, combined: string): boolean => {
  try {
    const parts = combined.split(":");
    if (parts.length !== 2) return false;
    const [salt, hash] = parts;
    if (!salt || !hash) return false;
    const computed = scryptSync(password, salt, 64).toString("hex");
    return timingSafeEqual(
      Buffer.from(hash, "hex"),
      Buffer.from(computed, "hex"),
    );
  } catch {
    return false;
  }
};
