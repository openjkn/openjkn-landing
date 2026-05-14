import { Button } from "@/components/ui/button"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card"

import { HeroCarousel } from "@/components/hero-carousel"
import Script from "next/script"

export default function Page() {
  return (
    <div className="min-h-svh flex flex-col">
      {/* Hero Section */}
      <header className="relative min-h-[85vh] flex items-center overflow-hidden border-b border-border/40">
        <HeroCarousel />

        <div className="container mx-auto px-4 relative z-10 py-24 lg:py-32">
          <div className="max-w-3xl">
            <div className="flex flex-col gap-8">
              <div className="space-y-4">
                <h1 className="text-3xl lg:text-5xl font-bold tracking-tight text-white drop-shadow-sm leading-[1.1]">
                  The Safe Sandbox for Indonesia&apos;s <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#77DD77] to-[#72A0C1]">Digital Health</span> Future.
                </h1>
              </div>

              <p className="text-xl text-slate-200 max-w-2xl leading-relaxed drop-shadow-md">
                OpenJKN provides a risk-free, decoupled simulation environment to
                test FHIR payloads, validate BPJS business rules, and accelerate
                SATUSEHAT integration without touching live clinical data.
              </p>

              <div className="flex flex-wrap gap-5 mt-4">
                <Button size="2xl" className="bg-[#72A0C1] hover:bg-[#5a8bb0] text-white shadow-xl shadow-[#72A0C1]/20 group" asChild>
                  <a href="#community">
                    Join the Working Group
                    <span className="inline-block transition-transform group-hover:translate-x-1 ml-2">→</span>
                  </a>
                </Button>
                <Button size="2xl" variant="outline" className="bg-white/5 backdrop-blur-md border-white/20 text-white hover:bg-white/80" asChild>
                  <a href="#docs">Read the Docs</a>
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 animate-bounce hidden lg:block">
          <div className="w-6 h-10 rounded-full border-2 border-white/20 flex justify-center p-1">
            <div className="w-1.5 h-1.5 rounded-full bg-white/60" />
          </div>
        </div>
      </header>

      {/* Trusted By Section */}
      <section className="py-12 border-y border-border/40 bg-slate-50/50 dark:bg-slate-900/50">
        <div className="container mx-auto px-4">
          <p className="text-center text-sm font-medium text-muted-foreground/80 mb-10 tracking-wide uppercase">
            Initiated and supported by leading health informatics institutions
          </p>
          <div className="flex flex-wrap justify-center items-center gap-10 md:gap-20">
            <img
              src="/logos/ugm.png"
              alt="UGM"
              className="h-14 w-auto object-contain brightness-110"
            />
            <img
              src="/logos/aehin.png"
              alt="AeHIN"
              className="h-10 w-auto object-contain"
            />
            <img
              src="/logos/bpjs.png"
              alt="BPJS Kesehatan"
              className="h-10 w-auto object-contain"
            />
            <img
              src="/logos/kemenkes.png"
              alt="Kemenkes RI"
              className="h-14 w-auto object-contain"
            />
            <img
              src="/logos/openimis.svg"
              alt="openIMIS"
              className="h-10 w-auto object-contain"
            />
          </div>
        </div>
      </section>

      {/* Three Pillars Section */}
      <section id="pillars" className="py-24 border-t border-border/40">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight mb-4">
              Built for the Entire Ecosystem
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              OpenJKN serves as a bridge between practitioners, government, and
              academia, creating a collaborative environment for healthcare
              interoperability.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">For Practitioners</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Test your EMR systems against SATUSEHAT standards in a safe
                  environment. Validate FHIR payloads and ensure your systems
                  are ready for production integration.
                </CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">For Government</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Ensure compliance with national healthcare standards. Simulate
                  actuarial impact and validate business rules before deployment
                  to production systems.
                </CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">For Academia</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  A digital health laboratory for universities. Research healthcare
                  interoperability, teach FHIR standards, and contribute to the
                  future of Indonesia&apos;s health infrastructure.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Community Portal Section */}
      <section id="community" className="py-24 border-t border-border/40">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight">
              Join the Open Collaboration
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mt-4">
              Become part of the growing community working to advance Indonesia&apos;s
              healthcare interoperability.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Become a Member</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="w-full rounded-lg overflow-hidden border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950">
                  <iframe 
                    data-tally-src="https://tally.so/embed/ODdp67?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1" 
                    loading="lazy" 
                    width="100%" 
                    height="400" 
                    frameBorder="0" 
                    marginHeight={0} 
                    marginWidth={0} 
                    title="Registration Form"
                  ></iframe>
                  <Script src="https://tally.so/widgets/embed.js" strategy="lazyOnload" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Working Group Events</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="w-full h-[400px] rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 flex flex-col items-center justify-center p-6 text-center">
                  <div className="w-16 h-16 mb-4 rounded-full bg-[#72A0C1]/20 flex items-center justify-center">
                    <svg className="w-8 h-8 text-[#72A0C1]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold mb-2">No Upcoming Events</h3>
                  <p className="text-muted-foreground text-sm max-w-[250px] mb-6">
                    We are planning our first Working Group sessions. Follow us to get notified.
                  </p>
                  <Button variant="outline" className="border-slate-300 dark:border-slate-700" asChild>
                    <a href="https://lu.ma/@openjkn" target="_blank" rel="noreferrer">
                      Follow on Luma
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section id="docs" className="py-24 border-t border-border/40 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold tracking-tight mb-4">
              Stay Updated
            </h2>
            <p className="text-muted-foreground mb-8">
              Get the latest updates on OpenJKN development, community events, and
              healthcare interoperability news.
            </p>
            <div className="w-full max-w-md mx-auto rounded-lg overflow-hidden border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 shadow-sm">
              <iframe
                src="https://openjkn.substack.com/embed"
                width="100%"
                height="320"
                style={{ border: "none", background: "transparent" }}
                frameBorder="0"
                scrolling="no"
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-border/40">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-sm text-muted-foreground">
              © 2026 OpenJKN Initiative. Open-source under MIT License.
            </p>
            <div className="flex gap-6">
              <a
                href="#"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                GitHub
              </a>
              <a
                href="#"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Wiki
              </a>
              <a
                href="#"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Contact
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
