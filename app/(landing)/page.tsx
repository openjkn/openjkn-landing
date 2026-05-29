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
import { query } from "@/lib/db"
import { MemberRegistrationForm } from "@/components/member-registration-form"
import { cookies } from "next/headers"
import { dictionaries } from "@/lib/dictionaries"
import {
  FlaskConical,
  Workflow,
  Microscope,
  Link2,
  BrainCircuit,
  UserPlus,
  Hospital,
  ArrowRightLeft,
  GraduationCap,
  Users,
  Globe,
  CheckCircle2,
} from "lucide-react"

export default async function Page() {
  let articles: any[] = [];
  
  // 0. Resolve locale and load translations dictionary
  const cookieStore = await cookies()
  const locale = cookieStore.get('NEXT_LOCALE')?.value || 'id'
  const t = dictionaries[locale === 'en' ? 'en' : 'id']

  // 1. Fetch from PostgreSQL
  try {
    const dbResult = await query(
      "SELECT slug, title, excerpt, image_url, published_at FROM articles WHERE published = true ORDER BY published_at DESC LIMIT 3"
    );
    if (dbResult.rows.length > 0) {
      articles = dbResult.rows.map(row => ({
        title: row.title,
        link: `/articles/${row.slug}`,
        pubDate: row.published_at ? new Date(row.published_at).toISOString() : new Date().toISOString(),
        enclosure: { url: row.image_url },
        contentSnippet: row.excerpt,
        isLocal: true
      }));
    }
  } catch (dbErr) {
    console.error("Failed to fetch PostgreSQL articles:", dbErr);
  }

  // 2. Fetch Substack articles and append if needed to fill 3 items
  if (articles.length < 3) {
    try {
      const parser = new Parser();
      const feed = await parser.parseURL('https://openjkn.substack.com/feed');
      const substackItems = feed.items.slice(0, 3 - articles.length).map(item => ({
        title: item.title || '',
        link: item.link || '',
        pubDate: item.pubDate || new Date().toISOString(),
        enclosure: item.enclosure,
        contentSnippet: item.contentSnippet || '',
        isLocal: false
      }));
      articles = [...articles, ...substackItems];
    } catch (error) {
      console.error("Failed to fetch Substack RSS", error);
    }
  }

  return (
    <div className="min-h-svh flex flex-col">
      {/* Hero Section */}
      <header className="relative min-h-[85vh] flex items-center overflow-hidden border-b border-border/40">
        <HeroCarousel />

        <div className="container mx-auto px-4 relative z-10 py-24 lg:py-32">
          <div className="max-w-3xl">
            <div className="flex flex-col gap-8">
              <div className="space-y-5">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs font-medium text-white/90 tracking-wide select-none">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#77DD77] animate-pulse" />
                  {t.hero.badge}
                </div>
                <h1 className="text-3xl lg:text-5xl font-bold tracking-tight text-white drop-shadow-sm leading-[1.1]">
                  {locale === 'en' ? (
                    <>
                      Open Learning Platform for Indonesia&apos;s{" "}
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#77DD77] to-[#72A0C1]">
                        {t.hero.titleHighlight}
                      </span>
                    </>
                  ) : (
                    <>
                      Platform Pembelajaran Terbuka untuk{" "}
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#77DD77] to-[#72A0C1]">
                        {t.hero.titleHighlight}
                      </span>
                    </>
                  )}
                </h1>
              </div>

              <p className="text-xl text-slate-200 max-w-2xl leading-relaxed drop-shadow-md">
                {t.hero.desc}
              </p>

              <div className="flex flex-wrap gap-5 mt-4">
                <Button size="2xl" className="bg-[#72A0C1] hover:bg-[#5a8bb0] text-white shadow-xl shadow-[#72A0C1]/20 group cursor-pointer" asChild>
                  <a href="#community">
                    {t.hero.ctaJoin}
                    <span className="inline-block transition-transform group-hover:translate-x-1 ml-2">→</span>
                  </a>
                </Button>
                <Button size="2xl" variant="outline" className="bg-white/5 backdrop-blur-md border-white/20 text-white hover:bg-white/80 cursor-pointer" asChild>
                  <a href="#scenarios">{t.hero.ctaExplore}</a>
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
            {t.collaborators.title}
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-80 hover:opacity-100 transition-opacity duration-500">
            <img src="/logos/ugm.png" alt="UGM" className="h-14 w-auto object-contain brightness-110" />
            <img src="/logos/aehin.png" alt="AeHIN" className="h-10 w-auto object-contain" />
            <img src="/logos/bpjs.png" alt="BPJS Kesehatan" className="h-10 w-auto object-contain" />
            <img src="/logos/kemenkes.png" alt="Kemenkes RI" className="h-14 w-auto object-contain" />
            <img src="/logos/openimis.svg" alt="openIMIS" className="h-10 w-auto object-contain" />
          </div>
        </div>
      </section>

      {/* What is OpenJKN Section */}
      <section id="about" className="py-16 md:py-24 bg-slate-50/40 dark:bg-slate-900/20 relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[300px] bg-[#72A0C1]/5 blur-[100px] rounded-full pointer-events-none" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 text-slate-900 dark:text-white">
              {t.about.title}
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              {t.about.desc}
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto">
            {[
              { icon: FlaskConical, title: t.about.sandboxTitle, desc: t.about.sandboxDesc },
              { icon: Workflow, title: t.about.simulationTitle, desc: t.about.simulationDesc },
              { icon: Microscope, title: t.about.researchTitle, desc: t.about.researchDesc },
              { icon: Link2, title: t.about.interopTitle, desc: t.about.interopDesc },
              { icon: BrainCircuit, title: t.about.aiTitle, desc: t.about.aiDesc },
            ].map(({ icon: Icon, title, desc }) => (
              <Card key={title} className="group hover:shadow-xl hover:shadow-[#72A0C1]/5 hover:border-[#72A0C1]/30 transition-all duration-500 hover:-translate-y-1 bg-white dark:bg-slate-950 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#72A0C1]/10 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                <CardHeader className="relative z-10">
                  <div className="w-12 h-12 mb-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 flex items-center justify-center text-slate-500 group-hover:text-[#72A0C1] group-hover:scale-110 group-hover:bg-[#72A0C1]/10 transition-all duration-300 shadow-sm">
                    <Icon className="w-6 h-6" />
                  </div>
                  <CardTitle className="text-xl">{title}</CardTitle>
                </CardHeader>
                <CardContent className="relative z-10">
                  <CardDescription className="text-base leading-relaxed">{desc}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Functional Gap Section */}
      <section className="py-16 md:py-24 border-t border-border/40 bg-white dark:bg-slate-950">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 text-slate-900 dark:text-white">
                  {t.gaps.title}
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                  {t.gaps.desc}
                </p>
                <p className="text-sm text-muted-foreground/70 leading-relaxed">
                  {t.gaps.subdesc}
                </p>
              </div>
              <div className="space-y-3">
                <p className="text-xs font-semibold text-muted-foreground/70 tracking-widest uppercase mb-4">
                  {t.gaps.header}
                </p>
                {t.gaps.list.map((gap) => (
                  <div key={gap} className="flex items-start gap-3 p-3 rounded-lg bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800/50">
                    <CheckCircle2 className="w-5 h-5 text-[#44AA44] shrink-0 mt-0.5" />
                    <span className="text-sm text-slate-700 dark:text-slate-300">{gap}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Learning Scenarios Section */}
      <section id="scenarios" className="py-16 md:py-24 border-t border-border/40 bg-slate-50/40 dark:bg-slate-900/20 relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[300px] bg-[#77DD77]/5 blur-[100px] rounded-full pointer-events-none" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 text-slate-900 dark:text-white">
              {t.scenarios.title}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              {t.scenarios.desc}
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
            {[
              {
                icon: UserPlus,
                num: "01",
                title: t.scenarios.card1Title,
                items: t.scenarios.card1Items,
              },
              {
                icon: Hospital,
                num: "02",
                title: t.scenarios.card2Title,
                items: t.scenarios.card2Items,
              },
              {
                icon: ArrowRightLeft,
                num: "03",
                title: t.scenarios.card3Title,
                items: t.scenarios.card3Items,
              },
            ].map(({ icon: Icon, num, title, items }) => (
              <Card key={title} className="group hover:shadow-xl hover:shadow-[#72A0C1]/5 hover:border-[#72A0C1]/30 transition-all duration-500 hover:-translate-y-1 bg-white dark:bg-slate-950 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#72A0C1]/10 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                <CardHeader className="relative z-10">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 flex items-center justify-center text-slate-500 group-hover:text-[#72A0C1] group-hover:scale-110 group-hover:bg-[#72A0C1]/10 transition-all duration-300 shadow-sm">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-3xl font-black text-slate-400 dark:text-slate-600 group-hover:text-[#72A0C1]/50 transition-colors">{num}</span>
                  </div>
                  <CardTitle className="text-xl">{title}</CardTitle>
                </CardHeader>
                <CardContent className="relative z-10">
                  <ul className="space-y-2.5">
                    {items.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground leading-relaxed">
                        <span className="text-[#72A0C1] mt-1 shrink-0">▸</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Potential Use Cases Section */}
      <section className="py-16 md:py-24 border-t border-border/40 bg-white dark:bg-slate-950">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 text-slate-900 dark:text-white">
              {t.impact.title}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              {t.impact.desc}
            </p>
          </div>
          <div className="grid sm:grid-cols-2 gap-6 md:gap-8 max-w-4xl mx-auto">
            {[
              {
                icon: GraduationCap,
                title: t.impact.eduTitle,
                desc: t.impact.eduDesc,
              },
              {
                icon: Microscope,
                title: t.impact.researchTitle,
                desc: t.impact.researchDesc,
              },
              {
                icon: Users,
                title: t.impact.capacityTitle,
                desc: t.impact.capacityDesc,
              },
              {
                icon: Globe,
                title: t.impact.regionalTitle,
                desc: t.impact.regionalDesc,
              },
            ].map(({ icon: Icon, title, desc }) => (
              <Card key={title} className="group hover:shadow-xl hover:shadow-[#72A0C1]/5 hover:border-[#72A0C1]/30 transition-all duration-500 hover:-translate-y-1 bg-white dark:bg-slate-950 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#77DD77]/10 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                <CardHeader className="relative z-10">
                  <div className="w-12 h-12 mb-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 flex items-center justify-center text-slate-500 group-hover:text-[#44AA44] group-hover:scale-110 group-hover:bg-[#44AA44]/10 transition-all duration-300 shadow-sm">
                    <Icon className="w-6 h-6" />
                  </div>
                  <CardTitle className="text-xl">{title}</CardTitle>
                </CardHeader>
                <CardContent className="relative z-10">
                  <CardDescription className="text-base leading-relaxed">{desc}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Community Portal Section */}
      <section id="community" className="py-16 md:py-24 border-t border-border/40 bg-slate-50/40 dark:bg-slate-900/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
              {t.community.title}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mt-4 leading-relaxed">
              {t.community.desc}
            </p>
          </div>
          <div className="grid lg:grid-cols-2 gap-8 md:gap-12 max-w-5xl mx-auto">
            <Card className="hover:border-[#72A0C1]/20 transition-all duration-300 shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl">{t.community.formTitle}</CardTitle>
              </CardHeader>
              <CardContent>
                <MemberRegistrationForm />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-xl">{t.community.eventsTitle}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="w-full h-[400px] rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50 flex flex-col items-center justify-center p-6 text-center">
                  <div className="w-16 h-16 mb-4 rounded-full bg-[#72A0C1]/20 flex items-center justify-center">
                    <svg className="w-8 h-8 text-[#72A0C1]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{t.community.noEventsTitle}</h3>
                  <p className="text-muted-foreground text-sm max-w-[250px] mb-6">
                    {t.community.noEventsDesc}
                  </p>
                  <Button variant="outline" className="border-slate-300 dark:border-slate-700 cursor-pointer" asChild>
                    <a href="https://lu.ma/@openjkn" target="_blank" rel="noreferrer">
                      {t.community.followLuma}
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Latest Updates Section */}
      <section id="updates" className="py-16 md:py-24 border-t border-border/40 bg-white dark:bg-slate-950">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 text-slate-900 dark:text-white">{t.updates.title}</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              {t.updates.desc}
            </p>
          </div>

          {articles.length > 0 ? (
            <div className="grid md:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
              {articles.map((article, i) => (
                <a key={i} href={article.link} target={article.isLocal ? undefined : "_blank"} rel="noreferrer" className="group h-full block">
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
                        {article.pubDate ? new Date(article.pubDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : 'Recent Update'}
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
                        {t.updates.readArticle} <span className="ml-1 group-hover:translate-x-1 transition-transform">→</span>
                      </div>
                    </CardContent>
                  </Card>
                </a>
              ))}
            </div>
          ) : (
            <div className="text-center text-muted-foreground font-mono">
              {t.updates.noArticles}
            </div>
          )}
        </div>
      </section>

      {/* Closing Statement */}
      <section className="py-16 md:py-20 border-t border-border/40 bg-gradient-to-b from-slate-50 to-white dark:from-slate-900/40 dark:to-slate-950">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-xl md:text-2xl font-medium text-slate-700 dark:text-slate-300 leading-relaxed italic">
              {t.footer.closing}
            </p>
            <p className="text-sm text-muted-foreground mt-6">{t.footer.brief}</p>
          </div>
        </div>
      </section>

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
                {t.footer.rights}
              </p>
            </div>

            <div className="flex gap-8">
              <a
                href="https://github.com/openjkn"
                target="_blank"
                rel="noreferrer"
                className="text-sm font-semibold text-muted-foreground hover:text-primary transition-colors"
              >
                GitHub
              </a>
              <a
                href="/wiki"
                className="text-sm font-semibold text-muted-foreground hover:text-primary transition-colors"
              >
                {t.nav.wiki}
              </a>
              <a
                href="#community"
                className="text-sm font-semibold text-muted-foreground hover:text-primary transition-colors"
              >
                {t.footer.contact}
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
