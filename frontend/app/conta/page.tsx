import type { Metadata } from 'next'
import { AccountView } from '@/components/account/account-view'

export const metadata: Metadata = { title: 'Minha conta' }

export default function AccountPage() {
  return (
    <div className="mx-auto max-w-[1600px] px-4 md:px-8">
      <AccountView />
    </div>
  )
}