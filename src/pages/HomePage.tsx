// src/pages/HomePage.tsx
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import MoviesServices from "../services/MovieService";
import MovieCard from "../components/MovieCard";
import type { MovieListItem } from "../types/movies";
import PageBtn from "../components/PageBtn";
import MovieDetailsModal from "../components/MovieDetailsModal";
import FilmCard from "../components/FilmCard";

function HomePage() {
  const [sp, setSp] = useSearchParams();
  const q = (sp.get("q") ?? "").trim();
  const p = Math.max(1, parseInt(sp.get("p") ?? "1", 10) || 1);

  const [movies, setMovies] = useState<MovieListItem[]>([]);
  const [currentPage, setCurrentPage] = useState(p);
  const [maxPage, setMaxPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [openId, setOpenId] = useState<string | null>(null);
  const [hasLoaded, setHasLoaded] = useState(false); // ← nouveau

  // 1) Restaurer la dernière recherche si q est vide
  useEffect(() => {
    if (!q) {
      const last = localStorage.getItem("lastSearch");
      if (last) {
        const params = new URLSearchParams(sp);
        params.set("q", last);
        params.set("p", "1");
        setSp(params, { replace: true });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 2) Resynchroniser la page quand l’URL change
  useEffect(() => {
    setCurrentPage(p);
  }, [p]);

  // ====== Helper: récupère 16 items en agrégeant des pages OMDb (10 items/page)
  async function fetchPage16(logicalPage: number, query: string) {
    const start = (logicalPage - 1) * 16;
    const pageA = Math.floor(start / 10) + 1;
    const offset = start % 10;

    const a = await MoviesServices.getAllMovies(pageA, query);
    let pool = a.data.results.slice();
    const omdbTotalPages = a.data.total_pages;

    if (pool.length - offset < 16 && pageA + 1 <= omdbTotalPages) {
      const b = await MoviesServices.getAllMovies(pageA + 1, query);
      pool = pool.concat(b.data.results);
    }
    if (pool.length - offset < 16 && pageA + 2 <= omdbTotalPages) {
      const c = await MoviesServices.getAllMovies(pageA + 2, query);
      pool = pool.concat(c.data.results);
    }

    const results = pool.slice(offset, offset + 16);
    const maxPage16 = Math.max(1, Math.ceil((omdbTotalPages * 10) / 16));
    return { results, maxPage16 };
  }

  // 3) Fetch à chaque [q, currentPage]
  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        setLoading(true);
        setErr(null);
        const { results, maxPage16 } = await fetchPage16(currentPage, q || "star");
        if (!alive) return;
        setMovies(results);
        setMaxPage(maxPage16);
        setHasLoaded(true); // ← on a déjà chargé une fois
        window.scrollTo({ top: 0, behavior: "auto" });
      } catch (e: unknown) {
        if (!alive) return;
        let msg = "Erreur de chargement";
        if (e instanceof TypeError) msg = "Problème réseau : vérifiez votre connexion.";
        else if (e instanceof Error) msg = e.message;
        setErr(msg);
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => {
      alive = false;
    };
  }, [q, currentPage]);

  function goTo(page: number) {
    const next = Math.max(1, Math.min(maxPage, page));
    if (next === currentPage) return;
    setCurrentPage(next);
    const params = new URLSearchParams(sp);
    params.set("p", String(next));
    if (q) params.set("q", q);
    else params.delete("q");
    setSp(params, { replace: true });
  }

  return (
    <div className="mx-auto w-full max-w-screen-xl px-4 sm:px-6 lg:px-8 py-6 md:py-8">
      {/* Overlay loader uniquement après le premier rendu de résultats */}
      {loading && hasLoaded && (
        <div className="fixed inset-0 z-[100] grid place-items-center bg-black/40 backdrop-blur-sm">
          <span className="loader" />
        </div>
      )}

      {/* Carrousel */}
      {movies.length > 0 && (
        <FilmCard movies={movies.slice(0, 8)} onSelect={(id) => setOpenId(id)} />
      )}

      <h1 className="mb-6 text-3xl font-bold">LES FILMS</h1>

      {err && (
        <div className="w-full max-w-2xl rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">
          {err}
        </div>
      )}

      {!loading && movies.length === 0 && q && !err && (
        <p className="text-sm text-gray-600">Aucun film trouvé pour « {q} ».</p>
      )}

      {/* Grille 4 colonnes (16 cartes) 
          → Skeletons UNIQUEMENT au tout premier chargement (hasLoaded === false) */}
      {!hasLoaded && loading ? (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
          {Array.from({ length: 16 }).map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="aspect-[2/3] w-full rounded-xl bg-gray-200" />
              <div className="mt-2 h-4 w-3/4 rounded bg-gray-200" />
              <div className="mt-1 h-3 w-1/3 rounded bg-gray-200" />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
          {movies.map((m) => (
            <MovieCard movieCard={m} key={m.id} onClick={(id) => setOpenId(id)} />
          ))}
        </div>
      )}

      {/* Pagination */}
      {maxPage > 1 && (
        <nav className="mt-8 flex flex-wrap items-center justify-center gap-1 text-sm" aria-label="Pagination">
          {currentPage > 1 && (
            <>
              <PageBtn onClick={() => goTo(1)}>«</PageBtn>
              <PageBtn onClick={() => goTo(currentPage - 1)}>‹</PageBtn>
              <PageBtn onClick={() => goTo(1)}>1</PageBtn>
            </>
          )}

          {currentPage - 5 > 1 && <PageBtn onClick={() => goTo(currentPage - 5)}>…</PageBtn>}

          {currentPage > 2 && (
            <PageBtn onClick={() => goTo(currentPage - 1)}>{currentPage - 1}</PageBtn>
          )}

          <PageBtn active>{currentPage}</PageBtn>

          {currentPage + 1 < maxPage && (
            <PageBtn onClick={() => goTo(currentPage + 1)}>{currentPage + 1}</PageBtn>
          )}

          {currentPage + 5 <= maxPage && <PageBtn onClick={() => goTo(currentPage + 5)}>…</PageBtn>}

          {currentPage < maxPage && (
            <>
              <PageBtn onClick={() => goTo(maxPage)}>{maxPage}</PageBtn>
              <PageBtn onClick={() => goTo(currentPage + 1)}>›</PageBtn>
              <PageBtn onClick={() => goTo(maxPage)}>»</PageBtn>
            </>
          )}
        </nav>
      )}

      <MovieDetailsModal imdbID={openId} open={openId !== null} onClose={() => setOpenId(null)} />
    </div>
  );
}

export default HomePage;
