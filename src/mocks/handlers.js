// src/mocks/handlers.js
import { http, HttpResponse, delay } from "msw";
import { graphql } from "msw/graphql";
import { destinos } from "./data/destinos";
import { vuelos, hoteles } from "./data/viajes";

// En MSW 3, GraphQL se declara primero con el endpoint
const api = graphql.link("/graphql");

// Devuelve un error GraphQL si el destino no existe
function errorDestino(destinoId) {
  return HttpResponse.json({
    errors: [{ message: `El destino ${destinoId} no existe` }],
  });
}

export const handlers = [
  // ---------- REST ----------
  http.get("/api/destinos", async () => {
    await delay(600);
    return HttpResponse.json(destinos);
  }),

  http.get("/api/destinos/:id", async ({ params }) => {
    await delay(300);
    const destino = destinos.find((d) => d.id === Number(params.id));

    if (!destino) {
      return HttpResponse.json(
        { mensaje: "Destino no encontrado" },
        { status: 404 }
      );
    }
    return HttpResponse.json(destino);
  }),

  // ---------- GraphQL ----------
  api.query("ObtenerVuelos", async ({ variables }) => {
    await delay(500);
    const { destinoId } = variables;

    if (!destinos.some((d) => d.id === destinoId)) {
      return errorDestino(destinoId);
    }
    return HttpResponse.json({
      data: { vuelos: vuelos.filter((v) => v.destinoId === destinoId) },
    });
  }),

  api.query("ObtenerHoteles", async ({ variables }) => {
    await delay(500);
    const { destinoId } = variables;

    if (!destinos.some((d) => d.id === destinoId)) {
      return errorDestino(destinoId);
    }
    return HttpResponse.json({
      data: { hoteles: hoteles.filter((h) => h.destinoId === destinoId) },
    });
  }),
];