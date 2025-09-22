// src/components/FilmCard.tsx
import { useEffect, useRef } from "react";
import type { MovieListItem } from "../types/movies";

type Props = {
  movies: MovieListItem[];
  onSelect?: (id: string) => void;
  title?: string;
  auto?: boolean;
  interval?: number;
};

export default function FilmCard({
  movies,
  onSelect,
  title = "À l'affiche",
  auto = true,
  interval = 3500,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);

  const step = () => {
    const el = ref.current;
    return el ? Math.max(280, Math.floor(el.clientWidth * 0.9)) : 300;
  };

  const scrollByX = (dx: number) => {
    ref.current?.scrollBy({ left: dx, behavior: "smooth" });
  };

  useEffect(() => {
    if (!auto || !ref.current || movies.length === 0) return;
    const el = ref.current;
    const id = window.setInterval(() => {
      const s = step();
      scrollByX(s);
      if (el.scrollLeft + el.clientWidth >= el.scrollWidth - 2) {
        el.scrollTo({ left: 0, behavior: "smooth" });
      }
    }, interval);
    return () => window.clearInterval(id);
  }, [auto, interval, movies.length]);

  return (
    <section className="mb-6">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-xl font-semibold">{title}</h2>
      </div>

      {/* wrapper relatif pour flèches overlay + dégradés */}
      <div className="relative group">
        {/* dégradés latéraux (optionnels) */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-0 z-[1] w-10 bg-gradient-to-r from-white to-transparent"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 right-0 z-[1] w-10 bg-gradient-to-l from-white to-transparent"
        />

        {/* flèche gauche (noire) */}
        <button
          type="button"
          onClick={() => scrollByX(-step())}
          className="absolute left-2 top-1/2 z-10 -translate-y-1/2 grid h-10 w-10 place-items-center rounded-full
                     bg-black text-white shadow ring-1 ring-black/30 hover:bg-black/90
                     focus:outline-none focus:ring-2 focus:ring-white/40
                     transition-opacity sm:opacity-0 sm:group-hover:opacity-100"
          aria-label="Précédent"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
            <path d="M15 6l-6 6 6 6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        {/* flèche droite (noire) */}
        <button
          type="button"
          onClick={() => scrollByX(step())}
          className="absolute right-2 top-1/2 z-10 -translate-y-1/2 grid h-10 w-10 place-items-center rounded-full
                     bg-black text-white shadow ring-1 ring-black/30 hover:bg-black/90
                     focus:outline-none focus:ring-2 focus:ring-white/40
                     transition-opacity sm:opacity-0 sm:group-hover:opacity-100"
          aria-label="Suivant"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
            <path d="M9 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        {/* rail défilant */}
        <div
          ref={ref}
          className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto overflow-y-hidden pb-2 scroll-smooth overscroll-x-contain"
        >
          {movies.map((m) => (
            <button
              key={m.id}
              onClick={() => onSelect?.(m.id)}
              className="group/item snap-start w-64 shrink-0 text-left sm:w-72"
              title={m.title}
              aria-label={`Ouvrir ${m.title}`}
              type="button"
            >
              <div className="relative">
                {/* HALO ROUGE au hover (glow) */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute -inset-3 -z-10 rounded-2xl
                             opacity-0 blur-2xl transition-opacity duration-300
                             group-hover/item:opacity-100 bg-red-500/40"
                />
                {/* carte */}
                <div
                  className="relative aspect-[16/9] overflow-hidden rounded-2xl bg-gray-100
                             ring-1 ring-black/5 transition-shadow duration-300
                             group-hover/item:ring-red-500/40
                             group-hover/item:shadow-[0_18px_50px_rgba(239,68,68,.45)]"
                >
                  <img
                    src={m.poster ?? "https://via.placeholder.com/800x450?text=No+Poster"}
                    alt={`Affiche de ${m.title}`}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover/item:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-3">
                    <div className="line-clamp-2 text-sm font-semibold text-white">{m.title}</div>
                    <div className="text-xs text-white/80">{m.year}</div>
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
