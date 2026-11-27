'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { getAllProducts, searchProducts, } from '@/src/lib/products';
import { formatPrice } from '@/src/lib/format';
const SUGGESTIONS = ['Jeans', 'Casacos', 'Blazer', 'Moletom', 'Vestido'];
export function SearchOverlay({ onClose }) {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        let active = true;
        async function loadProducts() {
            setLoading(true);
            try {
                const data = query.trim()
                    ? await searchProducts(query)
                    : (await getAllProducts()).slice(0, 6);
                if (active) {
                    setResults(data);
                }
            }
            catch (error) {
                console.error('Erro ao buscar produtos:', error);
                if (active) {
                    setResults([]);
                }
            }
            finally {
                if (active) {
                    setLoading(false);
                }
            }
        }
        loadProducts();
        return () => {
            active = false;
        };
    }, [query]);
    useEffect(() => {
        const handleKey = (event) => {
            if (event.key === 'Escape')
                onClose();
        };
        document.body.style.overflow = 'hidden';
        window.addEventListener('keydown', handleKey);
        return () => {
            document.body.style.overflow = '';
            window.removeEventListener('keydown', handleKey);
        };
    }, [onClose]);
    return (<div className="fixed inset-0 z-50 overflow-y-auto bg-background" role="dialog" aria-modal="true" aria-label="Buscar">
      <div className="mx-auto max-w-[1600px] px-4 md:px-8">
        <div className="flex h-12 items-center justify-end">
          <button type="button" onClick={onClose} aria-label="Fechar busca" className="p-1">
            <X className="size-5" strokeWidth={1.5}/>
          </button>
        </div>

        <form role="search" onSubmit={(event) => event.preventDefault()} className="pt-6 md:pt-12">
          <label htmlFor="busca" className="sr-only">
            Buscar produtos
          </label>

          <input id="busca" type="search" autoFocus value={query} onChange={(event) => setQuery(event.target.value)} placeholder="O QUE VOCÊ PROCURA?" className="w-full border-b border-foreground bg-transparent pb-3 font-display text-3xl font-black uppercase tracking-[-0.03em] placeholder:text-foreground/25 focus:outline-none md:text-6xl"/>
        </form>

        <div className="mt-6 flex flex-wrap gap-2">
          {SUGGESTIONS.map((suggestion) => (<button key={suggestion} type="button" onClick={() => setQuery(suggestion)} className="border border-border px-3 py-1.5 text-[11px] font-medium uppercase tracking-[0.14em] transition-colors hover:border-foreground">
              {suggestion}
            </button>))}
        </div>

        <p className="mt-10 text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground" aria-live="polite">
          {loading
            ? 'Carregando produtos...'
            : query
                ? `${results.length} resultado${results.length === 1 ? '' : 's'}`
                : 'Produtos'}
        </p>

        <ul className="mt-4 grid grid-cols-2 gap-x-2 gap-y-6 pb-16 sm:grid-cols-3 lg:grid-cols-6">
          {results.map((product) => (<li key={product.id}>
              <Link href={`/produto/${product.slug}`} onClick={onClose} className="group block">
                <div className="relative aspect-[3/4] overflow-hidden bg-muted">
                  <Image src={product.image} alt={product.name} fill sizes="(min-width: 1024px) 16vw, 50vw" className="object-cover transition-transform duration-500 group-hover:scale-105"/>
                </div>

                <p className="mt-2 text-[11px] uppercase tracking-[0.08em]">
                  {product.name}
                </p>

                <p className="text-[11px] tabular-nums">
                  {formatPrice(product.price)}
                </p>
              </Link>
            </li>))}
        </ul>

        {!loading && results.length === 0 && (<p className="pb-16 text-sm text-muted-foreground">
            Nenhum produto encontrado.
          </p>)}
      </div>
    </div>);
}
