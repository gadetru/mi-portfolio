---
name: spec
description: Genera spec de implementación (plan) sin escribir código. Usar cuando se pida planificar en specs/, plan de implementación o Spec-Driven antes de picar código.
---

Genera un plan de implementación Spec-Driven. NO escribas código.

Nombre: usa `$ARGUMENTS` si viene (ej: `/spec fix-fetch-project-json`). Si viene vacío, deriva un nombre corto kebab-case del contexto de la conversación (ej: `filtro-todo`, `fetch`).

Sanea el nombre: minúsculas, espacios/_ a `-`, solo `[a-z0-9-/.]`, sin espacios.

Numeración: cada spec lleva prefijo secuencial de 3 dígitos. Lista con `glob` los `specs/*-spec.md`, extrae los prefijos `^(\d+)-` y elige el menor `NNN` libre empezando en `001` (los números de specs borrados se reutilizan). Si `$ARGUMENTS` ya trae prefijo numérico (`/spec 002-mi-cambio`), respétalo tras sanear.

Destino: `specs/<NNN>-<nombre>-spec.md` (ej: `specs/002-fetch-project-json-spec.md`). Si `specs/` no existe, créalo. Si el destino ya existe, no sobrescribas: avisa y detente hasta tener otro nombre.

Ejecuta estos 5 pasos, en orden, solo con herramientas de lectura (`read`, `glob`, `grep`, `bash` read-only):

### 1. Contexto (solo lectura)
Lee obligatoriamente antes de preguntar:
- `AGENTS.md` y `README.md` (stack, arquitectura, gotchas)
- `src/App.jsx` (estado `filtro`, grid `box1-box7`)
- Componente/s afectado/s en `src/components/*/*.jsx` + su `.scss`
- `public/project.json` si toca datos/tags (`maquetado, React, JS, node`, case-sensitive)
- `src/app.scss` si toca layout/grid/variables (`$Gray-*, $Blue-1`, breakpoint `<=720px`)

Resume en 5-10 líneas: qué boxes toca, flujo `Filtrado onFilterChange -> Proyectos tag.includes(filtro)`, paginación por `window.innerWidth (1/2/3/4)`, fuente datos. Cita `fichero:línea`.

### 2. Interrogatorio obligatorio (arquitectura + alcance)
Antes de redactar, llama a `question` con 5-10 preguntas. Mitad arquitectura, mitad alcance. Adapta según la idea, pero cubre siempre:
- Arquitectura: ¿qué boxes/grid `box1-box7` toca? ¿1 o 2 columnas? ¿comportamiento a `<=720px`?
- Estado: ¿nuevo estado en `App.jsx` o local al componente? ¿qué props cambian?
- Datos: ¿toca `project.json`/tags? ¿corrige `fetch("../../project.json")` a `/project.json`?
- Estilos: ¿nuevo `.scss` o reutiliza variables existentes? ¿imágenes en `public/img/` o `src/img/`?
- Responsive: ¿afecta a `itemsPerPage 1/2/3/4` o breakpoints de cards (`<=480/800/1200`)?
- Alcance: objetivo, no-objetivos, criterios de aceptación verificables en navegador, verificación `lint + build`.

Si falta info, pregunta en vez de asumir. No avances al paso 3 sin respuestas o sin que el usuario te diga "sigue con supuestos".

### 3. Diseño mínimo
Describe solo lo necesario, sin código:
- Componentes a tocar/crear, props/estado.
- Estilos: variables, grid, breakpoints.
- Datos: cambios en `project.json`, tags, `fetch`.
- Qué NO se toca (gotchas `AGENTS.md`): `fetch` frágil, `public/_redirects` único válido (`src/_redirects` ignorado), `vite.config.js` mínimo, `index.html` (`gtag G-ZQXX3KJ4TC`, favicon `devchallenges.png`, entry `/src/main.jsx`), no reintroducir deuda (`@emotion/*`, `@fontsource/roboto`, `count` sin usar, nieve con URLs `http://`).

### 4. Plan de tareas
Lista numerada de tareas pequeñas, cada una con fichero/s implicado/s. Última tarea siempre:
- Verificación = `npm run lint` (cero warnings) + `npm run build` (`dist/` OK). Sin tests ni typecheck en este repo.

### 5. Generar spec y parar
Escribe `specs/<NNN>-<nombre>-spec.md` con esta plantilla:

```md
# <título>
Estado: Borrador
## 1. Objetivo / No-objetivos
## 2. Contexto arquitectura (App.jsx, boxes, filtro, project.json, scss)
## 3. Requisitos funcionales + no-funcionales
## 4. Diseño (componentes, props/estado, estilos, datos, responsive)
## 5. Criterios de aceptación verificables
## 6. Plan de tareas
## 7. Verificación (lint cero warnings + build dist/)
## 8. Riesgos / No romper (ver paso 3)
## Preguntas abiertas
```

El spec nace como `Estado: Borrador`. Solo tú puedes cambiarlo a mano a `Estado: Aprobado` para desbloquear `/spec-impl`. El agente nunca cambia el `Estado`.

Reglas estrictas:
- NO uses `edit`, `write` (salvo para el spec), ni `bash` que modifique. No hagas `cd`, `checkout`, `switch`, commit ni cambios en `src/`, `public/`, `index.html`, `vite.config.js`.
- Una vez escrito el spec, detente e informa: path del spec + resumen de 3-5 líneas + `Responde OK para implementar o dime qué ajustar.`
- Prohibido seguir a código sin aprobación explícita del usuario.
