import { Navbar } from "@/components/navbar"
import { CookieConsent } from "@/components/cookie-consent"
import { cookies } from "next/headers"

export default async function LandingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const cookieStore = await cookies()
  const locale = cookieStore.get('NEXT_LOCALE')?.value || 'id'

  return (
    <>
      <Navbar locale={locale} />
      {children}
      <CookieConsent />
    </>
  )
}
