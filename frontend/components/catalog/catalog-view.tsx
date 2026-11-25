'use client'

import { useMemo, useState } from 'react'
import { LayoutGrid, Rows3, SlidersHorizontal, X } from 'lucide-react'
import { ProductCard } from '@/components/product/product-card'
import type { Product } from '@/src/lib/types'
import { cn } from '@/src/lib/utils'

type SortKey = 'relevancia' | 'menor-preco' | 'maior-preco' | 'novidades'

const SORT_OPTIONS: { value: SortKey; label: string }[] = [
  { value: 'relevancia', label: 'Relevância' },
  { value: 'novidades', label: 'Novidades' },
  { value: 'menor-preco', label: 'Menor preço' },
  { value: 'maior-preco', label: 'Maior preço' },
]

type CatalogViewProps = {
  products: Product[]
  categories: string[]
  initialOnlyNew?: boolean
}

export function CatalogView({ products, categories, initialOnlyNew = false }: CatalogViewProps) {
  const [category, setCategory] = useState<string | null>(null)
  const [onlyNew, setOnlyNew] = useState(initialOnlyNew)
  const [sizes, setSizes] = useState<string[]>([])
  const [colors, setColors] = useState<string[]>([])
  const [sort, setSort] = useState<SortKey>('relevancia')
  const [dense, setDense] = useState(false)
  const [filtersOpen, setFiltersOpen] = useState(false)

  const allSizes = useMemo(() => Array.from(new Set(products.flatMap((p) => p.sizes))), [products])
  const allColors = useMemo(() => {
    const map = new Map<string, string>()
    products.forEach((p) => p.colors.forEach((c) => map.set(c.name, c.hex)))
    return Array.from(map, ([name, hex]) => ({ name, hex }))
  }, [products])

  const visible = useMemo(() => {
    const filtered = products.filter(
      (p) =>
        (!category || p.category === category) &&
        (!onlyNew || p.isNew) &&
        (sizes.length === 0 || p.sizes.some((s) => sizes.includes(s))) &&
        (colors.length === 0 || p.colors.some((c) => colors.includes(c.name))),
    )
    const sorted = [...filtered]
    if (sort === 'menor-preco') sorted.sort((a, b) => a.price - b.price)
    if (sort === 'maior-preco') sorted.sort((a, b) => b.price - a.price)
    if (sort === 'novidades') sorted.sort((a, b) => Number(Boolean(b.isNew)) - Number(Boolean(a.isNew)))
    return sorted
  }, [products, category, onlyNew, sizes, colors, sort])

  const toggle = (list: string[], value: string) =>
    list.includes(value) ? list.filter((item) => item !== value) : [...list, value]

  const activeFilterCount = sizes.length + colors.length + (onlyNew ? 1 : 0)

  const clearAll = () => {
    setCategory(null)
    setOnlyNew(false)
    setSizes([])
    setColors([])
  }

  return (
    <div>
      <div className="sticky top-12 z-30 border-b border-border bg-background">
        <div className="mx-auto flex max-w-[1600px] items-center gap-4 px-4 md:px-8">
          <ul className="-mb-px flex flex-1 gap-5 overflow-x-auto py-3 [scrollbar-width:none]" aria-label="Categorias">
            <li>
              <CategoryChip active={category === null} onClick={() => setCategory(null)}>
                Ver tudo
              </CategoryChip>
            </li>
            {categories.map((item) => (
              <li key={item}>
                <CategoryChip active={category === item} onClick={() => setCategory(item)}>
                  {item}
                </CategoryChip>
              </li>
            ))}
          </ul>
          <div className="flex shrink-0 items-center gap-4">
            <button
              type="button"
              onClick={() => setDense((value) => !value)}
              className="hidden p-1 hover:opacity-60 md:block"
              aria-label={dense ? 'Mostrar menos produtos por linha' : 'Mostrar mais produtos por linha'}
            >
              {dense ? <Rows3 className="size-4" strokeWidth={1.5} /> : <LayoutGrid className="size-4" strokeWidth={1.5} />}
            </button>
            <button
              type="button"
              onClick={() => setFiltersOpen(true)}
              className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.14em] hover:opacity-60"
              aria-expanded={filtersOpen}
            >
              <SlidersHorizontal className="size-4" strokeWidth={1.5} aria-hidden="true" />
              Filtrar{activeFilterCount > 0 && ` (${activeFilterCount})`}
            </button>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-[1600px] px-4 pt-6 md:px-8">
        <p className="mb-6 text-[11px] uppercase tracking-[0.14em] text-muted-foreground" aria-live="polite">
          {visible.length} {visible.length === 1 ? 'produto' : 'produtos'}
        </p>

        {visible.length > 0 ? (
          <ul
            className={cn(
              'grid gap-x-2 gap-y-10 md:gap-x-3',
              dense ? 'grid-cols-3 md:grid-cols-4 lg:grid-cols-6' : 'grid-cols-2 lg:grid-cols-4',
            )}
          >
            {visible.map((product, index) => (
              <li key={product.id}>
                <ProductCard
                  product={product}
                  priority={index < 4}
                  sizes={dense ? '(min-width: 1024px) 16vw, 33vw' : '(min-width: 1024px) 25vw, 50vw'}
                />
              </li>
            ))}
          </ul>
        ) : (
          <div className="flex flex-col items-center py-24 text-center">
            <p className="font-display text-3xl font-black uppercase tracking-[-0.03em]">Nada por aqui</p>
            <p className="mt-2 text-sm text-muted-foreground">Nenhum produto corresponde aos filtros selecionados.</p>
            <button
              type="button"
              onClick={clearAll}
              className="mt-6 border border-foreground px-6 py-3 text-xs font-semibold uppercase tracking-[0.18em] hover:bg-muted"
            >
              Limpar filtros
            </button>
          </div>
        )}
      </div>

      {filtersOpen && (
        <div className="fixed inset-0 z-50 flex justify-end" role="dialog" aria-modal="true" aria-label="Filtros">
          <button
            type="button"
            className="absolute inset-0 bg-foreground/40"
            aria-label="Fechar filtros"
            onClick={() => setFiltersOpen(false)}
          />
          <div className="relative flex h-full w-full max-w-sm flex-col bg-background animate-in slide-in-from-right duration-300">
            <div className="flex h-12 items-center justify-between border-b border-border px-5">
              <p className="text-xs font-semibold uppercase tracking-[0.14em]">Filtrar</p>
              <button type="button" onClick={() => setFiltersOpen(false)} aria-label="Fechar filtros" className="p-1">
                <X className="size-5" strokeWidth={1.5} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-5 py-6">
              <section>
                <h2 className="text-[11px] font-medium uppercase tracking-[0.14em]">Ordenar por</h2>
                <div className="mt-3 flex flex-col gap-2">
                  {SORT_OPTIONS.map((option) => (
                    <label key={option.value} className="flex cursor-pointer items-center gap-3 text-xs uppercase tracking-[0.08em]">
                      <input
                        type="radio"
                        name="sort"
                        value={option.value}
                        checked={sort === option.value}
                        onChange={() => setSort(option.value)}
                        className="size-3.5 accent-foreground"
                      />
                      {option.label}
                    </label>
                  ))}
                </div>
              </section>

              <section className="mt-8 border-t border-border pt-6">
                <label className="flex cursor-pointer items-center justify-between text-[11px] font-medium uppercase tracking-[0.14em]">
                  Apenas novidades
                  <input
                    type="checkbox"
                    checked={onlyNew}
                    onChange={(event) => setOnlyNew(event.target.checked)}
                    className="size-4 accent-foreground"
                  />
                </label>
              </section>

              <section className="mt-8 border-t border-border pt-6">
                <h2 className="text-[11px] font-medium uppercase tracking-[0.14em]">Tamanho</h2>
                <div className="mt-3 grid grid-cols-5 gap-1.5">
                  {allSizes.map((size) => (
                    <button
                      key={size}
                      type="button"
                      aria-pressed={sizes.includes(size)}
                      onClick={() => setSizes((list) => toggle(list, size))}
                      className={cn(
                        'h-10 border text-xs font-medium',
                        sizes.includes(size) ? 'border-foreground bg-foreground text-background' : 'border-border hover:border-foreground',
                      )}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </section>

              <section className="mt-8 border-t border-border pt-6">
                <h2 className="text-[11px] font-medium uppercase tracking-[0.14em]">Cor</h2>
                <div className="mt-3 grid grid-cols-2 gap-2">
                  {allColors.map((color) => (
                    <button
                      key={color.name}
                      type="button"
                      aria-pressed={colors.includes(color.name)}
                      onClick={() => setColors((list) => toggle(list, color.name))}
                      className={cn(
                        'flex items-center gap-2 border px-3 py-2 text-xs uppercase tracking-[0.08em]',
                        colors.includes(color.name) ? 'border-foreground' : 'border-border hover:border-foreground',
                      )}
                    >
                      <span className="size-3.5 border border-foreground/15" style={{ backgroundColor: color.hex }} />
                      {color.name}
                    </button>
                  ))}
                </div>
              </section>
            </div>

            <div className="grid grid-cols-2 gap-2 border-t border-border p-5">
              <button
                type="button"
                onClick={clearAll}
                className="h-12 border border-foreground text-xs font-semibold uppercase tracking-[0.18em] hover:bg-muted"
              >
                Limpar
              </button>
              <button
                type="button"
                onClick={() => setFiltersOpen(false)}
                className="h-12 bg-foreground text-xs font-semibold uppercase tracking-[0.18em] text-background hover:opacity-85"
              >
                Ver {visible.length}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function CategoryChip({
  active,
  onClick,
  children,
}: {
  active: boolean
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        'whitespace-nowrap border-b pb-1 text-[11px] font-medium uppercase tracking-[0.14em] transition-colors',
        active ? 'border-foreground' : 'border-transparent text-muted-foreground hover:text-foreground',
      )}
    >
      {children}
    </button>
  )
}
