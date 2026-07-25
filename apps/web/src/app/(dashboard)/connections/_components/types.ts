import type {
  CreateSecretInput,
  UpdateSecretInput,
} from "@agentvault/api/validations/secret";

export interface SecretActions {
  createSecret: (input: CreateSecretInput) => Promise<{ id: string }>;
  deleteSecret: (secretId: string) => Promise<void>;
  updateSecret: (secretId: string, input: UpdateSecretInput) => Promise<void>;
}
