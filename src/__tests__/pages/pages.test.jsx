import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { http, HttpResponse } from "msw";
import { server } from "../../mocks/server";
import Inicio from "../../pages/Inicio";
import NoEncontrada from "../../pages/NoEncontrada";
import Destinos from "../../pages/Destinos";
import DetalleDestino from "../../pages/DetalleDestino";
import ResumenDestino from "../../pages/ResumenDestino";
import VuelosDestino from "../../pages/VuelosDestino";
import HotelesDestino from "../../pages/HotelesDestino";

// Renderiza las rutas anidadas reales de la app partiendo de una ruta inicial
function renderDetalle(ruta) {
  return render(
    <MemoryRouter initialEntries={[ruta]}>
      <Routes>
        <Route path="/destinos" element={<p>Listado</p>} />
        <Route path="/destinos/:id" element={<DetalleDestino />}>
          <Route index element={<ResumenDestino />} />
          <Route path="vuelos" element={<VuelosDestino />} />
          <Route path="hoteles" element={<HotelesDestino />} />
        </Route>
      </Routes>
    </MemoryRouter>
  );
}

describe("Inicio y NoEncontrada", () => {
  test("Inicio muestra el título y el enlace a destinos", () => {
    render(<MemoryRouter><Inicio /></MemoryRouter>);
    expect(screen.getByRole("heading", { name: "Descubre tu próximo destino" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Ver destinos" })).toHaveAttribute("href", "/destinos");
  });

  test("NoEncontrada informa el error y permite volver al inicio", () => {
    render(<MemoryRouter><NoEncontrada /></MemoryRouter>);
    expect(screen.getByRole("heading", { name: "Página no encontrada" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Volver al inicio" })).toHaveAttribute("href", "/");
  });
});

describe("Destinos", () => {
  test("muestra el estado de carga y luego las tarjetas de destinos desde el mock REST", async () => {
    render(<MemoryRouter><Destinos /></MemoryRouter>);
    expect(screen.getByText("Cargando destinos...")).toBeInTheDocument();

    expect(await screen.findByRole("heading", { name: "Destinos" })).toBeInTheDocument();
    expect(screen.getAllByRole("link", { name: "Ver detalle" })).toHaveLength(6);
    expect(screen.getByRole("heading", { name: "Tokio" })).toBeInTheDocument();
  });

  test("muestra un mensaje de error cuando la API falla", async () => {
    server.use(http.get("/api/destinos", () => new HttpResponse(null, { status: 500 })));
    render(<MemoryRouter><Destinos /></MemoryRouter>);
    expect(await screen.findByRole("alert")).toHaveTextContent("No se pudo cargar la lista de destinos");
  });
});

describe("DetalleDestino y sub-rutas", () => {
  test("muestra el resumen del destino con descripción y actividades", async () => {
    renderDetalle("/destinos/1");
    expect(screen.getByText("Cargando destino...")).toBeInTheDocument();

    expect(await screen.findByRole("heading", { name: "París" })).toBeInTheDocument();
    expect(screen.getByText(/La ciudad del amor/)).toBeInTheDocument();
    expect(screen.getByText("Torre Eiffel")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Ver vuelos" })).toBeInTheDocument();
  });

  test("muestra error y enlace de retorno cuando el destino no existe", async () => {
    renderDetalle("/destinos/99");
    const alerta = await screen.findByRole("alert");
    expect(alerta).toHaveTextContent("El destino solicitado no existe");
    expect(within(alerta).getByRole("link", { name: /Volver a destinos/ })).toBeInTheDocument();
  });

  test("el usuario navega a Vuelos y ve las alternativas con su disponibilidad", async () => {
    const user = userEvent.setup();
    renderDetalle("/destinos/1");
    await screen.findByRole("heading", { name: "París" });

    await user.click(screen.getByRole("link", { name: "Ver vuelos" }));

    expect(await screen.findByRole("heading", { name: "Vuelos a París" })).toBeInTheDocument();
    expect(screen.getByText(/LATAM/)).toBeInTheDocument();
    expect(screen.getByText(/Air France/)).toBeInTheDocument();
    expect(screen.getByText("Sin disponibilidad")).toBeInTheDocument();
  });

  test("el usuario pasa de Vuelos a Hoteles y vuelve a Vuelos", async () => {
    const user = userEvent.setup();
    renderDetalle("/destinos/2/vuelos");
    await screen.findByRole("heading", { name: "Vuelos a Tokio" });

    await user.click(screen.getByRole("link", { name: /Siguiente: ver hoteles/ }));
    expect(await screen.findByRole("heading", { name: "Hoteles en Tokio" })).toBeInTheDocument();
    expect(screen.getByText(/Shinjuku Grand/)).toBeInTheDocument();

    await user.click(screen.getByRole("link", { name: /Volver a vuelos/ }));
    expect(await screen.findByRole("heading", { name: "Vuelos a Tokio" })).toBeInTheDocument();
  });

  test("VuelosDestino muestra mensaje cuando no hay vuelos", async () => {
    server.use(
      http.post("/graphql", () => HttpResponse.json({ data: { vuelos: [] } }))
    );
    renderDetalle("/destinos/1/vuelos");
    expect(await screen.findByText("No hay vuelos disponibles para este destino.")).toBeInTheDocument();
  });

  test("HotelesDestino muestra mensaje cuando no hay hoteles", async () => {
    server.use(
      http.post("/graphql", () => HttpResponse.json({ data: { hoteles: [] } }))
    );
    renderDetalle("/destinos/1/hoteles");
    expect(await screen.findByText("No hay hoteles disponibles para este destino.")).toBeInTheDocument();
  });

  test("VuelosDestino y HotelesDestino muestran error cuando GraphQL falla", async () => {
    server.use(http.post("/graphql", () => new HttpResponse(null, { status: 500 })));

    const vuelos = renderDetalle("/destinos/1/vuelos");
    expect(await screen.findByText(/Error de conexión con el servicio GraphQL/)).toBeInTheDocument();
    vuelos.unmount();

    renderDetalle("/destinos/1/hoteles");
    expect(await screen.findByText(/Error de conexión con el servicio GraphQL/)).toBeInTheDocument();
  });
});