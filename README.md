# ✈ Agencia de Viajes

Aplicación web de una agencia de viajes donde las personas pueden explorar destinos y consultar alternativas de vuelos y hoteles para planificar su viaje.

Proyecto de la actividad sumativa **"Integrando nuestro frontend con backend"** (Semana 5) de la asignatura **Desarrollo Frontend II (PFY2202)**, Duoc UC.

- **Autora:** Francisca Valenzuela
- **Repositorio:** https://github.com/Francisca-Valenzuela/viajes-francisca-valenzuela-pfy2202
- **Aplicación publicada (GitHub Pages):** [https://francisca-valenzuela.github.io/viajes-francisca-valenzuela-pfy2202/](https://francisca-valenzuela.github.io/viajes-Francisca-Valenzuela-pfy2202/)

## Funcionalidades

- Listado de destinos con país y actividades populares (API REST mock).
- Detalle de cada destino con descripción, imagen y actividades.
- Consulta de vuelos y hoteles del destino seleccionado, con precios, fechas y disponibilidad (API GraphQL mock).
- Navegación entre vistas con React Router, incluyendo rutas anidadas por destino.
- Estados de carga, error y "sin resultados" en cada consulta.
- Diseño responsivo (celular, tablet y escritorio) con CSS propio.

## Tecnologías

| Tecnología | Uso |
|---|---|
| React 19 + Vite | Interfaz y entorno de desarrollo |
| React Router (`react-router-dom`) | Navegación entre vistas (`HashRouter`) |
| MSW (Mock Service Worker) | API REST y GraphQL mock dentro del navegador |
| GraphQL | Lenguaje de consulta de vuelos y hoteles |
| HTML, CSS y JavaScript | Estructura, estilos (grid, flexbox, media queries) y lógica |

## Requisitos previos

- [Node.js](https://nodejs.org/) 22 o superior
- npm (incluido con Node.js)
- Git

## Instalación y ejecución

```bash
# 1. Clonar el repositorio
git clone https://github.com/Francisca-Valenzuela/viajes-francisca-valenzuela-pfy2202.git
cd viajes-francisca-valenzuela-pfy2202

# 2. Instalar dependencias
npm install

# 3. Iniciar el servidor de desarrollo
npm run dev
```

Abre la dirección que muestra la terminal (normalmente `http://localhost:5173`).

No hace falta levantar ningún servidor adicional: las APIs mock se ejecutan en el navegador mediante un Service Worker (`public/mockServiceWorker.js`). Al abrir la consola del navegador (F12) debe aparecer el mensaje `[MSW] Mocking enabled`.

### Otros comandos

| Comando | Descripción |
|---|---|
| `npm run build` | Genera la versión de producción en `dist/` |
| `npm run preview` | Sirve localmente la versión de producción |
| `npm run lint` | Revisa el código con oxlint |

## Cómo usar y revisar la aplicación

1. En **Inicio**, pulsa **Ver destinos**.
2. En **Destinos** se listan las tarjetas obtenidas de la API REST. Elige una y pulsa **Ver detalle**.
3. En el detalle del destino hay tres pestañas:
   - **Resumen:** descripción y actividades populares.
   - **Vuelos:** alternativas de vuelo con precio, fechas y disponibilidad.
   - **Hoteles:** alternativas de alojamiento con precio por noche, fechas y disponibilidad.
4. Cambia de destino y comprueba que vuelos y hoteles se actualizan según la elección.
5. Para ver el manejo de errores, entra manualmente a `/#/destinos/99`: el destino no existe y se muestra un mensaje de error.

## Rutas

La aplicación usa `HashRouter`, por lo que las rutas funcionan también al recargar la página en GitHub Pages.

| Ruta | Vista |
|---|---|
| `/#/` | Inicio |
| `/#/destinos` | Listado de destinos |
| `/#/destinos/:id` | Detalle del destino (resumen) |
| `/#/destinos/:id/vuelos` | Vuelos del destino |
| `/#/destinos/:id/hoteles` | Hoteles del destino |
| `/#/cualquier-otra-ruta` | Página no encontrada |

## APIs mock

Las respuestas las simula MSW (`src/mocks/handlers.js`) con datos de `src/mocks/data/`.

### API REST

| Método | Endpoint | Descripción |
|---|---|---|
| `GET` | `/api/destinos` | Lista todos los destinos (id, nombre, país, descripción, imagen, actividades) |
| `GET` | `/api/destinos/:id` | Devuelve un destino. Responde `404` si no existe |

### API GraphQL

Endpoint: `/graphql`. Ambas consultas reciben el `destinoId` del destino seleccionado.

```graphql
query ObtenerVuelos($destinoId: Int!) {
  vuelos(destinoId: $destinoId) {
    id aerolinea origen fechaSalida fechaRegreso precio disponible asientosDisponibles
  }
}

query ObtenerHoteles($destinoId: Int!) {
  hoteles(destinoId: $destinoId) {
    id nombre estrellas precioPorNoche fechaDesde fechaHasta disponible habitacionesDisponibles
  }
}
```

Si el `destinoId` no existe, la respuesta incluye un error GraphQL (`El destino <id> no existe`) que la interfaz muestra al usuario.

## Estructura del proyecto

```
├── public/
│   └── mockServiceWorker.js      Service Worker de MSW (necesario para los mocks)
├── src/
│   ├── components/               Componentes reutilizables de presentación
│   │   ├── Layout.jsx, Navbar.jsx
│   │   ├── Cargando.jsx, MensajeError.jsx, EtiquetaDisponibilidad.jsx
│   │   └── ImagenDestino.jsx, TarjetaDestino.jsx, TarjetaVuelo.jsx, TarjetaHotel.jsx
│   ├── hooks/
│   │   └── useConsulta.js        Estado de las consultas (useState + useEffect)
│   ├── mocks/
│   │   ├── browser.js            Configuración del worker de MSW
│   │   ├── handlers.js           Handlers REST y GraphQL
│   │   └── data/                 Datos de destinos, vuelos y hoteles
│   ├── pages/                    Vistas asociadas a cada ruta
│   ├── services/                 Acceso a datos (REST y GraphQL)
│   ├── styles/global.css         Estilos responsivos
│   ├── utils/formato.js          Formato de precios y fechas
│   ├── App.jsx                   Definición de rutas
│   └── main.jsx                  Punto de entrada (inicia MSW y React)
└── index.html
```

### Decisiones de diseño

- **Separación de responsabilidades:** los componentes solo presentan datos; el acceso a las APIs vive en `services/`.
- **Manejo de estado:** el hook `useConsulta` usa `useState` y `useEffect` para entregar `datos`, `cargando` y `error`, e ignora respuestas obsoletas si el usuario cambia de destino mientras hay una consulta en curso.
- **Relación destino, vuelos y hoteles:** el destino se obtiene por REST y su `id` se usa en las consultas GraphQL de vuelos y hoteles.
- **MSW en producción:** los mocks también se activan en la versión publicada, porque GitHub Pages solo sirve archivos estáticos.

## Publicación en GitHub Pages

```bash
npm run deploy
```

El comando compila el proyecto y publica la carpeta `dist/` en la rama `gh-pages`. Luego, en el repositorio de GitHub, ve a **Settings → Pages** y verifica que la fuente sea la rama `gh-pages` (carpeta `/ (root)`).

## Pruebas en navegadores

Se recorrieron las vistas, la selección de destinos, la consulta de vuelos y hoteles y la navegación (incluida la recarga de página en rutas internas) en:

| Navegador | Resultado |
|---|---|
| Google Chrome | ☐ |
| Mozilla Firefox | ☐ |
| Microsoft Edge | ☐ |
| Brave | ☐ |
| Móvil (modo dispositivo / equipo real) | ☐ |

## Créditos

Imágenes de destinos: [Unsplash](https://unsplash.com/). Proyecto con fines académicos.
