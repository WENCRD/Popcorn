import { useEffect, useState } from "react";
import Modal from "./Modal";
import type { MovieDetails } from "../types/movies";
import MovieService from "../services/MovieService";

function MovieDetailsModal({
  imdbID,
  open,
  onClose,
}: {
  imdbID: string | null;
  open: boolean;
  onClose: () => void;
}) {
  const [data, setData] = useState<MovieDetails | null>(null);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    let alive = true;
    if (!open || !imdbID) return;
    (async () => {
      try {
        setLoading(true);
        setErr(null);
        setData(null);
        const d = await MovieService.getMovieById(imdbID);
        if (!alive) return;
        setData(d);
      } catch (e: unknown) {
        if (!alive) return;
        const msg =
          e instanceof Error ? e.message : typeof e === "string" ? e : "Erreur de chargement";
        setErr(msg);
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => {
      alive = false;
    };
  }, [open, imdbID]);

  return (
    <Modal open={open} onClose={onClose}>
      {/* Header */}
      <div className="sticky top-0 z-10 flex items-center justify-between border-b bg-white/80 p-4 backdrop-blur">
        <h2 className="text-lg font-semibold">Détails du film</h2>
        <button
          onClick={onClose}
          className="rounded-lg px-3 py-1 text-sm text-gray-600 hover:bg-gray-100"
          aria-label="Fermer"
        >
          ✕
        </button>
      </div>

      {/* Body */}
      <div className="p-4">
        {loading && (
          <div className="flex items-center justify-center py-12">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-300 border-t-transparent" />
          </div>
        )}

        {err && (
          <div className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">
            {err}
          </div>
        )}

        {data && (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-[auto,1fr]">
            {/* Poster */}
            <img
              src={
                data.Poster && data.Poster !== "N/A"
                  ? data.Poster
                  : "https://via.placeholder.com/300x450?text=No+Poster"
              }
              alt={`Affiche de ${data.Title}`}
              className="h-72 w-48 rounded-lg object-cover sm:h-80 sm:w-56"
            />

            {/* Infos */}
            <div className="space-y-2">
              <h3 className="text-xl font-bold">{data.Title}</h3>
              <p className="text-sm text-gray-600">
                {data.Year} {data.Runtime ? `• ${data.Runtime}` : ""} {data.Rated ? `• ${data.Rated}` : ""}
              </p>
              {data.Genre && (
                <p className="text-sm">
                  <span className="font-medium">Genre :</span> {data.Genre}
                </p>
              )}
              {data.Director && (
                <p className="text-sm">
                  <span className="font-medium">Réalisateur :</span> {data.Director}
                </p>
              )}
              {data.Actors && (
                <p className="text-sm">
                  <span className="font-medium">Acteurs :</span> {data.Actors}
                </p>
              )}
              {data.Plot && (
                <p className="mt-3 text-sm leading-relaxed text-gray-800">{data.Plot}</p>
              )}

              {data.Ratings && data.Ratings.length > 0 && (
                <div className="mt-3">
                  <p className="text-sm font-medium">Notes :</p>
                  <ul className="mt-1 list-disc pl-5 text-sm text-gray-700">
                    {data.Ratings.map((r, i) => (
                      <li key={i}>
                        {r.Source}: {r.Value}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
}

export default MovieDetailsModal
