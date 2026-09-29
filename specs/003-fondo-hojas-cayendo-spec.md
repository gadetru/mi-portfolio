# Fondo dinámico de hojas otoñales 3D con colisión
Estado: aprobado
Depende de: specs/002-fix-errores-heredados-limpieza-spec.md (parte del fondo plano limpio que dejó 002; reintroduce fondo animado sobre esa base)
Fecha de creación: 2026-09-29
Descripción: fondo dinámico de 12–15 hojas otoñales con caída y rotación 3D sobre toda la página, con repelencia al paso del ratón y respeto a `prefers-reduced-motion`. Sin jQuery, sin URLs externas, sin estado nuevo en `App.jsx`.

## 1. Objetivo
Dotar a la SPA de un fondo dinámico otoñal (hojas cayendo con rotación 3D + colisión con el ratón) sin tocar layout, datos ni flujo del filtro, y sin reintroducir la deuda eliminada en 002.

## 2. Alcance (entra / no entra)
Entra:
- Capa `fixed` de 12–15 hojas CSS (tonos otoñales) sobre toda la página, detrás de las cards.
- Caída + rotación 3D con `@keyframes` y parámetros aleatorios por hoja (posición, tamaño, velocidad, fase).
- Colisión/repelencia al `mousemove` (JS en componente autónomo; hojas con `pointer-events: none`).
- Respeto a `prefers-reduced-motion` (animación desactivada).
- Montaje de `<Hojas/>` en `App.jsx` sin estado nuevo.
No entra:
- Fondo estático de bosque/árboles (a futuros specs; probar gradiente+siluetas CSS e imagen local).
- Variantes estacionales (nieve, flores, pétalos).
- Botón on/off ni preferencias persistidas.
- Cambios en grid `box1-box7`, filtro, paginación, `project.json`, `fetch`, `_redirects`, `vite.config.js`, `index.html`.
- jQuery, nuevas dependencias, URLs `http://` externas.

## 3. Contexto arquitectura (App.jsx, boxes, filtro, project.json, scss)
- Entrada `src/main.jsx:5` → `src/App.jsx:13-28`. `App.jsx:14` único estado global `filtro`; grid `box1-box7` en `src/app.scss:38-87`, a `<=720px` todo apilado (`src/app.scss:89-138`). Este spec no altera el grid ni el flujo `Filtrado onFilterChange -> Proyectos tag.includes(filtro)`.
- Fondo actual plano `$fondo-1` (`src/app.scss:20-26`) tras eliminar la nieve en 002. Las hojas viven en una capa propia, no en `body:before/after`.
- Sin assets de hojas: `public/img/` (11 capturas de proyectos) y `src/img/` (iconos UI) no tienen nada reutilizable; las hojas son CSS puras.
- Referencia: plugin jQuery `octoberLeaves` (sprite `leaves.png` + transforms CSS3 3D, ~15 hojas, velocidad/rotación/tamaño configurables, métodos start/stop) — se reimplementa sin jQuery para React 18 + Vite.

## 4. Requisitos funcionales + no-funcionales
- RF1 12–15 hojas visibles cayendo en bucle sobre toda la página (dev y preview).
- RF2 Rotación 3D (`rotateX/rotateY`) + caída vertical con deriva lateral; parámetros aleatorios por hoja.
- RF3 Repelencia al ratón sin bloquear clics (`pointer-events: none` en hojas; cálculo en `window mousemove` con cleanup).
- RF4 `prefers-reduced-motion: reduce` desactiva la animación.
- RF5 `<Hojas/>` sin props; `App.jsx` sin estado nuevo.
- RNF1 `npm run lint` cero warnings + `npm run build` (`dist/` OK). Sin tests ni typecheck en este repo.
- RNF2 Sin regresión visual en desktop ni a `<=720px`; consola sin mixed-content ni 404; sin jQuery ni peticiones externas.

## 5. Criterios de aceptación verificables
- En dev y preview se ven 12–15 hojas otoñales cayendo en bucle sobre toda la página.
- Las hojas rotan en 3D (flip) mientras caen, con trayectorias no idénticas.
- Al mover el ratón las hojas cercanas se repelen; filtro, paginación, cards y enlaces siguen clicables.
- Con `prefers-reduced-motion` no hay animación.
- Grid `box1-box7` sin regresión en desktop y `<=720px`.
- Consola sin mixed-content ni 404; sin jQuery ni peticiones externas.

## 6. Diseño (componentes, props/estado, estilos, datos, responsive)
- Crear `src/components/hojas/Hojas.jsx` (autónomo, sin props): genera las hojas y registra `mousemove` en `window` con cleanup (`es.react.dev/reference/react/useEffect`).
- Crear `src/components/hojas/hojas.scss` (convención: un `.scss` por componente): `@keyframes` de caída 3D, tonos otoñales (ocres/naranjas/marrones), capa `position: fixed; inset: 0` con `z-index` intermedio (detrás del contenido, delante del fondo), `pointer-events: none`, y `@media (prefers-reduced-motion: reduce)` sin animación.
- `src/App.jsx`: solo monta `<Hojas/>`; sin estado nuevo.
- Datos: no se tocan (`project.json`, tags, `fetch` intactos). Responsive: nº de hojas fijo en desktop y móvil en este spec.
- Qué NO se toca (gotchas `AGENTS.md`): `fetch("/project.json")`, `public/_redirects` único válido, `vite.config.js` mínimo, `index.html` (`gtag G-ZQXX3KJ4TC`, favicon, entry `/src/main.jsx`), no reintroducir deuda (`@emotion/*`, `@fontsource/roboto`, `count` sin usar, nieve con URLs `http://`).

## 7. Plan de tareas
1. `src/components/hojas/hojas.scss` — keyframes caída 3D, variantes por hoja, tonos otoñales, `reduced-motion`, `z-index` intermedio.
2. `src/components/hojas/Hojas.jsx` — render de 12–15 hojas + `useEffect` con `mousemove`/colisión y cleanup.
3. `src/App.jsx` — montar `<Hojas/>` sin estado nuevo.
4. Verificación = `npm run lint` (cero warnings) + `npm run build` (`dist/` OK) + comprobación visual desktop/`<=720px` y consola limpia. Sin tests ni typecheck en este repo.

## 8. Verificación (lint cero warnings + build dist/)
- `npm run lint` → `eslint . --ext js,jsx --report-unused-disable-directives --max-warnings 0` sin errors/warnings.
- `npm run build` → `vite build` genera `dist/` correctamente.
- Visual en `http://localhost:5173` + `npm run preview`: hojas visibles, colisión al ratón, `reduced-motion`, sin regresión del grid, consola limpia.

## 9. Riesgos / No romper
- La colisión exige JS: ya no es CSS 100% puro (ajuste frente a la 1ª ronda del interrogatorio); el JS vive solo en `Hojas.jsx`, `App.jsx` sigue sin lógica nueva.
- 12–15 nodos animados: coste GPU moderado; si hay jank en móvil, un futuro spec puede reducir densidad por viewport.
- `z-index`: las hojas quedan entre fondo y contenido; no deben tapar `.botonera-filtro`, paginador ni footer.
- No tocar `public/_redirects`, `vite.config.js`, `index.html`, tags de `project.json` ni reintroducir deuda (`jQuery`, `@emotion`, `count`, `http`).

## 10. Futuros specs (mejoras detectadas, errores extra, ideas — no entran aquí)
- Fondo estático de bosque detrás de las hojas (probar gradiente+siluetas CSS e imagen local `public/img/bosque.webp`); tonos otoñales ya fijados en este spec.
- Variantes estacionales (nieve, flores, pétalos) con posible cambio de fondo por época.
- Toggle on/off de la animación y preferencias persistidas del visitante.

## Preguntas abiertas
- ¿Repelencia o también arrastre/succión al pasar el ratón?
- ¿Reducir densidad a `<=720px` si hay jank, o mantener 12–15 fijas?

## 11. Checklist verificación (última, checkboxes listos para /verifier)
- [ ] En dev y preview se ven 12–15 hojas otoñales cayendo en bucle sobre toda la página
- [ ] Las hojas rotan en 3D (flip) mientras caen, con trayectorias no idénticas
- [ ] Al mover el ratón las hojas cercanas se repelen; filtro, paginación, cards y enlaces siguen clicables
- [ ] Con `prefers-reduced-motion` no hay animación
- [ ] Grid `box1-box7` sin regresión en desktop y `<=720px`
- [ ] Consola sin mixed-content ni 404; sin jQuery ni peticiones externas
- [ ] `npm run lint` → 0 errors, 0 warnings
- [ ] `npm run build` genera `dist/` sin errores; `npm run preview` sirve la app
