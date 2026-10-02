# Experiencia y formación desde el CV + Skills alineados al CV
Estado: aprobado
Depende de: Ninguno
Fecha de creación: 2026-10-02
Descripción: Depurar el .md del CV descargado de Drive y usarlo como fuente de verdad para rellenar el box4 Experiencia (empresas por un lado, formación por otro), actualizar la bio del Perfil y sincronizar Skills con las categorías del CV, con datos de experiencia/formación en JSON para futuras ediciones sin tocar JSX.

## 1. Objetivo

- Dejar `references/Gabriel_Delgado_CV.docx.md` con redacción limpia y estructurada, eliminando el formato autogenerado de la descarga (tablas con pipes, barras de salto, celdas vacías).
- Rellenar el box4 `Experiencia` con la experiencia real del CV: Kamaleonte (2026) + Nükrum (2023) + AICrop (2023), separando bloque Empresas de bloque Formación (Ilerna DAM + SocraTech + cursos).
- Actualizar la bio de `Perfil` con el resumen del CV y sincronizar `Skills` con las categorías y el orden del CV.
- Externalizar experiencia/formación a un JSON en `public/` para que en el futuro solo se toque el JSON y la vista se autocomplete, sin que sea engorroso (reutiliza el patrón `fetch` ya usado en Proyectos).

## 2. Alcance (entra / no entra)

Entra:

- Reescritura en limpio de `references/Gabriel_Delgado_CV.docx.md` (mismo fichero): cabecera, resumen, experiencia profesional (3 empleos con fechas/rol/ubicación/bullets), educación, cursos y certificados, tecnologías, proyectos (solo como referencia), idiomas.
- Box4 `Experiencia` reestructurado por secciones: `Experiencia en empresas` (Kamaleonte, Nükrum, AICrop) + `Formación` (Ilerna DAM Sept 2024 – Jun 2026, SocraTech Nov 2022 – Mar 2023, cursos Udemy resumidos) + `Idiomas` según CV (ES nativo, DE alto, EN medio).
- `Perfil`: actualizar solo el párrafo bio (`Perfil.jsx`) con el resumen del CV (FrontEnd + maquetación JS/HTML/CSS desde 2023, DAM, Backend/BBDD/.NET C#, proyectos reales para clientes europeos).
- `Skills`: sincronizar items con el CV y reordenar/renombrar categorías siguiendo el orden del CV (lenguajes, marcas, frameworks —conservado por necesidad del portfolio—, bases de datos, IDEs/entornos, control de versiones, IA/herramientas, SO si se decide visible). Mantiene el toggle global colapsable actual.
- Datos: crear `public/experiencia.json` (nuevo) con empleos + formación + idiomas, y que `Experiencia.jsx` lo consuma vía `fetch` absoluto con estados de carga/error, siguiendo el patrón de `Proyectos.jsx`.
- Estilos: ajustes mínimos en `experiencia.scss` para las nuevas secciones + estrategia anti-desbordamiento (scroll vertical interno en desktop, flujo natural en `<=720px`), reutilizando variables bosque existentes.
- Verificación `npm run lint` (cero warnings) + `npm run build` (`dist/` OK) y comprobación visual en navegador (desktop + `<=720px`).

No entra:

- No se tocan `public/project.json` ni sus tags (`maquetado, React, JS, node`, case-sensitive): los proyectos TFG hostelería y app fitness del CV quedan para un futuro spec.
- No se añaden imágenes nuevas a `public/img/` ni iconos binarios nuevos a `src/img/` en este spec (si faltan iconos —Kotlin, PL/SQL, Eclipse, Ollama, LM Studio, Windows, Spring Boot, WPF/MAUI—, se usa fallback de texto; los binarios quedan para futuro spec).
- No se cambia el grid `box1-box7` de `src/app.scss`, ni `itemsPerPage 1/2/3/4` de `Proyectos.jsx`, ni breakpoints de cards (`<=480/800/1200`).
- No se toca `src/App.jsx` (sin estado nuevo), `Filtrado`, `Hobbies`, `Hojas`, `Footer`, `vite.config.js`, `index.html`, `public/_redirects`.
- No se elimina el duplicado `src/_redirects` ni se limpia la deuda (`@emotion/*`, `@fontsource/roboto`, `lato` sin importar): van a futuros specs.

## 3. Contexto arquitectura (App.jsx, boxes, filtro, project.json, scss)

- `src/App.jsx:15` levanta el único estado global `filtro`; `src/App.jsx:22-27` compone el grid `box1-box7` con `Filtrado onFilterChange={setFiltro}` → `Proyectos filtro={filtro}`.
- `src/app.scss:61` define `grid-template-columns: 1fr 2fr`; `src/app.scss:97-102` fija `box4` (Experiencia) ocupando 2 filas en la columna derecha; `src/app.scss:122-179` apila todo a 1 columna en `<=720px`.
- `src/components/experiencia/Experiencia.jsx:3-72` hoy es contenido hardcodeado: `Experiencia.jsx:9-17` solo Nükrum sin fechas, `Experiencia.jsx:18-34` solo AICrop sin fechas, `Experiencia.jsx:35-49` idiomas desactualizados (DE B2 + 7 años, EN básico), `Experiencia.jsx:50-69` formación solo socraTech.
- `src/components/perfil/Perfil.jsx:38` bio genérica desactualizada respecto al resumen del CV.
- `src/components/habilidades/Skills.jsx:26-79` tiene 22 items en 5 categorías con orden propio; `Skills.jsx:82-84` nace expandido en desktop y colapsado en `<=720px`; `Skills.jsx:89-98` toggle global con `button[aria-expanded]`.
- `src/components/proyectos/Proyectos.jsx:68` hace `fetch("/project.json")` absoluto; `Proyectos.jsx:48-50` filtra con `project.tag.includes(filtro)` case-sensitive; `Proyectos.jsx:22-32` pagina con `itemsPerPage` 1/2/3/4 según ancho; `Proyectos.jsx:91-105` estados carga/error. Es el patrón a reutilizar para el nuevo JSON de experiencia.
- `public/project.json:1-84` tiene 9 items y no se toca en este spec.
- `references/Gabriel_Delgado_CV.docx.md:3-36` es una tabla Drive con pipes, celdas vacías y barras de salto; contiene la fuente: `CV:11-12` Kamaleonte Mar 2026 – Jun 2026 (WPF/C#/XAML, migración API XML a REST, endpoints pagos, SQL Server, GitHub por ramas), `CV:14-15` Nükrum Jul 2023 – Oct 2023, `CV:17-18` AICrop Ene 2023 – Abr 2023, `CV:22-23` Ilerna DAM + SocraTech, `CV:25` cursos Udemy, `CV:27` tecnologías en orden CV, `CV:30` proyectos TFG + fitness (no entran), `CV:35` idiomas ES nativo / EN medio / DE alto.
- `src/components/experiencia/experiencia.scss:1` importa variables de `app.scss`; `experiencia.scss:47-68` estilo `.lugares`, `experiencia.scss:24-45` estilo `.mi-formacion`, `experiencia.scss:69-90` estilo `.idiomas`, `experiencia.scss:94-213` adaptaciones `480-1000px` y `<=480px`.

## 4. Requisitos funcionales + no-funcionales

Funcionales:

- CV depurado: el `.md` queda legible en crudo y renderizado, por secciones, sin pipes/barras de salto, con fechas, roles y tecnologías fieles al original.
- Box4 muestra bloque Empresas con los 3 empleos (empresa, rol FullStack, ubicación, rango de fechas, 3-5 bullets cada uno con tecnologías en negrita donde aporte).
- Box4 muestra bloque Formación separado: Ilerna (título DAM, fechas), SocraTech (bootcamp, fechas), cursos Udemy en lista resumida (maquetación, Java/Spring, C#/.NET/WPF, Kotlin/Android, IA/OpenCode/MCPs/Supabase).
- Idiomas según CV: ES nativo, DE alto, EN medio (sin etapa de soldador como empleo; como mucho una frase de contexto de 7 años en Alemania si se acuerda en implementación).
- Bio de Perfil resume el CV en 2-4 frases (experiencia desde 2023, FrontEnd/maquetación, DAM, Backend/BBDD/.NET, proyectos reales europeos).
- Skills refleja las tecnologías del CV con el orden del CV; cada item conserva nombre visible; el toggle global sigue funcionando (expandido desktop, colapsado `<=720px`).
- Experiencia/formación/idiomas se renderizan desde `public/experiencia.json` vía `fetch` absoluto, con mensaje de carga y mensaje de error (mismo UX que Proyectos).

No-funcionales:

- Sin desbordamiento horizontal en ningún ancho; en desktop el box4 no deforma el grid: si el contenido supera la altura razonable, scroll vertical interno estilizado dentro de la card; en `<=720px` flujo natural sin scroll interno.
- Accesibilidad: encabezados jerárquicos por sección, scroll interno alcanzable por teclado, contraste existente conservado (variables bosque).
- Rendimiento: sin imágenes nuevas, sin dependencias nuevas, sin cambios en el bundle salvo el JSON estático.
- Calidad: `lint` cero warnings + `build` OK; sin tests ni typecheck en este repo.

## 5. Criterios de aceptación verificables

1. El fichero `references/Gabriel_Delgado_CV.docx.md` abre legible: secciones claras, sin tablas de pipes ni barras de salto, con los 3 empleos, formación, cursos, tecnologías e idiomas del CV original.
2. En desktop el box4 muestra `Experiencia en empresas` con Kamaleonte (Mar 2026 – Jun 2026, San Fernando), Nükrum (Jul 2023 – Oct 2023, Tarifa) y AICrop (Ene 2023 – Abr 2023, Tarifa), cada uno con rol, ubicación, fechas y bullets de tareas/tecnologías.
3. El box4 muestra `Formación` separada de Empresas con Ilerna DAM (Sept 2024 – Jun 2026), SocraTech (Nov 2022 – Mar 2023) y cursos Udemy resumidos.
4. El box4 muestra `Idiomas` con ES nativo, DE alto y EN medio (sin niveles antiguos B2/básico).
5. La bio del Perfil refleja el resumen del CV (no la redacción genérica anterior).
6. Skills muestra las categorías en el orden del CV y contiene los items del CV que ya tienen icono; los items sin icono aparecen como texto sin romper el layout; el toggle `aria-expanded` sigue naciendo expandido en desktop y colapsado en `<=720px`.
7. Experiencia se renderiza desde `public/experiencia.json` (verificable en Network como `GET /experiencia.json 200`); con red bloqueada o JSON renombrado temporalmente se ve el mensaje de error en vez de card vacía.
8. Sin desbordamiento: en desktop ancho `>720px` no hay scroll horizontal y el contenido largo del box4 hace scroll solo dentro de la card; en `<=720px` el box4 apilado crece en flujo natural sin scroll interno y sin solapes con Filtro/Proyectos.
9. `npm run lint` termina con cero warnings.
10. `npm run build` genera `dist/` correctamente.

## 6. Diseño (componentes, props/estado, estilos, datos, responsive)

- Componentes a tocar: `Experiencia.jsx` (pasa de hardcodeado a consumo de JSON con `useState`/`useEffect` para datos + carga + error, sin props nuevas, sin cambios en `App.jsx`); `Perfil.jsx` (solo texto de bio); `Skills.jsx` (reordena `CATEGORIAS` al orden del CV y añade/renombra items con icono existente, fallback texto si no hay icono). No se crean componentes nuevos salvo, si hace falta, sub-secciones semánticas dentro del propio `Experiencia.jsx`.
- Filosofía React aplicable (según skill `react-docs`, a citar en implementación con URL de `es.react.dev`): composición de secciones, estado local al componente que lo necesita y efectos con limpieza, como ya hace `Proyectos.jsx`.
- Estilos: reutilizar variables bosque y `radius 24px`/`blur` existentes; en `experiencia.scss` añadir clases de sección (empresas vs formación) heredando el patrón `.lugares`/`.mi-formacion`; anti-desbordamiento preferente: `max-height` + `overflow-y: auto` solo en desktop dentro de `.caja-experiencia`, sin `overflow-x`; en `<=720px` desactivar el `max-height` para flujo natural. Alternativa descartada para este spec: acordeón por sección (queda como futuro spec si el scroll no convence en revisión visual).
- Datos: nuevo `public/experiencia.json` con tres claves (empleos, formación, idiomas); cada empleo con empresa, rol, ubicación, periodo y lista de logros/tecnologías; cada formación con centro, título y periodo (+ detalle corto); idiomas con lengua y nivel. `Experiencia.jsx` lo pide con ruta absoluta `/experiencia.json`. `public/project.json` no se modifica. El `.md` depurado es la fuente de verdad para redactar el JSON.
- Responsive: sin cambios en `src/app.scss` (box4 sigue 2 filas derecha en desktop, apilado en `<=720px`); sin cambios en `itemsPerPage` ni breakpoints de cards. La única novedad responsive es el scroll interno desktop sí / móvil no.
- Qué NO se toca (gotchas `AGENTS.md`): mantener `fetch("/project.json")` absoluto en `Proyectos.jsx`; `public/_redirects` (`/* /index.html 200`) es el único válido, no tocar ni el duplicado `src/_redirects`; `vite.config.js` mínimo intacto; `index.html` conserva `gtag G-ZQXX3KJ4TC`, favicon `devchallenges.png` y entry `/src/main.jsx`; no reintroducir deuda (`@emotion/*`, `@fontsource/roboto`, nieve con URLs `http://`).

## 7. Plan de tareas

1. Depurar `references/Gabriel_Delgado_CV.docx.md` (mismo path): reescribir por secciones con redacción limpia, fechas y tecnologías fieles, sin pipes/barras de salto.
2. Definir el esquema de `public/experiencia.json` (empleos[3] + formación[Ilerna, SocraTech, cursos] + idiomas[3]) a partir del CV ya depurado.
3. Crear `public/experiencia.json` con el contenido del CV depurado.
4. Reescribir `src/components/experiencia/Experiencia.jsx` para consumir `/experiencia.json` con carga/error y render por secciones (Empresas separada de Formación + Idiomas).
5. Ajustar `src/components/experiencia/experiencia.scss` (secciones nuevas + scroll interno solo desktop, móvil en flujo).
6. Actualizar bio en `src/components/perfil/Perfil.jsx` desde el resumen del CV.
7. Sincronizar `src/components/habilidades/Skills.jsx` (categorías en orden CV + items con icono existente, fallback texto sin icono, toggle intacto).
8. Verificación = `npm run lint` (cero warnings) + `npm run build` (`dist/` OK) + revisión visual desktop y `<=720px` (criterios 1-8). Sin tests ni typecheck en este repo.

## 8. Verificación (lint cero warnings + build dist/)

- `npm run lint`: debe terminar sin warnings ni errores (`--max-warnings 0`).
- `npm run build`: debe generar `dist/` sin errores (lo que se publica en Netlify).
- Navegador: comprobar criterios 1-8 en desktop ancho normal y en `<=720px` (box4 apilado, Skills colapsado de inicio, sin scroll horizontal, scroll interno del box4 solo en desktop).
- Red: comprobar `GET /experiencia.json 200` en Network y estado de error con JSON bloqueado.
- Sin tests ni typecheck en este repo.

## 9. Riesgos / No romper

- Contenido más largo (3 empleos + 2 formaciones + cursos + idiomas) puede desbordar `box4` y deformar el grid `box2/box3` vs `box4`: mitigado con scroll interno desktop + flujo móvil; vigilar que no aparezca scroll horizontal por `word-wrap`/anchos fijos (`experiencia.scss` ya usa `box-sizing` y anchos relativos).
- Items de Skills sin icono (Kotlin, PL/SQL, Eclipse, Ollama, LM Studio, Windows, Spring Boot, WPF/MAUI): si se intentan importar iconos inexistentes rompe `build`; usar solo iconos ya presentes en `src/img/` y fallback de texto.
- Nuevo `fetch("/experiencia.json")`: usar ruta absoluta como `Proyectos.jsx:68`; la relativa fallaría en subrutas/build. En Netlify el JSON de `public/` se sirve en raíz, igual que `project.json`.
- Fechas Kamaleonte Mar–Jun 2026: son pasado reciente respecto a la fecha del spec (2026-10-02), no futuro; redactar en pasado.
- Discrepancia idiomas/7 años Alemania: no reintroducir la etapa de soldador como empleo; como mucho una línea de contexto del alemán alto. La bio no debe prometer tecnologías no demostradas.
- No tocar `public/_redirects`, `vite.config.js`, `index.html` (gtag, favicon, entry) ni reintroducir deuda documentada en `AGENTS.md`.

## 10. Futuros specs (mejoras detectadas, errores extra, ideas — no entran aquí)

- Ampliar `public/project.json` con TFG hostelería (MAUI/.NET/C#/XAML/API REST/MySQL) y app fitness (Java/Spring Boot/PostgreSQL/React/TS/Kotlin) + tags e imágenes — detectado en `references/Gabriel_Delgado_CV.docx.md:30`.
- Añadir iconos faltantes en `src/img/` (Kotlin, Eclipse, Ollama, LM Studio, Windows, Spring Boot, WPF/MAUI, PL/SQL) y referenciarlos en `Skills.jsx` — detectado en `src/components/habilidades/Skills.jsx:26-79` vs `CV:27`.
- Acordeón por sección en Experiencia (Empresas/Formación/Idiomas colapsables) como alternativa al scroll interno si la revisión visual lo pide — detectado en `src/components/experiencia/experiencia.scss:3-91`.
- Acordeón por categoría en Skills (el README ya lo lista como TODO) — detectado en `README.md:152`.
- Eliminar duplicado `src/_redirects` (solo vale `public/_redirects`) — detectado en `README.md:151` y `AGENTS.md:38`.
- Limpiar deuda `@emotion/*` / `@fontsource/roboto` (instalar o desinstalar) y `lato` sin importar en `perfil.scss` — detectado en `README.md:150` y `AGENTS.md:41`.
- Manejo de carga/error ya resuelto en `Proyectos.jsx:91-105`; el TODO antiguo del README sobre falta de loading/error en fetch ya no aplica a proyectos pero sí sirve de patrón para el nuevo JSON — detectado en `README.md:149`.

## Preguntas abiertas

- ¿Mencionamos en bio/idiomas los "7 años en Alemania" como contexto del alemán alto (sin detallar puesto de soldador) o lo omitimos del todo?
- ¿Skills en 5 categorías actuales reordenadas o en 6-7 categorías calcadas del CV (separando Control de versiones, IA/herramientas, SO/Windows)? ¿Windows debe ser visible como skill?
- ¿PL/SQL aparece como skill propia o dentro de SQL? ¿`Git Hub` se desdobla en Git + GitHub?
- ¿Qué `max-height` desktop para el scroll interno del box4 resulta cómodo sin dejar la página coja frente a Skills/Hobbies (p. ej. altura aproximada de `box2+box3`)?
- ¿Los cursos Udemy van todos en Formación o solo un resumen de una línea por curso para no alargar el box?

## 11. Checklist verificación (última, checkboxes listos para /verifier)

- [ ] CV depurado legible sin pipes ni barras de salto (`references/Gabriel_Delgado_CV.docx.md`)
- [ ] Box4 muestra Empresas con Kamaleonte + Nükrum + AICrop (rol, ubicación, fechas, bullets)
- [ ] Box4 muestra Formación separada (Ilerna + SocraTech + cursos Udemy resumidos)
- [ ] Idiomas según CV (ES nativo, DE alto, EN medio)
- [ ] Bio de Perfil actualizada con resumen del CV (`Perfil.jsx`)
- [ ] Skills con categorías en orden CV, toggle intacto (`Skills.jsx`)
- [ ] Experiencia renderiza desde `/experiencia.json` con carga/error (`Experiencia.jsx` + `public/experiencia.json`)
- [ ] Sin desbordamiento: scroll interno solo desktop, flujo natural en `<=720px`, sin scroll horizontal
- [ ] `npm run lint` cero warnings
- [ ] `npm run build` genera `dist/` OK
