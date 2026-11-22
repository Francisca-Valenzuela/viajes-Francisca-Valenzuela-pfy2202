// src/components/ImagenDestino.jsx
import { useState } from "react";

function ImagenDestino({ src, alt }) {
  const [fallo, setFallo] = useState(false);

  if (!src || fallo) {
    return (
      <div className="imagen-destino imagen-respaldo" role="img" aria-label={alt}>
        🌍
      </div>
    );
  }

  return (
    <img
      className="imagen-destino"
      src={src}
      alt={alt}
      loading="lazy"
      onError={() => setFallo(true)}
    />
  );
}

export default ImagenDestino;