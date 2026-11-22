// src/pages/VuelosDestino.jsx
import { Link, useOutletContext } from "react-router-dom";
import { useConsulta } from "../hooks/useConsulta";
import { obtenerVuelos } from "../services/viajesService";
import Cargando from "../components/Cargando";
import MensajeError from "../components/MensajeError";
import TarjetaVuelo from "../components/TarjetaVuelo";

function VuelosDestino() {
  const { destino } = useOutletContext();
  const { datos: vuelos, cargando, error } = useConsulta(
    () => obtenerVuelos(destino.id),
    [destino.id]
  );

  if (cargando) return <Cargando mensaje="Cargando vuelos..." />;
  if (error) return <MensajeError mensaje={error} />;

  return (
    <div>
      <h2>Vuelos a {destino.nombre}</h2>

      {vuelos.length === 0 ? (
        <p>No hay vuelos disponibles para este destino.</p>
      ) : (
        <div className="grilla">
          {vuelos.map((vuelo) => (
            <TarjetaVuelo key={vuelo.id} vuelo={vuelo} />
          ))}
        </div>
      )}

      <div className="acciones">
        <Link to="../hoteles" className="boton">
          Siguiente: ver hoteles →
        </Link>
      </div>
    </div>
  );
}

export default VuelosDestino;