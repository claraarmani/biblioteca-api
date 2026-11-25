import Link from 'next/link'
import { ProductCard } from '@/components/product/product-card'
import type { Product } from '@/src/lib/types'

type FeaturedRowProps = {
  eyebrow: string
  title: string
  href: string
  products: Product[]
}

export function FeaturedRow({ eyebrow, title, href, products }: FeaturedRowProps) {
  return (
    <section className="mx-auto mt-20 max-w-[1600px] px-4 md:mt-28 md:px-8">
      <div className="flex items-end justify-between gap-4 border-b border-foreground pb-3">
        <div>
          <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground">{eyebrow}</p>
          <h2 className="mt-1 font-display text-4xl font-black uppercase leading-none tracking-[-0.04em] md:text-6xl">
            {title}
          </h2>
        </div>
        <Link
          href={href}
          className="shrink-0 text-[11px] font-semibold uppercase tracking-[0.18em] underline underline-offset-4 hover:opacity-60"
        >
          Ver tudo
        </Link>
      </div>
      <ul className="mt-6 grid grid-cols-2 gap-x-2 gap-y-10 md:gap-x-3 lg:grid-cols-4">
        {products.map((product) => (
          <li key={product.id}>
            <ProductCard product={product} />
          </li>
        ))}
      </ul>
    </section>
  )
}
