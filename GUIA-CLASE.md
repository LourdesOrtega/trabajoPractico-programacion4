# 🎤 Guía para exponer en clase

Documento interno del grupo. Acá está **qué explica cada una**, **por qué lo usamos**
y **dónde está en el código**.

> Regla de oro: la profe puede preguntar *"¿por qué usaste esto y no otra cosa?"*.
> Todas las respuestas están más abajo.

---

## 🔧 PASO 0 — Cómo traer los cambios a tu rama (para las 5)

Todo el HTML y el CSS nuevo está en `dev`. Cada una tiene que traerlo a su rama:

```bash
git checkout mi-rama            # contacto / reservar / canchas / horarios
git add .                       # 1) guardá lo que tengas sin commitear
git commit -m "guardo mis cambios antes de traer dev"

git fetch origin                # 2) bajá la info del repositorio
git merge origin/dev            # 3) traé dev a tu rama  (¡con BARRA, no espacio!)
```

**Errores frecuentes:**

| Error | Qué significa | Solución |
|---|---|---|
| `Your local changes would be overwritten by merge` | Tenés cambios sin commitear | `git add .` y `git commit -m "..."` y recién ahí mergeás |
| `git merge origin dev` (con espacio) | Le pediste mergear la rama `origin` (= `main`), no `dev` | Usar siempre `origin/dev` con **barra** |
| `CONFLICT (add/add)` | Dos personas crearon el **mismo archivo** por separado | Abrir el archivo, borrar las líneas `<<<<<<<`, `=======`, `>>>>>>>`, dejar la versión correcta, `git add archivo` y `git commit` |

Si al mergear salta un conflicto **en tu propia página**, quedate con la versión de `dev`
(es la que ya tiene los estilos aplicados).

---

## 🎨 PASO 0 bis — Cómo editamos las 5 el mismo `styles.css` sin conflictos

El TP pide **un único archivo CSS**, así que las 5 tenemos que escribir en `css/styles.css`.
Ese es el único archivo compartido del proyecto, y por eso es el único que puede dar conflicto.

**Cómo lo resolvimos:** dividimos el archivo en **ZONAS**, una por integrante, separadas por
banderas de comentarios y por muchas líneas en blanco.

```
ZONA 0 - COMÚN ........ Lourdes   (variables, reset, header, footer, botones)
ZONA 1 - INICIO ....... Lourdes
ZONA 2 - CANCHAS ...... Analía
ZONA 3 - HORARIOS ..... Laura
ZONA 4 - RESERVAR ..... Emilse
ZONA 5 - CONTACTO ..... Belén
```

### Por qué esto funciona (respuesta técnica para la clase)

> Git **no compara archivos enteros: compara líneas**. Cuando junta dos versiones, mira
> qué líneas cambió cada una. Solo declara conflicto si las dos tocaron **las mismas líneas
> o líneas pegadas** (git necesita 3 líneas de contexto sin tocar alrededor de cada cambio).
>
> Como cada zona está separada de la siguiente por más de 10 líneas en blanco, dos
> integrantes pueden editar el mismo archivo el mismo día y git las junta **sola**.

### Las reglas

1. **Escribí solo dentro de tu zona**, entre tu bandera de inicio y la de "FIN DE LA ZONA X".
2. **No borres ni muevas las banderas `######`** ni las líneas en blanco que separan zonas.
3. **Tus media queries van DENTRO de tu zona**, al final. Por eso **no hay** un bloque común
   de media queries al final del archivo: si lo hubiera, las 5 editaríamos ese mismo bloque
   y sería conflicto seguro.
4. **La ZONA 0 es de Lourdes.** Si necesitás cambiar un color, el header o el footer,
   se lo pedís a ella. No lo toques por tu cuenta.
5. **Siempre `git merge origin/dev` antes de empezar a editar.**

### Si igual salta un conflicto en `styles.css`

No te asustes: significa que dos tocaron el mismo pedazo. Vas a ver esto en el archivo:

```
<<<<<<< HEAD
   (lo que escribiste vos)
=======
   (lo que escribió la otra)
>>>>>>> origin/dev
```

**Casi siempre la solución es dejar las DOS cosas**: borrás las tres líneas de marcas
(`<<<<<<<`, `=======`, `>>>>>>>`) y te quedás con los dos bloques de CSS, uno debajo del otro.
Después `git add css/styles.css` y `git commit`.

---

## 👩‍💻 LOURDES — Inicio (`index.html`) + hoja de estilos base

### Qué explicás

**1. Variables CSS (`:root` + `var()`)** — *el punto más importante del TP*

```css
:root {
  --color-primario: #0f766e;
  --esp-2: 1rem;
  --radio: 0.75rem;
}
h1 { color: var(--color-primario); }
```

- `:root` es el elemento raíz del documento, o sea `<html>`. Se usa en vez de `html`
  porque tiene **más especificidad** y es la convención para declarar variables.
- **Por qué:** si el club cambia de color, tocamos **un solo valor** y se actualiza todo
  el sitio. Sin variables habría que buscar y reemplazar el `#0f766e` en 40 lugares.
- Creamos 4 familias de variables: **colores** (marca, interfaz y estados de turno),
  **tipografías y tamaños**, **espaciado** (escala de múltiplos de 8 px) y
  **bordes/sombras/layout**.

**2. Box Model** — `margin`, `padding`, `border`, `box-sizing`

```css
*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
```

- Todo elemento es una caja: **contenido → padding → border → margin**.
- `box-sizing: border-box` hace que el `padding` y el `border` queden **adentro** del
  ancho declarado. Sin esto, un `div` con `width: 100%` + `padding: 1rem` mide 100% + 32px
  y **se desborda de la pantalla**. Es la primera regla de cualquier hoja de estilos.
- El `margin: 0; padding: 0` es el "reset": borra los márgenes que el navegador pone
  por defecto para arrancar todas iguales.

**3. Flexbox — footer siempre abajo**

```css
body { min-height: 100vh; display: flex; flex-direction: column; }
main { flex: 1; }
```

- **Por qué:** en una página con poco contenido, el footer quedaría flotando en el medio.
  `main { flex: 1 }` le dice "ocupá todo el espacio sobrante", y el footer baja al piso.
- `100vh` = 100% del alto de la ventana (`vh` = *viewport height*).

**4. Flexbox — la barra de navegación** (`.cabecera__inner`)

```css
display: flex;
justify-content: space-between;   /* eje principal: horizontal */
align-items: center;              /* eje transversal: vertical */
flex-wrap: wrap;                  /* en celular las filas bajan solas */
```

- **Por qué Flexbox y no Grid:** el header tiene los elementos en **una sola dirección**
  (una fila). Flexbox es unidimensional; Grid es bidimensional. Para una fila, Flexbox.

**5. CSS Grid — las 3 tarjetas de "Funciones principales"** (`.grid-funciones`)

```css
display: grid;
grid-template-columns: repeat(auto-fit, minmax(16rem, 1fr));
gap: var(--esp-3);
```

- Se lee: *"repetí todas las columnas que entren, cada una de mínimo 16rem, y que se
  repartan el espacio sobrante en partes iguales (`1fr`)"*.
- **Por qué:** con **una sola línea** la grilla ya es responsive — 1 columna en celular,
  2 en tablet, 3 en escritorio — **sin escribir ni una media query**.
- `fr` = *fraction*, una unidad exclusiva de Grid que reparte el espacio libre.

**6. Mobile First**

- Los estilos base son los del **celular**, y con `@media (min-width: ...)` vamos
  **agregando** reglas para pantallas grandes.
- **Por qué:** es más fácil agregar que sacar, y el celular es donde más se usa el sitio.

### Tu parte de SEO
- **Datos estructurados JSON-LD** (`index.html`, al final del `<head>`): le declara a Google
  en formato de datos que esto es un `SportsActivityLocation` con dirección, teléfono y
  horarios de atención. Es lo que permite que Google muestre la ficha del club al costado.
- **`robots.txt` y `sitemap.xml`**: el primero le dice al robot qué puede recorrer; el
  segundo le entrega la lista completa de las 5 URLs para que no se pierda ninguna.

---

## 👩‍💻 ANALÍA — Canchas (`canchas.html`)

### Qué explicás

**1. CSS Grid — el catálogo de canchas** (`.grid-canchas`)

```css
.grid-canchas {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(15rem, 1fr));
  gap: var(--esp-3);
}
@media (min-width: 64rem) {
  .grid-canchas { grid-template-columns: repeat(4, 1fr); }
}
```

- En celular entra 1 columna, en tablet 2, y a partir de 1024px forzamos **4 columnas
  exactas** para que las 4 canchas queden en una sola fila prolija.
- `gap` reemplaza a los `margin` entre tarjetas: separa **solo entre elementos**, sin
  dejar margen sobrante en los bordes.

**2. Por qué sacamos Bootstrap**

- El TP pide demostrar que sabemos **Flexbox y Grid propios**. Bootstrap resuelve la
  grilla por nosotras (`col-md-6 col-lg-3`) y no podríamos explicar el código.
- Además Bootstrap agrega ~200 KB que se descargan de un CDN externo; nuestro CSS
  completo pesa unos pocos KB y no depende de internet.

**3. Flexbox — tarjetas de la misma altura**

```css
.tarjeta { display: flex; flex-direction: column; }
.tarjeta__cuerpo { display: flex; flex-direction: column; flex: 1; }
.tarjeta__pie { margin-top: auto; }
```

- **El problema:** las tarjetas tienen textos de distinto largo, entonces los botones
  "Reservar" quedaban a distintas alturas y se veía desprolijo.
- **La solución:** `flex: 1` hace que el cuerpo estire, y `margin-top: auto` empuja el
  botón al fondo. Resultado: **todos los botones alineados**, sin importar el texto.

**4. Box Model en las tarjetas**

```css
.tarjeta {
  border: 1px solid var(--color-borde);   /* border */
  border-radius: var(--radio);            /* esquinas redondeadas */
  box-shadow: var(--sombra);              /* sombra: da profundidad */
}
.tarjeta__cuerpo { padding: var(--esp-3); }   /* padding: aire interno */
```

- La sombra (`box-shadow: 0 4px 12px rgba(0,0,0,0.10)`) hace que la tarjeta parezca
  "levantada" del fondo. En el `:hover` la subimos con `transform: translateY(-6px)`
  y le damos una sombra más fuerte: **feedback visual** de que es clickeable.

**5. Imágenes responsive**

```css
img { max-width: 100%; height: auto; }
.tarjeta__imagen { aspect-ratio: 16 / 10; object-fit: cover; }
```

- `max-width: 100%` evita que una foto grande rompa el layout en celular.
- `aspect-ratio` reserva el espacio **antes** de que cargue la imagen, así la página no
  "salta" (eso se llama **CLS**, y Google lo penaliza).
- `object-fit: cover` recorta la imagen para llenar el espacio sin deformarla.

### Tu parte de SEO
- **Atributo `alt` descriptivo** en las 4 imágenes: *"Vista aérea de la cancha de fútbol 5
  con césped sintético"* y no `alt="foto"`. Sirve para posicionar en Google Imágenes y
  para que un lector de pantalla describa la imagen a una persona ciega.
- **`loading="lazy"`** + `width`/`height`: las imágenes se descargan recién cuando el
  usuario llega a ellas. Mejora la velocidad de carga, que **es un factor de ranking**.

---

## 👩‍💻 LAURA — Horarios (`horarios.html`)

### Qué explicás

**1. CSS Grid — la grilla de turnos** (`.grid-horarios`)

```css
.grid-horarios {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(9rem, 1fr));
  gap: var(--esp-2);
  margin-block: var(--esp-2) var(--esp-5);
}
```

- Cada casillero mide mínimo `9rem` (144px) y entran todos los que quepan. En celular
  entran 2, en escritorio 7 u 8. **La grilla se reacomoda sola.**
- `margin-block: var(--esp-2) var(--esp-5)` = margen **arriba 1rem, abajo 3rem**
  (es la forma moderna de escribir `margin-top` + `margin-bottom` en una línea).

**2. Variables CSS de estado — el mejor ejemplo del proyecto**

```css
--color-disponible: #15803d;   --color-disponible-fondo: #dcfce7;
--color-ocupado:    #b91c1c;   --color-ocupado-fondo:    #fee2e2;
--color-pendiente:  #b45309;   --color-pendiente-fondo:  #fef3c7;
```

- **Por qué:** los estados de un turno son un concepto del negocio (libre / ocupado /
  a confirmar). Guardarlos como variables con nombre hace que el CSS se lea como el
  problema real, no como una lista de códigos hexadecimales.
- Cada estado tiene **dos** variables: el color del texto (oscuro, legible) y el del
  fondo (clarito). Así el contraste siempre alcanza para leerse bien.

**3. Nomenclatura BEM: `.turno` y `.turno--ocupado`**

- `.turno` es el **bloque** (los estilos comunes) y `.turno--ocupado` el **modificador**
  (solo lo que cambia: el color del borde y la opacidad).
- **Por qué:** no repetimos el padding, el borde y el radio tres veces. Si mañana hay
  que agregar un cuarto estado, se escriben 2 líneas.

**4. Flexbox dentro de cada casillero**

```css
.turno { display: flex; flex-direction: column; align-items: center; gap: var(--esp-1); }
```

- Columna centrada: la hora arriba, la pastilla de estado abajo, con separación pareja.

**5. Media query de impresión** (*este dato suma puntos*)

```css
@media print {
  .cabecera, .pie, .boton { display: none; }
  body { background: #ffffff; }
}
```

- Si el club imprime la grilla del día, no tiene sentido gastar tinta en el menú, el
  footer ni los botones. Las media queries **no son solo para tamaños de pantalla**:
  también sirven para el medio (`print`) y para preferencias del usuario
  (`prefers-reduced-motion`).

### Tu parte de SEO
- **Jerarquía de encabezados**: un solo `<h1>` ("Horarios y disponibilidad"), después
  `<h2>` para la sección y `<h3>` para cada cancha. **No se saltean niveles.** El robot
  arma un índice de la página con esa jerarquía; usar `<h3>` "porque se ve más chico"
  es un error clásico — el tamaño se cambia con CSS, no con la etiqueta.
- **HTML semántico**: cada cancha va en un `<article>` con `aria-labelledby`, y la
  información sobre las reglas va en un `<aside>` (contenido complementario).

---

## 👩‍💻 EMILSE — Reservar (`reservar.html`)

### Qué explicás

**1. CSS Grid — layout de dos columnas** (`.grid-reserva`)

```css
.grid-reserva { display: grid; grid-template-columns: 1fr; gap: var(--esp-4); }

@media (min-width: 64rem) {
  .grid-reserva { grid-template-columns: 3fr 1.5fr; }
}
```

- En celular: una columna (formulario arriba, avisos abajo).
- En escritorio: el formulario ocupa **el doble** que la columna de avisos (`3fr` contra
  `1.5fr`). Con `fr` decimos **proporciones**, no medidas fijas: si la pantalla crece,
  las dos columnas crecen manteniendo la relación.

**2. CSS Grid dentro del formulario** (`.formulario`)

```css
.formulario { display: grid; grid-template-columns: 1fr; gap: var(--esp-2); }

@media (min-width: 48rem) {
  .formulario { grid-template-columns: repeat(2, 1fr); }
  .campo--ancho, .formulario > .boton { grid-column: 1 / -1; }
}
```

- **Este es el mejor ejemplo de Grid del proyecto.** En celular hay un campo por fila;
  desde 768px, **dos campos por fila**.
- `grid-column: 1 / -1` significa *"desde la primera línea hasta la última"*: el email,
  las observaciones y el botón ocupan **la fila entera**. El `-1` cuenta desde el final,
  así que funciona sin importar cuántas columnas haya.
- **Por qué Grid y no Flexbox:** acá controlamos filas **y** columnas a la vez, y
  necesitamos que un elemento se estire a lo ancho de toda la fila. Eso con Flexbox
  requeriría cálculos de porcentajes; con Grid es una sola propiedad.

**3. Flexbox en cada campo** (`.campo`)

```css
.campo { display: flex; flex-direction: column; gap: 0.35rem; }
```

- Etiqueta arriba, control abajo, con una separación mínima y consistente.
- **Por qué la etiqueta arriba y no al costado:** en celular no hay ancho para dos
  columnas, y los formularios de una sola columna se completan más rápido.

**4. Estado `:focus` — usabilidad**

```css
.campo input:focus {
  outline: none;
  border-color: var(--color-primario);
  box-shadow: 0 0 0 4px var(--color-primario-claro);
}
```

- Al hacer clic en un campo, se marca con un "anillo" de color. **Nunca** hay que poner
  `outline: none` solo — dejarías a quien navega con teclado sin saber dónde está parado.
  Acá lo sacamos **pero lo reemplazamos** por algo más lindo y más visible.

**5. Accesibilidad del formulario**

- Cada `<label for="nombre">` está asociado a su `<input id="nombre">`: al tocar la
  etiqueta se activa el campo (más fácil en celular) y el lector de pantalla lo anuncia.
- `type="tel"`, `type="email"`, `type="date"`: en el celular **cambia el teclado** que
  aparece (numérico, con arroba, calendario). Es usabilidad gratis.
- `required` y `autocomplete` para validación nativa y autocompletado del navegador.

### Tu parte de SEO
- **`<title>` y `<meta name="description">` únicos**: el `title` es el texto azul del
  resultado de Google (50-60 caracteres) y la `description` el resumen de abajo
  (150-160 caracteres). **No se repiten entre páginas**: si las 5 tuvieran el mismo,
  Google no sabría cuál mostrar.
- **`<link rel="canonical">`**: declara cuál es la URL oficial de la página. Evita que
  Google considere `/reservar.html` y `/reservar.html?ref=wsp` como contenido duplicado.

---

## 👩‍💻 BELÉN — Contacto (`contacto.html`)

### Qué explicás

**1. CSS Grid — datos + formulario** (`.grid-contacto`)

```css
.grid-contacto { display: grid; grid-template-columns: 1fr; gap: var(--esp-4); }

@media (min-width: 64rem) {
  .grid-contacto { grid-template-columns: 2fr 3fr; }
}
```

- `2fr 3fr` = la columna de datos ocupa **2 partes de 5** y el formulario **3 de 5**.
- **Por qué esa proporción y no 50/50:** el formulario necesita más ancho para que los
  campos entren de a dos; la lista de datos es texto corto y se lee mejor angosta.

**2. Flexbox — la lista de datos de contacto** (`.lista-contacto`)

```css
.lista-contacto { display: flex; flex-direction: column; gap: var(--esp-2); }

.lista-contacto li {
  display: flex;
  align-items: flex-start;
  gap: var(--esp-2);
}
```

- Hay **dos Flexbox anidados**: el `<ul>` apila los ítems en columna, y cada `<li>` pone
  el ícono a la izquierda y el texto a la derecha.
- `align-items: flex-start` alinea el ícono con la **primera línea** del texto. Con
  `center` quedaría flotando en el medio cuando el texto ocupa dos renglones.

**3. Formulario a dos columnas**

- El nombre y el email van de a dos por fila; el asunto y el mensaje ocupan la fila
  completa con la clase `.campo--ancho` (ver la explicación de `grid-column: 1 / -1`
  en la sección de Emilse).

**4. Links funcionales**

```html
<a href="tel:+543884000000">+54 388 400-0000</a>
<a href="mailto:turnos@clubcancha.com.ar">turnos@clubcancha.com.ar</a>
```

- Desde el celular, `tel:` abre el discador y `mailto:` la app de correo. Un teléfono
  escrito como texto plano obliga al usuario a copiarlo a mano.

**5. Sección de Preguntas Frecuentes**

- Reutiliza `.grid-funciones` y `.tarjeta`: **el mismo CSS sirve para otra página**.
  Eso es lo que se busca con un sistema de clases reutilizables — no escribimos CSS
  nuevo para cada sección.

### Tu parte de SEO
- **Contenido de valor con palabras clave reales**: las FAQ responden lo que la gente
  realmente busca ("¿puedo cancelar mi turno?"). Google prioriza páginas que **responden
  preguntas**, no páginas con un formulario pelado.
- **Open Graph** (`og:title`, `og:description`, `og:image`): controla cómo se ve la
  vista previa cuando alguien comparte el link por WhatsApp o Facebook. Sin estas
  etiquetas, WhatsApp muestra un cuadro gris sin información.
- **Enlaces internos con texto descriptivo**: en el footer decimos "Horarios disponibles"
  y no "Clic acá". El texto del link (*anchor text*) le dice a Google de qué trata la
  página de destino.

---

## ❓ Preguntas que puede hacer la profe

**¿Cuándo uso Flexbox y cuándo Grid?**
> Flexbox es **unidimensional**: acomoda elementos en una fila **o** en una columna.
> Grid es **bidimensional**: controla filas **y** columnas al mismo tiempo.
> Regla práctica: si el contenido manda el tamaño (un menú, unos botones) → Flexbox.
> Si vos definís la estructura de antemano (una galería, un layout de página) → Grid.

**¿Qué es `1fr`?**
> Una unidad de Grid que significa "una fracción del espacio sobrante".
> `2fr 3fr` reparte el ancho en 5 partes: 2 para la primera columna y 3 para la segunda.

**¿Por qué `rem` y no `px`?**
> `1rem` = el tamaño de fuente base del navegador (16px por defecto). Si una persona con
> baja visión configura el navegador en 20px, **todo el sitio escala proporcionalmente**.
> Con `px` fijos, no. Usamos `px` solo para cosas que no deben escalar, como el grosor
> de un borde de 1px.

**¿Qué unidades usaron?**
> `rem` (espaciados y tipografías), `px` (bordes), `%` (anchos), `vh` (alto del hero y
> `min-height` del body), `vw` (dentro de `clamp()` para la tipografía fluida),
> `fr` (columnas de Grid), `ch` (ancho máximo de párrafos, mide caracteres) y
> `em` (dentro de algunos componentes).

**¿Qué es Mobile First y por qué lo eligieron?**
> Escribir primero los estilos del celular y **agregar** con `@media (min-width: ...)`
> para pantallas grandes. Es más simple que ir sacando estilos con `max-width`, y el
> celular es el dispositivo más usado.

**¿Por qué `box-sizing: border-box`?**
> Para que el `padding` y el `border` queden **dentro** del ancho declarado. Sin eso,
> un elemento de `width: 100%` con padding se desborda horizontalmente en celular.

**¿Qué pasa si el navegador no soporta una variable CSS?**
> Se puede dar un valor de respaldo: `color: var(--color-primario, #0f766e)`.
> Igual, las variables CSS están soportadas por todos los navegadores modernos.

**¿Por qué un solo archivo CSS y no uno por página?**
> Porque el navegador lo descarga **una sola vez** y lo reutiliza en las 5 páginas
> (queda en caché). Además evita que cada una escriba estilos distintos para lo mismo:
> el header y el footer se ven idénticos en todo el sitio.

**Mencionen 5 estrategias de SEO.**
> 1. `<title>` único y descriptivo por página.
> 2. `<meta name="description">` única por página.
> 3. HTML semántico con jerarquía de encabezados correcta (un solo `h1`).
> 4. `alt` descriptivo en todas las imágenes.
> 5. Diseño responsive + `<meta viewport>` (Google indexa primero la versión móvil).
>
> Y si piden más: `canonical`, Open Graph, JSON-LD, `robots.txt`, `sitemap.xml`,
> enlaces internos descriptivos y `loading="lazy"` para la velocidad de carga.
