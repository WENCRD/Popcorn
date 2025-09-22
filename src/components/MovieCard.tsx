import type { MovieListItem } from "../types/movies";

function MovieCard({
  movieCard,
  onClick,
}: {
  movieCard: MovieListItem;
  onClick?: (id: string) => void;
}) {
  const poster =
    movieCard.poster ?? "https://via.placeholder.com/600x900?text=No+Poster";

  return (
    <button
      type="button"
      onClick={() => onClick?.(movieCard.id)}
      aria-label={`Ouvrir ${movieCard.title}`}
      className="
        group block w-full overflow-hidden rounded-xl bg-white
        ring-1 ring-black/5 shadow-sm
        transform-gpu will-change-transform
        transition-transform duration-200
        hover:scale-[1.03] hover:shadow-xl
        focus:outline-none focus:ring-2 focus:ring-gray-300
        motion-reduce:transform-none motion-reduce:transition-none
      "
    >
      {/* Image avec zoom plus prononcé au hover */}
      <div className="relative aspect-[2/3] overflow-hidden bg-gray-100">
        <img
          src={poster}
          alt={`Affiche de ${movieCard.title}`}
          loading="lazy"
          className="
            h-full w-full object-cover
            transition-transform duration-300
            group-hover:scale-110
            motion-reduce:transform-none
          "
        />
      </div>

      <div className="p-3">
        <h3 className="line-clamp-2 text-sm font-semibold text-gray-900">
          {movieCard.title}
        </h3>
        <p className="mt-0.5 text-xs text-gray-500">{movieCard.year}</p>
      </div>
    </button>
  );
}

export default MovieCard
