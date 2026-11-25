import Image from 'next/image'
import Link from 'next/link'

export function HeroSplit() {
  return (
    <section aria-label="Coleções" className="mx-auto max-w-[1600px] px-2 pt-2 md:px-3 md:pt-3">
      <div className="grid gap-2 md:grid-cols-12 md:gap-3">
        <Link href="/mulher" className="group relative block md:col-span-7">
          <div className="relative aspect-[4/5] overflow-hidden bg-muted md:aspect-auto md:h-[calc(100svh-4.5rem)]">
            <Image
              src="/images/campaign-women.png"
              alt="Campanha feminina OBRA inverno 2026"
              fill
              priority
              sizes="(min-width: 768px) 58vw, 100vw"
              className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-[1.03]"
            />
          </div>
          <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between p-4 text-white md:p-8">
            <h2 className="font-display text-[22vw] font-black uppercase leading-[0.78] tracking-[-0.06em] md:text-[10vw]">
              Mulher
            </h2>
            <span className="mb-2 text-[11px] font-semibold uppercase tracking-[0.18em] underline underline-offset-4">
              Ver coleção
            </span>
          </div>
        </Link>

        <div className="flex flex-col gap-2 md:col-span-5 md:gap-3">
          <Link href="/homem" className="group relative block md:flex-1">
            <div className="relative aspect-[4/5] overflow-hidden bg-muted md:aspect-auto md:h-full">
              <Image
                src="/images/campaign-men.png"
                alt="Campanha masculina OBRA inverno 2026"
                fill
                priority
                sizes="(min-width: 768px) 42vw, 100vw"
                className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-[1.03]"
              />
            </div>
            <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between p-4 text-white md:p-8">
              <h2 className="font-display text-[22vw] font-black uppercase leading-[0.78] tracking-[-0.06em] md:text-[7vw]">
                Homem
              </h2>
              <span className="mb-2 text-[11px] font-semibold uppercase tracking-[0.18em] underline underline-offset-4">
                Ver coleção
              </span>
            </div>
          </Link>
          <div className="hidden flex-col justify-between gap-6 bg-foreground p-8 text-background md:flex">
            <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-background/60">Coleção 04 — Inverno 26</p>
            <p className="font-display text-3xl font-black uppercase leading-[0.9] tracking-[-0.03em] lg:text-4xl text-balance">
              Uniforme urbano para dias frios.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
