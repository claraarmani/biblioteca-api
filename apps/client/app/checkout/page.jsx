import { CheckoutView } from '@/components/checkout/checkout-view';
import { PageHeading } from '@/components/layout/page-heading';
export const metadata = { title: 'Checkout' };
export default function CheckoutPage() {
    return (<div className="mx-auto max-w-[1600px] px-4 md:px-8">
      <PageHeading eyebrow="Pagamento seguro" title="Checkout"/>
      <CheckoutView />
    </div>);
}
