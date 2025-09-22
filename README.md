# Popcorn Front — React + Vite + Tailwind (TypeScript)

## 📦 Prérequis

* **Node 20.x**

  * Si vous êtes en **20.17.0**, utilisez **Vite 6** et **@vitejs/plugin-react 4** (sinon avertissement EBADENGINE).
* **npm 9+**

## 🚀 Installation

Dans le dossier **popcorn-front** :

```powershell
npm i

# Compatibilité Vite selon votre Node
# Si Node = 20.17.0 :
npm i -D vite@6 @vitejs/plugin-react@4
# Si Node ≥ 20.19.0 ou 22.12+ :
# npm i -D vite@latest @vitejs/plugin-react@latest

# Tailwind CSS
npm i -D tailwindcss@3 postcss autoprefixer
# Initialisation (éviter npx sous Windows npm 10)
npm exec tailwindcss init -p
# ou, fallback PowerShell :
.\node_modules\.bin\tailwindcss.cmd init -p
```

## ⚙️ Configuration Tailwind

**tailwind.config.js**

```js
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  theme: { extend: {} },
  plugins: [],
};
```

**postcss.config.js**

```js
export default { plugins: { tailwindcss: {}, autoprefixer: {} } };
```

**src/index.css**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

## 🔑 Variables d’environnement

Créer **.env** :

# OMDb — nécessaire pour la recherche
VITE_OMDB_API_KEY=<<<clef_OMDb>>>

# API back (auth, si utilisée)
VITE_API_URL=http://localhost:3001



## 📜 Scripts (package.json)

```json
{
  "scripts": {
    "start": "vite --open",
    "dev": "vite",
    "build": "tsc -b && vite build",
    "preview": "vite preview",
    "test": "vitest",
    "test:watch": "vitest --watch",
    "coverage": "vitest run --coverage",
    "lint": "eslint . --ext .ts,.tsx"
  }
}
```

## ▶️ Démarrer

```powershell
npm run popcorn
npm start
# Front sur http://localhost:5173
```

## 🧩 Fonctionnalités
 
* 🔎 Recherche de films via OMDb (?q=…&p=…) avec debounce côté UI.

* 🧱 Grille responsive 16 films / page (4 colonnes desktop).

* 🪄 Cartes modernes (hover/zoom), affichage titre + année + affiche.

* 🪟 Modal de détails (synopsis, réalisateur, acteurs) par imdbID.

* ⏳ Loader animé (overlay) + skeletons pendant les chargements.

* 💾 Cache local (localStorage) + restauration de la dernière recherche.

* 🧭 Navbar responsive : logo JPG “POPCORN”, barre de recherche compacte, menu burger & loupe.

* 🎨 Palette jaune popcorn #eed57a .

Note : OMDb exige un paramètre s= pour rechercher. Sans requête, la home reste neutre (pas de “star” imposé).
Option future : afficher des “Tendances” via TMDb quand q est vide.


## 🧪 Tests & Lint

```powershell
npm run test         # Vitest + jsdom
npm run test:watch   # Watch
npm run coverage     # Rapport ./coverage/index.html
npm run lint         # ESLint
```

## 🪟 Notes Windows / PowerShell

* Multiligne PowerShell : utilisez le **backtick** `et non le`\`.
* Si `npx tailwindcss` renvoie *could not determine executable* : utilisez `npm exec tailwindcss init -p` ou `./node_modules/.bin/tailwindcss.cmd`.

## ⚠️ Limites connues

* OMDb : pas de “liste globale” sans s= (d’où la home neutre par défaut).
* Textes de synopsis souvent en anglais (source OMDb).
* Rate-limit : prévoir un message clair si la clé est manquante/incorrecte.

## 💡 Améliorations

* Proxy TMDB via back (cacher la clé + cache).
* Pagination/infini, tri/filtre (année, genre), favoris, page détail.
* Toasts non bloquants pour erreurs réseau.
* CI (lint + tests + build), Docker.


## 🧪 Tests & Lint 

```powershell
npm run test         # Vitest + jsdom
npm run test:watch   # Watch
npm run coverage     # Rapport ./coverage/index.html
npm run lint         # ESLint
```
## 🧱 Architecture 

```powershell
src/
  components/
    FilmCard.tsx
    Footer.tsx       # footer “wave” (jaune #eed57a)
    Modal.tsx 
    MovieCard.tsx    # card + hover/zoom
    MovieDetailsModal.tsx
    NavBar.tsx       # logo POPCORN SVG, search, burger/loupe    
    PageBtn.tsx
    SearchBarFancy.tsx
  pages/
    HomePage.tsx
  services/
    MovieService.ts
    OmdbService.ts
     tests/
    setup.ts
  types/
    movies.ts
  utils/
    localCache.ts  
index.css
```

## ⚠️ Limites connues

* OMDb : pas de “liste globale” sans s= (d’où la home neutre par défaut).
* Textes de synopsis souvent en anglais (source OMDb).
* Rate-limit : prévoir un message clair si la clé est manquante/incorrecte.

## 💡Pistes d'amélioration 

* Filtres (année, genre), tri A→Z / Z→A, favoris.
* Détails enrichis (images, casting complet, recommandations via TMDb).
* Toasts non bloquants pour erreurs réseau.
* CI (lint + tests + build), Docker.

## 🙏 Crédits UI
* Loader / micro-interactions : inspirations uiverse.io, adaptés en Tailwind.
* Effets de texte/typographie : snippets freefrontend.com, réécrits pour l’app.
* Footer “wave” & barre de recherche : design repris et converti en React + Tailwind.

Popcorn 🍿 — simple, propre, efficace.
Si vous voulez creuser l’accessibilité, la perf ou la qualité de tests, je suis partant.