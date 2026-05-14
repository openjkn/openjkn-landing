"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function Navbar() {
  const [isScrolled, setIsScrolled] = React.useState(false)

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={cn(
        "fixed top-0 z-50 w-full transition-all duration-300",
        isScrolled
          ? "bg-background py-2 shadow-sm"
          : "bg-transparent py-4"
      )}
    >
      <div className="container mx-auto flex h-16 items-center px-4">
        <Link href="/" className="flex items-center gap-2 mr-6">
          <Image
            src="/icon.png"
            alt="OpenJKN Logo"
            width={32}
            height={32}
            className={cn(
              "rounded-md transition-all",
              !isScrolled && "brightness-0 invert"
            )}
          />
          <span className={cn(
            "font-['Open_Sans'] text-xl tracking-tight transition-colors duration-300",
            !isScrolled ? "text-white" : "text-foreground"
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
        <nav className="flex flex-1 items-center gap-6 text-sm font-medium">
          <Link
            href="#pillars"
            className={cn(
              "transition-colors hover:text-[#77DD77]",
              isScrolled ? "text-muted-foreground" : "text-white/80"
            )}
          >
            Pillars
          </Link>
          <Link
            href="#community"
            className={cn(
              "transition-colors hover:text-[#77DD77]",
              isScrolled ? "text-muted-foreground" : "text-white/80"
            )}
          >
            Community
          </Link>
          <Link
            href="#docs"
            className={cn(
              "transition-colors hover:text-[#77DD77]",
              isScrolled ? "text-muted-foreground" : "text-white/80"
            )}
          >
            Docs
          </Link>
        </nav>
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            asChild
            className={cn(
              "hidden md:flex transition-colors",
              !isScrolled ? "text-white hover:bg-white/80" : ""
            )}
          >
            <Link href="https://github.com/openjkn" target="_blank">
              GitHub
            </Link>
          </Button>
          <Button
            asChild
            className={cn(
              "transition-all",
              !isScrolled && "bg-[#72A0C1] hover:bg-[#5a8bb0] text-white shadow-lg"
            )}
          >
            <Link href="#community">Join Us</Link>
          </Button>
        </div>
      </div>
    </header>
  )
}
