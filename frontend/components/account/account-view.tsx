'use client'

import Image from 'next/image'
import { useState } from 'react'
import { TextField } from '@/components/forms/text-field'
import { formatPrice } from '@/src/lib/format'
import { products } from '@/src/lib/products'
import { cn } from '@/src/lib/utils'

const TABS = [
  { id: 'pedidos', label: 'Pedidos' },
  { id: 'dados', label: 'Dados pessoais' },
  { id: 'enderecos', label: 'Endereços' },
] as const

type TabId = (typeof TABS)[number]['id']

// Placeholder account data until the existing backend customer routes are provided.
const ORDERS = [
  { id: 'OB-20481', date: '14 nov 2026', status: 'Em trânsito', items: [products[0], products[2]] },
  { id: 'OB-19877', date: '02 out 2026', status: 'Entregue', items: [products[6]] },
  { id: 'OB-18120', date: '21 ago 2026', status: 'Entregue', items: [products[4], products[11], products[9]] },
]

export function AccountView() {
  const [tab, setTab] = useState<TabId>('pedidos')

  return (
    <div className="grid gap-10 pt-8 md:grid-cols-12">
      <nav aria-label="Conta" className="md:col-span-3">
        <ul className="flex gap-6 overflow-x-auto border-b border-border md:flex-col md:gap-3 md:border-0">
          {TABS.map((item) => (
            <li key={item.id}>
              <button
                type="button"
                onClick={() => setTab(item.id)}
                aria-current={tab === item.id ? 'page' : undefined}
                className={cn(
                  'whitespace-nowrap pb-3 text-xs font-semibold uppercase tracking-[0.14em] md:pb-0',
                  tab === item.id ? 'text-foreground underline underline-offset-[6px]' : 'text-muted-foreground hover:text-foreground',
                )}
              >
                {item.label}
              </button>
            </li>
          ))}
          <li className="md:mt-6">
            <button type="button" className="whitespace-nowrap pb-3 text-xs uppercase tracking-[0.14em] text-muted-foreground hover:text-foreground md:pb-0">
              Sair
            </button>
          </li>
        </ul>
      </nav>

      <div className="md:col-span-9">
        {tab === 'pedidos' && (
          <ul className="flex flex-col gap-4">
            {ORDERS.map((order) => {
              const total = order.items.reduce((sum, item) => sum + item.price, 0)
              return (
                <li key={order.id} className="border border-border p-5 md:p-6">
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.1em]">Pedido {order.id}</p>
                      <p className="mt-1 text-[11px] uppercase tracking-[0.08em] text-muted-foreground">{order.date}</p>
                    </div>
                    <span
                      className={cn(
                        'px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.14em]',
                        order.status === 'Entregue' ? 'bg-muted' : 'bg-foreground text-background',
                      )}
                    >
                      {order.status}
                    </span>
                  </div>
                  <div className="mt-5 flex items-end justify-between gap-4">
                    <ul className="flex gap-2">
                      {order.items.map((item) => (
                        <li key={item.id} className="relative aspect-[3/4] w-14 overflow-hidden bg-muted md:w-16">
                          <Image src={item.image} alt={item.name} fill sizes="64px" className="object-cover" />
                        </li>
                      ))}
                    </ul>
                    <div className="text-right">
                      <p className="text-xs font-semibold tabular-nums">{formatPrice(total)}</p>
                      <button type="button" className="mt-1 text-[11px] uppercase tracking-[0.14em] underline underline-offset-4">
                        Detalhes
                      </button>
                    </div>
                  </div>
                </li>
              )
            })}
          </ul>
        )}

        {tab === 'dados' && (
          <form className="grid max-w-2xl gap-6 sm:grid-cols-2" onSubmit={(event) => event.preventDefault()}>
            <TextField label="Nome" name="firstName" defaultValue="Marina" autoComplete="given-name" />
            <TextField label="Sobrenome" name="lastName" defaultValue="Costa" autoComplete="family-name" />
            <TextField label="E-mail" name="email" type="email" defaultValue="marina@exemplo.com" className="sm:col-span-2" autoComplete="email" />
            <TextField label="Telefone" name="phone" type="tel" defaultValue="(11) 98765-4321" autoComplete="tel" />
            <TextField label="Data de nascimento" name="birthDate" type="date" defaultValue="1996-03-12" autoComplete="bday" />
            <button
              type="submit"
              className="h-12 bg-foreground text-xs font-semibold uppercase tracking-[0.18em] text-background hover:opacity-85 sm:col-span-2 sm:w-60"
            >
              Salvar alterações
            </button>
          </form>
        )}

        {tab === 'enderecos' && (
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="border border-foreground p-6">
              <p className="text-[10px] font-semibold uppercase tracking-[0.14em]">Principal</p>
              <address className="mt-3 text-sm not-italic leading-relaxed">
                Marina Costa
                <br />
                Rua Augusta, 1500 — Apto 82
                <br />
                Consolação, São Paulo — SP
                <br />
                01304-001
              </address>
              <button type="button" className="mt-4 text-[11px] uppercase tracking-[0.14em] underline underline-offset-4">
                Editar
              </button>
            </div>
            <button
              type="button"
              className="flex min-h-40 items-center justify-center border border-dashed border-input text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground hover:border-foreground hover:text-foreground"
            >
              + Novo endereço
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
