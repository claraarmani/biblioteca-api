'use client'

import { useState, type FormEvent } from 'react'
import { TextField } from '@/components/forms/text-field'
import { cn } from '@/src/lib/utils'

type Mode = 'entrar' | 'registro'

// Visual-only forms: submission will be wired to the existing backend auth routes once provided.
export function AuthForms({ initialMode }: { initialMode: Mode }) {
  const [mode, setMode] = useState<Mode>(initialMode)
  const [notice, setNotice] = useState<string | null>(null)

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setNotice('Interface pronta. O envio será conectado às rotas de autenticação do backend.')
  }

  return (
    <div className="mx-auto w-full max-w-md">
      <div role="tablist" aria-label="Acesso" className="grid grid-cols-2 border-b border-border">
        {(['entrar', 'registro'] as const).map((tab) => (
          <button
            key={tab}
            type="button"
            role="tab"
            aria-selected={mode === tab}
            onClick={() => {
              setMode(tab)
              setNotice(null)
            }}
            className={cn(
              '-mb-px border-b-2 pb-3 text-xs font-semibold uppercase tracking-[0.14em] transition-colors',
              mode === tab ? 'border-foreground' : 'border-transparent text-muted-foreground hover:text-foreground',
            )}
          >
            {tab === 'entrar' ? 'Entrar' : 'Criar conta'}
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-6" role="tabpanel">
        {mode === 'registro' && (
          <div className="grid grid-cols-2 gap-4">
            <TextField label="Nome" name="firstName" autoComplete="given-name" required />
            <TextField label="Sobrenome" name="lastName" autoComplete="family-name" required />
          </div>
        )}
        <TextField label="E-mail" name="email" type="email" autoComplete="email" required />
        <TextField
          label="Senha"
          name="password"
          type="password"
          autoComplete={mode === 'entrar' ? 'current-password' : 'new-password'}
          minLength={8}
          required
        />
        {mode === 'registro' && (
          <label className="flex items-start gap-3 text-xs leading-relaxed text-muted-foreground">
            <input type="checkbox" name="newsletter" className="mt-0.5 size-4 accent-foreground" />
            Quero receber novidades, lançamentos e ofertas exclusivas por e-mail.
          </label>
        )}
        {mode === 'entrar' && (
          <button type="button" className="self-start text-[11px] uppercase tracking-[0.14em] underline underline-offset-4">
            Esqueci minha senha
          </button>
        )}
        <button
          type="submit"
          className="h-12 bg-foreground text-xs font-semibold uppercase tracking-[0.18em] text-background hover:opacity-85"
        >
          {mode === 'entrar' ? 'Entrar' : 'Criar conta'}
        </button>
        {notice && (
          <p role="status" className="border border-border p-3 text-xs text-muted-foreground">
            {notice}
          </p>
        )}
      </form>
    </div>
  )
}
