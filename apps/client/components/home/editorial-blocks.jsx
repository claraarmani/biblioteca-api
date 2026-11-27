import Image from 'next/image';
import Link from 'next/link';
export function EditorialWide() {
    return (<section className="relative mt-24 md:mt-32">
      <div className="relative h-[70svh] min-h-[420px] w-full overflow-hidden bg-muted md:h-[90svh]">
        <Image src="/images/editorial-wide.png" alt="Editorial OBRA com modelos em cenário urbano" fill sizes="100vw" className="object-cover"/>
      </div>
      <div className="absolute inset-0 mx-auto flex max-w-[1600px] flex-col justify-between p-4 text-white md:p-8">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em]">Editorial — Concreto</p>
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <h2 className="max-w-4xl font-display text-5xl font-black uppercase leading-[0.85] tracking-[-0.05em] md:text-8xl text-balance">
            Feito para a cidade.
          </h2>
          <Link href="/mulher?filtro=novidades" className="self-start bg-white px-6 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-black hover:opacity-85 md:self-auto">
            Descobrir
          </Link>
        </div>
      </div>
    </section>);
}
export function EditorialDetail() {
    return (<section className="mx-auto mt-24 grid max-w-[1600px] gap-8 px-4 md:mt-32 md:grid-cols-12 md:px-8">
      <div className="flex flex-col justify-between gap-8 md:col-span-5 md:py-4">
        <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground">Manifesto</p>
        <div>
          <h2 className="font-display text-4xl font-black uppercase leading-[0.9] tracking-[-0.04em] md:text-6xl text-balance">
            Materiais honestos. Cortes precisos.
          </h2>
          <p className="mt-6 max-w-md text-sm leading-relaxed text-muted-foreground text-pretty">
            Cada peça OBRA nasce da tensão entre alfaiataria e rua. Tecidos encorpados, acabamentos limpos e
            silhuetas que atravessam estações.
          </p>
        </div>
        <dl className="grid grid-cols-3 gap-4 border-t border-foreground pt-4">
          {[
            ['04', 'Coleções/ano'],
            ['120+', 'Peças'],
            ['30', 'Dias p/ troca'],
        ].map(([value, label]) => (<div key={label}>
              <dd className="font-display text-2xl font-black tracking-[-0.03em] md:text-3xl">{value}</dd>
              <dt className="mt-1 text-[10px] uppercase tracking-[0.14em] text-muted-foreground">{label}</dt>
            </div>))}
        </dl>
      </div>
      <div className="relative aspect-[4/5] overflow-hidden bg-muted md:col-span-6 md:col-start-7 md:-mt-12">
        <Image src="/images/editorial-detail.png" alt="Detalhe de tecido e costura de uma peça OBRA" fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover"/>
      </div>
    </section>);
}
