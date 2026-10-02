# Fix imagen perfil en móvil + tecnologías por categorías
Estado: aprobado
Depende de: specs/001-ampliar-tecnologias-spec.md (reutiliza su patrón import PNG desde `src/img/` + `div > img + p` y su lista de 15 tecnologías como base a reagrupar)
Fecha de creación: 2026-10-02
Descripción: Evitar que la foto de perfil se salga de su card en móvil real y reagrupar el box de tecnologías por categorías (lenguajes, IDEs/entornos, marcas, resto), haciendo crecer Skills y compactando Hobbies.

## 1. Objetivo
- Corregir el desborde de la foto de perfil (`box1`) en móvil físico, donde la imagen se sale de su card aunque en devtools no se reproduce.
- Reorganizar la sección Tecnologías (`box2`) por categorías (ej.: Lenguajes: JavaScript, Java, C#; IDEs/entornos: IntelliJ, Visual Studio, Android Studio; Marcas: HTML, XML, XAML; + resto coherente), con nuevos iconos PNG en `src/img/` (incluyendo Android Studio y SQL Server).
- Hacer crecer el box de tecnologías en altura y dejar Hobbies (`box3`) más minimalista/compacto para cederle protagonismo.

## 2. Alcance (entra / no entra)
Entra:
- Fix overflow móvil en `box1` (Perfil + grid/contenedor global): imagen contenida, card sin desborde a 360–390px, revisando `body` padding y `grid-container-1` a `<=720px`.
- Reagrupación de `Skills.jsx` por categorías con cabeceras de categoría y estado local colapsable (acordeón al menos en móvil).
- Nuevos iconos PNG cuadrados con fondo transparente en `src/img/` (mínimo: IntelliJ, Visual Studio, Android Studio, SQL Server; más XML/XAML si no hay asset reutilizable), mismo patrón de `import` que en spec 001.
- Compactado visual de `Hobbies` (menos altura / cards más pequeñas) sin eliminar la sección.
- Estilos solo en `perfil.scss`, `skills.scss`, `hobbies.scss` y ajustes mínimos en `app.scss` (variables `$bosque-*` existentes), verificación en devtools móvil + `lint` + `build`.
No entra:
- Cambios en `project.json`, tags (`maquetado, React, JS, node`, case-sensitive), `fetch("../../project.json")` ni flujo `Filtrado onFilterChange -> Proyectos tag.includes(filtro)` ni paginación `itemsPerPage 1/2/3/4`.
- Cambios en `App.jsx` (grid `box1-box7`, estado `filtro`), `Filtrado`, `Proyectos`, `Experiencia`, `Footer`, `Hojas`.
- Eliminar Hobbies, cambiar a 1 columna en desktop, tocar `public/_redirects`, `vite.config.js`, `index.html` ni reintroducir deuda (`@emotion/*`, `@fontsource/roboto`, `count` sin usar, nieve con URLs `http://`).
- Descarga real a tienda ni test en granja de dispositivos; basta devtools a 360–390px (decisión del interrogatorio).

## 3. Contexto arquitectura (App.jsx, boxes, filtro, project.json, scss)
- Toca `box1` (Perfil full-width), `box2` (Skills, columna izquierda `1fr`) y `box3` (Hobbies, columna izquierda) del grid `1fr 2fr` en `src/app.scss:57-106`; a `<=720px` todo se apila a 1 columna (`src/app.scss:108-157`). `box4` Experiencia ocupa la columna derecha (`src/app.scss:83-88`) sin cambios funcionales, solo hereda altura.
- `src/App.jsx:15,22-28` solo levanta estado `filtro` y compone `box1-box7`; no se toca. Flujo `Filtrado onFilterChange={setFiltro} -> Proyectos filtro={filtro}` con `project.tag.includes(filtro)` no afectado.
- `src/components/perfil/Perfil.jsx:10` renderiza `img.yomismo` de `mi-perfil.webp` a tamaño fijo; `src/components/perfil/perfil.scss:15-23` fija `img` a `250x250px` con `margin:20px` sin `max-width`; media `<=1000px` (`perfil.scss:113-147`) pasa a columna centrada pero mantiene `250px` fijos.
- Posible causa fuera de la card: `body` con `padding:40px` + `width:100%` (`src/app.scss:34-45`) y `grid-container-1` con `padding:20px` en desktop / `0px` en `<=720px` (`src/app.scss:57-63,110-113`): en móvil real el ancho útil es menor que en devtools (scrollbar, viewport, barra navegador).
- `src/components/habilidades/Skills.jsx:18-89` lista 15 items hardcodeados (patrón `import` PNG de `src/img/` + `div > img + p`), sin props ni estado; estilo `.tecnologias` flex-wrap con celdas `85px` e iconos `48px` (`src/components/habilidades/skills.scss:22-43`), card `.skill{height:100%}` que crece por contenido.
- `src/components/entretenimiento/Hobbies.jsx:10-21` tiene 2 cards; `src/components/entretenimiento/hobbies.scss:19-30` fija imágenes a `height:250px`, principal candidato a compactar.
- Fuente `public/project.json` (9 proyectos) y paginación por `window.innerWidth (1/2/3/4)` no afectadas.

## 4. Requisitos funcionales + no-funcionales
- RF1 (perfil): a 360–390px la foto queda íntegramente dentro de la card `.perfil`, sin scroll horizontal de la página ni recorte lateral, en recarga y en rotación.
- RF2 (categorías): `box2` muestra grupos con cabecera visible; propuesta base: Lenguajes (JavaScript, Java, C#, Kotlin, SQL, TypeScript), IDEs/entornos (IntelliJ, Visual Studio, Android Studio, OpenCode), Marcas (HTML, XML, XAML, CSS/SASS según decisión), Resto (React, Angular, Node, MongoDB, MySQL, SQL Server, GitHub, .NET). Etiquetas exactas de cada tecnología conservadas salvo las nuevas que se acuerden.
- RF3 (iconos): cada tecnología muestra icono `48px` + etiqueta; nuevos PNG en `src/img/` (mínimo `intellij`, `visualstudio`, `androidstudio`, `sqlserver`; más `xml`/`xaml` si aplica), cuadrados ~96–256px, fondo transparente, pocos KB, mismo patrón de `import` que spec 001.
- RF4 (tamaños): Skills crece en altura por contenido categorizado; Hobbies queda minimalista (menos altura total que hoy, p. ej. imágenes más bajas o 1 fila compacta) sin desaparecer.
- RF5 (colapsable): cada categoría se puede plegar/desplegar con estado local en `Skills` (sin tocar `App.jsx`); en `<=720px` las categorías nacen colapsadas (acordeón móvil) y en desktop nacen expandidas.
- RNF1: reutilizar variables `$bosque-*` y fuente `montserrat` de `src/app.scss`; ningún `.scss` nuevo.
- RNF2: sin cambios en datos (`project.json`), filtro, paginación ni responsive del resto de boxes salvo el apilado existente a `<=720px`.
- RNF3: verificación `npm run lint` (cero warnings) + `npm run build` (`dist/` OK). Sin tests ni typecheck en este repo.

## 5. Criterios de aceptación verificables
- [ ] A 360px y 390px en devtools (Chrome responsive) no hay scroll horizontal y la foto de perfil no sobresale de su card (borde/radio/sombra intactos).
- [ ] En desktop la card Perfil mantiene aspecto actual (foto izquierda, texto derecha) sin regresión.
- [ ] El box Tecnologías muestra cabeceras de categoría (mínimo: Lenguajes, IDEs/entornos, Marcas) y cada tecnología actual + las nuevas está bajo una y solo una categoría.
- [ ] Nuevos iconos (Android Studio y SQL Server como mínimo, más IntelliJ/Visual Studio/XML/XAML según lista final) visibles a tamaño homogéneo (~48px) con `alt` descriptivo.
- [ ] Skills ocupa más altura que antes y Hobbies ocupa menos altura que antes en desktop, sin solapamientos ni huecos rotos en el grid.
- [ ] En `<=720px` las categorías funcionan como acordeón (plegar/desplegar con clic/teclado) y nacen colapsadas; en desktop nacen expandidas.
- [ ] Sin regresión del resto de boxes ni del flujo filtro→proyectos a desktop y `<=720px`.

## 6. Diseño (componentes, props/estado, estilos, datos, responsive)
- Componentes a tocar: `Perfil.jsx` (mínimo; idealmente solo envolver `img` en contenedor si hace falta para el fix, sin cambiar contenido), `Skills.jsx` (reagrupar los 15 items en secciones por categoría + nuevos items con sus `import`s + `useState` local por categoría), `Hobbies.jsx` (mínimo; solo si hace falta para compactar, p. ej. clase o estructura para 1 fila compacta).
- Props/estado: sin cambios en `App.jsx` ni props nuevas; `Skills` añade estado local (p. ej. objeto `abiertas{slug:boolean}` o un `useState` por categoría) para el colapsable; cabeceras de categoría como `<button>` con `aria-expanded` para teclado/accesibilidad.
- Estilos: `perfil.scss` (imagen con `max-width:100%`, `height:auto`, contenedor con `overflow:hidden`/`min-width:0`, respetar `border-radius`); `app.scss` (revisar `body{padding}` y `.grid-container-1{gap,padding}` a `<=720px` para que `100%` no desborde en móvil real); `skills.scss` (estilos de grupo/cabecera/acordeón reutilizando `$bosque-borde`, `$bosque-superficie`, `$bosque-texto`, `$bosque-texto-sec`); `hobbies.scss` (reducir `height:250px` de imágenes y paddings para versión minimalista). Sin `.scss` nuevos.
- Datos: ningún cambio en `project.json`, tags ni `fetch`; iconos nuevos viven en `src/img/*.png` (no en `public/img/`), siguiendo el patrón del spec 001.
- Responsive: a `<=720px` (apilado 1 columna ya existente) el fix de Perfil debe garantizar `img` contenida; Skills en acordeón colapsado por defecto; Hobbies compacto; paginación `1/2/3/4` y breakpoints de cards de proyectos intactos.
- Qué NO se toca (gotchas `AGENTS.md`): `fetch("../../project.json")` frágil (no corregirlo aquí), `public/_redirects` único válido (`src/_redirects` ignorado), `vite.config.js` mínimo, `index.html` (`gtag G-ZQXX3KJ4TC`, favicon `devchallenges.png`, entry `/src/main.jsx`), no reintroducir deuda (`@emotion/*`, `@fontsource/roboto`, `count` sin usar, nieve con URLs `http://`).

## 7. Plan de tareas
1. Fix overflow Perfil: `src/components/perfil/perfil.scss` (imagen fluida + contenedor anti-desborde) y `src/app.scss` (revisar `body` padding y `grid-container-1` a `<=720px`); retoque mínimo en `src/components/perfil/Perfil.jsx` solo si hace falta envolver la `img`.
2. Definir lista cerrada de categorías y reparto de las 15 + nuevas tecnologías (acordar nombres exactos y qué va en Lenguajes / IDEs / Marcas / Resto).
3. Obtener y añadir PNG a `src/img/` (mínimo Android Studio, SQL Server, IntelliJ, Visual Studio; más XML/XAML si aplica), cuadrados ~96–256px, fondo transparente.
4. Reescribir `src/components/habilidades/Skills.jsx` por categorías con `import`s, secciones y estado local colapsable (`aria-expanded`).
5. Estilar categorías/acordeón en `src/components/habilidades/skills.scss` reutilizando variables `$bosque-*` (colapsado por defecto en `<=720px`, expandido en desktop).
6. Compactar Hobbies en `src/components/entretenimiento/hobbies.scss` (y `Hobbies.jsx` solo si hace falta) para versión minimalista que ceda altura a Skills.
7. Verificación = `npm run lint` (cero warnings) + `npm run build` (`dist/` OK). Sin tests ni typecheck en este repo.

## 8. Verificación (lint cero warnings + build dist/)
- `npm run lint` → `eslint . --ext js,jsx --report-unused-disable-directives --max-warnings 0` sin warnings.
- `npm run build` → `vite build` genera `dist/` correctamente.
- Comprobación visual en `npm run dev → http://localhost:5173`: desktop + devtools responsive 360px/390px (Perfil contenido sin scroll-X; Skills por categorías con acordeón en móvil; Hobbies compacto; sin regresión filtro→proyectos).

## 9. Riesgos / No romper
- El bug solo pasa en móvil real: el fix debe cubrir causas fuera de la card (`body{width:100%+padding:40px}`, `box-sizing`, `grid-gap/padding`, `100vw` implícitos) además de la `img` fija de `perfil.scss:15-23`; si solo se limita la imagen puede seguir habiendo scroll-X.
- Iconos con licencia o estilo heterogéneo (riesgo heredado del spec 001): preferir uso libre, evitar hotlinking externo, PNG locales en `src/img/`.
- Acordeón con `div` clicable rompería teclado/accesibilidad y `lint` (`jsx-a11y` si aplica): usar `<button>` con `aria-expanded`.
- No tocar `fetch`, `_redirects`, `vite.config.js`, `index.html` ni reintroducir deuda listada en `AGENTS.md`.

## 10. Futuros specs (mejoras detectadas, errores extra, ideas — no entran aquí)
- Corregir `fetch("../../project.json")` a `/project.json` en `src/components/proyectos/Proyectos.jsx` (detectado en `README.md:101` y `AGENTS.md:36`).
- Eliminar `count` sin usar de `src/App.jsx` (detectado en `README.md:144`).
- Migrar efecto nieve con URLs `http://` externas a assets locales o eliminarlo (`src/app.scss`, detectado en `README.md:145`).
- Unificar `lang="es"` en `index.html` y eliminar `src/_redirects` duplicado (detectado en `README.md:148`).
- Añadir `loading`/error handling al fetch de proyectos (detectado en `README.md:146`).
- Limpiar o importar deps no usadas `@emotion/*`, `@fontsource/roboto` (detectado en `README.md:147`).

## Preguntas abiertas
- Lista cerrada: ¿qué tecnologías van exactamente en cada categoría y qué hacemos con CSS/SASS (¿Marcas o Estilos?), .NET (¿Lenguaje/plataforma o Resto?), GitHub y OpenCode (¿Herramientas?)?
- Iconos: ¿"Visual Studio" significa VS Code o Visual Studio IDE? ¿Necesitamos iconos separados para XML y XAML o basta uno de "marcas"?
- Hobbies minimalista: ¿2 cards compactas en fila o 1 sola card resumida?
- Acordeón: ¿solo en móvil (desktop siempre expandido) o plegable también en desktop?

## 11. Checklist verificación (última, checkboxes listos para /verifier)
- [ ] A 360px y 390px en devtools no hay scroll horizontal y la foto no sobresale de su card
- [ ] En desktop la card Perfil mantiene aspecto actual sin regresión
- [ ] El box Tecnologías muestra cabeceras de categoría y cada tecnología está bajo una y solo una categoría
- [ ] Nuevos iconos (mínimo Android Studio y SQL Server) visibles a tamaño homogéneo con alt descriptivo
- [ ] Skills ocupa más altura que antes y Hobbies menos, sin roturas del grid
- [ ] En <=720px las categorías funcionan como acordeón y nacen colapsadas; en desktop expandidas
- [ ] Sin regresión del resto de boxes ni del flujo filtro→proyectos
- [ ] `npm run lint` cero warnings
- [ ] `npm run build` genera `dist/` OK
