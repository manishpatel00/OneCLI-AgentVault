import type { CreateApiAppOptions } from "@agentvault/api";
import { ossNewProjectPolicySeeder } from "@agentvault/api/services/policy-oss-cutover";
import { ossPolicyValidator } from "@agentvault/api/services/policy-oss-locks";

/**
 * The OSS edition's API wiring. Every EE edition ALIASES THIS FILE AWAY
 * (`next.config.js` → `@/ee/init/api` or `@/ee/onprem/init/api`), so anything
 * here is OSS-only by construction:
 *
 * - the new-project seeder gives fresh projects their published Default Rule
 *   (the per-project enforce signal) from the instance posture;
 * - the policy validator LOCKS granular resource scoping (a AgentVault Cloud
 *   capability the OSS gateway does not enforce) with a loud 422.
 */
export const eeOverrides: CreateApiAppOptions | undefined = {
  newOrgPolicySeeder: ossNewProjectPolicySeeder,
  policyValidator: ossPolicyValidator,
};
