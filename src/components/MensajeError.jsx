// src/components/MensajeError.jsx
function MensajeError({ mensaje, children }) {
  return (
    <div className="mensaje-error" role="alert">
      <p>⚠ {mensaje}</p>
      {children}
    </div>
  );
}

export default MensajeError;