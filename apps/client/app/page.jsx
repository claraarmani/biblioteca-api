import { HeroSplit } from '@/components/home/hero-split';
import { MarqueeStrip } from '@/components/home/marquee-strip';
import { FeaturedRow } from '@/components/home/featured-row';
import { EditorialDetail, EditorialWide } from '@/components/home/editorial-blocks';
import { getAllProducts } from '@/src/lib/products';
export const dynamic = 'force-dynamic';
export default async function HomePage() {
    let produtos = [];
    try {
        produtos = await getAllProducts();
    }
    catch (error) {
        console.error('Erro ao carregar produtos:', error);
    }
    const produtosMulher = produtos
        .filter((produto) => produto.gender === 'mulher')
        .slice(0, 4);
    const produtosHomem = produtos
        .filter((produto) => produto.gender === 'homem')
        .slice(0, 4);
    return (<>
      <HeroSplit />
      <MarqueeStrip />

      <FeaturedRow eyebrow="Seleção da semana" title="Mulher" href="/mulher" products={produtosMulher}/>

      <EditorialWide />

      <FeaturedRow eyebrow="Seleção da semana" title="Homem" href="/homem" products={produtosHomem}/>

      <EditorialDetail />
    </>);
}
