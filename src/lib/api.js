export async function requestJson(url, options = {}) {
  // If the path is a relative API path (starts with /api/),
  // and a VITE_API_URL is provided at build time, prefix it so
  // the frontend will call the correct backend origin in production.
  const base =
    typeof import.meta !== "undefined" && import.meta.env
      ? import.meta.env.VITE_API_URL
      : undefined;

  const targetUrl =
    typeof url === "string" && url.startsWith("/api/") && base
      ? `${base.replace(/\/$/, "")}${url}`
      : url;

  const response = await fetch(targetUrl, {
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    ...options,
  });

  const text = await response.text();
  const payload = text ? JSON.parse(text) : {};

  if (!response.ok) {
    throw new Error(payload.message || "Request failed.");
  }

  return payload;
}
