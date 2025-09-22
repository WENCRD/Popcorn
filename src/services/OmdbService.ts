import axios from "axios";

const DATA_URL = import.meta.env.VITE_OMDB_API_URL ?? "https://www.omdbapi.com/";
const IMG_URL  = import.meta.env.VITE_OMDB_IMG_URL  ?? "https://img.omdbapi.com/";
const KEY      = import.meta.env.VITE_OMDB_API_KEY as string;

const dataClient = axios.create({ baseURL: DATA_URL, timeout: 10_000 });

export type OmdbMovie = {
  imdbID: string;
  Title: string;
  Year: string;
  Poster: string; // "N/A" si indispo
  Type?: string;
};

type SearchResponse =
  | { Response: "True"; Search: OmdbMovie[]; totalResults: string }
  | { Response: "False"; Error: string };

type ByIdResponse =
  | (OmdbMovie & { Plot?: string; Genre?: string; Director?: string; Runtime?: string; Ratings?: { Source: string; Value: string }[]; Response: "True" })
  | { Response: "False"; Error: string };

// Recherche paginée (10 résultats/page)
export async function searchMovies(q: string, page = 1) {
  if (!q) return { results: [] as OmdbMovie[], total: 0 };
  const { data } = await dataClient.get<SearchResponse>("", {
    params: { apikey: KEY, s: q, type: "movie", page },
  });
  if (data.Response === "False") throw new Error(data.Error || "OMDb error");
  return { results: data.Search, total: Number.parseInt(data.totalResults, 10) || 0 };
}

// Détails par ID IMDB
export async function getMovieByID(imdbID: string) {
  const { data } = await dataClient.get<ByIdResponse>("", {
    params: { apikey: KEY, i: imdbID, plot: "full" },
  });
  if (data.Response === "False") throw new Error(data.Error || "OMDb error");
  return data;
}

// URL d'affiche
export function getPosterUrl(imdbID: string, h = 600) {
  const u = new URL(IMG_URL);
  u.searchParams.set("apikey", KEY);
  u.searchParams.set("i", imdbID); 
  u.searchParams.set("h", String(h)); 
  return u.toString();
}
