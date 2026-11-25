
import type { Metadata } from 'next'
import { CatalogHero } from '@/components/catalog/catalog-hero'
import { CatalogView } from '@/components/catalog/catalog-view'
import { getCategories, getProductsByGender } from '@/src/lib/products'

export const metadata: Metadata = {
  title: 'Mulher',
  description: 'Coleção feminina OBRA: moletons, jeans, casacos, camisas e t-shirts.',
}

export default async function WomenPage({
  searchParams,
}: {
  searchParams: Promise<{ filtro?: string }>
}) {
  const { filtro } = await searchParams

  const [products, categories] = await Promise.all([
    getProductsByGender('mulher'),
    getCategories('mulher'),
  ])

  return (
    <>
      <CatalogHero
        title="Mulher"
        subtitle="Coleção 04 — Inverno 26"
        image="/images/campaign-men.png"
        imageAlt="Campanha feminina OBRA"
      />

      <CatalogView
        key={filtro ?? 'all'}
        products={products}
        categories={categories}
        initialOnlyNew={filtro === 'novidades'}
      />
    </>
  )
}
