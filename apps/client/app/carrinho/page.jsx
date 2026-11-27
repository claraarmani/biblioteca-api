import { CartView } from '@/components/cart/cart-view';
import { PageHeading } from '@/components/layout/page-heading';
export const metadata = { title: 'Cesta' };
export default function CartPage() {
    return (<div className="mx-auto max-w-[1600px] px-4 md:px-8">
      <PageHeading title="Cesta"/>
      <CartView />
    </div>);
}
