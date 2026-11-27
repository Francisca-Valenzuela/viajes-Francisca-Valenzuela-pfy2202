import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App";

// App usa HashRouter: la ruta inicial se define con window.location.hash
function renderApp(hash = "#/") {
  window.location.hash = hash;
  return render(<App />);
}

describe("App (integración de rutas)", () => {
  test("la ruta raíz muestra la página de inicio con navbar y pie", () => {
    renderApp("#/");
    expect(screen.getByRole("heading", { name: "Descubre tu próximo destino" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Destinos" })).toBeInTheDocument();
    expect(screen.getByRole("contentinfo")).toBeInTheDocument();
  });

  test("una ruta desconocida muestra la página 404", () => {
    renderApp("#/ruta-inexistente");
    expect(screen.getByRole("heading", { name: "Página no encontrada" })).toBeInTheDocument();
  });

  test("flujo completo: inicio → destinos → detalle → vuelos → hoteles", async () => {
    const user = userEvent.setup();
    renderApp("#/");

    await user.click(screen.getByRole("link", { name: "Ver destinos" }));
    expect(await screen.findByRole("heading", { name: "Destinos" })).toBeInTheDocument();

    const enlaces = await screen.findAllByRole("link", { name: "Ver detalle" });
    await user.click(enlaces[2]); // Cusco
    expect(await screen.findByRole("heading", { name: "Cusco" })).toBeInTheDocument();

    await user.click(screen.getByRole("link", { name: "Vuelos" }));
    expect(await screen.findByRole("heading", { name: "Vuelos a Cusco" })).toBeInTheDocument();
    expect(screen.getByText(/SKY Airline/)).toBeInTheDocument();

    await user.click(screen.getByRole("link", { name: "Hoteles" }));
    expect(await screen.findByRole("heading", { name: "Hoteles en Cusco" })).toBeInTheDocument();
    expect(screen.getByText(/Casa Inca Boutique/)).toBeInTheDocument();
  });

  test("un destino inexistente muestra el error de la API", async () => {
    renderApp("#/destinos/99");
    expect(await screen.findByRole("alert")).toHaveTextContent("El destino solicitado no existe");
  });
});