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
- Estilos: un `.scss` por componente + variables/grid en `src/app.scss` (requiere `sass`). Fuente Montserrat en `public/fonts/` (ruta absoluta `/fonts/...`, resoluble en dev y build).

## Flujo de trabajo Git

- Remoto `origin` (`github.com/gadetru/mi-portfolio.git`). Rama principal `master`, sincronizada con `origin/master`; árbol limpio.
- `01-intro` y `02-actualizar` ya fusionadas vía PR (#1, #2). Rama local `worktree-local` obsoleta, pendiente de borrar (`git branch -D worktree-local`).
- Sin `.worktrees/` (eliminado; solo reaparece si se usa `/worktree`). `node_modules/` instalado; `dist/` no generado.

## Skills y comandos repo-locales (`.opencode/`)

- `/spec` → skill `spec`: genera plan en `specs/<NNN>-<nombre>-spec.md` (menor `NNN` libre desde `001`, reutilizando huecos; cabecera `Estado/Depende de/Fecha/Descripción`, `Estado: Borrador`, sección alcance entra/no-entra, futuros specs, checklist final con checkboxes; solo lectura, sin tocar código).
- `/spec-impl` → skill `spec-impl`: implementa un spec `Aprobado` paso a paso **en rama local** (`git switch -c <NNN>-<nombre>` con el código del spec, desde la rama actual, arrastra cambios sin commitear; pausa por paso sin opciones, commits manuales del usuario; checklist final sin auto-marcar, la marca el usuario a mano).
- `/worktree` → `.opencode/commands/worktree.md`: crea worktree + rama sin cambiar de rama. Sin worktrees activos ahora.
- Skill `react-docs`: consultar `es.react.dev` (con URL citada) siempre que se toque React.

## Gotchas — no romper

- `fetch("../../project.json")` es frágil; lo correcto en Vite es `/project.json`. Si tocas `Proyectos.jsx`, corrígelo a ruta absoluta.
- SPA en Netlify: solo vale `public/_redirects` (`/* /index.html 200`). `src/_redirects` es duplicado ignorado — no editar ni borrar `public/_redirects`.
- `vite.config.js` es mínimo (`plugins:[react()]`); no añadir alias/base sin motivo.
- `index.html`: conserva `gtag G-ZQXX3KJ4TC`, favicon `devchallenges.png` y entry `/src/main.jsx`.
- Deps `@emotion/*`, `@fontsource/roboto` instaladas pero no importadas; `count` en `App.jsx` sin usar; efecto nieve en `app.scss` usa URLs `http://` externas. No reintroducir ni ampliar esa deuda.
