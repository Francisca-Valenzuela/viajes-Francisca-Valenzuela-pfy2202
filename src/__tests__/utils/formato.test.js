import { formatearPrecio, formatearFecha } from "../../utils/formato";

describe("utils/formato", () => {
  test("formatearPrecio entrega el valor con símbolo de moneda y sin decimales", () => {
    const texto = formatearPrecio(1250);
    expect(texto).toMatch(/1\.250/);
    expect(texto).not.toMatch(/,\d{2}$/);
  });

  test("formatearFecha convierte AAAA-MM-DD a una fecha legible sin correr el día", () => {
    const texto = formatearFecha("2027-01-15");
    expect(texto).toMatch(/15/);
    expect(texto).toMatch(/2027/);
    expect(texto.toLowerCase()).toMatch(/ene/);
  });
});