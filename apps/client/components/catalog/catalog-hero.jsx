import Image from 'next/image';
export function CatalogHero({ title, subtitle, image, imageAlt }) {
    return (<section className="mx-auto grid max-w-[1600px] gap-4 px-4 pb-8 pt-8 md:grid-cols-12 md:items-end md:px-8 md:pt-12">
      <div className="md:col-span-8">
        <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground">{subtitle}</p>
        <h1 className="mt-2 font-display text-[20vw] font-black uppercase leading-[0.8] tracking-[-0.06em] md:text-[11vw]">
          {title}
        </h1>
      </div>
      <div className="relative hidden aspect-[4/5] overflow-hidden bg-muted md:col-span-3 md:col-start-10 md:block">
        <Image src={image} alt={imageAlt} fill priority sizes="25vw" className="object-cover"/>
      </div>
    </section>);
}
