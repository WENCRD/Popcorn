// src/components/Footer.tsx
import { Link } from "react-router-dom";

export const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <div className="relative mt-16 bg-[#eed57a] text-gray-900">
      {/* vague en haut (même couleur que le fond du footer) */}
      <svg
        className="absolute top-0 h-6 w-full -mt-5 text-[#eed57a] sm:-mt-10 sm:h-16"
        preserveAspectRatio="none"
        viewBox="0 0 1440 54"
        aria-hidden="true"
      >
        <path
          fill="currentColor"
          d="M0 22L120 16.7C240 11 480 1.00001 720 0.700012C960 1.00001 1200 11 1320 16.7L1440 22V54H1320C1200 54 960 54 720 54C480 54 240 54 120 54H0V22Z"
        />
      </svg>

      <div className="mx-auto px-4 pt-12 sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8">
        <div className="mb-8 grid row-gap-10 gap-16 lg:grid-cols-6">
          {/* Colonne marque */}
          <div className="lg:col-span-2 md:max-w-md">
            <Link to="/" aria-label="Accueil Popcorn" title="Popcorn" className="inline-flex items-center">
              {/* Logo POPCORN (fin, responsive) */}
              <svg
                viewBox="0 0 320 48"
                preserveAspectRatio="xMinYMid meet"
                className="block h-auto w-[clamp(120px,24vw,220px)]"
                aria-hidden="true"
              >
                <text
                  x="0"
                  y="40"
                  className="paint-order"
                  fontFamily="system-ui, -apple-system, Segoe UI, Roboto, sans-serif"
                  fontWeight="700"
                  fontSize="40"
                  letterSpacing="-1"
                  fill="black"
                  stroke="white"
                  strokeWidth="2.25"
                  strokeLinejoin="round"
                  vectorEffect="non-scaling-stroke"
                >
                  POPCORN
                </text>
              </svg>
            </Link>

            <div className="mt-4 lg:max-w-sm">
              <p className="text-sm/6">
                Petite app de recherche de films — simple, rapide et responsive.
              </p>
              <p className="mt-3 text-sm/6">
                Test technique • 16 films par page • Modal de détails • Loader & cache local.
              </p>
            </div>
          </div>

          {/* Liens */}
          <div className="grid grid-cols-2 gap-6 row-gap-8 md:grid-cols-4 lg:col-span-4">
            <div>
              <p className="font-semibold tracking-wide">Projet</p>
              <ul className="mt-2 space-y-2 text-sm">
                <li>
                  <Link to="/" className="transition-colors hover:text-black/70">
                    Accueil
                  </Link>
                </li>
                <li>
                  <a href="#" className="transition-colors hover:text-black/70">
                    Mentions
                  </a>
                </li>
                <li>
                  <a href="#" className="transition-colors hover:text-black/70">
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <p className="font-semibold tracking-wide">Ressources</p>
              <ul className="mt-2 space-y-2 text-sm">
                <li>
                  <a href="#" className="transition-colors hover:text-black/70">
                    README Front
                  </a>
                </li>
                <li>
                  <a href="#" className="transition-colors hover:text-black/70">
                    Tests & Coverage
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <p className="font-semibold tracking-wide">Tech</p>
              <ul className="mt-2 space-y-2 text-sm">
                <li>
                  <span className="cursor-default text-black/80">React + TS</span>
                </li>
                <li>
                  <span className="cursor-default text-black/80">Vite + Tailwind</span>
                </li>
                <li>
                  <span className="cursor-default text-black/80">OMDb API</span>
                </li>
              </ul>
            </div>

            <div>
              <p className="font-semibold tracking-wide">Suivre</p>
              <div className="mt-2 flex items-center gap-3">
                <a href="#" aria-label="Twitter" className="rounded p-1 transition-colors hover:bg-black/5">
                  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
                    <path d="M22 5.8c-.7.3-1.5.6-2.3.7.8-.5 1.4-1.3 1.7-2.2-.8.5-1.7.9-2.7 1.1A3.9 3.9 0 0 0 12 8.6c0 .3 0 .6.1.9-3.2-.2-6-1.7-7.9-4-.3.6-.5 1.3-.5 2 0 1.4.7 2.6 1.8 3.3-.6 0-1.2-.2-1.7-.5v.1c0 2 1.5 3.7 3.4 4.1-.4.1-.8.2-1.2.2-.3 0-.6 0-.9-.1.6 1.7 2.2 2.9 4.1 3a7.9 7.9 0 0 1-5.8 1.6A11 11 0 0 0 9.3 21c7 0 10.9-5.8 10.9-10.9v-.5c.8-.6 1.4-1.3 1.8-2.1z" />
                  </svg>
                </a>
                <a href="#" aria-label="Instagram" className="rounded p-1 transition-colors hover:bg-black/5">
                  <svg viewBox="0 0 30 30" className="h-6 w-6" fill="currentColor" aria-hidden="true">
                    <circle cx="15" cy="15" r="4" />
                    <path d="M20 3H10a7 7 0 0 0-7 7v10a7 7 0 0 0 7 7h10a7 7 0 0 0 7-7V10a7 7 0 0 0-7-7zm-5 21a6 6 0 1 1 0-12 6 6 0 0 1 0 12zm6-15a1 1 0 1 1 0-2 1 1 0 0 1 0 2z" />
                  </svg>
                </a>
                <a href="#" aria-label="Facebook" className="rounded p-1 transition-colors hover:bg-black/5">
                  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
                    <path d="M22 0H2C.9 0 0 .9 0 2v20c0 1.1.9 2 2 2h11v-9H10v-4h3V8.4c0-3.1 1.9-4.8 4.7-4.8 1.3 0 2.5.1 2.8.1v3.2h-1.9c-1.5 0-1.8.7-1.8 1.8V11h4.5l-1 4H17v9h5c1.1 0 2-.9 2-2V2c0-1.1-.9-2-2-2z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bas de page */}
        <div className="flex flex-col justify-between border-t border-black/10 pb-10 pt-5 sm:flex-row">
          <p className="text-sm">© {year} PopCorn. Tous droits réservés.</p>
          <p className="mt-3 text-sm sm:mt-0">
            Made with <span aria-hidden>🍿</span> &amp; React • Tailwind
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer