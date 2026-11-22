// src/hooks/useConsulta.js
import { useEffect, useState } from "react";

export function useConsulta(consulta, dependencias = []) {
  const [datos, setDatos] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let activo = true; // evita actualizar con respuestas obsoletas

    setCargando(true);
    setError(null);

    consulta()
      .then((resultado) => {
        if (activo) setDatos(resultado);
      })
      .catch((err) => {
        if (activo) {
          setDatos(null);
          setError(err.message);
        }
      })
      .finally(() => {
        if (activo) setCargando(false);
      });

    return () => {
      activo = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencias);

  return { datos, cargando, error };
}