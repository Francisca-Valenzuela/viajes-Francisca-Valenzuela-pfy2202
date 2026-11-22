import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/global.css";
import App from "./App.jsx";

async function iniciar() {
  const { worker } = await import("./mocks/browser");
  await worker.start({
    onUnhandledRequest: "bypass",
    serviceWorker: {
      // Necesario para que funcione en GitHub Pages (usa la ruta base)
      url: `${import.meta.env.BASE_URL}mockServiceWorker.js`,
    },
  });

  createRoot(document.getElementById("root")).render(
    <StrictMode>
      <App />
    </StrictMode>
  );
}

iniciar();