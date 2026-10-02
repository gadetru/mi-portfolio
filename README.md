# Mi Portfolio — Gabriel Delgado Trujillo

Portfolio personal de una sola vista (SPA) estilo DevChallenges: presentación, tecnologías, hobbies, experiencia, filtro por tag + listado de proyectos paginado y footer social.

- **Autor:** Gabriel Delgado Trujillo — `gadetru@gmail.com` / `+34644172604`
- **Demo:** https://portfolio-gabriel-delgado.netlify.app/
- **GitHub:** https://github.com/gadetru/mi-portfolio
- **Stack:** React 18.2 + Vite 4.4.5 + Sass 1.69.5, ESLint 8.45. Sin router, sin store global, sin tests.

## Stack y versiones

| Paquete | Versión | Uso real |
|---|---|---|
| `react`, `react-dom` | `^18.2.0` | UI + `useState`/`useEffect` |
| `vite`, `@vitejs/plugin-react` | `^4.4.5`, `^4.0.3` | Dev server, build, HMR |
| `sass` | `^1.69.5` | Compila los `*.scss` |
| `eslint` + `eslint-plugin-react`, `react-hooks`, `react-refresh` | `^8.45.0` | `npm run lint` |
| `@emotion/react`, `@emotion/styled`, `@fontsource/roboto` | `^11.11.x`, `^5.0.8` | Instaladas pero **no importadas** en `src/` |

Scripts (`package.json`):
```bash
npm run dev      # vite --host -> http://localhost:5173
npm run build    # vite build -> dist/
npm run preview  # vite preview (probar build local)
npm run lint     # eslint . --ext js,jsx
```

## Estructura de carpetas

```
mi-portfolio/
├── index.html              # #root + /src/main.jsx + gtag G-ZQXX3KJ4TC + favicon devchallenges.png
├── vite.config.js          # solo plugins:[react()]
├── .eslintrc.cjs           # browser+es2020, react 18.2, react-refresh
├── devchallenges.png       # favicon
├── public/
│   ├── _redirects          # /* /index.html 200 (Netlify SPA) -> único válido
│   ├── project.json        # 9 proyectos (fuente de datos)
│   ├── fonts/              # Montserrat-VariableFont_wght.ttf (@font-face, ruta /fonts/...)
│   └── img/                # recipe.webp, portfolio.webp/png, node-form.png, my-team1.webp,
│                           # my-blog.webp, mi-portfolio.webp, espantapajaro.webp, edie.webp,
│                           # consultant.webp, check-out.webp, fondo-bosque.jpg (fondo body)
└── src/
    ├── main.jsx            # ReactDOM.createRoot -> <App/> en StrictMode
    ├── App.jsx             # único estado global `filtro`, grid box1-box7
    ├── app.scss            # variables $bosque-*, Montserrat, grid 2 cols
    ├── _redirects          # duplicado, NO se publica (solo vale public/_redirects)
    ├── img/ (37)           # mi-perfil.webp (perfil), yomismo.webp, perfil1.jpg, bolso.jpg,
    │                       # bici.jpg, bici2.png + montaña.jpg (hobbies),
    │                       # react/javascript/html/css/sass/node/mongoIcon/mysql/typeScript/
    │                       # angularIcon/gitIcon/opencode (base spec 001) +
    │                       # java/csharp/dotnet/intellij/visualstudio/vscode/androidstudio/
    │                       # sqlserver/xml/xaml (spec 006),
    │                       # correo-electronico.svg/png, telefono-movil.svg/png (perfil),
    │                       # flecha-izquierda/correcta.png, gitcat.png, linkedin.png
    └── components/
        ├── perfil/Perfil.jsx + perfil.scss
        ├── habilidades/Skills.jsx + skills.scss   # 5 categorías + toggle colapsable
        ├── entretenimiento/Hobbies.jsx + hobbies.scss  # compacto (img 140px)
        ├── experiencia/Experiencia.jsx + experiencia.scss
        ├── filtro/Filtrado.jsx + filtrado.scss
        ├── proyectos/Proyectos.jsx + proyecto.scss
        ├── hojas/Hojas.jsx + hojas.scss          # hojas otoñales (sustituye nieve)
        └── footer/Footer.jsx + footer.scss
```

Layout en `src/app.scss`: `grid-template-columns: 1fr 2fr`:
`box1` Perfil full-width, `box2` Skills, `box3` Hobbies, `box4` Experiencia (2 filas derecha), `box5` Filtro, `box6` Proyectos, `box7` Footer. A `<=720px` todo apilado a 1 columna.

## Componentes

| Componente | Ruta | Qué renderiza | Props / Estado |
|---|---|---|---|
| `Perfil` | `src/components/perfil/Perfil.jsx` | Foto `mi-perfil.webp` (fluida, contenida en card a 360–390px), nombre + `Full Stack developer`, `mailto:gadetru@gmail.com`, `tel:+34644172604` (iconos 28px), bio | Sin props |
| `Skills` | `src/components/habilidades/Skills.jsx` | `Tecnologías:` 22 items en 5 categorías (Lenguajes, Marcas, Frameworks, Bases de datos, IDEs/entornos) + toggle colapsable (`button[aria-expanded]`; nace expandido en desktop, colapsado en `<=720px`) | Estado local `abierta`, PNG de `../../img/` |
| `Hobbies` | `src/components/entretenimiento/Hobbies.jsx` | `Mis Hobbies:` 2 cards compactas (img 140px): `bici2.png` Ciclismo trail/enduro, `montaña.jpg` Senderismo/acampar | Sin props |
| `Experiencia` | `src/components/experiencia/Experiencia.jsx` | `Experiencia:` Nükrum Technologies (médico: HTML/SASS/Node/React/MySQL/Azure/Bitbucket/Figma), AIcrop (invernaderos + SCRUM/GitHub), idiomas (ES materna, DE B2, EN básico), `Formación:` socraTech | Contenido hardcodeado |
| `Filtrado` | `src/components/filtro/Filtrado.jsx` | 5 botones: Maquetación (`maquetado`), React (`React`), JavaScript (`JS`), Node (`node`), Todo (`""`) | `onFilterChange(fn)`, estado local `filtro`, clase `activa` |
| `Proyectos` | `src/components/proyectos/Proyectos.jsx` | Grid cards + paginador `‹ actual/total ›`. Card = link a `url_despliegue` con img, `#tag`, título, descripción, botón `Código` a GitHub | `filtro:string`, `projects[]`, `currentPage`, `itemsPerPage` adaptativo |
| `Hojas` | `src/components/hojas/Hojas.jsx` | Hojas otoñales animadas sobre el fondo (sustituye la antigua nieve) | Sin props |
| `Footer` | `src/components/footer/Footer.jsx` | `Creado por: Gabriel Delgado Trujillo` + LinkedIn / GitHub `gadetru` | Sin props |

### Flujo filtro → proyectos

1. `App.jsx` tiene `const [filtro, setFiltro] = useState("")`.
2. `Filtrado onFilterChange={setFiltro}` actualiza ese estado.
3. `Proyectos filtro={filtro}` hace `projects.filter(p => p.tag.includes(filtro))` (substring, case-sensitive).
4. Paginación en `Proyectos.jsx`: `itemsPerPage` por `window.innerWidth` (`<=480:1`, `<=800:2`, `<=1200:3`, `>1200:4`) con listener `resize` + cleanup. `totalPages = ceil(filtrados/itemsPerPage)`, reset a `1` si el filtro deja la página fuera de rango.

## Fuente de datos: `public/project.json`

Array de 9 objetos:
```json
{
  "id": 8,
  "url_imagen": "./img/portfolio.png",
  "tag": "React,JS",
  "titulo": "Mi portfolio",
  "descripcion": "mi mismo portfolio...",
  "url_github": "https://github.com/gadetru/mi-portfolio",
  "url_despliegue": "https://portfolio-gabriel-delgado.netlify.app/"
}
```
Tags usados: `maquetado (2)`, `React (4 + 2 mixtos React,JS)`, `node,JS (1)`. Imágenes resueltas desde `public/img/`.

> Nota: `Proyectos.jsx` hace `fetch("/project.json")` (ruta absoluta, robusta en Vite y en subrutas del build).

## Estilos

- Variables bosque en `app.scss`: `$bosque-fondo-base:#121c14, $bosque-superficie (rgba translúcida) / $bosque-superficie-solida, $bosque-borde, $bosque-texto, $bosque-texto-sec, $bosque-acento:#e67e22, $bosque-sombra`. Se conservan `$Gray-*` (jerarquía de texto) y `$Blue-1` sin borrar.
- Fuente `montserrat` vía `@font-face` a `/fonts/Montserrat-VariableFont_wght.ttf` (en `public/fonts/`). `Merienda One` de Google Fonts importada pero no aplicada. `lato` referenciada en `perfil.scss` sin importar.
- Fondo: foto `public/img/fondo-bosque.jpg` + velo + `Hojas` (hojas otoñales animadas, assets locales; la antigua nieve con URLs externas ya no existe).
- Cards oscuras translúcidas `radius 24px` + sombras + `blur(10px)`, hover `scale(1.1)`. Breakpoints de cards proyectos: `800-1200px 33%`, `480-800px 50%`, `<=480px 95%`.
- Skills colapsable: `.skill{height:auto}` + `box2/box3{align-self:start}` para que colapsado no deje hueco frente a Experiencia. Hobbies compacto: imágenes `height:140px` (`min-height:90px`).

## Guía de construcción

Requisitos: Node 18+ y npm.

```bash
# 1. Instalar
npm install

# 2. Desarrollo (expone en red por --host)
npm run dev
# abre http://localhost:5173

# 3. Lint
npm run lint

# 4. Build producción
npm run build
# genera dist/

# 5. Previsualizar build
npm run preview
```

Sin variables de entorno. Sin backend. Los datos salen de `public/project.json`.

### Despliegue Netlify

- `public/_redirects` contiene `/* /index.html 200` para SPA.
- Publicar `dist/` con `npm run build`.
- Analytics: `gtag.js G-ZQXX3KJ4TC` hardcodeado en `index.html`.

## Mejoras conocidas / TODO

- [ ] Sin `loading` / error handling en el fetch de proyectos.
- [ ] Limpiar deps no usadas o importarlas (`@emotion`, `@fontsource/roboto`).
- [ ] Eliminar `src/_redirects` duplicado.
- [ ] Acordeón por categoría en Skills (el spec 006 preveía plegar cada categoría; hoy el toggle es global para todo el bloque).
