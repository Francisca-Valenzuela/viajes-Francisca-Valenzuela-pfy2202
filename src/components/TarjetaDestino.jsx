// src/components/TarjetaDestino.jsx
import { Link } from "react-router-dom";
import ImagenDestino from "./ImagenDestino";

function TarjetaDestino({ destino }) {
  return (
    <article className="tarjeta tarjeta-destino">
      <ImagenDestino src={destino.imagen} alt={`Vista de ${destino.nombre}`} />
      <div className="tarjeta-cuerpo">
        <h2>{destino.nombre}</h2>
        <p className="pais">{destino.pais}</p>
        <ul className="actividades">
          {destino.actividades.map((actividad) => (
            <li key={actividad}>{actividad}</li>
          ))}
        </ul>
        <Link to={`/destinos/${destino.id}`} className="boton">
          Ver detalle
        </Link>
      </div>
    </article>
  );
}

export default TarjetaDestino;