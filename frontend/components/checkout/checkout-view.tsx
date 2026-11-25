'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState, type FormEvent } from 'react'
import { useCart } from '@/components/cart/cart-provider'
import { OrderSummary } from '@/components/cart/order-summary'
import { TextField } from '@/components/forms/text-field'
import { formatPrice } from '@/src/lib/format'
import { cn } from '@/src/lib/utils'

const PAYMENT_METHODS = [
  { value: 'cartao', label: 'Cartão de crédito', note: 'Até 6x sem juros' },
  { value: 'pix', label: 'Pix', note: 'Aprovação imediata' },
  { value: 'boleto', label: 'Boleto', note: 'Vence em 3 dias úteis' },
] as const

// Visual-only checkout: order submission will use the existing backend routes once provided.
export function CheckoutView() {
  const { lines, subtotal } = useCart()
  const [payment, setPayment] = useState<(typeof PAYMENT_METHODS)[number]['value']>('cartao')
  const [notice, setNotice] = useState<string | null>(null)

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setNotice('Interface pronta. A finalização será conectada às rotas de pedido do backend.')
  }

  if (lines.length === 0) {
    return (
      <div className="py-20">
        <p className="font-display text-3xl font-black uppercase tracking-[-0.03em]">Nenhum item para finalizar.</p>
        <Link href="/mulher" className="mt-6 inline-block bg-foreground px-8 py-3.5 text-xs font-semibold uppercase tracking-[0.18em] text-background">
          Ir às compras
        </Link>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-12 pt-8 lg:grid-cols-12">
      <div className="flex flex-col gap-12 lg:col-span-7">
        <Step number="01" title="Contato">
          <TextField label="E-mail" name="email" type="email" autoComplete="email" required className="sm:col-span-2" />
        </Step>

        <Step number="02" title="Entrega">
          <TextField label="Nome completo" name="name" autoComplete="name" required className="sm:col-span-2" />
          <TextField label="CEP" name="postalCode" autoComplete="postal-code" inputMode="numeric" required />
          <TextField label="Telefone" name="phone" type="tel" autoComplete="tel" required />
          <TextField label="Endereço" name="address" autoComplete="address-line1" required className="sm:col-span-2" />
          <TextField label="Número" name="number" required />
          <TextField label="Complemento" name="complement" autoComplete="address-line2" />
          <TextField label="Cidade" name="city" autoComplete="address-level2" required />
          <TextField label="Estado" name="state" autoComplete="address-level1" required />
        </Step>

        <section>
          <StepTitle number="03" title="Pagamento" />
          <fieldset className="mt-6 flex flex-col gap-2">
            <legend className="sr-only">Forma de pagamento</legend>
            {PAYMENT_METHODS.map((method) => (
              <label
                key={method.value}
                className={cn(
                  'flex cursor-pointer items-center justify-between border px-4 py-4 transition-colors',
                  payment === method.value ? 'border-foreground' : 'border-border hover:border-foreground/50',
                )}
              >
                <span className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="payment"
                    value={method.value}
                    checked={payment === method.value}
                    onChange={() => setPayment(method.value)}
                    className="size-4 accent-foreground"
                  />
                  <span className="text-xs font-medium uppercase tracking-[0.1em]">{method.label}</span>
                </span>
                <span className="text-[11px] uppercase tracking-[0.08em] text-muted-foreground">{method.note}</span>
              </label>
            ))}
          </fieldset>
          {payment === 'cartao' && (
            <div className="mt-6 grid gap-6 sm:grid-cols-2">
              <TextField label="Número do cartão" name="cardNumber" autoComplete="cc-number" inputMode="numeric" required className="sm:col-span-2" />
              <TextField label="Nome no cartão" name="cardName" autoComplete="cc-name" required className="sm:col-span-2" />
              <TextField label="Validade" name="cardExpiry" autoComplete="cc-exp" placeholder="MM/AA" required />
              <TextField label="CVV" name="cardCvc" autoComplete="cc-csc" inputMode="numeric" required />
            </div>
          )}
        </section>
      </div>

      <aside className="lg:col-span-5">
        <div className="flex flex-col gap-4 lg:sticky lg:top-20">
          <ul className="flex flex-col gap-4 border border-border p-6">
            {lines.map((line) => (
              <li key={`${line.productId}-${line.size}-${line.color}`} className="flex gap-4">
                <div className="relative aspect-[3/4] w-16 shrink-0 overflow-hidden bg-muted">
                  <Image src={line.product.image} alt={line.product.name} fill sizes="64px" className="object-cover" />
                </div>
                <div className="flex flex-1 justify-between gap-3 text-[11px] uppercase tracking-[0.08em]">
                  <div>
                    <p className="font-medium">{line.product.name}</p>
                    <p className="mt-1 text-muted-foreground">
                      {line.color} / {line.size} / Qtd. {line.quantity}
                    </p>
                  </div>
                  <p className="tabular-nums">{formatPrice(line.lineTotal)}</p>
                </div>
              </li>
            ))}
          </ul>
          <OrderSummary subtotal={subtotal}>
            <button
              type="submit"
              className="h-12 w-full bg-foreground text-xs font-semibold uppercase tracking-[0.18em] text-background hover:opacity-85"
            >
              Confirmar pedido
            </button>
            {notice && (
              <p role="status" className="mt-3 text-xs text-muted-foreground">
                {notice}
              </p>
            )}
          </OrderSummary>
        </div>
      </aside>
    </form>
  )
}

function StepTitle({ number, title }: { number: string; title: string }) {
  return (
    <h2 className="flex items-baseline gap-3 border-b border-foreground pb-3">
      <span className="text-[11px] font-medium tabular-nums text-muted-foreground">{number}</span>
      <span className="font-display text-2xl font-black uppercase tracking-[-0.03em]">{title}</span>
    </h2>
  )
}

function Step({ number, title, children }: { number: string; title: string; children: React.ReactNode }) {
  return (
    <section>
      <StepTitle number={number} title={title} />
      <div className="mt-6 grid gap-6 sm:grid-cols-2">{children}</div>
    </section>
  )
}
