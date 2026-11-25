import { formatPrice } from '@/src/lib/format'

export const FREE_SHIPPING_THRESHOLD = 399
const SHIPPING_FEE = 29.9

export function getShipping(subtotal: number) {
  return subtotal === 0 || subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE
}

export function OrderSummary({ subtotal, children }: { subtotal: number; children?: React.ReactNode }) {
  const shipping = getShipping(subtotal)
  const remaining = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal)

  return (
    <div className="bg-muted p-6">
      <h2 className="text-xs font-semibold uppercase tracking-[0.14em]">Resumo</h2>
      {subtotal > 0 && remaining > 0 && (
        <div className="mt-4">
          <p className="text-[11px] uppercase tracking-[0.08em]">
            Faltam <strong className="tabular-nums">{formatPrice(remaining)}</strong> para frete grátis
          </p>
          <div className="mt-2 h-0.5 bg-border" aria-hidden="true">
            <div className="h-full bg-foreground" style={{ width: `${(subtotal / FREE_SHIPPING_THRESHOLD) * 100}%` }} />
          </div>
        </div>
      )}
      <dl className="mt-6 flex flex-col gap-3 text-xs uppercase tracking-[0.08em] tabular-nums">
        <div className="flex justify-between">
          <dt>Subtotal</dt>
          <dd>{formatPrice(subtotal)}</dd>
        </div>
        <div className="flex justify-between">
          <dt>Frete</dt>
          <dd>{shipping === 0 ? 'Grátis' : formatPrice(shipping)}</dd>
        </div>
        <div className="flex justify-between border-t border-foreground pt-3 text-sm font-semibold">
          <dt>Total</dt>
          <dd>{formatPrice(subtotal + shipping)}</dd>
        </div>
      </dl>
      {children && <div className="mt-6">{children}</div>}
    </div>
  )
}
