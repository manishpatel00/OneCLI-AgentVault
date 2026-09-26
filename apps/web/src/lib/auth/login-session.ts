export type LoginSessionResult =
  | { status: "ok"; projectId?: string }
  | { status: "unauthorized" }
  | { status: "conflict"; message: string }
  | { status: "error"; message: string };

/** Sync the provider identity with the app's user/project before navigating. */
export const syncLoginSession = async (
  fetchSession: () => Promise<Response>,
): Promise<LoginSessionResult> => {
  try {
    const response = await fetchSession();
    if (response.status === 401) return { status: "unauthorized" };
    if (response.ok) {
      const data: unknown = await response.json();
      if (!data || typeof data !== "object") {
        return { status: "error", message: "Invalid session response." };
      }
      const projectId = (data as { projectId?: unknown }).projectId;
      return {
        status: "ok",
        projectId: typeof projectId === "string" ? projectId : undefined,
      };
    }

    const fallback =
      "Failed to sync session with server. Database or backend is down.";
    const body: unknown = await response.json().catch(() => null);
    const message =
      body &&
      typeof body === "object" &&
      "error" in body &&
      typeof body.error === "string"
        ? body.error
        : fallback;
    return { status: response.status === 409 ? "conflict" : "error", message };
  } catch {
    return {
      status: "error",
      message:
        "Failed to communicate with the server. Please check your network.",
    };
  }
};
