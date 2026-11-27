import { cn } from '@/src/lib/utils';
export function TextField({ label, name, id, className, ...props }) {
    const inputId = id ?? name;
    return (<div className={cn('flex flex-col gap-1.5', className)}>
      <label htmlFor={inputId} className="text-[11px] font-medium uppercase tracking-[0.14em]">
        {label}
      </label>
      <input id={inputId} name={name} className="h-11 border-b border-input bg-transparent text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-foreground" {...props}/>
    </div>);
}
