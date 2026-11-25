'use client'

import Image from 'next/image'
import { useState } from 'react'
import { cn } from '@/src/lib/utils'

// Placeholder views: crops of the single product photo until the API provides multiple images.
const VIEWS = [
  { label: 'Visão completa', className: 'object-center' },
  { label: 'Detalhe superior', className: 'scale-[1.8] object-[50%_25%]' },
  { label: 'Detalhe do tecido', className: 'scale-[2.4] object-[50%_45%]' },
  { label: 'Detalhe inferior', className: 'scale-[1.8] object-[50%_80%]' },
]

export function ProductGallery({ image, name }: { image: string; name: string }) {
  const [active, setActive] = useState(0)

  return (
    <div className="flex flex-col-reverse gap-2 md:flex-row">
      <ul className="flex gap-2 md:flex-col" aria-label="Miniaturas">
        {VIEWS.map((view, index) => (
          <li key={view.label}>
            <button
              type="button"
              onClick={() => setActive(index)}
              aria-label={view.label}
              aria-pressed={active === index}
              className={cn(
                'relative block aspect-[3/4] w-16 overflow-hidden bg-muted transition-opacity md:w-20',
                active === index ? 'opacity-100 ring-1 ring-foreground' : 'opacity-50 hover:opacity-100',
              )}
            >
              <Image src={image} alt="" fill sizes="80px" className={cn('object-cover', view.className)} />
            </button>
          </li>
        ))}
      </ul>

      <div className="relative aspect-[3/4] flex-1 overflow-hidden bg-muted">
        <Image
          key={active}
          src={image}
          alt={`${name} — ${VIEWS[active].label}`}
          fill
          priority
          sizes="(min-width: 1024px) 50vw, 100vw"
          className={cn('object-cover animate-in fade-in duration-500', VIEWS[active].className)}
        />
        <p className="absolute bottom-3 right-3 bg-background px-2 py-1 text-[10px] font-medium uppercase tracking-[0.14em] tabular-nums">
          {active + 1} / {VIEWS.length}
        </p>
      </div>
    </div>
  )
}
