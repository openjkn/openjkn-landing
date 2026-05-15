import type { Metadata } from "next"
import { Geist, Geist_Mono, Inter, Open_Sans } from "next/font/google"

import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { TooltipProvider } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: {
    default: "OpenJKN | The Digital Sandbox for Indonesian JKN",
    template: "%s | OpenJKN"
  },
  description: "OpenJKN Initiative: Accelerating Indonesia's health system transformation through open-source interoperability and the global openIMIS sandbox.",
  icons: {
    icon: "/icon.png",
    shortcut: "/favicon.ico",
    apple: "/icon.png",
  }
}

const inter = Inter({subsets:['latin'],variable:'--font-sans'})
const openSans = Open_Sans({
  subsets: ["latin"],
  variable: "--font-open-sans",
})

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        "antialiased",
        fontMono.variable,
        inter.variable,
        openSans.variable,
        "font-sans"
      )}
    >
      <body>
        <ThemeProvider>
          <TooltipProvider>
            {children}
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
