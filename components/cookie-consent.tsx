"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"

export function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem("openjkn-cookie-consent")
    if (!consent) {
      setIsVisible(true)
    }
  }, [])

  const handleAccept = () => {
    localStorage.setItem("openjkn-cookie-consent", "accepted")
    setIsVisible(false)
  }

  const handleDecline = () => {
    localStorage.setItem("openjkn-cookie-consent", "declined")
    setIsVisible(false)
  }

  if (!isVisible) return null

  return (
    <div className="fixed bottom-6 left-6 right-6 md:left-auto md:max-w-md z-[100] animate-in fade-in slide-in-from-bottom-10 duration-500">
      <div className="bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-2xl shadow-slate-200/50 dark:shadow-none relative">
        <button 
          onClick={() => setIsVisible(false)}
          className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
        >
          <X className="h-4 w-4" />
        </button>
        
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-[#77DD77]" />
            <h3 className="font-semibold text-sm uppercase tracking-wider text-slate-500">Cookie Policy</h3>
          </div>
          
          <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
            We use cookies to enhance your simulation experience and analyze our traffic. 
            By continuing to browse, you agree to our use of these digital crumbs.
          </p>
          
          <div className="flex flex-col gap-3 mt-2">
            <div className="flex items-center gap-3">
              <Button 
                onClick={handleAccept}
                className="flex-1 bg-[#72A0C1] hover:bg-[#5a8bb0] text-white rounded-xl h-11"
              >
                Accept All
              </Button>
              <Button 
                variant="outline" 
                onClick={handleDecline}
                className="flex-1 border-slate-200 dark:border-slate-800 rounded-xl h-11"
              >
                Necessary Only
              </Button>
            </div>
            <p className="text-[10px] text-center text-muted-foreground">
              By clicking "Accept All", you agree to our{" "}
              <a href="#" className="underline hover:text-foreground transition-colors">
                Privacy Policy
              </a>.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
