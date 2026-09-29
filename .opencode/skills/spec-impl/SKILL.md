---
name: spec-impl
description: Implementa un spec aprobado de specs/ paso a paso en rama local aparte, con pausa y commit por paso y checklist final sin auto-marcar
---

Implementa el spec indicado paso a paso. Uso: `/spec-impl specs/<nombre>-spec.md`.

### 0. Gate de aprobado (bloqueante, antes de nada)
1. Lee el fichero del spec con `read`. Si `$ARGUMENTS` viene vacío, pregunta qué spec implementar y detente hasta tener respuesta.
2. Busca con `grep` la línea `^Estado:\s*Aprobado` (case-insensitive) dentro del spec.
3. Si NO existe match exacto: detente de inmediato. Informa `Spec no aprobado: falta 'Estado: Aprobado'. Edítalo a mano para desbloquear.` No crees rama ni toques código.
4. No valen aprobaciones en chat, ni `approved` en otro formato, ni secciones libres. Solo esa línea. Nunca cambies tú el `Estado`.

### 1. Preparar trabajo en rama local
1. Detecta el contexto (solo lectura): `git branch --show-current` y `git status --porcelain`. Parte siempre desde la rama actual como base.
2. Deriva `<nombre>` del spec: nombre del fichero sin `specs/` ni `-spec.md`, saneado (minúsculas, espacios/_ a `-`, solo `[a-z0-9-/.]`).
3. Prefijo de rama: `feat/` por defecto, `fix/` si el spec es una corrección. Rama final: `<prefijo>/<nombre>` (ej: `feat/filtro-todo`).
4. Crea la rama y cambia a ella desde la raíz del proyecto:
   `git switch -c <rama>`
   Esto arrastra automáticamente los cambios sin commitear a la nueva rama (incluido el caso de estar en `main/master` con dirty). No hagas `stash` automático.
5. Si `<rama>` ya existe, usa `git switch <rama>` y avisa de la reutilización. Si el `switch` falla por conflicto con cambios sin commitear, detente e informa sin forzar ni commitear.
6. Prohibido `git worktree add`, `.worktrees/`, el parámetro `workdir` y `cd`. Todo el código y commits ocurren en la raíz del proyecto, en la rama de trabajo creada.

### 2. Bucle por pasos (pausa + commit por paso)
Lee `## 6. Plan de tareas` del spec y ejecuta en orden, un paso cada vez:
1. Relee la sección de diseño del spec (`## 4`) y los gotchas de `AGENTS.md` antes de cada paso: `fetch("/project.json")` (no `../../`), `public/_redirects` único válido, `vite.config.js` mínimo, `index.html` (`gtag G-ZQXX3KJ4TC`, favicon `devchallenges.png`, entry `/src/main.jsx`), no reintroducir deuda (`@emotion/*`, `@fontsource/roboto`, `count` sin usar, nieve con URLs `http://`).
2. Si la tarea toca React, aplica la skill `react-docs` (verifica en `es.react.dev`, cita URL).
3. Implementa SOLO esa tarea. No avances tareas futuras ni agrupes pasos.
4. Verifica en la raíz del proyecto: `npm run lint` (cero warnings) + `npm run build` (`dist/` OK). Si no hay `node_modules`, avisa y sigue sin bloquear.
5. Informa: qué cambió (`fichero:línea`), diff resumido, resultado de la verificación.
6. Pausa con `question`: opciones `seguir / ajustar / reintentar / parar`.
   - `seguir` → haz `git commit` en la raíz con mensaje `"<nombre-spec>: paso N - <qué>"` y pasa al siguiente paso.
   - `ajustar` → aplica la corrección pedida, vuelve a verificar, vuelve a pausar sin commitear aún.
   - `reintentar` → rehace el paso.
   - `parar` → detente sin más commits e informa estado.
7. Prohibido commitear sin tu `seguir` explícito.

### 3. Checklist final (en el mismo spec, sin auto-marcar)
1. Al terminar todos los pasos (o al parar), añade al final del MISMO fichero del spec la sección `## 9. Checklist verificación` si no existe.
2. Un `- [ ]` por cada criterio de `## 5. Criterios de aceptación` + uno para `lint` y otro para `build`. Ejemplo:
   `- [ ] El filtro Todo muestra los 9 proyectos`
   `- [ ] lint cero warnings`
   `- [ ] build genera dist/`
3. Reglas estrictas:
   - Nunca escribas `- [x]`. Solo tú marcas los checks a mano tras evaluarlos.
   - Nunca cambies `Estado:` a `Implementado` ni nada parecido. Eso lo haces tú a mano.
   - No crees ficheros `*-checks.md` separados ni anexos en otro sitio.

### 4. Cierre
Informa siempre: rama de trabajo creada, lista de commits de la rama (`git log --oneline`), path del spec con la checklist añadida y `Marca los checks y el Estado a mano cuando los verifiques en navegador + preview.`
