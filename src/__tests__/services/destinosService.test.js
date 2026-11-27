import { http, HttpResponse } from "msw";
import { server } from "../../mocks/server";
import { obtenerDestinos, obtenerDestino } from "../../services/destinosService";

describe("destinosService (REST + MSW)", () => {
  test("obtenerDestinos retorna los 6 destinos del mock", async () => {
    const destinos = await obtenerDestinos();
    expect(destinos).toHaveLength(6);
    expect(destinos[0]).toMatchObject({ id: 1, nombre: "París", pais: "Francia" });
  });

  test("obtenerDestinos lanza error si el backend responde 500", async () => {
    server.use(http.get("/api/destinos", () => new HttpResponse(null, { status: 500 })));
    await expect(obtenerDestinos()).rejects.toThrow("No se pudo cargar la lista de destinos");
  });

  test("obtenerDestino retorna el destino pedido", async () => {
    const destino = await obtenerDestino(2);
    expect(destino.nombre).toBe("Tokio");
  });

  test("obtenerDestino lanza error específico ante un 404", async () => {
    await expect(obtenerDestino(99)).rejects.toThrow("El destino solicitado no existe");
  });

  test("obtenerDestino lanza error genérico ante un 500", async () => {
    server.use(http.get("/api/destinos/:id", () => new HttpResponse(null, { status: 500 })));
    await expect(obtenerDestino(1)).rejects.toThrow("No se pudo cargar el destino");
  });
});