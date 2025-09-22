import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import  SearchBarCompact  from "../components/SearchBar"; 
function NavBar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);

  // ouvre/ferme la recherche
  function toggleSearch() {
    setMobileSearchOpen((prev) => {
      const next = !prev;
      if (next) setMobileOpen(false);
      return next;
    });
  }

  // ouvre/ferme le menu 
  function toggleMenu() {
    setMobileOpen((prev) => {
      const next = !prev;
      if (next) setMobileSearchOpen(false);
      return next;
    });
  }

  return (
    <nav className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur">
      <div className="mx-auto flex w-full max-w-screen-xl items-center gap-3 px-4 py-3">
        {/* Logo */}
        <Link to="/" className="inline-block select-none" aria-label="Accueil Popcorn">
          <svg viewBox="0 0 320 48" className="h-10 sm:h-12">
            <text
              x="0" y="40"
              className="paint-order"
              fontFamily="system-ui, -apple-system, Segoe UI, Roboto, sans-serif"
              fontWeight="900"
              fontSize="40"
              letterSpacing="-3"
              fill="white"
              stroke="black"
              strokeWidth="3"
            >
              POPCORN
            </text>
          </svg>
        </Link>

        {/* Recherche (desktop) */}
        <div className="hidden flex-1 sm:block">
          <SearchBarCompact />
        </div>

        {/* Liens (desktop) */}
        <div className="hidden items-center gap-2 sm:flex">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              [
                "inline-flex items-center gap-2 h-11 px-3 rounded-lg text-sm font-medium transition",
                isActive ? "bg-black text-white" : "text-black hover:bg-gray-100",
              ].join(" ")
            }
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
              <path d="M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1v-9.5Z" fill="currentColor" />
            </svg>
            <span>Accueil</span>
          </NavLink>
        </div>

         {/* Boutons mobile */}
        <div className="ml-auto flex items-center gap-2 sm:hidden">
          <button
            type="button"
            onClick={toggleSearch}
            className="grid h-10 w-10 place-items-center rounded-lg text-black hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-black/30"
            aria-label="Rechercher"
            aria-expanded={mobileSearchOpen}
            aria-controls="mobile-search"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
              <circle cx="11" cy="11" r="7" fill="none" stroke="currentColor" strokeWidth="2" />
              <line x1="16.65" y1="16.65" x2="21" y2="21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>

          {/* Menu Burger*/}
          <button
            type="button"
            onClick={toggleMenu}
            className="grid h-10 w-10 place-items-center rounded-lg text-black hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-black/30"
            aria-label="Menu"
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
          >
            {mobileOpen ? (
              <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
                <path d="M6 6 L18 18 M18 6 L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
                <path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Recherche mobile*/}
      {mobileSearchOpen && (
        <div id="mobile-search" className="sm:hidden border-t bg-white px-4 py-3">
          <SearchBarCompact />
        </div>
      )}

      {/* Menu mobile */}
      {mobileOpen && (
        <div id="mobile-menu" className="sm:hidden border-t bg-white px-2 py-2">
          <ul>
            <li>
              <NavLink
                to="/"
                end
                className={({ isActive }) =>
                  [
                    "flex w-full items-center gap-3 rounded-lg px-3 py-3 text-base",
                    isActive ? "bg-gray-100 text-black font-semibold" : "text-black hover:bg-gray-50",
                  ].join(" ")
                }
                onClick={() => {
                  setMobileOpen(false);
                  setMobileSearchOpen(false);
                }}
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5 text-black" aria-hidden="true">
                  <path d="M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1v-9.5Z" fill="currentColor" />
                </svg>
                <span>Accueil</span>
              </NavLink>
            </li>            
          </ul>
        </div>
      )}
    </nav>
  );
}
export default  NavBar