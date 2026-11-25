
import type { Gender, Product } from './types'

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'

type ProdutoBackend = {
  id: number
  nome: string
  descricao: string | null
  preco: number
  tamanho: string
  cor: string
  estoque: number
  categoriaId: number
  categoria?: {
    id: number
    nome: string
  }
}

function identificarGenero(categoria: string): Gender {
  const nome = categoria.trim().toLowerCase()

  return nome === 'feminino' ? 'mulher' : 'homem'
}

function converterProduto(produto: ProdutoBackend): Product {
  const gender = identificarGenero(produto.categoria?.nome || '')
  
  const slug = produto.nome
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')

  const cores: Record<string, string> = {
    preto: '#111111',
    branco: '#f4f4f2',
    cinza: '#8a8a8a',
    bege: '#cbb89a',
    azul: '#1f2a44',
  }

  return {
    id: String(produto.id),
    slug,
    name: produto.nome,
    gender,
    category: produto.categoria?.nome || 'Outros',
    price: Number(produto.preco),
    colors: [{
      name: produto.cor,
      hex: cores[produto.cor.toLowerCase()] || '#8a8a8a',
    }],
    sizes: produto.tamanho
      .split(',')
      .map((tamanho) => tamanho.trim())
      .filter(Boolean),
    image: gender === 'mulher'
      ? '/images/products/w-blazer.png'
      : '/images/products/m-tee.png',
    description: produto.descricao || '',
    details: [`Estoque disponível: ${produto.estoque}`],
  }
}

export async function buscarProdutosAPI(): Promise<Product[]> {
  const resposta = await fetch(`${API_URL}/produtos`, {
    cache: 'no-store',
  })

  if (!resposta.ok) {
    throw new Error('Não foi possível carregar os produtos da loja.')
  }

  const produtos: ProdutoBackend[] = await resposta.json()

  return produtos.map(converterProduto)
}
