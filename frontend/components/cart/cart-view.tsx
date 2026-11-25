'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Minus, Plus } from 'lucide-react'
import { CART_MAX_QUANTITY, useCart } from './cart-provider'
import { OrderSummary } from './order-summary'
import { formatPrice } from '@/src/lib/format'

export function CartView() {
  const { lines, subtotal, itemCount, updateQuantity, removeItem } = useCart()

  if (lines.length === 0) {
    return (
      <div className="flex flex-col items-start py-20">
        <p className="max-w-lg font-display text-3xl font-black uppercase leading-none tracking-[-0.03em] md:text-5xl text-balance">
          Sua cesta está vazia.
        </p>
        <p className="mt-4 text-sm text-muted-foreground">Explore as coleções e encontre sua próxima peça.</p>
        <div className="mt-8 flex gap-2">
          <Link href="/mulher" className="bg-foreground px-8 py-3.5 text-xs font-semibold uppercase tracking-[0.18em] text-background hover:opacity-85">
            Mulher
          </Link>
          <Link href="/homem" className="border border-foreground px-8 py-3.5 text-xs font-semibold uppercase tracking-[0.18em] hover:bg-muted">
            Homem
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="grid gap-10 pt-8 lg:grid-cols-12">
      <div className="lg:col-span-8">
        <p className="text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
          {itemCount} {itemCount === 1 ? 'item' : 'itens'}
        </p>
        <ul className="mt-4 divide-y divide-border border-y border-border">
          {lines.map((line, index) => (
            <li key={`${line.productId}-${line.size}-${line.color}`} className="flex gap-4 py-5 md:gap-6">
              <Link href={`/produto/${line.product.slug}`} className="relative aspect-[3/4] w-24 shrink-0 overflow-hidden bg-muted md:w-32">
                <Image src={line.product.image} alt={line.product.name} fill sizes="128px" className="object-cover" />
              </Link>
              <div className="flex flex-1 flex-col justify-between gap-3">
                <div className="flex justify-between gap-4">
                  <div>
                    <Link href={`/produto/${line.product.slug}`} className="text-xs font-medium uppercase tracking-[0.08em] hover:underline">
                      {line.product.name}
                    </Link>
                    <p className="mt-1.5 text-[11px] uppercase tracking-[0.08em] text-muted-foreground">
                      {line.color} / {line.size}
                    </p>
                  </div>
                  <p className="text-xs tabular-nums">{formatPrice(line.lineTotal)}</p>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center border border-border">
                    <button
                      type="button"
                      onClick={() => updateQuantity(index, line.quantity - 1)}
                      disabled={line.quantity <= 1}
                      aria-label="Diminuir quantidade"
                      className="flex size-9 items-center justify-center disabled:opacity-30"
                    >
                      <Minus className="size-3.5" />
                    </button>
                    <span className="w-8 text-center text-xs tabular-nums" aria-live="polite">
                      {line.quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => updateQuantity(index, line.quantity + 1)}
                      disabled={line.quantity >= CART_MAX_QUANTITY}
                      aria-label="Aumentar quantidade"
                      className="flex size-9 items-center justify-center disabled:opacity-30"
                    >
                      <Plus className="size-3.5" />
                    </button>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeItem(index)}
                    className="text-[11px] uppercase tracking-[0.14em] underline underline-offset-4 hover:opacity-60"
                  >
                    Remover
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <aside className="lg:col-span-4">
        <div className="lg:sticky lg:top-20">
          <OrderSummary subtotal={subtotal}>
            <Link
              href="/checkout"
              className="flex h-12 items-center justify-center bg-foreground text-xs font-semibold uppercase tracking-[0.18em] text-background hover:opacity-85"
            >
              Finalizar compra
            </Link>
            <Link href="/mulher" className="mt-3 block text-center text-[11px] uppercase tracking-[0.14em] underline underline-offset-4">
              Continuar comprando
            </Link>
          </OrderSummary>
        </div>
      </aside>
    </div>
  )
}
