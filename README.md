# Club Cancha — Sistema de Turnos

Trabajo Práctico N.º 2 — HTML5 y CSS
Tecnicatura Universitaria en Programación.

---

## Integrantes

| Integrante            | Página a cargo                                     | Rama            |
| --------------------- | -------------------------------------------------- | --------------- |
| Lourdes Ortega        | feat/inicio (`index.html`) + hoja de estilos común | `feat/inicio`   |
| Analía Roldan         | feat/canchas (`canchas.html`)                      | `feat/canchas`  |
| Laura Soria           | feat/horarios (`horarios.html`)                    | `feat/horarios` |
| Emilse Andrada Suarez | feat/reservar (`reservar.html`)                    | `feat/reservar` |
| Belén Bulacio         | feat/contacto (`contacto.html`)                    | `feat/contacto` |

---

## Descripción breve

Sitio web **interno** de un club deportivo para gestionar los turnos de las canchas
de fútbol 5, fútbol 7 y pádel. No está pensado para el público general, sino para
las personas que administran el club.

Tiene 5 páginas:

- **Inicio**: presentación del sistema y accesos rápidos.
- **Canchas**: catálogo de las canchas con precio por hora y servicios.
- **Horarios**: grilla del día con los turnos libres, ocupados y a confirmar.
- **Reservar**: formulario para cargar una reserva.
- **Contacto**: datos del establecimiento e información administrativa.

---

## Tecnologías utilizadas

- **HTML5 semántico**: `header`, `nav`, `main`, `section`, `article`, `aside`, `footer`.
- **CSS3**: variables (`:root` y `var()`), Flexbox, CSS Grid, Media Queries.
- **Git y GitHub**: una rama por integrante, commits y Pull Requests.
- **Visual Studio Code**.

Una sola hoja de estilos externa: `css/styles.css`.

---

## Estructura del proyecto

```
trabajoPractico-programacion4/
├── css/
│   └── styles.css        <-- ÚNICA hoja de estilos
├── img/
│   ├── cancha-futbol5.svg
│   ├── cancha-futbol7.svg
│   ├── cancha-padel.svg
│
├── index.html            <-- Inicio
├── canchas.html
├── horarios.html
├── reservar.html
├── contacto.html
└── README.md
```

El archivo `styles.css` está dividido en **zonas** y cada integrante escribe
únicamente dentro de la suya. Así podemos editar el mismo archivo al mismo
tiempo sin que git nos genere conflictos.

---

## ¿Dónde utilizamos Flexbox?

Flexbox lo usamos cuando hay que acomodar elementos **en una sola dirección**
(una fila o una columna).

| Dónde                  | Clase                        | Qué hace                                                                             |
| ---------------------- | ---------------------------- | ------------------------------------------------------------------------------------ |
| Cabecera               | `.cabecera__inner`           | `justify-content: space-between` deja el logo a la izquierda y el menú a la derecha. |
| Logo                   | `.logo`                      | Pone el ícono y el texto en fila, alineados al medio.                                |
| Menú                   | `.nav__lista`                | Pone los 5 links en fila con la misma separación (`gap`).                            |
| Botones de la portada  | `.hero__acciones`            | En celular se apilan en columna, en tablet pasan a fila.                             |
| Círculo de los íconos  | `.tarjeta__icono`            | `align-items` y `justify-content` en `center` centran el emoji adentro del círculo.  |
| Ficha de cada cancha   | `.datos li`                  | Etiqueta a la izquierda y valor a la derecha.                                        |
| Casilleros de turno    | `.turno`                     | Columna centrada: la hora arriba y el estado abajo.                                  |
| Referencias de colores | `.referencias`               | Fila centrada que se acomoda sola.                                                   |
| Campos del formulario  | `.campo`                     | Columna: la etiqueta arriba y el input abajo.                                        |
| Datos de contacto      | `.lista-contacto` y sus `li` | El ícono a la izquierda y el texto a la derecha.                                     |

---

## ¿Dónde utilizamos CSS Grid?

Grid lo usamos cuando hay que armar una **grilla de filas y columnas**.
En todos los casos arrancamos con **1 columna en el celular** y agregamos
columnas con media queries.

| Dónde                                     | Clase             | Columnas                                                     |
| ----------------------------------------- | ----------------- | ------------------------------------------------------------ |
| Funciones principales (Inicio y Contacto) | `.grid-funciones` | 1 → 2 (768px) → 3 (1024px)                                   |
| Catálogo de canchas                       | `.grid-canchas`   | 1 → 2 (768px) → 3 (1024px)                                   |
| Grilla de turnos                          | `.grid-horarios`  | 2 → 4 (768px) → 8 (1024px)                                   |
| Página Reservar                           | `.grid-reserva`   | 1 → `2fr 1fr` en 1024px (formulario + avisos)                |
| Formulario                                | `.formulario`     | 1 → 2 en 768px. Los campos largos usan `grid-column: span 2` |
| Página Contacto                           | `.grid-contacto`  | 1 → 2 en 1024px                                              |
| Pie de página                             | `.pie__grid`      | 1 columna                                                    |

---

## ¿Qué variables CSS creamos?

Están todas declaradas en `:root` (la raíz del documento) y se usan con
`var(--nombre)`. La ventaja es que si queremos cambiar el verde del club,
lo cambiamos en un solo lugar y se actualiza todo el sitio.

**Colores del club**
`--color-primario` · `--color-primario-oscuro` · `--color-primario-claro` ·
`--color-secundario` · `--color-secundario-oscuro`

**Colores de la interfaz**
`--color-fondo` · `--color-superficie` · `--color-oscuro` · `--color-texto` ·
`--color-texto-suave` · `--color-texto-claro` · `--color-borde`

**Colores según el estado del turno**
`--color-disponible` · `--color-disponible-fondo` · `--color-ocupado` ·
`--color-ocupado-fondo` · `--color-pendiente` · `--color-pendiente-fondo`

**Tipografías**
`--fuente-titulos` · `--fuente-texto`

**Espaciados** (múltiplos de 0.5rem, o sea de 8px)
`--esp-1` (0.5rem) · `--esp-2` (1rem) · `--esp-3` (1.5rem) ·
`--esp-4` (2rem) · `--esp-5` (3rem)

**Bordes, sombras y ancho**
`--radio` · `--radio-chico` · `--radio-pastilla` · `--sombra` · `--ancho-contenedor`

---

## ¿Cómo implementamos el Responsive Design?

Usamos la metodología **Mobile First**: primero escribimos los estilos del
celular y después, con `min-width`, vamos **agregando** reglas para las
pantallas más grandes.

1. **`<meta name="viewport" content="width=device-width, initial-scale=1.0">`**
   en las 5 páginas. Sin esta línea el celular simula una pantalla de escritorio
   y la página se ve chiquita y alejada.
2. **Unidades relativas** en lugar de medidas fijas. En todo el proyecto
   usamos solamente cuatro:

| Unidad | Qué es                                              | Dónde la usamos                                                        |
| ------ | --------------------------------------------------- | ---------------------------------------------------------------------- |
| `px`   | Medida fija                                         | Bordes, sombras, el círculo de los íconos (56px), el alto del textarea |
| `%`    | Relativa al elemento padre                          | `.contenedor` (100%), imágenes, `border-radius: 50%` para el círculo   |
| `rem`  | Relativa al tamaño base del navegador (1rem = 16px) | Textos, paddings, márgenes, gaps                                       |
| `fr`   | Fracción del espacio libre (solo en Grid)           | Todas las columnas de las grillas                                      |

3. **`box-sizing: border-box`** en todos los elementos, para que el `padding`
   y el `border` no agranden las cajas y no se desborde nada.
4. **`img { max-width: 100%; height: auto; }`** para que ninguna imagen se
   salga de la pantalla.
5. **Media queries** en dos puntos de corte:

| Pantalla   | Ancho                 | Qué cambia                                                                   |
| ---------- | --------------------- | ---------------------------------------------------------------------------- |
| Celular    | base (menos de 768px) | Todo en 1 columna, botones apilados, menú compacto.                          |
| Tablet     | `min-width: 768px`    | Grillas a 2 columnas, formulario a 2 columnas, títulos más grandes.          |
| Escritorio | `min-width: 1024px`   | Grillas a 3 columnas, Contacto y Reservar a 2 columnas, títulos más grandes. |

---

## Organización con Git

```
main                (protegida — integra Lourdes)
└── dev             (rama de desarrollo — integran Lourdes o Belén)
    ├── feat/inicio      (Lourdes)
    ├── feat/canchas     (Analía)
    ├── feat/horarios    (Laura)
    ├── feat/reservar    (Emilse)
    └── feat/contacto    (Belén)
```

Flujo de trabajo:

1. Pararse en la rama propia: `git checkout mi-rama`
2. Traer lo último de dev: `git fetch origin` y `git merge origin/dev`
3. Trabajar, y después `git add .` y `git commit -m "mensaje claro"`
4. Subir: `git push origin mi-rama`
5. Crear un Pull Request de la rama personal hacia `dev`.
6. Al final, un único Pull Request de `dev` hacia `main`.

---

## Proyecto académico

Realizado para la Tecnicatura Universitaria en Programación.
Se usaron herramientas de IA como apoyo; todo el código fue revisado y es
explicable por las integrantes del grupo.
