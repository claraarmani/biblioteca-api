
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

export async function buscarProdutos() {
  const resposta = await fetch(`${API_URL}/produtos`, {
    cache: "no-store",
  });

  if (!resposta.ok) {
    throw new Error("Não foi possível carregar os produtos.");
  }

  return resposta.json();
}

export async function buscarCategorias() {
  const resposta = await fetch(`${API_URL}/categorias`, {
    cache: "no-store",
  });

  if (!resposta.ok) {
    throw new Error("Não foi possível carregar as categorias.");
  }

  return resposta.json();
}
