// src/utils/formato.js

export function formatearPrecio(valor) {
  return new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(valor);
}

// Recibe "2027-01-15". Se arma la fecha a mano para evitar que la zona
// horaria la corra un día hacia atrás.
export function formatearFecha(texto) {
  const [anio, mes, dia] = texto.split("-").map(Number);
  return new Date(anio, mes - 1, dia).toLocaleDateString("es-CL", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}