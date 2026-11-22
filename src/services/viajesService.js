// src/services/viajesService.js
import { consultarGraphQL } from "./graphqlClient";

const QUERY_VUELOS = `
  query ObtenerVuelos($destinoId: Int!) {
    vuelos(destinoId: $destinoId) {
      id aerolinea origen fechaSalida fechaRegreso precio disponible asientosDisponibles
    }
  }
`;

const QUERY_HOTELES = `
  query ObtenerHoteles($destinoId: Int!) {
    hoteles(destinoId: $destinoId) {
      id nombre estrellas precioPorNoche fechaDesde fechaHasta disponible habitacionesDisponibles
    }
  }
`;

export async function obtenerVuelos(destinoId) {
  const data = await consultarGraphQL(QUERY_VUELOS, { destinoId });
  return data.vuelos;
}

export async function obtenerHoteles(destinoId) {
  const data = await consultarGraphQL(QUERY_HOTELES, { destinoId });
  return data.hoteles;
}