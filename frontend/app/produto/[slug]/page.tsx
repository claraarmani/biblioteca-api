
import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ProductGallery } from '@/components/product/product-gallery'
import { ProductPurchase } from '@/components/product/product-purchase'
import { ProductCard } from '@/components/product/product-card'
import { getProductBySlug, getRelatedProducts } from '@/src/lib/products'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const product = await getProductBySlug(slug)

  return product
    ? { title: product.name, description: product.description }
    : {}
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  const product = await getProductBySlug(slug)

  if (!product) notFound()

  const related = await getRelatedProducts(product)
  const genderHref = `/${product.gender}`

  return (
    <div className="mx-auto max-w-[1600px] px-4 md:px-8">
      <nav aria-label="Trilha" className="py-4">
        <ol className="flex flex-wrap gap-2 text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
          <li>
            <Link href="/" className="hover:text-foreground">
              Início
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li>
            <Link href={genderHref} className="hover:text-foreground">
              {product.gender === 'mulher' ? 'Mulher' : 'Homem'}
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li aria-current="page" className="text-foreground">
            {product.name}
          </li>
        </ol>
      </nav>

      <div className="grid gap-8 md:grid-cols-12 md:gap-12">
        <div className="md:col-span-7">
          <ProductGallery
            image={product.image}
            name={product.name}
          />
        </div>

        <div className="md:col-span-5 lg:col-span-4 lg:col-start-9">
          <div className="md:sticky md:top-20">
            <ProductPurchase product={product} />
          </div>
        </div>
      </div>

      <section className="mt-24">
        <h2 className="border-b border-foreground pb-3 font-display text-3xl font-black uppercase tracking-[-0.04em] md:text-5xl">
          Complete o look
        </h2>

        <ul className="mt-6 grid grid-cols-2 gap-x-2 gap-y-10 md:gap-x-3 lg:grid-cols-4">
          {related.map((item) => (
            <li key={item.id}>
              <ProductCard product={item} />
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}
