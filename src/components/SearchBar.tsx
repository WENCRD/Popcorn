import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

function SearchBarCompact() {
  const navigate = useNavigate();
  const [sp] = useSearchParams();
  const [term, setTerm] = useState(sp.get("q") ?? "");
  useEffect(() => setTerm(sp.get("q") ?? ""), [sp]);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const q = term.trim();
    if (q) localStorage.setItem("lastSearch", q);
    else localStorage.removeItem("lastSearch");
    navigate(q ? { pathname: "/", search: `?q=${encodeURIComponent(q)}&p=1` } : { pathname: "/" });
  }

  return (
    <form
      role="search"
      onSubmit={onSubmit}
      aria-label="Recherche de films"
      className="
        relative flex w-full max-w-lg items-center gap-2
        rounded-xl bg-[#eed57a] text-black shadow-[0_6px_20px_rgba(244,63,94,.35)]
        pl-4 pr-2 h-11 sm:h-12
      "
    >
      <input
        value={term}
        onChange={(e) => setTerm(e.target.value)}
        placeholder="Rechercher un film…"
        className="w-full bg-transparent text-sm placeholder-black/80 outline-none"
        aria-label="Rechercher un film"
      />
      <button
        type="submit"
        className="group grid h-9 w-9 place-items-center rounded-lg transition hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/40"
        aria-label="Chercher"
        title="Chercher"
      >
        {/* Icône loupe */}
        <svg
          viewBox="0 0 24 24"
          className="h-5 w-5 transition-transform duration-300 group-hover:rotate-12"
          aria-hidden="true"
        >
          <circle cx="11" cy="11" r="7" fill="none" stroke="currentColor" strokeWidth="2" />
          <line x1="16.65" y1="16.65" x2="21" y2="21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </button>
    </form>
  );
}

export default SearchBarCompact