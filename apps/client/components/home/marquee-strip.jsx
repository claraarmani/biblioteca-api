const ITEMS = ['Nova coleção', 'Inverno 26', 'Frete grátis acima de R$ 399', 'Trocas em até 30 dias', 'Drops semanais'];
export function MarqueeStrip() {
    const sequence = [...ITEMS, ...ITEMS];
    return (<div className="mt-2 overflow-hidden border-y border-foreground py-3 md:mt-3">
      <p className="sr-only">{ITEMS.join(' — ')}</p>
      <div aria-hidden="true" className="marquee flex w-max">
        {[0, 1].map((copy) => (<ul key={copy} className="flex shrink-0">
            {sequence.map((item, index) => (<li key={`${copy}-${index}`} className="flex items-center gap-8 pr-8 text-xs font-semibold uppercase tracking-[0.18em]">
                {item}
                <span className="size-1.5 rounded-full bg-foreground"/>
              </li>))}
          </ul>))}
      </div>
    </div>);
}
