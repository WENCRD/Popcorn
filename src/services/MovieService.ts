// src/services/MovieService.ts
import type { MovieListItem } from "../types/movies";

const API = import.meta.env.VITE_OMDB_API_URL ?? "https://www.omdbapi.com/";
const KEY = import.meta.env.VITE_OMDB_API_KEY as string;

type OmdbMovie = { imdbID: string; Title: string; Year: string; Poster: string };
type SearchResponse =
  | { Response: "True"; Search: OmdbMovie[]; totalResults: string }
  | { Response: "False"; Error: string };

async function getAllMovies(
  currentPage = 1,
  query = "star"
): Promise<{ data: { results: MovieListItem[]; total_pages: number } }> {
  if (!KEY) throw new Error("VITE_OMDB_API_KEY manquante dans .env");

  const url = new URL(API);
  url.searchParams.set("apikey", KEY);
  url.searchParams.set("s", query);
  url.searchParams.set("type", "movie");
  url.searchParams.set("page", String(currentPage));

  const res = await fetch(url.toString());
  if (!res.ok) throw new Error("OMDb unreachable");
  const data = (await res.json()) as SearchResponse;

  if (data.Response === "False") {
    const msg = (data.Error || "").toLowerCase();
    if (msg.includes("movie not found")) {
      // ✅ pas d’erreur : on renvoie une liste vide
      return { data: { results: [], total_pages: 1 } };
    }
    if (msg.includes("too many results")) {
      throw new Error("Trop de résultats. Raffinez votre recherche.");
    }
    throw new Error(`Erreur OMDb : ${data.Error}`);
  }

  const total = parseInt(data.totalResults, 10) || 0;
  const total_pages = Math.max(1, Math.min(100, Math.ceil(total / 10)));

  const results: MovieListItem[] = (data.Search || []).map((m) => ({
    id: m.imdbID,
    title: m.Title,
    year: m.Year,
    poster: m.Poster !== "N/A" ? m.Poster : null,
  }));

  return { data: { results, total_pages } };
}

export default { getAllMovies };
