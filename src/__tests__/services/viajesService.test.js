import { http, HttpResponse } from "msw";
import { server } from "../../mocks/server";
import { consultarGraphQL } from "../../services/graphqlClient";
import { obtenerVuelos, obtenerHoteles } from "../../services/viajesService";

describe("viajesService (GraphQL + MSW)", () => {
  test("obtenerVuelos retorna los vuelos del destino", async () => {
    const vuelos = await obtenerVuelos(1);
    expect(vuelos).toHaveLength(2);
    expect(vuelos.map((v) => v.aerolinea)).toEqual(["LATAM", "Air France"]);
  });

  test("obtenerHoteles retorna los hoteles del destino", async () => {
    const hoteles = await obtenerHoteles(3);
    expect(hoteles.map((h) => h.nombre)).toEqual(["Casa Inca Boutique", "Hostal Plaza de Armas"]);
  });

  test("obtenerVuelos y obtenerHoteles propagan el error GraphQL si el destino no existe", async () => {
    await expect(obtenerVuelos(99)).rejects.toThrow("El destino 99 no existe");
    await expect(obtenerHoteles(99)).rejects.toThrow("El destino 99 no existe");
  });
});

describe("graphqlClient", () => {
  test("consultarGraphQL lanza error de conexión si el servidor responde con error HTTP", async () => {
    server.use(http.post("/graphql", () => new HttpResponse(null, { status: 500 })));
    await expect(consultarGraphQL("query { x }")).rejects.toThrow(
      "Error de conexión con el servicio GraphQL"
    );
  });

  test("consultarGraphQL usa variables por defecto vacías y retorna data", async () => {
    server.use(http.post("/graphql", () => HttpResponse.json({ data: { ok: true } })));
    await expect(consultarGraphQL("query { ok }")).resolves.toEqual({ ok: true });
  });
});