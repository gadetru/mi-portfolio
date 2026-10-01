# Hojas por delante de las cards con misma repelencia
Estado: aprobado
Depende de: specs/003-fondo-hojas-cayendo-spec.md + specs/004-aspecto-visual-cards-spec.md (asume capa única z:0, repelencia por mousemove y paleta otoñal de 003; convive con velo bosque + cards oscuras con blur de 004 sin taparlas ni romper clics)
Fecha de creación: 2026-10-01
Descripción: De las 14 hojas actuales, 2-3 elegidas al azar en cada carga (1-2 en móvil <=720px) pasan por delante de las cards con efecto profundidad sutil, manteniendo caída, giro 3D y repelencia al ratón sin bloquear clics.

## 1. Objetivo
Dar profundidad a la escena otoñal haciendo que 2-3 hojas aleatorias de las 14 existentes caigan por delante de las cards en vez de todas por detrás, conservando la misma caída, giro 3D, colores y repelencia al ratón, sin tocar layout, filtro, paginación, datos ni estado global.

## 2. Alcance (entra / no entra)
Entra:
- Desdoblar la capa única en dos capas `fixed`: atrás (`z-index:0`) + frente (`z-index:2`, por encima de `.grid-container-1 z:1`), ambas con `pointer-events:none`.
- Sorteo aleatorio al montar (`useMemo` local en `Hojas.jsx`): 2-3 IDs al frente en desktop, 1-2 si `matchMedia('(max-width: 720px)')`; cada recarga cambia cuáles.
- Efecto profundidad sutil solo en frontales: mismo color/animación, tamaño +15-20% y opacidad 0.9-1.
- Repelencia idéntica delante/detrás: mismo listener `window mousemove + rAF` recorriendo ambas capas y escribiendo `--mx/--my`.
- `prefers-reduced-motion: reduce` oculta ambas capas.
No entra:
- Cambiar caída (`hoja-caida`), giro 3D (`hoja-giro`), deriva, duraciones, retardos ni paleta `COLORES_OTONO`.
- Cambiar `NUM_HOJAS=14` total ni densidad por viewport más allá del reparto 2-3/1-2.
- Cambios en grid `box1-box7`, apilado `<=720px`, `itemsPerPage 1/2/3/4` ni breakpoints de cards `<=480/800/1200`.
- Nuevo estado en `App.jsx`, nuevas props en `Hojas` ni cambios en `Perfil, Skills, Hobbies, Experiencia, Filtrado, Proyectos, Footer`.
- Cambios en `public/project.json`, tags (`maquetado, React, JS, node`, case-sensitive), `fetch`, filtro por substring ni paginación.
- Toggle on/off, persistencia, sombras extra en frontales, variantes estacionales.
- Tocar `public/_redirects`, `src/_redirects`, `vite.config.js`, `index.html`, añadir dependencias o URLs externas, reintroducir deuda (`@emotion/*`, `@fontsource/roboto`, `count` sin usar, nieve con URLs `http://`).

## 3. Contexto arquitectura (App.jsx, boxes, filtro, project.json, scss)
- Entrada `src/main.jsx` → `src/App.jsx:14` único estado `filtro`; grid `box1-box7` en `src/app.scss:57-106`, a `<=720px` apilado 1 columna (`src/app.scss:108-157`). Este spec no altera grid ni flujo `Filtrado onFilterChange -> Proyectos tag.includes(filtro)` (`src/App.jsx:26-27`).
- `<Hojas/>` montado sin props en `src/App.jsx:20`; sin estado nuevo en este spec.
- Hojas actuales: `src/components/hojas/Hojas.jsx:4` `NUM_HOJAS=14`; `src/components/hojas/Hojas.jsx:8-17` `COLORES_OTONO`; `src/components/hojas/Hojas.jsx:21-33` `crearHojas` (x, tam 14-28, durCaida 9-16s, deriva 30-80px, opacidad 0.7-0.95); `src/components/hojas/Hojas.jsx:37` `useMemo`; `src/components/hojas/Hojas.jsx:39-95` `useEffect` con `mousemove + rAF` y cleanup; `src/components/hojas/Hojas.jsx:98-131` render capa única.
- Estilos actuales: `src/components/hojas/hojas.scss:5-12` capa `fixed inset:0, z-index:0, pointer-events:none`; `src/components/hojas/hojas.scss:15-18` grid `z-index:1`; `src/components/hojas/hojas.scss:22-30` `.hoja` con `--mx/--my`; `src/components/hojas/hojas.scss:33-40` caída; `src/components/hojas/hojas.scss:44-58` figura; `src/components/hojas/hojas.scss:60-94` keyframes; `src/components/hojas/hojas.scss:97-101` `reduced-motion display:none`.
- Fondo bosque con velo + cards oscuras translúcidas con blur de 004 (`src/app.scss:13-21` variables, `src/app.scss:34-45` body). Las frontales deben fundirse sin reintroducir blanco puro ni sombras para fondo claro.
- Datos intactos: `public/project.json` 9 proyectos; `fetch` en ruta absoluta; no se toca.

## 4. Requisitos funcionales + no-funcionales
- RF1 Total 14 hojas en bucle; 2-3 al frente en desktop y 1-2 con `max-width:720px`, resto detrás; sorteo al montar, cambia por recarga.
- RF2 Frontales con misma caída/giro/deriva/colores; solo tamaño +15-20% y opacidad 0.9-1.
- RF3 Repelencia (`RADIO_REPELENCIA=120`, `FUERZA_MAX=60`) idéntica en ambas capas; `pointer-events:none` en capas y hojas; filtro, paginador, cards y enlaces siguen clicables.
- RF4 `prefers-reduced-motion: reduce` sin animación (ambas capas ocultas).
- RF5 `<Hojas/>` sin props; `App.jsx` sin estado nuevo.
- RNF1 `npm run lint` cero warnings + `npm run build` (`dist/` OK). Sin tests ni typecheck en este repo.
- RNF2 Sin regresión visual desktop ni `<=720px`; consola sin mixed-content ni 404; sin jQuery ni peticiones externas.
- RNF3 Coste GPU contenido: 14 nodos como en 003; frontales no añaden nodos nuevos, solo reparten.

## 5. Criterios de aceptación verificables
- CA1 En dev y preview se ven 2-3 hojas cruzando por delante de las cards (1-2 a `<=720px`) y el resto por detrás, en bucle continuo.
- CA2 Las frontales se distinguen por profundidad sutil (ligeramente mayores/más opacas) pero con misma paleta, caída y giro que las traseras.
- CA3 Al mover el ratón, frontales y traseras se repelen igual; filtro, paginación, cards y enlaces siguen clicables sin puntos muertos.
- CA4 Recargar cambia qué hojas van delante (aleatorio por carga).
- CA5 Con `prefers-reduced-motion` no hay hojas visibles ni animación.
- CA6 Grid `box1-box7` sin regresión en desktop y `<=720px`; filtrado y paginación funcionan igual.

## 6. Diseño (componentes, props/estado, estilos, datos, responsive)
- Componentes a tocar: solo `src/components/hojas/Hojas.jsx` (reparto + doble capa + repelencia sobre ambas) y `src/components/hojas/hojas.scss` (capas, z-index, variante frontal). `src/App.jsx` no cambia (ya monta `<Hojas/>`).
- Props/estado: sin props nuevas; selección frontal en `useMemo` local + `useRef` de capa/s; `useEffect` con `mousemove` en `window` y cleanup (`es.react.dev/reference/react/useEffect`); `matchMedia('(max-width: 720px)')` al montar para decidir 2-3 vs 1-2. `App.jsx` sin estado nuevo.
- Estilos: `.hojas-capa-atras {position:fixed; inset:0; z-index:0}` + `.hojas-capa-frente {position:fixed; inset:0; z-index:2}` (grid sigue en `z-index:1`); ambas `overflow:hidden; pointer-events:none; perspective:600px`; `.hoja, .hoja-caida, .hoja-figura`, keyframes y `transition transform 0.3s` reutilizados; variante frontal con `--tam` mayor y `--opacidad` alta; `@media (prefers-reduced-motion: reduce)` oculta ambas.
- Datos: no se tocan `project.json`, tags, `fetch` ni imágenes `public/img/`.
- Responsive: no se alteran grid, `itemsPerPage` ni breakpoints de cards; solo el reparto frontal se reduce a 1-2 a `<=720px` por rendimiento con blur de 004. Verificar a `480/800/1200/720`.
- Qué NO se toca (gotchas `AGENTS.md`): `fetch("/project.json")`, `public/_redirects` único válido (`src/_redirects` ignorado), `vite.config.js` mínimo, `index.html` (`gtag G-ZQXX3KJ4TC`, favicon `devchallenges.png`, entry `/src/main.jsx`), no reintroducir deuda (`@emotion/*`, `@fontsource/roboto`, `count` sin usar, nieve con URLs `http://`).

## 7. Plan de tareas
1. `src/components/hojas/hojas.scss` — desdoblar en capa atrás/frente con `z-index 0/2`, `pointer-events:none`, variante profundidad frontal y `reduced-motion` para ambas.
2. `src/components/hojas/Hojas.jsx` — sorteo 2-3 (1-2 en móvil) en `useMemo`, render en dos capas fijas y repelencia `mousemove+rAF` sobre ambas con cleanup.
3. Verificación = `npm run lint` (cero warnings) + `npm run build` (`dist/` OK) + comprobación visual en dev y preview (desktop y `<=720px`): frontales visibles, repelencia igual, clics intactos, aleatorio por recarga, `reduced-motion`, consola limpia. Sin tests ni typecheck en este repo.

## 8. Verificación (lint cero warnings + build dist/)
- `npm run lint` → `eslint . --ext js,jsx --report-unused-disable-directives --max-warnings 0` sin errors/warnings.
- `npm run build` → `vite build` genera `dist/` correctamente; `npm run preview` sirve la app con doble capa.
- Visual en `http://localhost:5173` + preview: CA1-CA6 cumplidos, consola sin mixed-content ni 404.

## 9. Riesgos / No romper
- `z-index:2` por encima del contenido: si pierde `pointer-events:none` bloquearía filtro/paginación/enlaces; mantener `none` en capas y hojas.
- Frontales sobre cards oscuras con blur (004): sin borde/sombra nueva para no reintroducir efecto recorte ni sombras para fondo claro.
- Sorteo en `useMemo` corre en render: mantener puro y estable por montaje para no re-sortear en cada render ni romper `lint react-hooks`.
- `matchMedia` en montaje: proteger SSR/no-window aunque sea SPA Vite, y no añadir listener `resize` si no hace falta.
- No tocar `fetch`, `_redirects`, `vite.config.js`, `index.html` ni reintroducir `jQuery/@emotion/http`.

## 10. Futuros specs (mejoras detectadas, errores extra, ideas — no entran aquí)
- Toggle on/off de hojas con persistencia, detectado en interrogatorio de este spec.
- Densidad total adaptativa por viewport (menos de 14 en móvil si hay jank con blur), detectado en `src/components/hojas/Hojas.jsx:4`.
- Sombra de profundidad o blur leve solo en frontales, detectado en `src/components/hojas/hojas.scss:48-49`.
- Variantes estacionales (nieve/flores) manteniendo doble capa, continuación de `specs/003-fondo-hojas-cayendo-spec.md`.
- Arrastrar/succionar además de repeler al pasar el ratón, pregunta abierta de `specs/003-fondo-hojas-cayendo-spec.md:77`.

## Preguntas abiertas
- ¿`z-index:2` fijo para frente o token/variable compartida con `app.scss`?
- ¿Aumento frontal fijo (+18%) o rango propio (p. ej. 20-32px) derivado de `tam`?
- ¿Sorteo solo al montar o re-sorteo temporizado sin recarga?

## 11. Checklist verificación (última, checkboxes listos para /verifier)
- [x] CA1 En dev y preview se ven 2-3 hojas por delante (1-2 a <=720px) y resto detrás en bucle
- [x] CA2 Frontales con profundidad sutil, misma paleta/caída/giro que traseras
- [x] CA3 Repelencia igual delante/detrás; filtro, paginación, cards y enlaces clicables
- [x] CA4 Recargar cambia qué hojas van delante
- [x] CA5 Con prefers-reduced-motion no hay hojas ni animación
- [x] CA6 Grid box1-box7 sin regresión desktop y <=720px; filtro y paginación iguales
- [x] `npm run lint` → 0 errors, 0 warnings
- [x] `npm run build` genera `dist/` sin errores; `npm run preview` sirve doble capa
