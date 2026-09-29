---
name: verifier
description: Verifica un spec de specs/ criterio por criterio (lint+build+codigo+docs+navegador) y solo marca [x] lo verificado con evidencia
---

Verifica el spec indicado criterio por criterio. Uso: `/verifier specs/<NNN>-<nombre>-spec.md` (ej: `/verifier specs/002-fix-errores-heredados-limpieza-spec.md`).

### 0. Gate de argumentos (bloqueante, antes de nada)
1. Lee el fichero del spec de `$ARGUMENTS` con `read`. Si `$ARGUMENTS` viene vacío, pregunta qué spec de `specs/` verificar y detente hasta tener respuesta.
2. Si el fichero no existe o no contiene `## 5. Criterios de aceptación` (o `## 5. Criterios de aceptacion`), detente e informa sin tocar nada.
3. Nunca cambies tú el `Estado:` del spec.

### 1. Inventario (solo lectura, sin marcar)
1. Extrae cada criterio de `## 5. Criterios de aceptación` y su correspondencia en `## 9. Checklist verificación`.
2. Si `## 9` no existe, créala al final del MISMO spec con un `- [ ]` por cada criterio de `## 5` + uno para `lint` y otro para `build`. Todos nacen en `[ ]`: en este paso no marques ninguno.
3. Clasifica cada criterio por tipo de evidencia necesaria: `lint` / `build` / `código (read/grep fichero:línea)` / `docs` / `navegador`.
4. Relee los gotchas de `AGENTS.md` antes de evaluar: `fetch("/project.json")` (no `../../`), `public/_redirects` único válido, `vite.config.js` mínimo, `index.html` (`gtag G-ZQXX3KJ4TC`, favicon `devchallenges.png`, entry `/src/main.jsx`), no reintroducir deuda (`@emotion/*`, `@fontsource/roboto`, `count` sin usar, nieve con URLs `http://`).

### 2. Evaluación criterio por criterio (solo lectura, sin editar el spec)
1. Base del repo (siempre): ejecuta en la raíz `npm run lint` (cero warnings) y `npm run build` (`dist/` OK). Si no hay `node_modules`, avisa y sigue sin bloquear.
2. Código: verifica con `read`/`grep` citando `fichero:línea` (props, fetch absoluto, rutas `/img/`, `<article>` sin `<a>` anidado, `target="_blank" rel="noreferrer noopener"`, `key` única, `0 / 0` + botones deshabilitados, `lang="es"`, fondo plano, grid `box1-box7`).
3. Si el criterio toca React (componente, hook, JSX, props, estado, efectos), aplica la skill `react-docs`: verifica en `es.react.dev` y cita la URL usada.
4. Si el criterio toca una librería, framework, SDK, API o tool (React, Vite, Sass, etc.), usa el MCP `context7`: `resolve-library-id` y luego `query-docs` con el ID exacto, y cita ID + URL. Vale también para React cuando aporte más que `react-docs`.
5. Si el criterio exige prueba visual o en web (filtro, paginación, estado vacío, enlaces, favicon, consola, network, responsive `<=720px`), usa el MCP `playwright` cuando esté disponible: `http://localhost:5173` (dev) + `npm run preview`, capturas, consola (mixed-content/404), network (`/project.json`, `/img/*`, favicon) y DOM. Si no hay MCP `playwright`, no marques ese criterio: déjalo en `[ ]` con la instrucción manual de comprobación en navegador.

### 3. Marcado (única escritura permitida, solo en `## 9` del MISMO spec)
1. Cambia `[ ]` → `[x]` ÚNICAMENTE en los criterios con evidencia passing (comando verde, `fichero:línea` confirmado, captura/log adjunto).
2. Los fallidos o no-verificables quedan en `[ ]` y se explican en el informe: motivo + `fichero:línea` + fix sugerido, sin aplicar el fix.
3. Reglas estrictas:
   - Nunca escribas `[x]` sin evidencia.
   - Nunca cambies `Estado:` ni lo marques como `Implementado`/`Verificado`. Eso lo haces tú a mano.
   - No crees ficheros `*-checks.md` separados ni anexos en otro sitio.
   - Prohibido corregir código, commitear o cambiar de rama: el agente nunca ejecuta `git add`, `git commit`, `git switch` ni crea worktrees. Los commits los haces tú a mano.

### 4. Informe
Publica tabla `criterio → ✅/❌ + evidencia` (salida de `lint`/`build`, `fichero:línea`, URL de `react-docs`/`context7`, captura o paso manual pendiente de `playwright`) y cierra con `Revisa y haz commit a mano del spec marcado.`
