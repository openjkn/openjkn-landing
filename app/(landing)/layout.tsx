import { Navbar } from "@/components/navbar"
import { CookieConsent } from "@/components/cookie-consent"

export default function LandingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Navbar />
      {children}
      <CookieConsent />
    </>
  )
}
