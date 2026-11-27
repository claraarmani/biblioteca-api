'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Menu, Search, User, X } from 'lucide-react';
import { useCart } from '@/components/cart/cart-provider';
import { SearchOverlay } from './search-overlay';
import { cn } from '@/src/lib/utils';
const NAV_LINKS = [
    { href: '/mulher', label: 'Mulher' },
    { href: '/homem', label: 'Homem' },
    { href: '/mulher?filtro=novidades', label: 'Novidades' },
];
export function SiteHeader() {
    const pathname = usePathname();
    const { itemCount } = useCart();
    const [menuOpen, setMenuOpen] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);
    return (<>
      <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
        <div className="mx-auto grid h-12 max-w-[1600px] grid-cols-3 items-center px-4 md:px-8">
          <nav aria-label="Principal" className="flex items-center gap-6">
            <button type="button" className="-ml-1 p-1 md:hidden" aria-label="Abrir menu" aria-expanded={menuOpen} onClick={() => setMenuOpen(true)}>
              <Menu className="size-5" strokeWidth={1.5}/>
            </button>
            <ul className="hidden items-center gap-6 md:flex">
              {NAV_LINKS.map((link) => {
            const active = pathname === link.href.split('?')[0] && !link.href.includes('?');
            return (<li key={link.href}>
                    <Link href={link.href} className={cn('text-xs font-medium uppercase tracking-[0.14em] transition-opacity hover:opacity-60', active && 'underline underline-offset-[6px]')}>
                      {link.label}
                    </Link>
                  </li>);
        })}
            </ul>
          </nav>

          <Link href="/" className="justify-self-center font-display text-2xl font-black uppercase leading-none tracking-[-0.04em]" aria-label="OBRA — página inicial">
            Obra
          </Link>

          <div className="flex items-center justify-end gap-4 md:gap-6">
            <button type="button" onClick={() => setSearchOpen(true)} className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.14em] hover:opacity-60" aria-label="Buscar produtos">
              <Search className="size-4" strokeWidth={1.5}/>
              <span className="hidden lg:inline">Buscar</span>
            </button>
            <Link href="/conta" className="hidden text-xs font-medium uppercase tracking-[0.14em] hover:opacity-60 sm:flex sm:items-center sm:gap-2">
              <User className="size-4 lg:hidden" strokeWidth={1.5} aria-hidden="true"/>
              <span className="sr-only lg:not-sr-only">Conta</span>
            </Link>
            <Link href="/carrinho" className="text-xs font-medium uppercase tracking-[0.14em] hover:opacity-60" aria-label={`Cesta com ${itemCount} ${itemCount === 1 ? 'item' : 'itens'}`}>
              Cesta <span className="tabular-nums">({itemCount})</span>
            </Link>
          </div>
        </div>
      </header>

      {menuOpen && (<div className="fixed inset-0 z-50 flex flex-col bg-background md:hidden" role="dialog" aria-modal="true" aria-label="Menu">
          <div className="flex h-12 items-center justify-between border-b border-border px-4">
            <span className="font-display text-2xl font-black uppercase tracking-[-0.04em]">Obra</span>
            <button type="button" aria-label="Fechar menu" className="p-1" onClick={() => setMenuOpen(false)}>
              <X className="size-5" strokeWidth={1.5}/>
            </button>
          </div>
          <nav aria-label="Menu móvel" className="flex flex-1 flex-col justify-between px-4 py-8">
            <ul className="flex flex-col gap-2">
              {NAV_LINKS.map((link) => (<li key={link.href}>
                  <Link href={link.href} onClick={() => setMenuOpen(false)} className="font-display text-5xl font-black uppercase leading-none tracking-[-0.04em]">
                    {link.label}
                  </Link>
                </li>))}
            </ul>
            <ul className="flex flex-col gap-4 text-xs font-medium uppercase tracking-[0.14em]">
              <li>
                <Link href="/conta" onClick={() => setMenuOpen(false)}>Minha conta</Link>
              </li>
              <li>
                <Link href="/entrar" onClick={() => setMenuOpen(false)}>Entrar / Registrar</Link>
              </li>
              <li>
                <Link href="/carrinho" onClick={() => setMenuOpen(false)}>Cesta ({itemCount})</Link>
              </li>
            </ul>
          </nav>
        </div>)}

      {searchOpen && <SearchOverlay onClose={() => setSearchOpen(false)}/>}
    </>);
}
