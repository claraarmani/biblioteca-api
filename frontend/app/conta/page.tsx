import type { Metadata } from 'next'
import { AccountView } from '@/components/account/account-view'
import { PageHeading } from '@/components/layout/page-heading'

export const metadata: Metadata = { title: 'Minha conta' }

export default function AccountPage() {
  return (
    <div className="mx-auto max-w-[1600px] px-4 md:px-8">
      <PageHeading eyebrow="Olá, Marina" title="Conta" />
      <AccountView />
    </div>
  )
}
