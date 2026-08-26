# ⚽ Club Cancha — Sistema de Turnos para Canchas de Fútbol y Pádel

Trabajo Práctico N.º 2 — **HTML5 + CSS3 (Flexbox, Grid, Variables CSS y Responsive Design)**
Tecnicatura Universitaria en Programación.

---

## 👥 Integrantes

| Integrante | Sección a cargo | Rama de trabajo |
|---|---|---|
| Lourdes Ortega | Inicio (`index.html`) + hoja de estilos base | `home` |
| Belén Bulacio | Contacto (`contacto.html`) | `contacto` |
| Emilse | Reservar turno (`reservar.html`) | `reservar` |
| Analía | Canchas (`canchas.html`) | `canchas` |
| Laura | Horarios (`horarios.html`) | `horarios` |

> Completar apellidos antes de la entrega.

---

## 📌 Descripción breve

Sitio web de un club deportivo que permite **gestionar los turnos de las canchas de fútbol y pádel**.
El visitante puede ver el catálogo de canchas con sus precios, consultar la grilla de
disponibilidad hora por hora, solicitar una reserva mediante un formulario y comunicarse
con la administración.

El proyecto parte del TP de HTML anterior y lo transforma en una **interfaz web completa**,
aplicando una hoja de estilos externa con variables CSS, Flexbox, CSS Grid y diseño responsive.

---

## 🛠️ Tecnologías utilizadas

- **HTML5** semántico (`header`, `nav`, `main`, `section`, `article`, `aside`, `footer`)
- **CSS3**: variables (`:root` / `var()`), Flexbox, CSS Grid, Media Queries, `clamp()`, transiciones
- **Google Fonts** — tipografías Poppins (títulos) e Inter (texto)
- **Git y GitHub** — ramas, commits descriptivos y Pull Requests
- **Visual Studio Code**

---

## 📂 Estructura del proyecto

```
trabajoPractico-programacion4/
├── img/
│   ├── cancha-futbol5.svg
│   ├── cancha-futbol7.svg
│   ├── cancha-padel.svg
│   └── cancha-tenis.svg
├── css/
│   └── styles.css          <-- ÚNICA hoja de estilos del proyecto
├── index.html              <-- Inicio
├── canchas.html            <-- Catálogo de canchas
├── horarios.html           <-- Grilla de disponibilidad
├── reservar.html           <-- Formulario de reserva
├── contacto.html           <-- Datos de contacto y consultas
├── robots.txt              <-- SEO
├── sitemap.xml             <-- SEO
└── README.md
```

---

## 🎨 ¿Dónde utilizamos **Flexbox**?

Flexbox se usa para acomodar elementos **en una sola dirección** (una fila o una columna).
Lo elegimos donde los elementos tienen tamaños distintos y necesitamos alinearlos o separarlos.

| Dónde | Clase CSS | Para qué |
|---|---|---|
| Estructura general de la página | `body` + `main` | `flex-direction: column` + `flex: 1` en `main` mantiene el **footer siempre abajo** aunque la página tenga poco contenido. |
| Barra de navegación | `.cabecera__inner` | `justify-content: space-between` deja el logo a la izquierda y el menú a la derecha; `flex-wrap` hace que bajen solos en celular. |
| Menú de links | `.nav__lista` | Alinea los 5 links en fila con `gap` uniforme, sin usar `float` ni márgenes manuales. |
| Botones del hero | `.hero__acciones` | Los botones se centran y, en celular, se apilan en columna. |
| Tarjetas | `.tarjeta` / `.tarjeta__cuerpo` | `flex: 1` + `margin-top: auto` hacen que **todas las tarjetas queden del mismo alto** y el botón siempre pegado abajo. |
| Campos de formulario | `.campo` | Columna: etiqueta arriba, input abajo. |
| Casilleros de turno | `.turno` | Columna centrada: la hora arriba y la pastilla de estado abajo. |
| Referencias de colores | `.referencias` | Fila centrada que se envuelve sola. |
| Lista de datos de contacto | `.lista-contacto li` | Ícono a la izquierda, texto a la derecha, alineados arriba. |

---

## 🔲 ¿Dónde utilizamos **CSS Grid**?

Grid se usa para maquetar **en dos dimensiones** (filas y columnas al mismo tiempo).
Lo elegimos para las galerías de tarjetas y los layouts de dos columnas.

| Dónde | Clase CSS | Configuración |
|---|---|---|
| Funciones principales (Inicio) | `.grid-funciones` | `repeat(auto-fit, minmax(16rem, 1fr))` — se acomoda sola: 1 columna en celular, 2 en tablet, 3 en escritorio. |
| Catálogo de canchas | `.grid-canchas` | `repeat(auto-fit, minmax(15rem, 1fr))` y en escritorio `repeat(4, 1fr)`. |
| Grilla de horarios | `.grid-horarios` | `repeat(auto-fit, minmax(9rem, 1fr))` — muestra todos los turnos que entren por fila. |
| Página de Contacto | `.grid-contacto` | 1 columna en celular → `2fr 3fr` en escritorio (datos + formulario). |
| Página de Reservar | `.grid-reserva` | 1 columna en celular → `3fr 1.5fr` en escritorio (formulario + avisos). |
| Formularios | `.formulario` | 1 columna en celular → `repeat(2, 1fr)` en tablet. Los campos largos usan `grid-column: 1 / -1`. |
| Pie de página | `.pie__grid` | `repeat(auto-fit, minmax(14rem, 1fr))` para las tres columnas del footer. |
| Íconos circulares | `.tarjeta__icono` | `place-items: center` centra vertical y horizontalmente en una sola línea. |

---

## 🎨 ¿Qué **variables CSS** creamos?

Todas están declaradas en `:root` (elemento raíz del documento) y se usan con `var(--nombre)`.
Así, cambiando **un solo valor** se actualiza todo el sitio.

**Colores de marca**
`--color-primario` · `--color-primario-oscuro` · `--color-primario-claro` · `--color-secundario` · `--color-secundario-oscuro`

**Colores de interfaz**
`--color-fondo` · `--color-superficie` · `--color-oscuro` · `--color-texto` · `--color-texto-suave` · `--color-texto-claro` · `--color-borde`

**Colores de estado de turno**
`--color-disponible` · `--color-disponible-fondo` · `--color-ocupado` · `--color-ocupado-fondo` · `--color-pendiente` · `--color-pendiente-fondo`

**Tipografías y tamaños**
`--fuente-titulos` · `--fuente-texto` · `--fs-h1` · `--fs-h2` · `--fs-h3` · `--fs-base` · `--fs-chico`

**Espaciado** (escala de múltiplos de 8 px)
`--esp-1` (0.5rem) · `--esp-2` (1rem) · `--esp-3` (1.5rem) · `--esp-4` (2rem) · `--esp-5` (3rem) · `--esp-6` (4rem)

**Bordes, sombras y layout**
`--radio` · `--radio-chico` · `--radio-pastilla` · `--borde` · `--sombra` · `--sombra-fuerte` · `--ancho-contenedor` · `--transicion`

---

## 📱 ¿Cómo implementamos el **Responsive Design**?

Trabajamos con la metodología **Mobile First**: primero escribimos los estilos del celular
y con `min-width` vamos **agregando** reglas para pantallas más grandes.

1. **`<meta name="viewport">`** en todas las páginas, para que el celular no simule una pantalla de escritorio.
2. **Unidades relativas** en lugar de píxeles fijos: `rem`, `%`, `fr`, `vh`, `ch`.
3. **Grillas que se adaptan solas** con `repeat(auto-fit, minmax(Xrem, 1fr))`, sin necesidad de media queries.
4. **Tipografía fluida** con `clamp(mínimo, ideal en vw, máximo)`: el `h1` crece de 1.9rem a 3.25rem según el ancho.
5. **Media queries** en tres puntos de corte:

| Punto de corte | Ancho | Qué cambia |
|---|---|---|
| Celular | base (hasta 480 px) | Todo en 1 columna, botones a lo ancho, menú compacto. |
| Tablet | `min-width: 48rem` (768 px) | Formularios a 2 columnas, más padding en las secciones. |
| Escritorio | `min-width: 64rem` (1024 px) | Contacto `2fr 3fr`, Reservar `3fr 1.5fr`, canchas en 4 columnas, header en una sola fila. |

6. **`img { max-width: 100%; height: auto; }`** para que ninguna imagen desborde la pantalla.
7. **Media queries especiales**: `prefers-reduced-motion` (accesibilidad) y `print` (para imprimir la grilla de turnos).

---

## 🔍 Estrategias de **SEO** implementadas

| # | Estrategia | Dónde se aplicó | Objetivo |
|---|---|---|---|
| 1 | `<title>` único y descriptivo por página | Las 5 páginas | Es el texto azul del resultado de Google; describe la página en 50-60 caracteres. |
| 2 | `<meta name="description">` única por página | Las 5 páginas | Es el resumen que aparece bajo el título; mejora el porcentaje de clics. |
| 3 | HTML semántico y jerarquía de encabezados | `header`, `nav`, `main`, `section`, `article`, `aside`, `footer` — un único `h1` por página | El buscador entiende qué parte del HTML es el contenido importante. |
| 4 | Atributo `alt` descriptivo en imágenes | `canchas.html` | Permite posicionar en Google Imágenes y hace el sitio accesible para lectores de pantalla. |
| 5 | Diseño responsive + `<meta viewport>` + `lang="es"` | Las 5 páginas | Google usa *mobile-first indexing*: un sitio que no se ve bien en celular pierde posiciones. |
| 6 | Enlaces internos con texto descriptivo | Nav y footer de todas las páginas | Reparte autoridad entre las páginas y ayuda al robot a recorrer todo el sitio. |
| 7 | `<link rel="canonical">` | Las 5 páginas | Indica cuál es la URL oficial y evita penalizaciones por contenido duplicado. |
| 8 | Open Graph (`og:title`, `og:description`, `og:image`) | Las 5 páginas | Controla cómo se ve la vista previa al compartir el link por WhatsApp o Facebook. |
| 9 | Datos estructurados JSON-LD (Schema.org) | `index.html` — tipo `SportsActivityLocation` | Le declara a Google que es un club deportivo, con dirección, teléfono y horarios. |
| 10 | `robots.txt` + `sitemap.xml` | Raíz del proyecto | Le indica al robot qué puede recorrer y le entrega la lista completa de URLs. |
| 11 | Optimización de carga | `loading="lazy"`, `width`/`height` y `aspect-ratio` en imágenes; un solo CSS externo | La velocidad de carga y la estabilidad visual (CLS) son factores de posicionamiento. |

---

## 🌿 Organización del proyecto con Git

```
main                (protegida — sólo integra Lourdes)
└── dev             (rama de desarrollo — integran Lourdes o Belén)
    ├── home        (Lourdes)
    ├── contacto    (Belén)
    ├── reservar    (Emilse)
    ├── canchas     (Analía)
    └── horarios    (Laura)
```

### Flujo de trabajo

1. Traer lo último de `dev`: `git checkout mi-rama` → `git fetch origin` → `git merge origin/dev`
2. Trabajar sobre la propia rama.
3. `git add .` → `git commit -m "mensaje claro y descriptivo"`
4. `git push origin mi-rama`
5. Crear un **Pull Request** de la rama personal hacia `dev` y asignar a una compañera como *reviewer*.
6. Una vez aprobado, se mergea a `dev`.
7. Al final, un único Pull Request de `dev` hacia `main` con el trabajo integrado.

---

## 🚀 Estado del proyecto

🟢 **Interfaz completa** — HTML semántico, hoja de estilos única, diseño responsive y SEO aplicados en las 5 páginas.

---

## 📚 Proyecto académico

Realizado como parte de la Tecnicatura Universitaria en Programación.
Se utilizaron herramientas de IA como apoyo; todo el código fue revisado y es explicable
por las integrantes del grupo.
