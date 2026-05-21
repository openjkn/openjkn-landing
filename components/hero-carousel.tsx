"use client"

import * as React from "react"
import useEmblaCarousel from "embla-carousel-react"
import { cn } from "@/lib/utils"

const images = [
  "/hero-1.webp",
  "/hero-2.webp",
  "/hero-3.webp",
]

export function HeroCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, duration: 30 })
  const [selectedIndex, setSelectedIndex] = React.useState(0)

  React.useEffect(() => {
    if (!emblaApi) return

    const intervalId = setInterval(() => {
      emblaApi.scrollNext()
    }, 6000)

    const onSelect = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap())
    }

    emblaApi.on("select", onSelect)
    
    return () => {
      clearInterval(intervalId)
      emblaApi.off("select", onSelect)
    }
  }, [emblaApi])

  return (
    <div className="absolute inset-0 z-0 overflow-hidden" ref={emblaRef}>
      <div className="flex h-full">
        {images.map((src, index) => (
          <div 
            key={index} 
            className="relative flex-[0_0_100%] h-full min-w-0 transition-opacity duration-1000"
          >
            <div 
              className={cn(
                "absolute inset-0 bg-cover bg-center bg-no-wrap transition-transform duration-[10000ms] ease-out",
                selectedIndex === index ? "scale-110" : "scale-100"
              )}
              style={{ backgroundImage: `url(${src})` }}
            />
            {/* Dark Overlay with Gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/60 to-transparent dark:from-slate-950/95 dark:via-slate-950/70 dark:to-slate-900/40" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-slate-950/40" />
          </div>
        ))}
      </div>
    </div>
  )
}
