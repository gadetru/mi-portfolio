# Fix errores heredados + limpieza completa (lint, fetch, nieve, higiene)
Estado: aprobado

## 1. Objetivo / No-objetivos
- Objetivo: dejar `npm run lint` en verde (14 errors actuales → 0) y corregir bugs runtime/deuda heredada sin cambiar el diseño visual: `fetch` frágil, rutas `img`, `<a>` anidado + `target=blank`, paginación `1/0`, `rel noopener`, nieve `http://`, redirects duplicado, favicon, `lang`, deps muertas, imports muertos.
- No-objetivos: no se cambia el grid `box1-box7` ni el layout 2 columnas (`1fr 2fr`); no se reordena Skills ni se tocan tags/valores de `project.json` (solo prefijo de ruta); no se añade router, store, tests ni typecheck; no se rediseñan cards ni filtro; no se cambia `vite.config.js` ni `gtag`.

## 2. Contexto arquitectura (App.jsx, boxes, filtro, project.json, scss)
- Entrada `src/main.jsx:5` → `src/App.jsx:13-28`. `App.jsx:15` levanta único estado global `filtro`, lo pasa a `Filtrado onFilterChange={setFiltro}` (`src/App.jsx:26`, `box5`) y a `Proyectos filtro={filtro}` (`src/App.jsx:27`, `box6`). Grid `box1-box7` en `src/app.scss:133-182`; a `<=720px` todo apilado a 1 columna (`src/app.scss:184-232`). Este spec no altera el grid.
- Flujo filtro: `Filtrado.jsx:8-11` estado local + `onFilterChange(tag)` → `Proyectos.jsx:45-47` `projects.filter(p => p.tag.includes(filtro))` substring case-sensitive (`maquetado, React, JS, node`).
- Paginación: `itemsPerPage 1/2/3/4` según `window.innerWidth <=480/800/1200` con listener `resize` + cleanup (`Proyectos.jsx:16-42`); `totalPages = ceil(filtrados/itemsPerPage)` (`Proyectos.jsx:50`), reset a `1` si queda fuera de rango (`Proyectos.jsx:53-57`).
- Datos: `fetch("../../project.json")` (`Proyectos.jsx:62`) sobre `public/project.json:1-84` (9 items, `tag`, `url_imagen "./img/..."`, `url_github`, `url_despliegue`). Imágenes build en `public/img/` (11) vs iconos UI en `src/img/` (30).
- Estilos: un `.scss` por componente + variables/grid en `src/app.scss:1-7` (`$Gray-1, $Gray-2, $Gray-3, $Gray-4, $Blue-1, $fondo-1`). Fuente Montserrat local (`src/app.scss:10-13`). Nieve animada `body:before/after` + `.more-snow` (`src/app.scss:47-109`) con `MOVE-BG`.
- Lint actual (`npm run lint`): 14 errors, 0 warnings — `App.jsx:14` (2), `Hobbies.jsx:1` (1), `Experiencia.jsx:1` (1), `Filtrado.jsx:1,4` (2), `Footer.jsx:1,10,13` (3), `Skills.jsx:1` (1), `Perfil.jsx:1,3` (2), `Proyectos.jsx:1,8` (2).

## 3. Requisitos funcionales + no-funcionales
- RF1 Lint: `npm run lint` pasa con cero warnings/errors (`--max-warnings 0`).
  - RF1.1 Quitar `import React` muerto en 7 ficheros (jsx-runtime): `Hobbies.jsx:1`, `Experiencia.jsx:1`, `Filtrado.jsx:1`, `Footer.jsx:1`, `Skills.jsx:1`, `Perfil.jsx:1`, `Proyectos.jsx:1`.
  - RF1.2 Quitar `count/setCount` sin usar (`App.jsx:14`).
  - RF1.3 Quitar `perfil2` sin usar (`Perfil.jsx:3`, `yomismo.webp`).
  - RF1.4 Validar props: `Filtrado onFilterChange:func.isRequired`, `Proyectos filtro:string` (añadir dependencia `prop-types`).
  - RF1.5 `Footer.jsx:10,13` añadir `rel="noreferrer noopener"` a `target="_blank"`.
- RF2 Datos robustos:
  - RF2.1 `fetch("/project.json")` absoluto + `try/catch` + estados `loading`/`error` (sin pantalla en blanco ante 404/red).
  - RF2.2 `public/project.json` 9x `"./img/..."` → `"/img/..."`.
- RF3 Card Proyectos válida (`Proyectos.jsx:78-102`):
  - RF3.1 Exterior `<a>` → `<article>`/`<div>`; dos enlaces separados Web (`url_despliegue`) y Código (`url_github`) con `target="_blank" rel="noreferrer noopener"` (corrige `target="blank"` sin `_` y `<a>` dentro de `<a>`).
  - RF3.2 `key` única solo en el padre (hoy duplicada en 83 y 84); `<br></br>` → `<br/>`, `<img></img>` self-close; `alt="alante"` → `"siguiente"`.
  - RF3.3 Si `filtrados.length === 0`, mostrar `0 / 0` (o mensaje "Sin resultados") y deshabilitar ambos botones; no mostrar `1 / 0`.
- RF4 Higiene:
  - RF4.1 Borrar `src/_redirects` (duplicado ignorado); no tocar `public/_redirects` (`/* /index.html 200`).
  - RF4.2 Favicon: mover `devchallenges.png` de raíz a `public/devchallenges.png` y usar `/devchallenges.png` en `index.html:5`.
  - RF4.3 `index.html:2` `lang="en"` → `"es"`.
  - RF4.4 Desinstalar `@emotion/react`, `@emotion/styled`, `@fontsource/roboto`.
- RF5 Nieve: eliminar bloque `src/app.scss:20-111` (efecto + `@import Merienda One` sin usar) y volver a fondo plano `$fondo-1`.
- RNF1 Sin cambios de grid/columnas ni de anchos de cards (`25/33/50/95%` en `proyecto.scss:43,187,197,224`) ni de `itemsPerPage 1/2/3/4`.
- RNF2 Verificación = `npm run lint` cero warnings + `npm run build` (`dist/` OK). Sin tests ni typecheck en este repo.
- RNF3 Sin regresión visual en desktop ni a `<=720px`; sin warnings mixed-content en consola.

## 4. Diseño (componentes, props/estado, estilos, datos, responsive)
- Componentes a tocar (sin crear ninguno):
  - `App.jsx`: solo borrar `count`; `useState` se conserva para `filtro`.
  - `Filtrado.jsx`: quitar `import React`, añadir `propTypes { onFilterChange: func.isRequired }`; estado local y 5 botones/tags intactos.
  - `Proyectos.jsx`: quitar `import React`; añadir `propTypes { filtro: string }` + default `""`; fetch absoluto con `loading/error`; `article` + 2 enlaces; fix paginación vacía.
  - `Footer.jsx`: quitar `import React`, añadir `rel` a los 2 enlaces.
  - `Perfil.jsx`: quitar `import React` y `perfil2`; render con `perfil1` intacto.
  - `Skills.jsx`, `Hobbies.jsx`, `Experiencia.jsx`: solo quitar `import React`.
- Props/estado: ningún estado nuevo en `App.jsx`; ningún cambio de firma salvo añadir `propTypes`. Nueva dependencia runtime: `prop-types`.
- Estilos: reutilizar variables existentes; ningún `.scss` nuevo. Editar solo `src/app.scss` (borrar nieve) y `Proyectos.jsx` (cambio de tag exterior; clases `projectos-card`, `enlaces`, `botones-paginas` reutilizadas). `skills.scss`, `filtrado.scss`, `footer.scss`, `perfil.scss` intactos.
- Datos: `project.json` solo cambia prefijo de `url_imagen`; tags y resto de campos intactos. `fetch` a `/project.json`.
- Responsive: `itemsPerPage` y breakpoints de cards (`<=480/800/1200`) intactos; comportamiento `<=720px` del grid intacto.
- Qué NO se toca (gotchas `AGENTS.md`): `fetch` solo se vuelve absoluto (no se pasa a import estático); `public/_redirects` único válido (`src/_redirects` se borra, no se edita el válido); `vite.config.js` mínimo intacto; `index.html` conserva `gtag G-ZQXX3KJ4TC` y entry `/src/main.jsx`; no reintroducir `@emotion/*`, `@fontsource/roboto`, `count`, nieve `http://`.

## 5. Criterios de aceptación verificables
- [ ] `npm run lint` → 0 errors, 0 warnings.
- [ ] `npm run build` genera `dist/` sin errores; `npm run preview` sirve la app.
- [ ] En `http://localhost:5173`: filtro Maquetación/React/JS/Node/Todo filtra y pagina (`‹ actual/total ›`); con filtro sin resultados muestra estado vacío coherente (no `1 / 0`).
- [ ] Network: `GET /project.json` 200 y `GET /img/*.webp|png` 200 en dev y preview; imágenes de cards visibles.
- [ ] Clic en card Web abre despliegue y clic en Código abre GitHub, cada uno en pestaña nueva con `rel` correcto; sin `<a>` anidado en el DOM.
- [ ] Consola sin mixed-content ni 404 de `devchallenges.png`, `project.json` o nieve; favicon visible.
- [ ] `public/_redirects` intacto con `/* /index.html 200`; `src/_redirects` no existe.
- [ ] `lang="es"` en `index.html`; nieve/Merienda eliminadas (fondo plano); grid `box1-box7` sin regresión en desktop y `<=720px`.

## 6. Plan de tareas
1. `src/App.jsx` — quitar `count/setCount` (conservar `useState` para `filtro`).
2. Quitar `import React` muerto en `Hobbies.jsx`, `Experiencia.jsx`, `Filtrado.jsx`, `Footer.jsx`, `Skills.jsx`, `Perfil.jsx`, `Proyectos.jsx` + `perfil2` en `Perfil.jsx:3`.
3. `package.json` — añadir `prop-types`; declarar `propTypes` en `Filtrado.jsx` y `Proyectos.jsx`.
4. `Footer.jsx` — `rel="noreferrer noopener"` en LinkedIn/GitHub.
5. `Proyectos.jsx` — `fetch("/project.json")` + `loading/error`; `article` + enlaces Web/Código `_blank+rel`; `key` única; `br/img` self-close; fix `totalPages 0`.
6. `public/project.json` — 9 rutas `./img/` → `/img/`.
7. Higiene — borrar `src/_redirects`; mover favicon a `public/` + `href="/devchallenges.png"`; `lang="es"`; `npm uninstall @emotion/react @emotion/styled @fontsource/roboto`.
8. `src/app.scss` — eliminar bloque nieve 20-111 + Merienda.
9. Verificación = `npm run lint` (cero warnings) + `npm run build` (`dist/` OK) + comprobación visual desktop/`<=720px`. Sin tests ni typecheck en este repo.

## 7. Verificación (lint cero warnings + build dist/)
- `npm run lint` → `eslint . --ext js,jsx --report-unused-disable-directives --max-warnings 0` sin errors/warnings.
- `npm run build` → `vite build` genera `dist/` correctamente.
- Visual en `http://localhost:5173` + `npm run preview`: filtro, paginación, estado vacío, enlaces, favicon, consola limpia.

## 8. Riesgos / No romper (ver paso 3)
- `prop-types` es dependencia nueva: riesgo mínimo (solo validación dev); alternativa sin dep sería `eslint-disable`, peor.
- Cambiar `./img/` → `/img/` asume despliegue en raíz de Netlify (caso actual `portfolio-gabriel-delgado.netlify.app/`); con `base` custom habría que usar `import.meta.env.BASE_URL` — no es el caso (`vite.config.js` mínimo).
- Mover favicon cambia `index.html:5`; conservar `gtag`, entry y resto.
- Borrar nieve cambia el fondo visible (de animado a plano): cambio estético intencional aprobado en interrogatorio; avisar en PR.
- No tocar `public/_redirects`, `vite.config.js`, tags de `project.json` ni reintroducir deuda (`@emotion`, `count`, `http`).

## Preguntas abiertas
- ¿Se quiere mensaje "Sin resultados" con estilo de card o basta con `0 / 0` + botones deshabilitados?
- Tras desinstalar `@emotion`/`@fontsource`, ¿`npm install` + `package-lock.json` se commitea en el mismo paso o separado?

## 9. Checklist verificación
- [ ] `npm run lint` → 0 errors, 0 warnings
- [ ] `npm run build` genera `dist/` sin errores; `npm run preview` sirve la app
- [ ] En `http://localhost:5173`: filtro Maquetación/React/JS/Node/Todo filtra y pagina (`‹ actual/total ›`); con filtro sin resultados muestra estado vacío coherente (no `1 / 0`)
- [ ] Network: `GET /project.json` 200 y `GET /img/*.webp|png` 200 en dev y preview; imágenes de cards visibles
- [ ] Clic en card Web abre despliegue y clic en Código abre GitHub, cada uno en pestaña nueva con `rel` correcto; sin `<a>` anidado en el DOM
- [ ] Consola sin mixed-content ni 404 de `devchallenges.png`, `project.json` o nieve; favicon visible
- [ ] `public/_redirects` intacto con `/* /index.html 200`; `src/_redirects` no existe
- [ ] `lang="es"` en `index.html`; nieve/Merienda eliminadas (fondo plano); grid `box1-box7` sin regresión en desktop y `<=720px`
- [ ] lint cero warnings
- [ ] build genera dist/
