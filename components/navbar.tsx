"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function Navbar({ locale = 'id' }: { locale?: string }) {
  const [isScrolled, setIsScrolled] = React.useState(false)

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Cookie Toggle dynamic function
  const toggleLocale = () => {
    const nextLocale = locale === 'id' ? 'en' : 'id'
    document.cookie = `NEXT_LOCALE=${nextLocale}; path=/; max-age=${60 * 60 * 24 * 365}`
    window.location.reload()
  }

  // Navbar translations dictionary
  const menuDict = {
    id: {
      about: "Tentang",
      scenarios: "Skenario",
      community: "Komunitas",
      wiki: "Wiki",
      join: "Gabung"
    },
    en: {
      about: "About",
      scenarios: "Scenarios",
      community: "Community",
      wiki: "Wiki",
      join: "Join Us"
    }
  }

  const t = menuDict[locale === 'en' ? 'en' : 'id']

  return (
    <header
      className={cn(
        "fixed top-0 z-50 w-full transition-all duration-305",
        isScrolled
          ? "bg-white py-2 shadow-sm dark:bg-slate-950 border-b border-slate-200/50 dark:border-slate-800/40"
          : "bg-transparent py-4"
      )}
    >
      <div className="container mx-auto flex h-16 items-center px-4 justify-between">
        <div className="flex items-center">
          <Link href="/" className="flex items-center gap-2 mr-8">
            <Image
              src="/icon.png"
              alt="OpenJKN Logo"
              width={32}
              height={32}
              className={cn(
                "rounded-md transition-all duration-300",
                (!isScrolled) && "brightness-0 invert dark:brightness-100 dark:invert-0"
              )}
            />
            <span className={cn(
              "font-['Open_Sans'] text-xl tracking-tight transition-colors duration-300",
              !isScrolled ? "text-white" : "text-slate-900 dark:text-white"
            )}>
              <span className={cn(
                "transition-colors",
                isScrolled ? "text-[#44AA44]" : "text-white"
              )}>Open</span>
              <span className={cn(
                "font-bold transition-colors",
                isScrolled ? "text-[#72A0C1]" : "text-[#72A0C1]"
              )}>JKN</span>
            </span>
          </Link>
          
          <nav className="hidden md:flex items-center gap-6 text-sm font-semibold">
            <Link
              href="#about"
              className={cn(
                "transition-colors hover:text-[#77DD77]",
                isScrolled ? "text-slate-550 dark:text-slate-400" : "text-white/80"
              )}
            >
              {t.about}
            </Link>
            <Link
              href="#scenarios"
              className={cn(
                "transition-colors hover:text-[#77DD77]",
                isScrolled ? "text-slate-550 dark:text-slate-400" : "text-white/80"
              )}
            >
              {t.scenarios}
            </Link>
            <Link
              href="#community"
              className={cn(
                "transition-colors hover:text-[#77DD77]",
                isScrolled ? "text-slate-550 dark:text-slate-400" : "text-white/80"
              )}
            >
              {t.community}
            </Link>
            <Link
              href="/wiki"
              className={cn(
                "transition-colors hover:text-[#77DD77]",
                isScrolled ? "text-slate-550 dark:text-slate-400" : "text-white/80"
              )}
            >
              {t.wiki}
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            asChild
            className={cn(
              "hidden lg:flex transition-colors",
              !isScrolled ? "text-white hover:bg-white/10 hover:text-white" : ""
            )}
          >
            <Link href="https://github.com/openjkn" target="_blank">
              GitHub
            </Link>
          </Button>

          {/* Elegant Language Switcher Button */}
          <Button
            onClick={toggleLocale}
            variant="outline"
            size="sm"
            className={cn(
              "px-3 py-1 rounded-xl text-xs font-mono tracking-wider font-extrabold transition-all border shrink-0 cursor-pointer shadow-sm",
              !isScrolled
                ? "bg-white/5 border-white/20 text-white hover:bg-white/15 hover:text-white"
                : "border-slate-200 text-slate-700 hover:text-slate-800 bg-slate-50 hover:bg-slate-100"
            )}
          >
            {locale.toUpperCase()}
          </Button>

          <Button
            asChild
            className={cn(
              "transition-all cursor-pointer font-semibold",
              !isScrolled 
                ? "bg-[#72A0C1] hover:bg-[#5a8bb0] text-white shadow-lg shadow-[#72A0C1]/20" 
                : "bg-[#72A0C1] hover:bg-[#5a8bb0] text-white"
            )}
          >
            <Link href="#community">{t.join}</Link>
          </Button>
        </div>
      </div>
    </header>
  )
}
