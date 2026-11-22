// src/components/TarjetaHotel.jsx
import EtiquetaDisponibilidad from "./EtiquetaDisponibilidad";
import { formatearPrecio, formatearFecha } from "../utils/formato";

function TarjetaHotel({ hotel }) {
  return (
    <article className="tarjeta tarjeta-hotel">
      <div className="tarjeta-cuerpo">
        <h3>🏨 {hotel.nombre}</h3>
        <p className="estrellas" aria-label={`${hotel.estrellas} estrellas`}>
          {"★".repeat(hotel.estrellas)}
        </p>
        <p>
          Del {formatearFecha(hotel.fechaDesde)} al {formatearFecha(hotel.fechaHasta)}
        </p>
        <p className="precio">{formatearPrecio(hotel.precioPorNoche)} por noche</p>
        <EtiquetaDisponibilidad
          disponible={hotel.disponible}
          cantidad={hotel.habitacionesDisponibles}
          unidad="habitaciones"
        />
      </div>
    </article>
  );
}

export default TarjetaHotel;