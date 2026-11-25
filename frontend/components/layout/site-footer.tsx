import Link from 'next/link'

const COLUMNS = [
  {
    title: 'Comprar',
    links: [
      { href: '/mulher', label: 'Mulher' },
      { href: '/homem', label: 'Homem' },
      { href: '/mulher?filtro=novidades', label: 'Novidades' },
    ],
  },
  {
    title: 'Ajuda',
    links: [
      { href: '/conta', label: 'Meus pedidos' },
      { href: '/conta', label: 'Trocas e devoluções' },
      { href: '/conta', label: 'Guia de tamanhos' },
    ],
  },
  {
    title: 'Conta',
    links: [
      { href: '/entrar', label: 'Entrar' },
      { href: '/entrar?modo=registro', label: 'Criar conta' },
      { href: '/carrinho', label: 'Cesta' },
    ],
  },
]

export function SiteFooter() {
  return (
    <footer className="mt-24 bg-foreground text-background">
      <div className="mx-auto max-w-[1600px] px-4 pt-16 md:px-8">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-background/60">Newsletter</p>
            <p className="mt-3 max-w-sm font-display text-2xl font-bold uppercase leading-tight tracking-[-0.02em]">
              Receba lançamentos e drops antes de todo mundo.
            </p>
            <form className="mt-6 flex max-w-md border-b border-background/40" action="#">
              <label htmlFor="newsletter-email" className="sr-only">
                E-mail
              </label>
              <input
                id="newsletter-email"
                type="email"
                required
                placeholder="SEU E-MAIL"
                className="flex-1 bg-transparent py-3 text-xs uppercase tracking-[0.14em] placeholder:text-background/40 focus:outline-none"
              />
              <button type="submit" className="text-xs font-medium uppercase tracking-[0.14em] hover:opacity-60">
                Assinar
              </button>
            </form>
          </div>
          {COLUMNS.map((column) => (
            <nav key={column.title} aria-label={column.title} className="md:col-span-2">
              <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-background/60">{column.title}</p>
              <ul className="mt-4 flex flex-col gap-2.5">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="text-xs uppercase tracking-[0.1em] hover:opacity-60">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <p
          aria-hidden="true"
          className="mt-20 select-none font-display text-[28vw] font-black uppercase leading-[0.75] tracking-[-0.06em] md:text-[22vw]"
        >
          Obra
        </p>

        <div className="flex flex-col gap-2 border-t border-background/20 py-6 text-[11px] uppercase tracking-[0.14em] text-background/60 md:flex-row md:justify-between">
          <p>© 2026 OBRA Studio. Todos os direitos reservados.</p>
          <p>Brasil — Português — BRL</p>
        </div>
      </div>
    </footer>
  )
}
