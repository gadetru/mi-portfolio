# Integración bosque con cards oscuras translúcidas y velo sutil
Estado: aprobado
Depende de: specs/003-fondo-hojas-cayendo-spec.md (asume Hojas con z-index, pointer-events, repelencia y paleta otoñal; el velo y las cards se diseñan para convivir con esa capa sin taparla)
Fecha de creación: 2026-10-01
Descripción: Conservar la foto de bosque como fondo protagonista con un velo sutil y unificar todas las cards en un sistema oscuro translúcido inspirado en el bosque que elimine el blanco puro, el efecto recorte y las sombras para fondo claro. Solo SCSS, sin tocar layout, datos ni estado.

## 1. Objetivo
Mantener fondo-bosque.jpg visible como identidad del portfolio y lograr que las cards asienten sobre la foto con un único sistema oscuro translúcido coherente con el bosque y las hojas otoñales, resolviendo los tres problemas detectados: blanco puro que choca con el verde, opacidad total que produce efecto recorte pegado, y sombras y bordes pensados para fondo claro. Sin estado nuevo, sin cambios de layout y sin regresión de filtro, paginación ni animación de hojas.

## 2. Alcance (entra / no entra)
Entra:
- Conservar background-image fondo-bosque.jpg en body con mismo cover, center top y fixed, añadiendo un velo sutil oscuro-verdoso que asiente las cards sin ocultar la foto.
- Unificar todas las cards con el mismo sistema oscuro bosque translúcido: box1 Perfil, box2 Skills, box3 Hobbies, box4 Experiencia, box5 Filtro, box6 Proyectos, evaluando box7 Footer para coherencia.
- Tratar los tres problemas a la vez: sustituir blanco puro por superficie oscura, fundir card con foto mediante translucidez más blur más borde luminoso sutil, y sustituir sombras ligeras por sistema de sombras profundas para foto.
- Añadir paleta bosque en app.scss inspirada en la foto y en los ocres de Hojas, reutilizando grises solo para jerarquía de texto.
- Adaptar textos, enlaces de contacto, botones de filtro con estado activa, botones Web y Código, y paginador al fondo oscuro manteniendo legibilidad.
- Mantener Hojas otoñales tal cual, visibles detrás del contenido y sin bloquear clics.
No entra:
- Eliminar ni sustituir la foto de fondo, ni usar fondos planos, nuevas fotos ni assets externos.
- Cambios de grid box1-box7, apilado a 720px o menos, itemsPerPage 1/2/3/4 ni breakpoints de cards 480/800/1200.
- Nuevo estado en App.jsx, nuevas props, toggle de tema ni persistencia.
- Cambios en project.json, tags con case-sensitive, fetch, filtro por substring ni paginación.
- Atenuar, reducir ni rediseñar las hojas en este spec.
- Cambios en redirects, vite.config.js, index.html, nuevas dependencias ni reintroducción de deuda.

## 3. Contexto arquitectura (App.jsx, boxes, filtro, project.json, scss)
- Entrada src/main.jsx hacia src/App.jsx. App.jsx solo tiene el estado filtro y compone el grid box1-box7 en src/app.scss. Monta Hojas sin estado nuevo. Citas: src/App.jsx:14, src/App.jsx:20-28, src/app.scss:43-92, src/app.scss:94-143.
- Flujo Filtrado onFilterChange hacia Proyectos con filtrado por tag includes case-sensitive. Citas: src/App.jsx:26-27, src/components/proyectos/Proyectos.jsx:48-50.
- Paginación adaptativa por window.innerWidth con listener y cleanup, reset a página 1 si el filtro deja la página fuera de rango. Citas: src/components/proyectos/Proyectos.jsx:19-45, src/components/proyectos/Proyectos.jsx:56-60.
- Datos en public/project.json con 9 proyectos y tags maquetado, React, JS, node. Fetch ya en ruta absoluta correcta. Citas: public/project.json:1-84, src/components/proyectos/Proyectos.jsx:68.
- Fondo actual con foto de bosque fija más capa fixed de hojas otoñales con repelencia al ratón y respeto a prefers-reduced-motion. Citas: src/app.scss:20-31, src/components/hojas/hojas.scss:5-12, src/components/hojas/Hojas.jsx:8-17, src/components/hojas/Hojas.jsx:35-132.
- Cards actuales todas en blanco opaco con radios 12-24px y sombra ligera, origen de los tres problemas. Citas: src/components/perfil/perfil.scss:10, src/components/habilidades/skills.scss:6, src/components/entretenimiento/hobbies.scss:5, src/components/experiencia/experiencia.scss:13, src/components/filtro/filtrado.scss:14, src/components/proyectos/proyecto.scss:47.
- La foto de fondo existe como asset local. Cita: public/img/fondo-bosque.jpg.

## 4. Requisitos funcionales + no-funcionales
- RF1 La foto de bosque sigue visible como fondo en dev y build, con velo sutil que mejora el asiento sin convertirla en fondo plano.
- RF2 Todas las cards incluidas comparten el mismo sistema oscuro bosque: superficie oscura translúcida, blur de fondo, borde claro translúcido fino, sombra profunda y radios actuales.
- RF3 Sin restos de blanco puro en superficies de card. Textos principales claros y secundarios en tono tierra claro legible sobre oscuro.
- RF4 Botones de filtro con estado activa, enlaces Web y Código, y paginador legibles y con feedback hover coherente con la paleta bosque.
- RF5 Las hojas otoñales siguen cayendo detrás del contenido con su densidad, tamaño y repelencia actuales, y no bloquean clics.
- RF6 Sin estado nuevo en App.jsx y sin cambios de props en Perfil, Skills, Hobbies, Experiencia, Filtrado, Proyectos, Footer y Hojas.
- RNF1 Solo cambios en ficheros SCSS más variables en app.scss. Sin regresión de layout en desktop ni a 720px o menos.
- RNF2 Verificación con lint cero warnings más build con dist OK. Sin tests ni typecheck en este repo.
- RNF3 Sin peticiones externas nuevas, sin 404 de assets y sin reintroducir deuda eliminada.

## 5. Criterios de aceptación verificables
- CA1 En dev y preview se ve la foto de bosque con un velo sutil uniforme, sin zonas planas que la oculten.
- CA2 Ninguna card incluida muestra blanco puro: Perfil, Skills, Hobbies, Experiencia, Filtro y Proyectos comparten superficie oscura translúcida con blur y borde coherente.
- CA3 Las cards ya no parecen recortes pegados: bordes y blur las funden con la foto en desktop y en móvil.
- CA4 Textos, enlaces de contacto, botones de filtro con activa, botones Web y Código, y paginador se leen con contraste suficiente sobre oscuro.
- CA5 Las hojas otoñales siguen visibles con su comportamiento actual y filtro, paginación, cards y enlaces siguen clicables.
- CA6 Grid box1-box7 sin regresión en desktop y a 720px o menos con una sola columna apilada.
- CA7 Filtrado por tag y paginación 1/2/3/4 funcionan igual tras el cambio solo visual.
- CA8 Consola sin mixed-content ni 404 relacionados con fondo o estilos.

## 6. Diseño (componentes, props/estado, estilos, datos, responsive)
- Componentes a tocar solo en estilos: app.scss para velo más variables, más perfil.scss, skills.scss, hobbies.scss, experiencia.scss, filtrado.scss, proyecto.scss y footer.scss si aplica para coherencia. Ningún fichero JSX cambia.
- Props y estado: sin cambios. App.jsx sin estado nuevo. Hojas sin props ni cambios de densidad. Filtrado mantiene onFilterChange y clase activa. Proyectos mantiene prop filtro y estados internos de paginación, carga y error.
- Estilos fondo: mantener url de fondo-bosque.jpg con cover, center top y fixed, combinada en la misma propiedad de fondo con un gradiente de velo oscuro-verdoso semitransparente por delante de la imagen para no crear capas nuevas ni peleas de z-index con hojas-capa y grid. Velo contenido para que la foto siga protagonista.
- Estilos cards: superficie oscura bosque translúcida con blur moderado y fallback opaco para navegadores sin soporte, borde fino claro translúcido, sombra profunda más sombra interior sutil, manteniendo radios actuales. Panificar opacidad y blur para que la foto se intuya sin romper legibilidad.
- Estilos texto y acentos: títulos en claro, cuerpo secundario en tierra claro, acentos en ocres coherentes con Hojas. Decidir en implementación si el azul actual se conserva solo para enlaces o migra a ocre bosque para no chocar con verdes y marrones. Revisar scrollbar de descripción, hovers con escala y estado activa del filtro para el tema oscuro.
- Variables: reutilizar grises para texto y añadir pocas variables nuevas en app.scss para superficie bosque, borde translúcido, texto claro y acento ocre.
- Datos: no se tocan project.json, tags, fetch ni imágenes de proyectos en public/img.
- Responsive: no se altera. Se mantienen grid de app.scss, paginación por ancho de ventana y breakpoints de proyecto.scss. Solo se verifica que translucidez, blur y velo no rompen a 480, 800, 1200 y 720.
- Qué NO se toca (gotchas AGENTS.md): fetch en ruta absoluta, public/_redirects como único válido con src/_redirects ignorado, vite.config.js mínimo, index.html con gtag, favicon y entry, no reintroducir deuda de emotion, fontsource roboto, count sin usar ni nieve con URLs externas.

## 7. Plan de tareas
1. src/app.scss — conservar foto de bosque con velo sutil en la misma propiedad de fondo y añadir variables de paleta bosque reutilizando las existentes.
2. src/components/perfil/perfil.scss — aplicar sistema oscuro bosque translúcido y texto claro manteniendo layout.
3. src/components/habilidades/skills.scss — aplicar sistema oscuro bosque translúcido y texto claro.
4. src/components/entretenimiento/hobbies.scss — aplicar sistema oscuro bosque translúcido y texto claro.
5. src/components/experiencia/experiencia.scss — aplicar sistema oscuro bosque translúcido y texto claro.
6. src/components/filtro/filtrado.scss — adaptar botonera, botones y estado activa a oscuro bosque con acento bosque.
7. src/components/proyectos/proyecto.scss — adaptar cards, descripción, enlaces Web y Código, hovers y paginador a oscuro bosque.
8. src/components/footer/footer.scss — evaluar y adaptar footer para coherencia con el sistema.
9. Verificación = npm run lint (cero warnings) + npm run build (dist/ OK) + comprobación visual en dev y preview en desktop y 720px o menos con consola limpia. Sin tests ni typecheck en este repo.

## 8. Verificación (lint cero warnings + build dist/)
- npm run lint con cero errors y cero warnings.
- npm run build genera dist/ sin errores y npm run preview sirve la app con bosque más cards oscuras.
- Revisión visual en navegador: bosque visible con velo, cards oscuras coherentes sin blanco puro ni efecto recorte, contraste legible, hojas visibles con clics intactos, grid sin regresión, filtro y paginación funcionales, consola sin mixed-content ni 404.

## 9. Riesgos / No romper
- El blur tiene coste GPU y soporte desigual: usar valores moderados y fallback opaco para evitar jank en móvil.
- Riesgo de bajo contraste en textos secundarios sobre translúcido con foto detrás: revisar jerarquía a tierra claro y probar sobre zonas claras y oscuras de la foto.
- El velo si se pasa de opacidad mata la foto, si se queda corto no asienta las cards: buscar punto sutil y uniforme.
- Migración del azul a ocre: si se mantiene el azul puede chocar con la paleta bosque, si se quita del todo puede perderse identidad de enlaces y botones. Decidir y aplicar de forma coherente en filtro, enlaces y paginador.
- No tocar fetch, redirects, vite.config, index.html ni reintroducir dependencias o assets externos.

## 10. Futuros specs (mejoras detectadas, errores extra, ideas — no entran aquí)
- Toggle de tema claro y oscuro con estado en App.jsx y persistencia, detectado en interrogatorio de este spec.
- Reducir densidad de hojas a 720px o menos si el blur provoca jank, detectado en src/components/hojas/Hojas.jsx.
- Variantes estacionales de hojas y velo con cambio por época manteniendo el bosque, continuación de specs/003-fondo-hojas-cayendo-spec.md.
- Limpieza de fuente lato referenciada en perfil.scss sin importar y Merienda One importada sin aplicar, detectado en src/components/perfil/perfil.scss:83.
- Revisar scrollbar azul de descripción en proyecto.scss para el tema oscuro bosque, detectado en src/components/proyectos/proyecto.scss:15-37.
- Unificar lang es en index.html y eliminar src/_redirects duplicado, detectado en README y AGENTS.md.

## Preguntas abiertas
- ¿Velo más neutro-negro o más verde-bosque?
- ¿Azul actual fuera y todo a ocre y tierra, o azul solo para enlaces?
- ¿Footer entra definitivamente en el sistema o se deja fuera para no tocar box7?
- ¿Mismo blur en móvil y desktop o valor más contenido en móvil por rendimiento?

## 11. Checklist verificación (última, checkboxes listos para /verifier)
- [ ] CA1 En dev y preview se ve la foto de bosque con un velo sutil uniforme, sin zonas planas que la oculten
- [ ] CA2 Ninguna card incluida muestra blanco puro: Perfil, Skills, Hobbies, Experiencia, Filtro y Proyectos comparten superficie oscura translúcida con blur y borde coherente
- [ ] CA3 Las cards ya no parecen recortes pegados: bordes y blur las funden con la foto en desktop y en móvil
- [ ] CA4 Textos, enlaces de contacto, botones de filtro con activa, botones Web y Código, y paginador se leen con contraste suficiente sobre oscuro
- [ ] CA5 Las hojas otoñales siguen visibles con su comportamiento actual y filtro, paginación, cards y enlaces siguen clicables
- [ ] CA6 Grid box1-box7 sin regresión en desktop y a 720px o menos con una sola columna apilada
- [ ] CA7 Filtrado por tag y paginación 1/2/3/4 funcionan igual tras el cambio solo visual
- [ ] CA8 Consola sin mixed-content ni 404 relacionados con fondo o estilos
- [ ] npm run lint con cero errors y cero warnings
- [ ] npm run build genera dist/ sin errores y preview sirve la app con bosque más cards oscuras
