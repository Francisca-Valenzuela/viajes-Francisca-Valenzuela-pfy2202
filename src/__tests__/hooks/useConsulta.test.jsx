import { renderHook, waitFor } from "@testing-library/react";
import { useConsulta } from "../../hooks/useConsulta";

describe("useConsulta", () => {
  test("parte en estado de carga y luego entrega los datos", async () => {
    const { result } = renderHook(() => useConsulta(() => Promise.resolve(["a", "b"]), []));

    expect(result.current).toEqual({ datos: null, cargando: true, error: null });
    await waitFor(() => expect(result.current.cargando).toBe(false));
    expect(result.current.datos).toEqual(["a", "b"]);
    expect(result.current.error).toBeNull();
  });

  test("entrega el mensaje de error cuando la consulta falla", async () => {
    const { result } = renderHook(() => useConsulta(() => Promise.reject(new Error("falló")), []));

    await waitFor(() => expect(result.current.cargando).toBe(false));
    expect(result.current.error).toBe("falló");
    expect(result.current.datos).toBeNull();
  });

  test("vuelve a consultar cuando cambian las dependencias", async () => {
    const { result, rerender } = renderHook(
      ({ id }) => useConsulta(() => Promise.resolve(`dato-${id}`), [id]),
      { initialProps: { id: 1 } }
    );
    await waitFor(() => expect(result.current.datos).toBe("dato-1"));

    rerender({ id: 2 });
    await waitFor(() => expect(result.current.datos).toBe("dato-2"));
  });

  test("ignora respuestas obsoletas si el componente se desmonta", async () => {
    let resolver;
    const pendiente = new Promise((res) => (resolver = res));
    const { result, unmount } = renderHook(() => useConsulta(() => pendiente, []));

    unmount();
    resolver("tarde");
    await pendiente;
    expect(result.current.datos).toBeNull();
  });

  test("ignora errores obsoletos si el componente se desmonta", async () => {
    let rechazar;
    const pendiente = new Promise((_, rej) => (rechazar = rej));
    const { result, unmount } = renderHook(() => useConsulta(() => pendiente, []));

    unmount();
    rechazar(new Error("tarde"));
    await pendiente.catch(() => {});
    expect(result.current.error).toBeNull();
  });

  test("usa dependencias vacías por defecto", async () => {
    const { result } = renderHook(() => useConsulta(() => Promise.resolve(1)));
    await waitFor(() => expect(result.current.datos).toBe(1));
  });
});