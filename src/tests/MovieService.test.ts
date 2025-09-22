import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import MoviesServices from "../services/MovieService";

const originalFetch = globalThis.fetch;

beforeEach(() => {
  vi.stubEnv("VITE_OMDB_API_KEY", "test-key");
});

afterEach(() => {
  globalThis.fetch = originalFetch;
  vi.restoreAllMocks();
});

describe("MovieService.getAllMovies", () => {
  it('retourne liste vide si "Movie not found"', async () => {
    const fetchMock: typeof fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ Response: "False", Error: "Movie not found!" }),
    } as Response);
    vi.stubGlobal("fetch", fetchMock);

    const res = await MoviesServices.getAllMovies(1, "zzzzzz");
    expect(res.data.results).toEqual([]);
    expect(res.data.total_pages).toBe(1);
  });

  it("mappe correctement les résultats et calcule total_pages", async () => {
    const ok = {
      Response: "True",
      totalResults: "12",
      Search: [
        { imdbID: "tt1", Title: "Film A", Year: "1999", Poster: "N/A" },
        { imdbID: "tt2", Title: "Film B", Year: "2001", Poster: "http://img" },
      ],
    };
    const fetchMock: typeof fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ok,
    } as Response);
    vi.stubGlobal("fetch", fetchMock);

    const res = await MoviesServices.getAllMovies(1, "star");
    expect(res.data.total_pages).toBe(2); // 12 / 10 ⇒ ceil = 2
    expect(res.data.results[0]).toEqual({
      id: "tt1",
      title: "Film A",
      year: "1999",
      poster: null, // "N/A" devient null
    });
    expect(res.data.results[1].poster).toBe("http://img");
  });
});
