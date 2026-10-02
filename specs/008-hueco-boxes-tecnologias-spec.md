# Hueco entre boxes al desplegar Tecnologías: botonera por categoría + equilibrio con Experiencia

Estado: aprobado
Depende de: Ninguno
Fecha de creación: 2026-10-02
Descripción: Eliminar el hueco de fondo que queda bajo el box4 al desplegar Tecnologías sustituyendo el toggle global por una botonera de 8 categorías que muestra una sola a la vez a todo el ancho en vertical, y reequilibrar el box4 Experiencia para que entre los boxes solo quede el gap original del grid.

## 1. Objetivo

- Al desplegar `Tecnologías` ya no se muestran las 8 categorías (~31 items) de golpe: se ve una botonera compacta de 8 botones (uno por categoría) y, al pulsar uno, solo sus items ocupan todo el ancho del box en vertical.
- Pulsar el botón activo lo cierra (todo colapsado); pulsar otro cambia el panel. Así la columna izquierda (`box2` Skills + `box3` Hobbies) deja de desbordar a la derecha y entre los boxes superiores y `box5` Filtro solo queda el gap original (`20px` desktop, `10px` en `<=720px`).
- Reequilibrar el `box4` Experiencia (revisar `max-height: 800px` + scroll interno del spec 007) para que ambas columnas respiren a la misma altura.
- Si la botonera no convence en implementación, alternativa documentada: híbrido con scroll interno en Skills.

## 2. Alcance (entra / no entra)

Entra:

- `Skills.jsx`: sustituye el toggle global `abierta` por botonera de 8 categorías + panel único visible (una categoría a la vez), con estado local al componente y `aria-expanded` por botón.
- `skills.scss`: estilos de botonera (píldoras/botones con variables bosque) + animación de entrada del panel más elaborada que la actual (despliegue lateral o aparición desde esquina, respetando `prefers-reduced-motion`).
- `experiencia.scss`: reajuste de equilibrio (revisar `max-height: 800px`, scroll interno, espaciados) sin cambiar su estructura de secciones del spec 007.
- Comportamiento `<=720px`: todo colapsado de inicio, mismo patrón de botonera.
- Verificación `npm run lint` (cero warnings) + `npm run build` (`dist/` OK) y comprobación visual en navegador (desktop + `<=720px`).

No entra:

- No se cambia la estructura del grid `box1-box7` de `src/app.scss` (mismo número de boxes y columnas; solo estilos internos de `box2`/`box4` y sus gaps originales intactos).
- No se tocan `public/project.json` ni sus tags (`maquetado, React, JS, node`, case-sensitive), ni `itemsPerPage 1/2/3/4` de `Proyectos.jsx`, ni breakpoints de cards (`<=480/800/1200`).
- No se toca `src/App.jsx` (sin estado nuevo), `Perfil`, `Filtrado`, `Hobbies`, `Hojas`, `Footer`, `vite.config.js`, `index.html`, `public/_redirects`.
- No se añaden imágenes ni iconos nuevos: los items sin icono siguen en fallback de texto (spec 007).
- No se elimina el duplicado `src/_redirects` ni se limpia la deuda (`@emotion/*`, `@fontsource/roboto`, `lato` sin importar).

## 3. Contexto arquitectura (App.jsx, boxes, filtro, project.json, scss)

- `src/App.jsx:15` levanta el único estado global `filtro`; `src/App.jsx:22-27` compone el grid `box1-box7` con `Filtrado onFilterChange={setFiltro}` → `Proyectos filtro={filtro}`.
- `src/app.scss:61` define `grid-template-columns: 1fr 2fr`; `src/app.scss:63` `grid-gap: 20px` (gap original desktop); `src/app.scss:97-102` fija `box4` ocupando 2 filas en la columna derecha; `src/app.scss:122-179` apila todo a 1 columna en `<=720px` (gap `10px`).
- `src/components/habilidades/Skills.jsx:26-105` tiene 8 categorías (~31 items) desde el spec 007; `Skills.jsx:107-146` un solo toggle global (`button[aria-expanded]`, `Skills.jsx:115-124`) que las despliega todas de golpe; nace expandido en desktop y colapsado en `<=720px` (`Skills.jsx:108-110`).
- `src/components/habilidades/skills.scss:50-66` animación actual del desplegable (`grid-template-rows 0fr→1fr` + opacidad); `skills.scss:68-78` separadores y títulos por categoría; `skills.scss:80-101` celdas de 85px con icono 48px + texto.
- `src/components/experiencia/experiencia.scss` (spec 007): `.caja-experiencia` con `max-height: 800px` + `overflow-y: auto` solo en desktop y flujo natural en `<=720px`; al ser más bajo que la columna izquierda expandida, la fila del grid crece y queda el hueco de fondo bajo `box4` (visible en la captura del usuario: Idiomas termina y sigue fondo de bosque hasta `box5`).
- `src/components/experiencia/Experiencia.jsx` consume `/experiencia.json` con carga/error (spec 007, pasos 3-4); su estructura de secciones no cambia en este spec.
- `README.md:152` ya listaba como TODO el acordeón por categoría en Skills; el spec 007 lo dejó como futuro (`007-experiencia-cv-spec.md:119`).

## 4. Requisitos funcionales + no-funcionales

Funcionales:

- La card de Skills muestra siempre la botonera de las 8 categorías (Lenguajes, Marcas, Frameworks, Bases de datos, IDEs/entornos, Control de versiones, IA y herramientas, Sistemas operativos).
- Pulsar un botón muestra su panel de items a todo el ancho del box en vertical; solo un panel visible a la vez; pulsar el activo lo cierra.
- Estado inicial: todo colapsado en desktop y en `<=720px` (el usuario aceptó "todas cerradas", pendiente de verificación visual).
- Cada botón lleva `aria-expanded` y `aria-controls` al panel; el panel usa encabezado de categoría.
- El `box4` reequilibrado no deja hueco bajo él: entre boxes superiores y Filtro solo el gap original.

No-funcionales:

- Sin desbordamiento horizontal en ningún ancho; sin solapes con Filtro/Proyectos.
- Accesibilidad: botones operables por teclado, foco visible (reutilizar `outline $bosque-acento`), animación desactivada con `prefers-reduced-motion`, contraste existente conservado.
- Rendimiento: sin imágenes nuevas, sin dependencias nuevas.
- Calidad: `lint` cero warnings + `build` OK; sin tests ni typecheck en este repo.

## 5. Criterios de aceptación verificables

1. Al cargar en desktop (`>720px`) la card de Skills muestra la botonera de 8 categorías sin panel abierto y sin hueco bajo el `box4`: entre boxes superiores y Filtro solo el gap original de `20px`.
2. Al pulsar una categoría, solo sus items se ven a todo el ancho del box en vertical; el resto de botones siguen visibles y cerrados.
3. Pulsar el botón activo cierra el panel (vuelve a botonera sola); pulsar otro botón cambia el panel sin pasar por estado intermedio roto.
4. Cada botón refleja `aria-expanded` (`true`/`false`) acorde a su panel.
5. El panel aparece con animación de entrada (lateral o desde esquina) y con `prefers-reduced-motion` se muestra sin animación.
6. En `<=720px` todo nace colapsado, el patrón de botonera funciona igual y no hay scroll horizontal ni solapes.
7. El `box4` reequilibrado acompaña en altura: con cualquier categoría abierta no aparece hueco de fondo entre `box4` y Filtro mayor que el gap original.
8. `npm run lint` termina con cero warnings.
9. `npm run build` genera `dist/` correctamente.

## 6. Diseño (componentes, props/estado, estilos, datos, responsive)

- Componentes a tocar: solo `Skills.jsx` (el toggle global `abierta`/`setAbierta` se sustituye por estado local de categoría activa: `null` = todo colapsado, o `slug` de la visible; sin props nuevas, sin cambios en `App.jsx`). Mejor práctica aplicable (a responder en implementación con la skill `react-docs`, citando `es.react.dev`): estado local al componente que lo necesita, como ya hacen `Skills` y `Proyectos`.
- `Experiencia.jsx` y `public/experiencia.json` no cambian; solo `experiencia.scss` (revisar `max-height`, paddings y ritmo vertical para equilibrar con la nueva altura compacta de Skills).
- Estilos: reutilizar variables bosque, `radius 24px`/`blur` y celdas 85px existentes; botonera como fila flexible de botones (wrap) con hover/foco coherente con `.tecnologias-toggle`; animación del panel con `transform`/`clip-path` u opacidad+desplazamiento (a elegir en implementación), manteniendo el bloque `prefers-reduced-motion` existente.
- Alternativa documentada (híbrido con scroll): si la botonera no equilibra en revisión visual, panel con `max-height` + `overflow-y: auto` propio en vez de (o además de) una sola categoría visible.
- Responsive: sin cambios en `src/app.scss` (gaps `20px`/`10px` intactos); sin cambios en `itemsPerPage` ni breakpoints. En `<=720px` el mismo patrón naciendo todo colapsado.
- Qué NO se toca (gotchas `AGENTS.md`): `fetch("/project.json")` y `fetch("/experiencia.json")` absolutos; `public/_redirects` único válido; `vite.config.js` mínimo; `index.html` (`gtag G-ZQXX3KJ4TC`, favicon `devchallenges.png`, entry `/src/main.jsx`); no reintroducir deuda documentada.

## 7. Plan de tareas

1. Reescribir `src/components/habilidades/Skills.jsx`: botonera de 8 categorías + panel único con estado local (`null`/slug), `aria-expanded` por botón, todo colapsado de inicio en desktop y `<=720px`.
2. Estilar botonera en `src/components/habilidades/skills.scss` (botones con variables bosque, foco visible, wrap sin desbordamiento).
3. Añadir animación de entrada del panel en `skills.scss` (lateral o desde esquina + respeto a `prefers-reduced-motion`).
4. Reequilibrar `src/components/experiencia/experiencia.scss` (revisar `max-height`/espaciados frente a la nueva altura compacta de Skills).
5. Verificación = `npm run lint` (cero warnings) + `npm run build` (`dist/` OK) + revisión visual desktop y `<=720px` (criterios 1-7). Sin tests ni typecheck en este repo.

## 8. Verificación (lint cero warnings + build dist/)

- `npm run lint`: debe terminar sin warnings ni errores (`--max-warnings 0`).
- `npm run build`: debe generar `dist/` sin errores (lo que se publica en Netlify).
- Navegador: comprobar criterios 1-7 en desktop ancho normal y en `<=720px` (botonera sola al cargar, un solo panel a la vez, cierre al re-pulsar, gap original hasta Filtro, `aria-expanded` correcto).
- Sin tests ni typecheck en este repo.

## 9. Riesgos / No romper

- El panel "a todo el ancho" se refiere al ancho del `box2`; si en implementación se intentara ocupar las 2 columnas del grid habría que tocar `app.scss`/estructura `box1-box7`, fuera del alcance: mantenerlo dentro del box (ver preguntas abiertas).
- Una sola categoría visible puede seguir desbordando si alguna es muy alta (Lenguajes tiene 7 items, IDEs 5): mitigado con la alternativa híbrida con scroll si la revisión visual lo pide.
- Cambiar el estado `abierta` por categoría activa altera el `aria-expanded` global actual: cada botón debe llevar el suyo para no romper accesibilidad.
- Solape con el spec 007 (`Estado: aprobado`, rama `007-experiencia-cv`): este spec se declara sin dependencia por decisión del usuario, pero toca su `Skills.jsx` de 8 categorías y su `experiencia.scss`; implementar sobre la rama que contenga el 007 para no perderlo.
- No tocar `public/_redirects`, `vite.config.js`, `index.html` (gtag, favicon, entry) ni reintroducir deuda documentada en `AGENTS.md`.

## 10. Futuros specs (mejoras detectadas, errores extra, ideas — no entran aquí)

- Panel ocupando las 2 columnas del grid (`grid-column: 1 / -1`) como overlay/sección full-width — detectado en la idea del usuario ("ocupen todo el ancho") vs alcance de este spec (solo ancho del `box2`).
- Persistir la categoría abierta (p. ej. `localStorage`) — detectado al definir estado local efímero en `Skills.jsx:107-110`.
- Acordeón múltiple (varias categorías abiertas a la vez) si una sola se queda corta — alternativa al panel único de `Skills.jsx:125-141`.
- Reordenar Hobbies (`box3`) o moverlo de columna si el equilibrio final lo pide — detectado en `src/app.scss:90-96`.
- Actualizar `README.md:75,114,152` (describe 5 categorías + toggle global + TODO acordeón) tras implementar la botonera — detectado en `README.md:58,75`.

## Preguntas abiertas

- ¿El panel debe ocupar todo el ancho del `box2` o las 2 columnas del grid (`box2+box4`)? En este spec se asume el `box2`; lo otro queda como futuro spec.
- ¿Botonera en fila con wrap o en columna vertical de 8 botones? ¿Los botones llevan icono o solo texto?
- ¿Qué `max-height` final para `box4` (u otra técnica) equilibra mejor con la botonera compacta?
- La decisión "todas cerradas de inicio" está pendiente de verificación visual en implementación.
- ¿La animación lateral puede marear con `Hojas` de fondo? Probar `transform` sutil frente a `clip-path`.

## 11. Checklist verificación (última, checkboxes listos para /verifier)

- [ ] Botonera de 8 categorías visible al cargar, sin panel abierto y sin hueco bajo box4 (gap original hasta Filtro)
- [ ] Una sola categoría visible a la vez a todo el ancho del box en vertical; re-pulsar cierra; cambiar de botón cambia el panel
- [ ] `aria-expanded` por botón acorde a su panel
- [ ] Animación de entrada del panel (y sin animación con `prefers-reduced-motion`)
- [ ] En `<=720px` todo colapsado de inicio, mismo patrón, sin scroll horizontal ni solapes
- [ ] Box4 reequilibrado sin hueco de fondo con cualquier categoría abierta
- [ ] `npm run lint` cero warnings
- [ ] `npm run build` genera `dist/` OK
