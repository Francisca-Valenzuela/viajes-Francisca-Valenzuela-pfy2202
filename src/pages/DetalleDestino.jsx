// src/pages/DetalleDestino.jsx
import { Link, NavLink, Outlet, useParams } from "react-router-dom";
import { useConsulta } from "../hooks/useConsulta";
import { obtenerDestino } from "../services/destinosService";
import Cargando from "../components/Cargando";
import MensajeError from "../components/MensajeError";
import ImagenDestino from "../components/ImagenDestino";

function DetalleDestino() {
  const { id } = useParams();
  const { datos: destino, cargando, error } = useConsulta(
    () => obtenerDestino(id),
    [id]
  );

  if (cargando) return <Cargando mensaje="Cargando destino..." />;

  if (error) {
    return (
      <MensajeError mensaje={error}>
        <Link to="/destinos">← Volver a destinos</Link>
      </MensajeError>
    );
  }

  return (
    <section>
      <Link to="/destinos">← Volver a destinos</Link>

      <header className="cabecera-destino">
        <ImagenDestino src={destino.imagen} alt={`Vista de ${destino.nombre}`} />
        <div>
          <h1>{destino.nombre}</h1>
          <p className="pais">{destino.pais}</p>
        </div>
      </header>

      <nav className="subnav">
        <NavLink to="." end>
          Resumen
        </NavLink>
        <NavLink to="vuelos">Vuelos</NavLink>
        <NavLink to="hoteles">Hoteles</NavLink>
      </nav>

      <Outlet context={{ destino }} />
    </section>
  );
}

export default DetalleDestino;