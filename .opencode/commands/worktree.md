---
description: Crea worktree local + rama nueva sin cambiar de rama
---

Crea un git worktree local.

Nombre: usa `$ARGUMENTS` si viene (ej: `/worktree mi-rama`). Si viene vacío, deriva un nombre corto kebab-case del contexto actual de la conversación (ej: `fix-readme`, `feat-filtro`).

Sanea el nombre: minúsculas, espacios/_ a `-`, solo `[a-z0-9-/.]`, sin espacios.

Ejecuta EXACTAMENTE una vez, en la raíz del proyecto:
`git worktree add -b <nombre> .worktrees/<nombre>`

Reglas estrictas:
- No hagas `cd`, `checkout`, `switch`, ni cambies de rama.
- No modifiques ficheros ni hagas commit.
- Una vez creado, detente e informa path + rama creada.
