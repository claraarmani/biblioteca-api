import { Analytics } from '@vercel/analytics/next';
import { Archivo, Inter } from 'next/font/google';
import { CartProvider } from '@/components/cart/cart-provider';
import { SiteHeader } from '@/components/layout/site-header';
import { SiteFooter } from '@/components/layout/site-footer';
import './globals.css';
const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const archivo = Archivo({ subsets: ['latin'], variable: '--font-archivo', weight: ['500', '700', '800', '900'] });
export const metadata = {
    title: {
        default: 'OBRA — Moda contemporânea',
        template: '%s — OBRA',
    },
    description: 'OBRA é uma marca de moda contemporânea com coleções feminina e masculina de streetwear e alfaiataria editorial.',
    generator: 'v0.app',
    icons: {
        icon: [
            { url: '/icon-light-32x32.png', media: '(prefers-color-scheme: light)' },
            { url: '/icon-dark-32x32.png', media: '(prefers-color-scheme: dark)' },
            { url: '/icon.svg', type: 'image/svg+xml' },
        ],
        apple: '/apple-icon.png',
    },
};
export const viewport = {
    colorScheme: 'light',
    themeColor: '#ffffff',
};
export default function RootLayout({ children, }) {
    return (<html lang="pt-BR" className={`light ${inter.variable} ${archivo.variable}`}>
      <body className="antialiased">
        <CartProvider>
          <a href="#conteudo" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:bg-foreground focus:px-4 focus:py-2 focus:text-background">
            Pular para o conteúdo
          </a>
          <SiteHeader />
          <main id="conteudo" className="min-h-[70vh]">
            {children}
          </main>
          <SiteFooter />
        </CartProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>);
}
