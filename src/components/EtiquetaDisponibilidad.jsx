// src/components/EtiquetaDisponibilidad.jsx
function EtiquetaDisponibilidad({ disponible, cantidad, unidad }) {
  if (!disponible) {
    return <span className="etiqueta etiqueta-agotado">Sin disponibilidad</span>;
  }
  return (
    <span className="etiqueta etiqueta-ok">
      Disponible · {cantidad} {unidad}
    </span>
  );
}

export default EtiquetaDisponibilidad;