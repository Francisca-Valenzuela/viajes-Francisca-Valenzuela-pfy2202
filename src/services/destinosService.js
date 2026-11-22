// src/services/destinosService.js

export async function obtenerDestinos() {
  const res = await fetch("/api/destinos");
  if (!res.ok) {
    throw new Error("No se pudo cargar la lista de destinos");
  }
  return res.json();
}

export async function obtenerDestino(id) {
  const res = await fetch(`/api/destinos/${id}`);
  if (res.status === 404) {
    throw new Error("El destino solicitado no existe");
  }
  if (!res.ok) {
    throw new Error("No se pudo cargar el destino");
  }
  return res.json();
}