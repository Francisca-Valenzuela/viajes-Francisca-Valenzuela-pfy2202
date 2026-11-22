// src/pages/Inicio.jsx
import { Link } from "react-router-dom";

function Inicio() {
  return (
    <section className="hero">
      <h1>Descubre tu próximo destino</h1>
      <p>Explora destinos y compara vuelos y hoteles en un solo lugar.</p>
      <Link to="/destinos" className="boton">
        Ver destinos
      </Link>
    </section>
  );
}

export default Inicio;