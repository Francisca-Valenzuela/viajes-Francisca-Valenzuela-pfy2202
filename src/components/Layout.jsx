// src/components/Layout.jsx
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

function Layout() {
  return (
    <>
      <Navbar />
      <main className="contenido">
        <Outlet />
      </main>
      <footer className="pie">
        <p>Agencia de Viajes · Semana 5</p>
      </footer>
    </>
  );
}

export default Layout;