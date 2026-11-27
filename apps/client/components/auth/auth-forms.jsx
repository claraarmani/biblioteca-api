'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { TextField } from '@/components/forms/text-field';
import { cn } from '@/src/lib/utils';
export function AuthForms({ initialMode }) {
    const [mode, setMode] = useState(initialMode);
    const [notice, setNotice] = useState(null);
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    async function handleSubmit(event) {
        event.preventDefault();
        setNotice(null);
        setLoading(true);
        const formData = new FormData(event.currentTarget);
        const email = String(formData.get('email') || '');
        const senha = String(formData.get('password') || '');
        const dados = mode === 'registro'
            ? {
                nome: String(formData.get('firstName') || ''),
                sobrenome: String(formData.get('lastName') || ''),
                email,
                senha,
            }
            : { email, senha };
        try {
            const resposta = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${mode === 'registro' ? 'usuarios' : 'login'}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dados),
            });
            const resultado = await resposta.json();
            if (!resposta.ok) {
                throw new Error(resultado.erro || 'Não foi possível realizar a operação.');
            }
            if (mode === 'registro') {
                setNotice('Cadastro realizado com sucesso! Agora faça seu login.');
                setMode('entrar');
                event.currentTarget.reset();
            }
            else {
                localStorage.setItem('token', resultado.token);
                router.push('/conta');
                router.refresh();
            }
        }
        catch (error) {
            setNotice(error instanceof Error
                ? error.message
                : 'Erro ao conectar com o servidor.');
        }
        finally {
            setLoading(false);
        }
    }
    return (<div className="mx-auto w-full max-w-md">
      <div role="tablist" aria-label="Acesso" className="grid grid-cols-2 border-b border-border">
        {['entrar', 'registro'].map((tab) => (<button key={tab} type="button" role="tab" aria-selected={mode === tab} onClick={() => {
                setMode(tab);
                setNotice(null);
            }} className={cn('-mb-px border-b-2 pb-3 text-xs font-semibold uppercase tracking-[0.14em] transition-colors', mode === tab ? 'border-foreground' : 'border-transparent text-muted-foreground hover:text-foreground')}>
            {tab === 'entrar' ? 'Entrar' : 'Criar conta'}
          </button>))}
      </div>

      <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-6" role="tabpanel">
        {mode === 'registro' && (<div className="grid grid-cols-2 gap-4">
            <TextField label="Nome" name="firstName" autoComplete="given-name" required/>
            <TextField label="Sobrenome" name="lastName" autoComplete="family-name" required/>
          </div>)}

        <TextField label="E-mail" name="email" type="email" autoComplete="email" required/>

        <TextField label="Senha" name="password" type="password" autoComplete={mode === 'entrar' ? 'current-password' : 'new-password'} minLength={8} required/>

        {mode === 'registro' && (<label className="flex items-start gap-3 text-xs leading-relaxed text-muted-foreground">
            <input type="checkbox" name="newsletter" className="mt-0.5 size-4 accent-foreground"/>
            Quero receber novidades, lançamentos e ofertas exclusivas por e-mail.
          </label>)}

        {mode === 'entrar' && (<button type="button" className="self-start text-[11px] uppercase tracking-[0.14em] underline underline-offset-4">
            Esqueci minha senha
          </button>)}

        <button type="submit" disabled={loading} className="h-12 bg-foreground text-xs font-semibold uppercase tracking-[0.18em] text-background hover:opacity-85 disabled:opacity-50">
          {loading
            ? 'Aguarde...'
            : mode === 'entrar'
                ? 'Entrar'
                : 'Criar conta'}
        </button>

        {notice && (<p role="status" className="border border-border p-3 text-xs text-muted-foreground">
            {notice}
          </p>)}
      </form>
    </div>);
}
