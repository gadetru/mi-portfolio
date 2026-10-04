# Logos Skills faltantes (8 tecnologías)
Estado: aprobado
Depende de: Ninguno
Fecha de creación: 2026-10-04
Descripción: Comprobar las 8 tecnologías de Skills sin logo, descargar sus iconos oficiales y mostrarlos con el mismo patrón import + img + p que el resto.
## 1. Objetivo
- Las 8 tecnologías sin logo (Kotlin, SQL, PL/SQL, Eclipse, GitHub, Ollama, LM Studio, Windows) muestran icono + nombre como las otras 22, sin cambiar layout, filtro ni datos.
## 2. Alcance (entra / no entra)
Entra:
- Descarga de 8 logos oficiales/simple-icons (PNG transparente ~96-256px, pocos KB) a `src/img/`.
- Edición solo de `src/components/habilidades/Skills.jsx`: 8 imports + campo `icon` + `alt` descriptivo.
- Verificación visual en navegador desktop + `<=720px` por cada categoría + `lint` + `build`.
No entra:
- Cambios en `App.jsx`, grid `box1-box7` (`src/app.scss`), `skills.scss` (salvo ajuste mínimo imprevisto), `Perfil/Hobbies/Experiencia/Filtrado/Proyectos/Hojas/Footer`.
- Cambios en `public/project.json`, tags (`maquetado, React, JS, node`, case-sensitive), `fetch("/project.json")`, flujo `Filtrado onFilterChange -> Proyectos tag.includes(filtro)`, `itemsPerPage 1/2/3/4`, breakpoints `<=480/800/1200`.
- Reordenar categorías, acordeón por categoría, uniformar tamaños de logos existentes, tocar `public/_redirects`, `vite.config.js`, `index.html`, deuda `@emotion/*`.
## 3. Contexto arquitectura (App.jsx, boxes, filtro, project.json, scss)
- Solo `box2` Skills, columna izquierda grid `1fr 2fr` (`src/app.scss:60-100`), a `<=720px` 1 columna (`src/app.scss:120-177`). Sin cambios de grid.
- `src/components/habilidades/Skills.jsx:26-105` define 8 categorías / 30 items; faltan `Kotlin/SQL/PL-SQL:35-37`, `Eclipse:77`, `GitHub:86`, `Ollama/LM Studio:94-95`, `Windows:102`. Fallback `:145` `{item.icon ? <img> : null}`.
- Estilo `.tecnologias` flex-wrap, celdas `85px`, `img 48px` (`src/components/habilidades/skills.scss:145-166`). Patrón vigente: PNG en `src/img/` (37 ficheros) + `import ... from '../../img/'`.
- `src/App.jsx:15` estado `filtro` intacto. Fuente datos `public/project.json` (9 items) intacta.
## 4. Requisitos funcionales + no-funcionales
- RF1: los 8 items muestran `<img alt="icono X" src={...}>` + `<p>nombre exacto actual</p>`.
- RF2: ficheros en `src/img/`: `kotlin.png, sql.png, plsql.png, eclipse.png, github.png, ollama.png, lmstudio.png, windows.png`.
- RF3: mismo patrón `import ... from '../../img/'` que specs 001/006.
- RNF1: sin cambios visuales en celdas/iconos (85px/48px), card crece por contenido.
- RNF2: logos fondo transparente, licencia permisiva, pocos KB.
- RNF3: `npm run lint` cero warnings + `npm run build` OK. Sin tests ni typecheck en este repo.
## 5. Criterios de aceptación verificables
- [ ] Categoría Lenguajes muestra icono en Kotlin, SQL, PL/SQL.
- [ ] IDEs muestra icono en Eclipse.
- [ ] Control de versiones muestra icono en GitHub.
- [ ] IA y herramientas muestra icono en Ollama y LM Studio.
- [ ] Sistemas operativos muestra icono en Windows.
- [ ] Ningún item sin `img` (salvo fallo de carga); resto de 22 inalterados.
- [ ] Visual desktop + `<=720px` sin desborde ni hueco nuevo frente a `box4`.
## 6. Diseño (componentes, props/estado, estilos, datos, responsive)
- Componentes: solo `Skills.jsx`; 8 imports + `icon:`; sin estado/props nuevos (`activa` por `slug` sigue igual).
- Estilos: reutiliza variables `$bosque-*`, `.tecnologias`, `.panel-tecnologias`, `.botonera`; ningún `.scss` nuevo.
- Datos: sin cambios en `project.json`/tags/`fetch`.
- Responsive: sin cambios `itemsPerPage`/breakpoints/botonera; flex-wrap absorbe iconos.
- Qué NO se toca (gotchas `AGENTS.md`): `fetch` frágil, `public/_redirects` único válido (`src/_redirects` ignorado), `vite.config.js` mínimo, `index.html` (`gtag G-ZQXX3KJ4TC`, favicon `devchallenges.png`, entry `/src/main.jsx`), no reintroducir deuda (`@emotion/*`, `@fontsource/roboto`, `count` sin usar, nieve con URLs `http://`).
## 7. Plan de tareas
1. Descargar 8 logos oficiales (transparente ~96-256px) — `Skills.jsx` + `src/img/`.
2. Copiar a `src/img/` con nombres RF2.
3. Editar `Skills.jsx` (imports + `icon`/`alt`).
4. Comprobar visualmente cada categoría en desktop y `<=720px` — `Skills.jsx`, `skills.scss`.
5. Verificación = `npm run lint` (cero warnings) + `npm run build` (`dist/` OK). Sin tests ni typecheck en este repo.
## 8. Verificación (lint cero warnings + build dist/)
- `npm run lint` → 0 warnings.
- `npm run build` → `dist/` OK.
- Navegador: cada categoría con iconos, sin regresión box2/box4.
## 9. Riesgos / No romper
- Logo con fondo blanco/opaco → buscar variante transparente o SVG→PNG.
- Logo pesado/desproporcionado → reescalar a ~96-256px.
- No romper `fetch("/project.json")` absoluto, `public/_redirects`, `vite.config.js`, `index.html` (gtag/favicon/entry), ni reintroducir `@emotion`, nieve `http://`.
## 10. Futuros specs (mejoras detectadas, errores extra, ideas — no entran aquí)
- Uniformar tamaños/pesos de los 30 logos heterogéneos (`README.md:12`, `src/components/habilidades/skills.scss:156`).
- `alt="CSS"` inconsistente vs `icono X` en `src/components/habilidades/Skills.jsx:47`.
- Acordeón por categoría (TODO `README.md:152`).
- Limpiar deps no usadas / `src/_redirects` duplicado (`README.md:148-151`).
## Preguntas abiertas
- Ninguna (interrogatorio respondido 2026-10-04).
## 11. Checklist verificación (última, checkboxes listos para /verifier)
- [ ] Lenguajes con icono (Kotlin, SQL, PL/SQL)
- [ ] Eclipse con icono
- [ ] GitHub con icono
- [ ] Ollama y LM Studio con icono
- [ ] Windows con icono
- [ ] 22 restantes inalterados, sin items solo-texto
- [ ] Visual desktop + <=720px sin desborde
- [ ] `npm run lint` cero warnings
- [ ] `npm run build` dist/ OK
