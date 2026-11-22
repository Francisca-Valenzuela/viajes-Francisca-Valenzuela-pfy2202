// src/mocks/data/viajes.js
// destinoId coincide con el id de src/mocks/data/destinos.js

export const vuelos = [
  { id: "v1", destinoId: 1, aerolinea: "LATAM", origen: "Santiago (SCL)", fechaSalida: "2027-01-15", fechaRegreso: "2027-01-29", precio: 1250, disponible: true, asientosDisponibles: 12 },
  { id: "v2", destinoId: 1, aerolinea: "Air France", origen: "Santiago (SCL)", fechaSalida: "2027-02-10", fechaRegreso: "2027-02-24", precio: 1380, disponible: false, asientosDisponibles: 0 },

  { id: "v3", destinoId: 2, aerolinea: "ANA", origen: "Santiago (SCL)", fechaSalida: "2027-03-05", fechaRegreso: "2027-03-20", precio: 1890, disponible: true, asientosDisponibles: 7 },
  { id: "v4", destinoId: 2, aerolinea: "Japan Airlines", origen: "Santiago (SCL)", fechaSalida: "2027-04-12", fechaRegreso: "2027-04-27", precio: 1950, disponible: true, asientosDisponibles: 3 },

  { id: "v5", destinoId: 3, aerolinea: "SKY Airline", origen: "Santiago (SCL)", fechaSalida: "2027-01-20", fechaRegreso: "2027-01-27", precio: 320, disponible: true, asientosDisponibles: 25 },
  { id: "v6", destinoId: 3, aerolinea: "LATAM", origen: "Santiago (SCL)", fechaSalida: "2027-02-14", fechaRegreso: "2027-02-21", precio: 365, disponible: true, asientosDisponibles: 9 },

  { id: "v7", destinoId: 4, aerolinea: "American Airlines", origen: "Santiago (SCL)", fechaSalida: "2027-05-03", fechaRegreso: "2027-05-17", precio: 980, disponible: true, asientosDisponibles: 15 },
  { id: "v8", destinoId: 4, aerolinea: "Delta", origen: "Santiago (SCL)", fechaSalida: "2027-06-07", fechaRegreso: "2027-06-21", precio: 1040, disponible: false, asientosDisponibles: 0 },

  { id: "v9", destinoId: 5, aerolinea: "ITA Airways", origen: "Santiago (SCL)", fechaSalida: "2027-04-01", fechaRegreso: "2027-04-15", precio: 1320, disponible: true, asientosDisponibles: 6 },
  { id: "v10", destinoId: 5, aerolinea: "Iberia", origen: "Santiago (SCL)", fechaSalida: "2027-05-10", fechaRegreso: "2027-05-24", precio: 1275, disponible: true, asientosDisponibles: 18 },

  { id: "v11", destinoId: 6, aerolinea: "LATAM", origen: "Santiago (SCL)", fechaSalida: "2027-01-08", fechaRegreso: "2027-01-18", precio: 540, disponible: true, asientosDisponibles: 20 },
  { id: "v12", destinoId: 6, aerolinea: "GOL", origen: "Santiago (SCL)", fechaSalida: "2027-02-02", fechaRegreso: "2027-02-12", precio: 510, disponible: true, asientosDisponibles: 4 },
];

export const hoteles = [
  { id: "h1", destinoId: 1, nombre: "Hôtel Lumière", estrellas: 4, precioPorNoche: 180, fechaDesde: "2027-01-15", fechaHasta: "2027-01-29", disponible: true, habitacionesDisponibles: 5 },
  { id: "h2", destinoId: 1, nombre: "Maison Montmartre", estrellas: 3, precioPorNoche: 110, fechaDesde: "2027-01-15", fechaHasta: "2027-01-29", disponible: true, habitacionesDisponibles: 2 },

  { id: "h3", destinoId: 2, nombre: "Shinjuku Grand", estrellas: 4, precioPorNoche: 150, fechaDesde: "2027-03-05", fechaHasta: "2027-03-20", disponible: true, habitacionesDisponibles: 8 },
  { id: "h4", destinoId: 2, nombre: "Sakura Capsule Inn", estrellas: 2, precioPorNoche: 60, fechaDesde: "2027-03-05", fechaHasta: "2027-03-20", disponible: false, habitacionesDisponibles: 0 },

  { id: "h5", destinoId: 3, nombre: "Casa Inca Boutique", estrellas: 4, precioPorNoche: 95, fechaDesde: "2027-01-20", fechaHasta: "2027-01-27", disponible: true, habitacionesDisponibles: 6 },
  { id: "h6", destinoId: 3, nombre: "Hostal Plaza de Armas", estrellas: 3, precioPorNoche: 45, fechaDesde: "2027-01-20", fechaHasta: "2027-01-27", disponible: true, habitacionesDisponibles: 10 },

  { id: "h7", destinoId: 4, nombre: "Manhattan Skyline Hotel", estrellas: 4, precioPorNoche: 260, fechaDesde: "2027-05-03", fechaHasta: "2027-05-17", disponible: true, habitacionesDisponibles: 3 },
  { id: "h8", destinoId: 4, nombre: "Brooklyn Loft Stay", estrellas: 3, precioPorNoche: 170, fechaDesde: "2027-05-03", fechaHasta: "2027-05-17", disponible: true, habitacionesDisponibles: 7 },

  { id: "h9", destinoId: 5, nombre: "Hotel Colosseo", estrellas: 4, precioPorNoche: 165, fechaDesde: "2027-04-01", fechaHasta: "2027-04-15", disponible: true, habitacionesDisponibles: 4 },
  { id: "h10", destinoId: 5, nombre: "Pensione Trastevere", estrellas: 3, precioPorNoche: 90, fechaDesde: "2027-04-01", fechaHasta: "2027-04-15", disponible: false, habitacionesDisponibles: 0 },

  { id: "h11", destinoId: 6, nombre: "Copacabana Beach Hotel", estrellas: 4, precioPorNoche: 130, fechaDesde: "2027-01-08", fechaHasta: "2027-01-18", disponible: true, habitacionesDisponibles: 9 },
  { id: "h12", destinoId: 6, nombre: "Santa Teresa Pousada", estrellas: 3, precioPorNoche: 75, fechaDesde: "2027-01-08", fechaHasta: "2027-01-18", disponible: true, habitacionesDisponibles: 3 },
];