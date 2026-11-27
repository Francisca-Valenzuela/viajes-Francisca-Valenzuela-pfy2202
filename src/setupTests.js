import "@testing-library/jest-dom";
import { configure } from "@testing-library/react";
import { server } from "./mocks/server";

// Los handlers reales simulan latencia (300-600 ms): se amplía el tiempo de espera de findBy*/waitFor
configure({ asyncUtilTimeout: 4000 });

// Node exige URL absolutas en fetch; la app usa rutas relativas ("/api/destinos")
const fetchOriginal = global.fetch;
global.fetch = (entrada, opciones) =>
  typeof entrada === "string" && entrada.startsWith("/")
    ? fetchOriginal(new URL(entrada, window.location.origin).href, opciones)
    : fetchOriginal(entrada, opciones);

beforeAll(() => server.listen({ onUnhandledRequest: "error" }));
afterEach(() => server.resetHandlers());
afterAll(() => server.close());