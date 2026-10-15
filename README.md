# Club Cancha — Sistema de Turnos

Sitio web **interno** de un club deportivo para gestionar los turnos de las canchas
de fútbol 5, fútbol 7 y pádel. No está pensado para el público general, sino para
las personas que administran el club.

Trabajo Práctico de **Programación IV** — Tecnicatura Universitaria en Programación.

El proyecto se fue construyendo en tres etapas:

| Trabajo | Qué se hizo |
| --- | --- |
| TP2 — HTML5 y CSS | Las 5 páginas con HTML semántico y una hoja de estilos propia |
| TP3 — Bootstrap | Se rehízo el diseño con ad visual propia |
| TP4 — JavaScript y DOM | Se agregó funcionalidad a cada página con JavaScript |

---

## Integrantes

| Integrante | Página a cargo |
| --- | --- |
| Lourdes Ortega | Inicio (`index.html`), estilos comunes y `app.js` |
| Analía Roldan | Canchas (`canchas.html`) |
| Laura Soria | Horarios (`horarios.html`) |
| Emilse Andrada Suarez | Reservar (`reservar.html`) |
| Belén Bulacio | Contacto (`contacto.html`)

---

## Páginas

- **Inicio**: panel de la recepción y accesos.
- **Canchas**: las canchas del club con su foto, precio por hora y estado.
- **Horarios**: grilla del día con los turnormar de cada cancha.
- **Reservar**: formulario para cargar una reserva.
- **Contacto**: datos del establecimiento, información administrativa y respuestas
  a las preguntas frecuentes de los clientes

---

## Tecnologías utilizadas

- **HTML5 semántico**: `header`, `nav`, `main`, `section`, `article`, `aside`, `footer`.
- **CSS3**: variables (`:root` y `var()`), F.
- **Bootstrap 5.3.3** y **Bootstrap Icons**, desde CDN.
- **JavaScript** y manipulación del **DOM**.
- **Google Fonts**: Barlow Condensed para lol texto.
- **Git y GitHub**: una rama por integrante, commits y Pull Requests.
- **Visual Studio Code** con Live Server.

---

## Estructura del proyecto

```
trabajoPractico-programacion4/
├── css/
│   ├── styles.css        CSS del TP2, comentado (no se usa)
│   ├── comun.css         colores, tipografíel sitio
│   ├── inicio.css
│   ├── canchas.css
│   ├── horarios.css
│   ├── reservar.css
│   └── contacto.css
├── js/
│   ├── app.js            compartido: se carga en las 5 páginas
│   ├── inicio.js
│   ├── canchas.js
│   ├── horarios.js
│   ├── reservar.js
│   └── contacto.js
├── img/
│   ├── cancha-futbol5.jpg
│   ├── cancha-futbol7.jpg
│   ├── cancha-padel.jpg
│   └── logo-club.png     logo del navbar y favicon
├── index.html            Inicio
├── canchas.html
├── horarios.html
├── reservar.html
├── contacto.html
└── README.md
```

Cada integrante trabaja **solo en su HTML, su CSS y su JS**. Los archivos
compartidos (`comun.css` y `app.js`) los modifica una sola persona. Así varias
podemos trabajar al mismo tiempo sin que Git genere conflictos.

---

## Bootstrap (TP3)

Cada página carga los estilos en este orden:

```
bootstrap.min.css  →  bootstrap-icons  →  stágina.css
```

El orden importa: lo que se carga después tiene prioridad. Por eso primero va
Bootstrap, después lo común del club y al final lo propio de cada página.

El `styles.css` del TP2 **no se borró**: quedó comentado, como pedía la consigna.

### Componentes de Bootstrap que usamos

| Página | Componentes |
| --- | --- |
| Todas | `navbar` con menú hamburguesa (`collapse`), sistema de grillas (`container`, `row`, `col`) |
| Inicio | `card`, `list-group` |
| Canchas | `card` con imagen (`card-img-top`), `form-select` |
| Horarios | Pestañas (`nav-pills`), `card`,
| Reservar | Formulario con validación (`was-validated`, `invalid-feedback`), `card`, `list-group`, `alert`, `badge` |
| Contacto | `accordion`, `list-group`, `card` |

### Identidad visual propia

Para que el sitio no se vea como una plantilla de Bootstrap, `comun.css` define
la paleta y las tipografías del club, tomadas del logo:

| Variable | Uso |
| --- | --- |
| `--verde-noche` | Navbar y footer |
| `--verde-cancha` | Fondo de los encabezado
| `--lima` | Botones y acentos |
| `--cal` | Fondo general de la página |
| `--ladrillo` | Turno ocupado |
| `--texto` | Color del texto |
| `--fuente-titulo` | Barlow Condensed |
| `--fuente-texto` | Work Sans |

También hay detalles propios, como la línea color lima a la izquierda de los
títulos (`.titulo-cal`).

### Responsive

Usamos los **puntos de corte de Bootstrap** con sus clases de grilla
(`col-md-6`, `col-lg-4`, etc.): en el celular todo va en una columna, y a medida
que la pantalla crece se acomodan más columnas. El menú pasa a ser hamburguesa
en pantallas chicas.

Todas las páginas tienen
`<meta name="viewport" content="width=device-width, initial-scale=1.0">`.

---

## JavaScript (TP4)

Cada página tiene su propio archivo JS, que se carga al final del `<body>`,
después de Bootstrap y de `app.js`. Todo el comportamiento está en los archivos
`.js`: en el HTML no hay código JavaScript n

| Archivo | Qué hace |
| --- | --- |
| `app.js` | Escribe el año actual en el pie de todas las páginas |
| `inicio.js` | **Checklist de apertura del club**: cuenta las tareas hechas y avisa cuando el club está listo para abrir. **Avisos para el próximo turno**: se agregan y se marcan como listos, y se guardan en el `localStorage` para que no se pierdan al recargar |
| `canchas.js` | **Filtro por estado**: muestra todas las canchas o solo las libres, pendientes u ocupadas |
| `horarios.js` | Muestra la **fecha de hoy**, **cuenta los turnos libres** de cada cancha, agrega un botón para **ver solo los turnos libres** y **marca el turno en curso** según la hora real |
| `reservar.js` | **Valida el formulario**: no deja elegir un día anterior a hoy, desactiva los horarios que ya
pasaron y en el teléfono solo deja escribir
| `contacto.js` | **Buscador** de las respuestas a los clientes: filtra las preguntas mientras se escribe |

### Conceptos que usamos

- Seleccionar elementos: `getElementById`, `querySelector`, `querySelectorAll`.
- Eventos: `addEventListener` con `click`, `change`, `input` y `submit`.
- Modificar la página: `textContent`, `classList`, `createElement`, `appendChild`.
- Recorrer listas con `forEach`.
- Guardar datos en el navegador con `localStorage` y `JSON`.
- Fechas y horas con `Date`.
- Validación de formularios con `checkValidity` y `setCustomValidity`.

---

## Organización con Git

```
main                (rama final, protegida)
└── dev             (rama donde se junta el trabajo de todas)
    ├── ramas de cada integrante
```

Cada trabajo práctico tuvo sus propias ramas:

| Trabajo | Ramas |
| --- | --- |
| TP2 | `feat/inicio`, `feat/canchas`, `feat/horarios`, `feat/reservar`, `feat/contacto` |
| TP3 | `refactor/inicio`, `refactor/canchas`, `refactor/horarios`, `refactor/reservar`, `refactor/contacto` |
| TP4 | `feature/funcionalidades-javascript-ios`, `-reservar`, `-contacto` |

Flujo de trabajo:

1. Pararse en la rama propia: `git switch mi-rama`
2. Traer lo último de dev: `git fetch origin` y `git merge origin/dev`
3. Hacer los cambios, y después `git add archivo-que-cambie` y `git commit -m "mensaje claro"`
4. Subir: `git push origin mi-rama`
5. Crear un Pull Request de la rama personal hacia `dev`.
6. Cuando `dev` está completo y probado, un Pull Request de `dev` hacia `main`.

Los Pull Requests los revisan las responsables del repositorio antes de
mergearlos (archivo `.github/CODEOWNERS`).
