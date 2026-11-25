export function PageHeading({ eyebrow, title }: { eyebrow?: string; title: string }) {
  return (
    <div className="border-b border-foreground pb-4 pt-8 md:pt-12">
      {eyebrow && (
        <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground">{eyebrow}</p>
      )}
      <h1 className="mt-1 font-display text-5xl font-black uppercase leading-[0.85] tracking-[-0.05em] md:text-8xl">
        {title}
      </h1>
    </div>
  )
}
