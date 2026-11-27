'use client';
import Link from 'next/link';
import { useState } from 'react';
import { Check } from 'lucide-react';
import { useCart } from '@/components/cart/cart-provider';
import { formatPrice } from '@/src/lib/format';
import { cn } from '@/src/lib/utils';
export function ProductPurchase({ product }) {
    const { addItem } = useCart();
    const [color, setColor] = useState(product.colors[0].name);
    const [size, setSize] = useState(null);
    const [sizeError, setSizeError] = useState(false);
    const [added, setAdded] = useState(false);
    const handleAdd = () => {
        if (!size) {
            setSizeError(true);
            return;
        }
        addItem({ productId: product.id, size, color, quantity: 1 });
        setAdded(true);
    };
    return (<div className="flex flex-col gap-8">
      <div>
        <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
          {product.gender === 'mulher' ? 'Mulher' : 'Homem'} / {product.category}
        </p>
        <h1 className="mt-3 font-display text-3xl font-black uppercase leading-[0.95] tracking-[-0.03em] md:text-4xl text-balance">
          {product.name}
        </h1>
        <div className="mt-4 flex items-baseline gap-3 tabular-nums">
          <p className="text-lg font-medium">{formatPrice(product.price)}</p>
          {product.compareAtPrice && (<p className="text-sm text-muted-foreground line-through">{formatPrice(product.compareAtPrice)}</p>)}
        </div>
        <p className="mt-1 text-xs text-muted-foreground">
          ou 6x de {formatPrice(product.price / 6)} sem juros
        </p>
      </div>

      <fieldset>
        <legend className="text-[11px] font-medium uppercase tracking-[0.14em]">
          Cor: <span className="text-muted-foreground">{color}</span>
        </legend>
        <div className="mt-3 flex gap-2">
          {product.colors.map((option) => (<button key={option.name} type="button" onClick={() => setColor(option.name)} aria-pressed={color === option.name} aria-label={option.name} className={cn('flex size-9 items-center justify-center border transition-colors', color === option.name ? 'border-foreground' : 'border-transparent hover:border-border')}>
              <span className="block size-6 border border-foreground/10" style={{ backgroundColor: option.hex }}/>
            </button>))}
        </div>
      </fieldset>

      <fieldset>
        <div className="flex items-center justify-between">
          <legend className="text-[11px] font-medium uppercase tracking-[0.14em]">Tamanho</legend>
          <button type="button" className="text-[11px] uppercase tracking-[0.14em] underline underline-offset-4">
            Guia de tamanhos
          </button>
        </div>
        <div className="mt-3 grid grid-cols-5 gap-1.5">
          {product.sizes.map((option) => (<button key={option} type="button" onClick={() => {
                setSize(option);
                setSizeError(false);
                setAdded(false);
            }} aria-pressed={size === option} className={cn('h-11 border text-xs font-medium uppercase tracking-[0.08em] transition-colors', size === option
                ? 'border-foreground bg-foreground text-background'
                : 'border-border hover:border-foreground')}>
              {option}
            </button>))}
        </div>
        {sizeError && (<p role="alert" className="mt-2 text-xs text-destructive">
            Selecione um tamanho para continuar.
          </p>)}
      </fieldset>

      <div className="flex flex-col gap-2">
        <button type="button" onClick={handleAdd} className="flex h-12 items-center justify-center gap-2 bg-foreground text-xs font-semibold uppercase tracking-[0.18em] text-background transition-opacity hover:opacity-85">
          {added ? (<>
              <Check className="size-4" aria-hidden="true"/> Adicionado à cesta
            </>) : ('Adicionar à cesta')}
        </button>
        {added && (<Link href="/carrinho" className="flex h-12 items-center justify-center border border-foreground text-xs font-semibold uppercase tracking-[0.18em] transition-colors hover:bg-muted">
            Ver cesta
          </Link>)}
        <p className="sr-only" aria-live="polite">
          {added ? `${product.name} adicionado à cesta` : ''}
        </p>
      </div>

      <div className="border-t border-border pt-6">
        <p className="text-sm leading-relaxed text-pretty">{product.description}</p>
        <ul className="mt-5 flex flex-col gap-1.5">
          {product.details.map((detail) => (<li key={detail} className="text-xs uppercase tracking-[0.06em] text-muted-foreground">
              — {detail}
            </li>))}
        </ul>
      </div>

      <dl className="grid grid-cols-2 gap-4 border-t border-border pt-6 text-[11px] uppercase tracking-[0.1em]">
        <div>
          <dt className="font-medium">Frete</dt>
          <dd className="mt-1 text-muted-foreground">Grátis acima de R$ 399</dd>
        </div>
        <div>
          <dt className="font-medium">Trocas</dt>
          <dd className="mt-1 text-muted-foreground">Até 30 dias</dd>
        </div>
      </dl>
    </div>);
}
