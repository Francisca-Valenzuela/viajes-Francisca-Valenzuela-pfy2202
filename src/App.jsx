// src/App.jsx
import { HashRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Inicio from "./pages/Inicio";
import Destinos from "./pages/Destinos";
import DetalleDestino from "./pages/DetalleDestino";
import ResumenDestino from "./pages/ResumenDestino";
import VuelosDestino from "./pages/VuelosDestino";
import HotelesDestino from "./pages/HotelesDestino";
import NoEncontrada from "./pages/NoEncontrada";

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Inicio />} />
          <Route path="destinos" element={<Destinos />} />
          <Route path="destinos/:id" element={<DetalleDestino />}>
            <Route index element={<ResumenDestino />} />
            <Route path="vuelos" element={<VuelosDestino />} />
            <Route path="hoteles" element={<HotelesDestino />} />
          </Route>
          <Route path="*" element={<NoEncontrada />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}

export default App;