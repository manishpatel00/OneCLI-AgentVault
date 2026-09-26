# Login and build reliability plan

## Architecture / contract

- `apps/web/src/lib/runtime-config.ts` chooses **local** (no login) or **oauth** at runtime; the Docker entrypoint writes this configuration. The web auth provider and `getServerSessionImpl` must agree on the mode.
- In local mode, the server always identifies the caller as `local-admin` and bootstraps its organization/project. Browser storage is **not** an access-control boundary. Keep this mode bound to a trusted network.
- In OAuth mode, NextAuth authenticates with Google; `/v1/auth/session` provisions the database user and default project. Only navigate to the dashboard after that call succeeds. An expired session is different from a temporarily unavailable backend.
- `apps/web/src/proxy.ts` is the UI configuration gate. Docker provides a persistent encryption key; manual installations must configure one. OAuth settings must be complete, not partial.
- The Docker image runs the web app and Rust gateway; Compose publishes ports and provides the external app URL. OAuth callback origins come from the forwarded request host/scheme, not a baked-in localhost URL.

## Implemented in this PR

1. Align local browser state with server-side local auth; remove the misleading localStorage login flag and Google button in local mode. Label the local-mode exit as navigation, not a security logout.
2. Validate the three OAuth settings as a set, reject partial configuration, and remove the hard-coded shared encryption key from the web fallback.
3. Remove the image's fixed `NEXTAUTH_URL` and allow Compose `APP_URL` to be set explicitly for public deployments. Document proxy headers and Google callback registration.
4. Distinguish 401 from transient session errors; retain provider state and provide a retry action rather than signing out on backend failure. Apply this on both login and dashboard entry.
5. Add auth configuration/session regression tests and run them in CI. Apply the repository's existing Prettier rules to the ten files that previously failed the CI format gate (formatting-only changes outside the auth flow).

## Verification / rollout

- Run `pnpm --filter @agentvault/web test`, `pnpm --filter @agentvault/api test`, `pnpm lint --filter='!@agentvault/gateway'`, `pnpm check-types --filter='!@agentvault/gateway'`, and `pnpm build --filter='!@agentvault/gateway'` in an environment that can download Prisma engines. Run gateway Clippy/tests and Docker Compose smoke checks where Rust/Docker are available.
- Manual acceptance: local mode fresh browser -> `/auth/login` -> dashboard without Google or storage; temporary DB outage -> visible retry; OAuth with all three settings -> Google callback -> seeded project; partial settings -> setup error. Test behind a proxy with HTTPS and the registered callback URL. Verify that local mode is not internet-facing.
- Merge only after CI, Docker startup, Google credentials/redirect validation, and reviewer approval. Never rotate an existing encryption key without migrating stored secrets; use a persistent key/volume across restarts.

## Remaining operational limits

Google credentials, a reachable PostgreSQL service, a trusted public origin, and Docker/Rust tooling cannot be manufactured by application code. This sandbox cannot reach `binaries.prisma.sh` to generate the Prisma client, nor does it provide Docker/Rust; a full production build and live Google sign-in must be validated in CI or a provisioned deployment before merge. Hosted cloud/on-prem enterprise aliases are not shipped in this OSS checkout and are outside this PR's runtime verification.
