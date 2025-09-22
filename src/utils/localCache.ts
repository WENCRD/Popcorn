type Entry<T> = { t: number; v: T }; // t = expiration (timestamp ms)
const HOUR = 60 * 60 * 1000;

export function setCached<T>(key: string, value: T, ttlMs = 15 * 60 * 1000) {
  try {
    const entry: Entry<T> = { t: Date.now() + ttlMs, v: value };
    localStorage.setItem(key, JSON.stringify(entry));
  } catch { /* ignore */ }
}

export function getCached<T>(key: string): T | null {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return null;
    const entry = JSON.parse(raw) as Entry<T>;
    if (!entry || typeof entry.t !== "number") return null;
    if (entry.t < Date.now()) { localStorage.removeItem(key); return null; }
    return entry.v as T;
  } catch {
    return null;
  }
}

export const TTL = { short: 5 * 60 * 1000, medium: 15 * 60 * 1000, long: HOUR };
