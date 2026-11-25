import Image from 'next/image'
import Link from 'next/link'
import { formatPrice } from '@/src/lib/format'
import type { Product } from '@/src/lib/types'
import { cn } from '@/src/lib/utils'

type ProductCardProps = {
  product: Product
  priority?: boolean
  sizes?: string
  className?: string
}

export function ProductCard({ product, priority, sizes = '(min-width: 1024px) 25vw, 50vw', className }: ProductCardProps) {
  return (
    <article className={cn('group', className)}>
      <Link href={`/produto/${product.slug}`} className="block">
        <div className="relative aspect-[3/4] overflow-hidden bg-muted">
          <Image
            src={product.image}
            alt={product.name}
            fill
            priority={priority}
            sizes={sizes}
            className="object-cover transition-[transform,opacity] duration-700 ease-out group-hover:opacity-0"
          />
          <Image
            src={product.image}
            alt=""
            aria-hidden="true"
            fill
            sizes={sizes}
            className="scale-[1.7] object-cover object-[50%_35%] opacity-0 transition-opacity duration-700 ease-out group-hover:opacity-100"
          />
          {product.isNew && (
            <span className="absolute left-2 top-2 bg-background px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.14em]">
              Novo
            </span>
          )}
        </div>
        <div className="mt-2.5 flex items-start justify-between gap-3 px-0.5">
          <h3 className="text-[11px] uppercase leading-snug tracking-[0.06em] md:text-xs">{product.name}</h3>
          <div className="shrink-0 text-right text-[11px] tabular-nums md:text-xs">
            <p className={cn(product.compareAtPrice && 'font-semibold')}>{formatPrice(product.price)}</p>
            {product.compareAtPrice && (
              <p className="text-muted-foreground line-through">{formatPrice(product.compareAtPrice)}</p>
            )}
          </div>
        </div>
        <ul className="mt-2 flex gap-1.5 px-0.5" aria-label="Cores disponíveis">
          {product.colors.map((color) => (
            <li key={color.name}>
              <span
                className="block size-2.5 rounded-full border border-foreground/15"
                style={{ backgroundColor: color.hex }}
                title={color.name}
              />
              <span className="sr-only">{color.name}</span>
            </li>
          ))}
        </ul>
      </Link>
    </article>
  )
}
