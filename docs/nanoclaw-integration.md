# Nanoclaw Integration

Integrate AgentVault with [Nanoclaw](https://github.com/nanoclaw/nanoclaw) or any Docker-based agent orchestrator to route agent traffic through the AgentVault gateway.

## Prerequisites

- AgentVault instance running (self-hosted or cloud)
- User API key from the AgentVault dashboard (`oc_...`)

## Install

```bash
npm install @agentvault-sh/sdk
```

## Environment Variables

The orchestrator needs two env vars:

| Variable         | Required | Description                                              |
| ---------------- | -------- | -------------------------------------------------------- |
| `ONECLI_API_KEY` | Yes      | User API key from AgentVault dashboard (`oc_...`)            |
| `ONECLI_URL`     | No       | AgentVault instance URL. Defaults to `https://app.agentvault.sh` |

For self-hosted: `ONECLI_URL=http://localhost:10254`

## Quick Start

```typescript
import { AgentVault } from "@agentvault-sh/sdk";

// Reads ONECLI_API_KEY and ONECLI_URL from environment
const agentvault = new AgentVault();

const args = ["run", "-i", "--rm", "--name", "my-agent"];
await agentvault.applyContainerConfig(args);
// args is now mutated with -e HTTPS_PROXY=..., -v ca.pem:..., etc.
await exec("docker", [...args, "agent-image:latest"]);
```

## Usage

```typescript
import { AgentVault } from "@agentvault-sh/sdk";

const agentvault = new AgentVault({
  apiKey: process.env.ONECLI_API_KEY, // or omit to read from env
  url: process.env.ONECLI_URL, // omit for cloud (app.agentvault.sh)
});

const args = ["run", "-i", "--rm", "--name", "my-agent"];
const active = await agentvault.applyContainerConfig(args, {
  combineCaBundle: true, // merge system + AgentVault CAs (default: true)
  addHostMapping: true, // --add-host on Linux (default: true)
});

if (active) {
  console.log("Gateway configured — credentials will be injected");
} else {
  console.log("AgentVault not reachable — running without gateway");
}

await exec("docker", [...args, "agent-image:latest"]);
```

## What the SDK Does

When `applyContainerConfig` succeeds, it mutates the Docker args array with:

1. **Gateway env vars**: `-e HTTPS_PROXY=...`, `-e HTTP_PROXY=...`, `-e NODE_USE_ENV_PROXY=1`
2. **Node.js CA trust**: `-e NODE_EXTRA_CA_CERTS=/tmp/agentvault-gateway-ca.pem` + volume mount
3. **System-wide CA trust**: `-e SSL_CERT_FILE=/tmp/agentvault-combined-ca.pem` + volume mount (covers curl, Python, Go, git)
4. **Linux host mapping**: `--add-host host.docker.internal:host-gateway` (macOS Docker Desktop provides this automatically)

Traffic from the container goes through the gateway, which injects credentials on matching requests.

## Advanced: Raw Config

If you need the raw config (e.g. for a non-Docker runtime):

```typescript
const config = await agentvault.getContainerConfig();
// {
//   env: { HTTPS_PROXY: "...", HTTP_PROXY: "...", NODE_EXTRA_CA_CERTS: "...", NODE_USE_ENV_PROXY: "1" },
//   caCertificate: "-----BEGIN CERTIFICATE-----\n...",
//   caCertificateContainerPath: "/tmp/agentvault-gateway-ca.pem"
// }
```

## Nanoclaw-specific Example

In Nanoclaw's container runner, add AgentVault config before spawning the container:

```typescript
import { AgentVault } from "@agentvault-sh/sdk";

// Inject AgentVault gateway config (skipped if ONECLI_API_KEY is not set)
const agentvaultApiKey = process.env.ONECLI_API_KEY;
if (agentvaultApiKey) {
  const agentvault = new AgentVault({
    apiKey: agentvaultApiKey,
    url: process.env.ONECLI_URL,
  });
  const active = await agentvault.applyContainerConfig(args);
  if (active) {
    console.log("AgentVault gateway config applied");
  }
}
```

Users without AgentVault simply don't set `ONECLI_API_KEY`. No code changes needed.
