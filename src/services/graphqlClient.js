// src/services/graphqlClient.js

export async function consultarGraphQL(query, variables = {}) {
  const res = await fetch("/graphql", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query, variables }),
  });

  if (!res.ok) {
    throw new Error("Error de conexión con el servicio GraphQL");
  }

  const json = await res.json();

  // GraphQL responde 200 aunque haya errores, así que se revisan aparte
  if (json.errors?.length) {
    throw new Error(json.errors[0].message);
  }
  return json.data;
}