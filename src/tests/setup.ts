import "@testing-library/jest-dom";
import { afterEach, vi } from "vitest";

// Clé OMDb fake pour les tests
vi.stubEnv("VITE_OMDB_API_KEY", "test-key");

// Mock propre d'IntersectionObserver (sans any)
const ioMock: IntersectionObserver = {
  root: null,
  rootMargin: "",
  thresholds: [],
  observe: () => undefined,
  unobserve: () => undefined,
  disconnect: () => undefined,
  takeRecords: () => [],
};
// Vitest attend un constructeur → on renvoie l'instance ci-dessus
vi.stubGlobal("IntersectionObserver", vi.fn(() => ioMock));

afterEach(() => {
  vi.restoreAllMocks();
});
