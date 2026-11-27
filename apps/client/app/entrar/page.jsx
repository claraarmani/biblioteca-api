import Image from 'next/image';
import { AuthForms } from '@/components/auth/auth-forms';
export const metadata = { title: 'Entrar ou criar conta' };
export default async function LoginPage({ searchParams }) {
    const { modo } = await searchParams;
    return (<div className="mx-auto grid max-w-[1600px] md:min-h-[calc(100svh-3rem)] md:grid-cols-2">
      <div className="relative hidden overflow-hidden bg-muted md:block">
        <Image src="/images/editorial-wide.png" alt="" fill priority sizes="50vw" className="object-cover"/>
        <p className="absolute bottom-8 left-8 font-display text-[8vw] font-black uppercase leading-[0.8] tracking-[-0.06em] text-white">
          Membros
          <br />
          Obra
        </p>
      </div>
      <div className="flex flex-col justify-center px-4 py-16 md:px-12">
        <div className="mx-auto w-full max-w-md">
          <h1 className="font-display text-4xl font-black uppercase leading-[0.9] tracking-[-0.04em] md:text-5xl">
            Sua conta
          </h1>
          <p className="mt-3 text-sm text-muted-foreground">
            Acompanhe pedidos, salve endereços e receba acesso antecipado aos drops.
          </p>
        </div>
        <div className="mt-10">
          <AuthForms key={modo} initialMode={modo === 'registro' ? 'registro' : 'entrar'}/>
        </div>
      </div>
    </div>);
}
