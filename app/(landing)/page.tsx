import { Button } from "@/components/ui/button"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card"

import { HeroCarousel } from "@/components/hero-carousel"
import Image from "next/image"
import Script from "next/script"
import Parser from "rss-parser"
import { Stethoscope, Building2, GraduationCap } from "lucide-react"

export default async function Page() {
  let articles: any[] = [];
  try {
    const parser = new Parser();
    const feed = await parser.parseURL('https://openjkn.substack.com/feed');
    articles = feed.items.slice(0, 3);
  } catch (error) {
    console.error("Failed to fetch Substack RSS", error);
  }

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
                  <a href="#updates">Read the Updates</a>
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
      <section className="py-10 border-b border-border/40 bg-white dark:bg-slate-950 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-50/50 to-transparent dark:from-slate-900/20" />
        <div className="container mx-auto px-4 relative z-10">
          <p className="text-center text-xs md:text-sm font-semibold text-muted-foreground/70 mb-8 tracking-widest uppercase">
            Initiated and supported by leading health informatics institutions
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-80 hover:opacity-100 transition-opacity duration-500">
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
      <section id="pillars" className="py-16 md:py-24 bg-slate-50/40 dark:bg-slate-900/20 relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[300px] bg-[#72A0C1]/5 blur-[100px] rounded-full pointer-events-none" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 text-slate-900 dark:text-white">
              Built for the Entire Ecosystem
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              OpenJKN serves as a bridge between practitioners, government, and
              academia, creating a collaborative environment for healthcare
              interoperability.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            <Card className="group hover:shadow-xl hover:shadow-[#72A0C1]/5 hover:border-[#72A0C1]/30 transition-all duration-500 hover:-translate-y-1 bg-white dark:bg-slate-950 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#72A0C1]/10 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              <CardHeader className="relative z-10">
                <div className="w-12 h-12 mb-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 flex items-center justify-center text-slate-500 group-hover:text-[#72A0C1] group-hover:scale-110 group-hover:bg-[#72A0C1]/10 transition-all duration-300 shadow-sm">
                  <Stethoscope className="w-6 h-6" />
                </div>
                <CardTitle className="text-xl">For Practitioners</CardTitle>
              </CardHeader>
              <CardContent className="relative z-10">
                <CardDescription className="text-base leading-relaxed">
                  Test your EMR systems against SATUSEHAT standards in a safe
                  environment. Validate FHIR payloads and ensure your systems
                  are ready for production integration.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl hover:shadow-[#72A0C1]/5 hover:border-[#72A0C1]/30 transition-all duration-500 hover:-translate-y-1 bg-white dark:bg-slate-950 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#72A0C1]/10 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              <CardHeader className="relative z-10">
                <div className="w-12 h-12 mb-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 flex items-center justify-center text-slate-500 group-hover:text-[#72A0C1] group-hover:scale-110 group-hover:bg-[#72A0C1]/10 transition-all duration-300 shadow-sm">
                  <Building2 className="w-6 h-6" />
                </div>
                <CardTitle className="text-xl">For Government</CardTitle>
              </CardHeader>
              <CardContent className="relative z-10">
                <CardDescription className="text-base leading-relaxed">
                  Ensure compliance with national healthcare standards. Simulate
                  actuarial impact and validate business rules before deployment
                  to production systems.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl hover:shadow-[#72A0C1]/5 hover:border-[#72A0C1]/30 transition-all duration-500 hover:-translate-y-1 bg-white dark:bg-slate-950 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#72A0C1]/10 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              <CardHeader className="relative z-10">
                <div className="w-12 h-12 mb-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 flex items-center justify-center text-slate-500 group-hover:text-[#72A0C1] group-hover:scale-110 group-hover:bg-[#72A0C1]/10 transition-all duration-300 shadow-sm">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <CardTitle className="text-xl">For Academia</CardTitle>
              </CardHeader>
              <CardContent className="relative z-10">
                <CardDescription className="text-base leading-relaxed">
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
      <section id="community" className="py-8 md:py-12 border-t border-border/40 bg-white dark:bg-slate-950">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
              Join the Open Collaboration
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mt-4 leading-relaxed">
              Become part of the growing community working to advance Indonesia&apos;s
              healthcare interoperability.
            </p>
          </div>
          <div className="grid lg:grid-cols-2 gap-8 md:gap-12 max-w-5xl mx-auto">
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

      {/* Latest Updates Section */}
      <section id="updates" className="py-8 md:py-12 border-t border-border/40 bg-slate-50/40 dark:bg-slate-900/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 text-slate-900 dark:text-white">Latest Updates</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              News, announcements, and technical deep-dives from the OpenJKN team.
            </p>
          </div>

          {articles.length > 0 ? (
            <div className="grid md:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
              {articles.map((article, i) => (
                <a key={i} href={article.link} target="_blank" rel="noreferrer" className="group h-full block">
                  <Card className="h-full hover:border-[#72A0C1] transition-colors overflow-hidden flex flex-col bg-white dark:bg-slate-950">
                    {article.enclosure?.url && (
                      <div className="w-full aspect-video overflow-hidden bg-slate-100 dark:bg-slate-800">
                        <img
                          src={article.enclosure.url}
                          alt={article.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          loading="lazy"
                        />
                      </div>
                    )}
                    <CardHeader>
                      <div className="text-xs text-muted-foreground mb-2">
                        {new Date(article.pubDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                      </div>
                      <CardTitle className="text-xl group-hover:text-[#72A0C1] transition-colors leading-tight">
                        {article.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="mt-auto">
                      <p className="text-sm text-muted-foreground line-clamp-3">
                        {article.contentSnippet || "Click to read the full update on our Substack publication."}
                      </p>
                      <div className="text-[#72A0C1] text-sm font-medium mt-4 flex items-center">
                        Read Article <span className="ml-1 group-hover:translate-x-1 transition-transform">→</span>
                      </div>
                    </CardContent>
                  </Card>
                </a>
              ))}
            </div>
          ) : (
            <div className="text-center text-muted-foreground">
              No articles published yet. Check back soon!
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Section */}
      {/* Intended for future use */}
      {/* <section id="newsletter" className="py-8 md:py-12 border-t border-border/40 bg-white dark:bg-slate-950 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-[#72A0C1]/5 to-transparent dark:from-[#72A0C1]/10 pointer-events-none" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 text-slate-900 dark:text-white">
              Stay Updated
            </h2>
            <p className="text-lg text-muted-foreground mb-10 leading-relaxed">
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
      </section> */}

      {/* Footer */}
      <footer className="py-12 border-t border-border/40 bg-slate-50 dark:bg-slate-950">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex flex-col items-center md:items-start gap-4">
              <div className="flex items-center gap-2">
                <Image src="/icon.png" alt="OpenJKN Logo" width={64} height={64} />
                <span className="font-['Open_Sans'] tracking-tight text-4xl text-slate-900 dark:text-white">
                  <span className="text-[#44AA44]">Open</span>
                  <span className="text-[#72A0C1] font-bold">JKN</span>
                </span>
              </div>
              <p className="text-sm text-muted-foreground">
                © 2026 OpenJKN Initiative. Open-source under MIT License.
              </p>
            </div>

            <div className="flex gap-8">
              <a
                href="https://github.com/openjkn"
                target="_blank"
                rel="noreferrer"
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
              >
                GitHub
              </a>
              <a
                href="/wiki"
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
              >
                Wiki
              </a>
              <a
                href="#"
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
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
