# AGENTS.md — mi-portfolio

SPA React 18.2 + Vite 4.4.5 + Sass. Sin router, sin store, sin tests, sin CI (`.github` no existe). Detalle completo en `README.md`.

## Comandos

- `npm run dev` (`vite --host`, → `http://localhost:5173`)
- `npm run build` → `dist/` (lo que se publica en Netlify)
- `npm run preview` — probar build local
- `npm run lint` — `eslint . --ext js,jsx --report-unused-disable-directives --max-warnings 0` (cero warnings tolerados)

No hay suite de tests ni typecheck. Verificación = `lint` + `build`.

## Arquitectura

- Entrada: `src/main.jsx` → `src/App.jsx`. `App.jsx` solo levanta estado `filtro` y compone grid `box1-box7` (`src/app.scss`): Perfil full-width, Skills/Hobbies/Experiencia, Filtro, Proyectos, Footer.
- Flujo: `Filtrado onFilterChange={setFiltro}` → `Proyectos filtro={filtro}` con `project.tag.includes(filtro)` (case-sensitive: `maquetado, React, JS, node`).
- Datos: `Proyectos.jsx` hace `fetch("../../project.json")` y pagina (`itemsPerPage` 1/2/3/4 según `<=480/800/1200`). Fuente: `public/project.json` (9 items) + imágenes en `public/img/`.
- Estilos: un `.scss` por componente + variables/grid en `src/app.scss` (requiere `sass`). Fuente Montserrat local en `src/fonts/`.

## Gotchas — no romper

- `fetch("../../project.json")` es frágil; lo correcto en Vite es `/project.json`. Si tocas `Proyectos.jsx`, corrígelo a ruta absoluta.
- SPA en Netlify: solo vale `public/_redirects` (`/* /index.html 200`). `src/_redirects` es duplicado ignorado — no editar ni borrar `public/_redirects`.
- `vite.config.js` es mínimo (`plugins:[react()]`); no añadir alias/base sin motivo.
- `index.html`: conserva `gtag G-ZQXX3KJ4TC`, favicon `devchallenges.png` y entry `/src/main.jsx`.
- Deps `@emotion/*`, `@fontsource/roboto` instaladas pero no importadas; `count` en `App.jsx` sin usar; efecto nieve en `app.scss` usa URLs `http://` externas. No reintroducir ni ampliar esa deuda.
- Comando repo-local: `.opencode/commands/worktree.md` (`/worktree`).
