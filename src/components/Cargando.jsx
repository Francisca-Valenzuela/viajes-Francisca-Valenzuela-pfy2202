// src/components/Cargando.jsx
function Cargando({ mensaje = "Cargando..." }) {
  return (
    <div className="cargando" role="status" aria-live="polite">
      <span className="spinner" aria-hidden="true"></span>
      <p>{mensaje}</p>
    </div>
  );
}

export default Cargando;