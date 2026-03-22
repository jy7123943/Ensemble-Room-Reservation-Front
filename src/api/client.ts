const BASE = '/api/v1';

export async function apiFetch<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
  });

  if (!res.ok) {
    const errorBody = await res.text();
    throw new Error(errorBody || `HTTP ${res.status}`);
  }

  // Handle 204 No Content or empty bodies
  const text = await res.text();
  if (!text) return undefined as T;

  const json = JSON.parse(text);
  return json.data ?? json;
}
