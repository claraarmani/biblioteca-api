import { CatalogHero } from '@/components/catalog/catalog-hero';
import { CatalogView } from '@/components/catalog/catalog-view';
import { getCategories, getProductsByGender } from '@/src/lib/products';
export const metadata = {
    title: 'Homem',
    description: 'Coleção masculina OBRA: moletons, jeans, casacos, camisas e t-shirts.',
};
export default async function MenPage({ searchParams, }) {
    const { filtro } = await searchParams;
    const [products, categories] = await Promise.all([
        getProductsByGender('homem'),
        getCategories('homem'),
    ]);
    return (<>
      <CatalogHero title="Homem" subtitle="Coleção 04 — Inverno 26" image="/images/campaign-men.png" imageAlt="Campanha masculina OBRA"/>

      <CatalogView key={filtro ?? 'all'} products={products} categories={categories} initialOnlyNew={filtro === 'novidades'}/>
    </>);
}
