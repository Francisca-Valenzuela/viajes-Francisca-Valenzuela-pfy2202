// src/pages/HotelesDestino.jsx
import { Link, useOutletContext } from "react-router-dom";
import { useConsulta } from "../hooks/useConsulta";
import { obtenerHoteles } from "../services/viajesService";
import Cargando from "../components/Cargando";
import MensajeError from "../components/MensajeError";
import TarjetaHotel from "../components/TarjetaHotel";

function HotelesDestino() {
  const { destino } = useOutletContext();
  const { datos: hoteles, cargando, error } = useConsulta(
    () => obtenerHoteles(destino.id),
    [destino.id]
  );

  if (cargando) return <Cargando mensaje="Cargando hoteles..." />;
  if (error) return <MensajeError mensaje={error} />;

  return (
    <div>
      <h2>Hoteles en {destino.nombre}</h2>

      {hoteles.length === 0 ? (
        <p>No hay hoteles disponibles para este destino.</p>
      ) : (
        <div className="grilla">
          {hoteles.map((hotel) => (
            <TarjetaHotel key={hotel.id} hotel={hotel} />
          ))}
        </div>
      )}

      <div className="acciones">
        <Link to="../vuelos" className="boton boton-secundario">
          ← Volver a vuelos
        </Link>
      </div>
    </div>
  );
}

export default HotelesDestino;