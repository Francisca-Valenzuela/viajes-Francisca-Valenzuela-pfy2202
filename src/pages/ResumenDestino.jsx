// src/pages/ResumenDestino.jsx
import { Link, useOutletContext } from "react-router-dom";

function ResumenDestino() {
  const { destino } = useOutletContext();

  return (
    <div>
      <p>{destino.descripcion}</p>

      <h2>Actividades populares</h2>
      <ul className="actividades">
        {destino.actividades.map((actividad) => (
          <li key={actividad}>{actividad}</li>
        ))}
      </ul>

      <div className="acciones">
        <Link to="vuelos" className="boton">
          Ver vuelos
        </Link>
        <Link to="hoteles" className="boton boton-secundario">
          Ver hoteles
        </Link>
      </div>
    </div>
  );
}

export default ResumenDestino;