# Ampliar sección Tecnologías: Java, OpenCode, C#, .NET
Estado: aprobado

## 1. Objetivo / No-objetivos
- Objetivo: añadir 4 tecnologías (Java, OpenCode, C#, .NET) con sus iconos a la card "Tecnologías:" (`box2`, componente `Skills`), quedando 15 items visibles.
- No-objetivos: no se reordena la lista existente, no se cambian tamaños de celda/icono, no se toca `project.json`/tags, ni `fetch`, ni filtro/paginación, ni `App.jsx`, ni deuda conocida (`alt` duplicado de `Skills.jsx:54`, `@emotion`, `count`, nieve `http://`).

## 2. Contexto arquitectura (App.jsx, boxes, filtro, project.json, scss)
- Solo toca `box2` (Skills, columna izquierda del grid `1fr 2fr` en `src/app.scss:135,147`); a `<=720px` todo se apila a 1 columna (`src/app.scss:184,197`) sin cambios necesarios.
- `src/components/habilidades/Skills.jsx:15-70` renderiza 11 items hardcodeados con el patrón `import PNG de src/img/` + `div > img + p`. Sin props ni estado; `src/App.jsx` no se toca.
- Estilo: `.tecnologias` es flex-wrap con celdas de 85px e iconos mostrados a 48px (`src/components/habilidades/skills.scss:17-38`); la card `.skill` (`height:100%`) crece sola con más contenido.
- Iconos actuales heterogéneos (PNG fondo transparente, 80–750px de fuente; js/html/css/node/mysql/sass/ts a 96–100px). Objetivo nuevos: PNG cuadrado ~96–256px, fondo transparente, pocos KB.
- Flujo `Filtrado onFilterChange -> Proyectos tag.includes(filtro)` y paginación `1/2/3/4` por `window.innerWidth` no afectados. Fuente de datos `public/project.json` intacta.

## 3. Requisitos funcionales + no-funcionales
- RF1: mostrar 4 items nuevos al final de la parrilla (tras Git Hub) con etiquetas exactas `Java`, `OpenCode`, `C#`, `.NET`.
- RF2: cada item con icono (`img`) + `alt` descriptivo (`icono java`, `icono opencode`, `icono csharp`, `icono dotnet`).
- RF3: nuevos PNG en `src/img/` (`java.png`, `opencode.png`, `csharp.png`, `dotnet.png`), mismo patrón de `import` que los 11 actuales.
- RNF1: sin cambios en `skills.scss` (celdas 85px, iconos 48px); si la card necesita más alto, crece por contenido.
- RNF2: verificación `npm run lint` (cero warnings) + `npm run build` (`dist/` OK). Sin tests ni typecheck en este repo.

## 4. Diseño (componentes, props/estado, estilos, datos, responsive)
- Componentes: solo `Skills.jsx`. 4 imports nuevos desde `../../img/` + 4 bloques `div > img + p` al final (tras el bloque Git Hub, `Skills.jsx:61-64`). Sin props/estado nuevos.
- Estilos: reutiliza variables y reglas existentes (`$Gray-1`, `$Gray-2`, `montserrat`); ningún `.scss` nuevo ni modificado.
- Datos: ningún cambio en `project.json`, tags ni `fetch("../../project.json")`.
- Responsive: el flex-wrap reparte los 15 items solo; comportamiento a `<=720px` sin cambios (card a 1 columna).
- Qué NO se toca (gotchas `AGENTS.md`): `fetch` frágil, `public/_redirects` único válido (`src/_redirects` ignorado), `vite.config.js` mínimo, `index.html` (`gtag G-ZQXX3KJ4TC`, favicon `devchallenges.png`, entry `/src/main.jsx`), no reintroducir deuda (`@emotion/*`, `@fontsource/roboto`, `count` sin usar, nieve con URLs `http://`).

## 5. Criterios de aceptación verificables
- [ ] La card Tecnologías muestra 15 items: los 11 actuales + Java, OpenCode, C#, .NET al final y en ese orden.
- [ ] Cada item nuevo tiene icono visible y etiqueta exacta (`Java`, `OpenCode`, `C#`, `.NET`).
- [ ] Iconos con tamaño y aspecto homogéneos respecto a los actuales (48px en vista).
- [ ] Sin regresión visual del grid `box1-box7` en desktop ni a `<=720px`.
- [ ] `lint` cero warnings y `build` genera `dist/`.

## 6. Plan de tareas
1. Obtener los 4 iconos (flaticon.es o icon-icons.com) y adaptarlos a PNG cuadrado ~96–256px con fondo transparente en `src/img/` (`java.png`, `opencode.png`, `csharp.png`, `dotnet.png`).
2. Editar `src/components/habilidades/Skills.jsx`: añadir los 4 imports + los 4 bloques al final tras Git Hub.
3. Comprobar en navegador (`npm run dev` → `http://localhost:5173`): 15 iconos, etiquetas correctas, card `box2` proporcionada, responsive `<=720px`.
4. Verificación final: `npm run lint` + `npm run build`.

## 7. Verificación (lint cero warnings + build dist/)
- `npm run lint` → `eslint . --ext js,jsx --report-unused-disable-directives --max-warnings 0` sin warnings.
- `npm run build` → `vite build` genera `dist/` correctamente.
- Comprobación visual en `http://localhost:5173` (desktop + `<=720px`).

## 8. Riesgos / No romper (ver paso 3)
- Licencia de iconos de flaticon/icon-icons: preferir iconos de uso libre o con atribución compatible; evitar hotlinking a URLs externas (los PNG viven en `src/img/`).
- Logo de OpenCode: usar el logo oficial/reconocible; si no hay asset libre claro, proponer alternativa al usuario antes de implementar.
- No tocar `fetch`, `_redirects`, `vite.config.js`, `index.html` ni reintroducir deuda listada en `AGENTS.md`.

## Preguntas abiertas
- ¿Alguna preferencia de estilo de icono (plano, 3D, monocromo) para que los 4 combinen con los 11 actuales?
- Si el logo de OpenCode no tiene asset libre utilizable, ¿qué icono alternativo aceptas?

## 9. Checklist verificación
- [x] La card Tecnologías muestra 15 items: los 11 actuales + Java, OpenCode, C#, .NET al final y en ese orden.
- [x] Cada item nuevo tiene icono visible y etiqueta exacta (`Java`, `OpenCode`, `C#`, `.NET`).
- [x] Iconos con tamaño y aspecto homogéneos respecto a los actuales (48px en vista).
- [x] Sin regresión visual del grid `box1-box7` en desktop ni a `<=720px`.
- [ ] `lint` cero warnings y `build` genera `dist/`.
- [ ] lint cero warnings
- [ ] build genera dist/
