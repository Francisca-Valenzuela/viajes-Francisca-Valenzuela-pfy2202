// src/components/TarjetaVuelo.jsx
import EtiquetaDisponibilidad from "./EtiquetaDisponibilidad";
import { formatearPrecio, formatearFecha } from "../utils/formato";

function TarjetaVuelo({ vuelo }) {
  return (
    <article className="tarjeta tarjeta-vuelo">
      <div className="tarjeta-cuerpo">
        <h3>✈ {vuelo.aerolinea}</h3>
        <p>Origen: {vuelo.origen}</p>
        <p>
          Salida: {formatearFecha(vuelo.fechaSalida)} · Regreso:{" "}
          {formatearFecha(vuelo.fechaRegreso)}
        </p>
        <p className="precio">{formatearPrecio(vuelo.precio)}</p>
        <EtiquetaDisponibilidad
          disponible={vuelo.disponible}
          cantidad={vuelo.asientosDisponibles}
          unidad="asientos"
        />
      </div>
    </article>
  );
}

export default TarjetaVuelo;