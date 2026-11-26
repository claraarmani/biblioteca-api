
'use client'

import { useEffect, useState, type FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import { TextField } from '@/components/forms/text-field'
import { cn } from '@/src/lib/utils'

const TABS = [
  { id: 'pedidos', label: 'Pedidos' },
  { id: 'dados', label: 'Dados pessoais' },
  { id: 'enderecos', label: 'Endereços' },
] as const

type TabId = (typeof TABS)[number]['id']

type Usuario = {
  id: number
  nome: string
  sobrenome: string
  email: string
  telefone: string | null
  dataNascimento: string | null
}

export function AccountView() {
  const [tab, setTab] = useState<TabId>('dados')
  const [usuario, setUsuario] = useState<Usuario | null>(null)
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState('')
  const [mensagem, setMensagem] = useState('')
  const [salvando, setSalvando] = useState(false)

  const router = useRouter()

  // Buscar dados do usuário
  useEffect(() => {
    async function buscarPerfil() {
      const token = localStorage.getItem('token')

      if (!token) {
        setErro('Faça login para acessar sua conta.')
        setCarregando(false)
        return
      }

      try {
        const resposta = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/usuarios/perfil`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        )

        const resultado = await resposta.json()

        if (!resposta.ok) {
          throw new Error(resultado.erro || 'Não foi possível carregar seu perfil.')
        }

        setUsuario(resultado)
      } catch (error) {
        setErro(
          error instanceof Error
            ? error.message
            : 'Erro ao carregar os dados.',
        )
      } finally {
        setCarregando(false)
      }
    }

    buscarPerfil()
  }, [])

  // Atualizar dados pessoais
  async function atualizarPerfil(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const formulario = event.currentTarget
    const token = localStorage.getItem('token')

    if (!token) {
      setErro('Faça login novamente para continuar.')
      return
    }

    const formData = new FormData(formulario)

    const dados = {
      nome: String(formData.get('nome') || ''),
      sobrenome: String(formData.get('sobrenome') || ''),
      email: String(formData.get('email') || ''),
      telefone: String(formData.get('telefone') || ''),
      dataNascimento: String(formData.get('dataNascimento') || ''),
    }

    setSalvando(true)
    setErro('')
    setMensagem('')

    try {
      const resposta = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/usuarios/perfil`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(dados),
        },
      )

      const resultado = await resposta.json()

      if (!resposta.ok) {
        throw new Error(resultado.erro || 'Não foi possível atualizar os dados.')
      }

      setUsuario(resultado.usuario)
      setMensagem(resultado.mensagem || 'Dados atualizados com sucesso!')
    } catch (error) {
      setErro(
        error instanceof Error
          ? error.message
          : 'Erro ao atualizar os dados.',
      )
    } finally {
      setSalvando(false)
    }
  }

  // Sair da conta
  function sair() {
    localStorage.removeItem('token')
    router.push('/entrar')
    router.refresh()
  }

  const dataNascimento = usuario?.dataNascimento
    ? usuario.dataNascimento.slice(0, 10)
    : ''

  return (
    <div>
      {/* Cabeçalho da conta */}
      <div className="pt-8">
        <p className="text-xs uppercase tracking-[0.14em] text-muted-foreground">
          Olá{usuario ? `, ${usuario.nome}` : ''}
        </p>

        <h1 className="mt-2 font-display text-6xl font-black uppercase leading-[0.9] tracking-[-0.04em] md:text-8xl">
          Conta
        </h1>

        <div className="mt-5 border-b border-border" />
      </div>

      {/* Conteúdo da conta */}
      <div className="grid gap-10 pt-8 md:grid-cols-12">
        <nav aria-label="Conta" className="md:col-span-3">
          <ul className="flex gap-6 overflow-x-auto border-b border-border md:flex-col md:gap-3 md:border-0">
            {TABS.map((item) => (
              <li key={item.id}>
                <button
                  type="button"
                  onClick={() => {
                    setTab(item.id)
                    setErro('')
                    setMensagem('')
                  }}
                  aria-current={tab === item.id ? 'page' : undefined}
                  className={cn(
                    'whitespace-nowrap pb-3 text-xs font-semibold uppercase tracking-[0.14em] md:pb-0',
                    tab === item.id
                      ? 'text-foreground underline underline-offset-[6px]'
                      : 'text-muted-foreground hover:text-foreground',
                  )}
                >
                  {item.label}
                </button>
              </li>
            ))}

            <li className="md:mt-6">
              <button
                type="button"
                onClick={sair}
                className="whitespace-nowrap pb-3 text-xs uppercase tracking-[0.14em] text-muted-foreground hover:text-foreground md:pb-0"
              >
                Sair
              </button>
            </li>
          </ul>
        </nav>

        <div className="md:col-span-9">
          {tab === 'pedidos' && (
            <div className="border border-border p-8 text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.14em]">
                Nenhum pedido encontrado
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                Seus pedidos aparecerão aqui quando você realizar uma compra.
              </p>
            </div>
          )}

          {tab === 'dados' && (
            <div>
              {carregando && (
                <p className="text-sm text-muted-foreground">
                  Carregando seus dados...
                </p>
              )}

              {erro && (
                <p className="mb-6 border border-border p-3 text-sm">
                  {erro}
                </p>
              )}

              {mensagem && (
                <p className="mb-6 border border-border p-3 text-sm">
                  {mensagem}
                </p>
              )}

              {usuario && !carregando && (
                <form
                  key={usuario.id}
                  className="grid max-w-2xl gap-6 sm:grid-cols-2"
                  onSubmit={atualizarPerfil}
                >
                  <TextField
                    label="Nome"
                    name="nome"
                    defaultValue={usuario.nome}
                    autoComplete="given-name"
                    required
                  />

                  <TextField
                    label="Sobrenome"
                    name="sobrenome"
                    defaultValue={usuario.sobrenome}
                    autoComplete="family-name"
                    required
                  />

                  <TextField
                    label="E-mail"
                    name="email"
                    type="email"
                    defaultValue={usuario.email}
                    className="sm:col-span-2"
                    autoComplete="email"
                    required
                  />

                  <TextField
                    label="Telefone"
                    name="telefone"
                    type="tel"
                    defaultValue={usuario.telefone || ''}
                    autoComplete="tel"
                  />

                  <TextField
                    label="Data de nascimento"
                    name="dataNascimento"
                    type="date"
                    defaultValue={dataNascimento}
                    autoComplete="bday"
                  />

                  <button
                    type="submit"
                    disabled={salvando}
                    className="h-12 bg-foreground text-xs font-semibold uppercase tracking-[0.18em] text-background hover:opacity-85 disabled:opacity-50 sm:col-span-2 sm:w-60"
                  >
                    {salvando ? 'Salvando...' : 'Salvar alterações'}
                  </button>
                </form>
              )}
            </div>
          )}

          {tab === 'enderecos' && (
            <div className="border border-border p-8 text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.14em]">
                Nenhum endereço cadastrado
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                Seus endereços aparecerão aqui quando essa funcionalidade estiver disponível.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
