const GATEWAY_META_SELECTOR = 'meta[name="agentvault-gateway-api-url"]';

/** Read the server's runtime configuration without executing an inline script. */
export const readGatewayApiUrl = (
  fallback: string,
  root?: Pick<Document, "querySelector">,
): string =>
  root?.querySelector(GATEWAY_META_SELECTOR)?.getAttribute("content") ||
  fallback;
