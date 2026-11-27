import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import Cargando from "../../components/Cargando";
import MensajeError from "../../components/MensajeError";
import EtiquetaDisponibilidad from "../../components/EtiquetaDisponibilidad";
import ImagenDestino from "../../components/ImagenDestino";
import TarjetaDestino from "../../components/TarjetaDestino";
import TarjetaVuelo from "../../components/TarjetaVuelo";
import TarjetaHotel from "../../components/TarjetaHotel";
import Navbar from "../../components/Navbar";
import Layout from "../../components/Layout";
import { destinos } from "../../mocks/data/destinos";
import { vuelos, hoteles } from "../../mocks/data/viajes";

describe("Cargando", () => {
  test("muestra el mensaje por defecto con rol status", () => {
    render(<Cargando />);
    expect(screen.getByRole("status")).toHaveTextContent("Cargando...");
  });

  test("muestra un mensaje personalizado", () => {
    render(<Cargando mensaje="Cargando vuelos..." />);
    expect(screen.getByText("Cargando vuelos...")).toBeInTheDocument();
  });
});

describe("MensajeError", () => {
  test("muestra el mensaje con rol alert y sus hijos", () => {
    render(
      <MensajeError mensaje="Algo falló">
        <a href="#/">Volver</a>
      </MensajeError>
    );
    expect(screen.getByRole("alert")).toHaveTextContent("Algo falló");
    expect(screen.getByRole("link", { name: "Volver" })).toBeInTheDocument();
  });
});

describe("EtiquetaDisponibilidad", () => {
  test("muestra la cantidad cuando hay disponibilidad", () => {
    render(<EtiquetaDisponibilidad disponible cantidad={12} unidad="asientos" />);
    expect(screen.getByText(/Disponible · 12 asientos/)).toHaveClass("etiqueta-ok");
  });

  test("muestra 'Sin disponibilidad' cuando está agotado", () => {
    render(<EtiquetaDisponibilidad disponible={false} cantidad={0} unidad="asientos" />);
    expect(screen.getByText("Sin disponibilidad")).toHaveClass("etiqueta-agotado");
  });
});

describe("ImagenDestino", () => {
  test("renderiza la imagen cuando hay src", () => {
    render(<ImagenDestino src="http://x/foto.jpg" alt="Vista de París" />);
    expect(screen.getByRole("img", { name: "Vista de París" })).toHaveAttribute("src", "http://x/foto.jpg");
  });

  test("muestra el respaldo cuando no hay src", () => {
    render(<ImagenDestino alt="Sin foto" />);
    expect(screen.getByRole("img", { name: "Sin foto" })).toHaveClass("imagen-respaldo");
  });

  test("cambia al respaldo cuando la imagen falla al cargar", () => {
    render(<ImagenDestino src="http://x/rota.jpg" alt="Rota" />);
    fireEvent.error(screen.getByRole("img", { name: "Rota" }));
    expect(screen.getByRole("img", { name: "Rota" })).toHaveClass("imagen-respaldo");
  });
});

describe("TarjetaDestino", () => {
  test("muestra nombre, país, actividades y enlace al detalle", () => {
    render(
      <MemoryRouter>
        <TarjetaDestino destino={destinos[0]} />
      </MemoryRouter>
    );
    expect(screen.getByRole("heading", { name: "París" })).toBeInTheDocument();
    expect(screen.getByText("Francia")).toBeInTheDocument();
    expect(screen.getAllByRole("listitem")).toHaveLength(destinos[0].actividades.length);
    expect(screen.getByRole("link", { name: "Ver detalle" })).toHaveAttribute("href", "/destinos/1");
  });
});

describe("TarjetaVuelo", () => {
  test("muestra aerolínea, origen, precio y disponibilidad", () => {
    render(<TarjetaVuelo vuelo={vuelos[0]} />);
    expect(screen.getByText(/LATAM/)).toBeInTheDocument();
    expect(screen.getByText(/Santiago \(SCL\)/)).toBeInTheDocument();
    expect(screen.getByText(/1\.250/)).toBeInTheDocument();
    expect(screen.getByText(/Disponible · 12 asientos/)).toBeInTheDocument();
  });

  test("muestra 'Sin disponibilidad' para un vuelo agotado", () => {
    render(<TarjetaVuelo vuelo={vuelos[1]} />);
    expect(screen.getByText("Sin disponibilidad")).toBeInTheDocument();
  });
});

describe("TarjetaHotel", () => {
  test("muestra nombre, estrellas, precio por noche y disponibilidad", () => {
    render(<TarjetaHotel hotel={hoteles[0]} />);
    expect(screen.getByText(/Hôtel Lumière/)).toBeInTheDocument();
    expect(screen.getByLabelText("4 estrellas")).toHaveTextContent("★★★★");
    expect(screen.getByText(/por noche/)).toBeInTheDocument();
    expect(screen.getByText(/Disponible · 5 habitaciones/)).toBeInTheDocument();
  });

  test("muestra 'Sin disponibilidad' para un hotel agotado", () => {
    render(<TarjetaHotel hotel={hoteles[3]} />);
    expect(screen.getByText("Sin disponibilidad")).toBeInTheDocument();
  });
});

describe("Navbar y Layout", () => {
  test("Navbar muestra la marca y los enlaces de navegación", () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );
    expect(screen.getByRole("link", { name: /Agencia de Viajes/ })).toHaveAttribute("href", "/");
    expect(screen.getByRole("link", { name: "Inicio" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Destinos" })).toHaveAttribute("href", "/destinos");
  });

  test("Layout renderiza navbar, contenido de la ruta y pie de página", () => {
    render(
      <MemoryRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<p>Contenido de prueba</p>} />
          </Route>
        </Routes>
      </MemoryRouter>
    );
    expect(screen.getByRole("banner")).toBeInTheDocument();
    expect(screen.getByRole("main")).toHaveTextContent("Contenido de prueba");
    expect(screen.getByRole("contentinfo")).toHaveTextContent("Agencia de Viajes");
  });
});