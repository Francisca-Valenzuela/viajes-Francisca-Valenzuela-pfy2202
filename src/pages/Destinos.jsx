// src/pages/Destinos.jsx
import { useConsulta } from "../hooks/useConsulta";
import { obtenerDestinos } from "../services/destinosService";
import Cargando from "../components/Cargando";
import MensajeError from "../components/MensajeError";
import TarjetaDestino from "../components/TarjetaDestino";

function Destinos() {
  const { datos: destinos, cargando, error } = useConsulta(obtenerDestinos, []);

  if (cargando) return <Cargando mensaje="Cargando destinos..." />;
  if (error) return <MensajeError mensaje={error} />;

  return (
    <section>
      <h1>Destinos</h1>
      <p>Elige un destino para ver sus vuelos y hoteles.</p>
      <div className="grilla">
        {destinos.map((destino) => (
          <TarjetaDestino key={destino.id} destino={destino} />
        ))}
      </div>
    </section>
  );
}

export default Destinos;