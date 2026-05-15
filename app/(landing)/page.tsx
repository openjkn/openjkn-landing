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
  Building2,
  Users,
  Globe,
  CheckCircle2,
  XCircle,
} from "lucide-react"

export default async function Page() {
  let articles: Parser.Item[] = [];
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
              <div className="space-y-5">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs font-medium text-white/90 tracking-wide">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#77DD77] animate-pulse" />
                  Policy Brief Draft &bull; May 2026
                </div>
                <h1 className="text-3xl lg:text-5xl font-bold tracking-tight text-white drop-shadow-sm leading-[1.1]">
                  Open Learning Platform for Indonesia&apos;s{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#77DD77] to-[#72A0C1]">
                    JKN Digital Ecosystem
                  </span>
                </h1>
              </div>

              <p className="text-xl text-slate-200 max-w-2xl leading-relaxed drop-shadow-md">
                Built on openIMIS, OpenJKN is an open-source sandbox for learning,
                simulating, and innovating within Indonesia&apos;s national health
                insurance ecosystem — serving 270M+ beneficiaries with 161M claims
                per year.
              </p>

              <div className="flex flex-wrap gap-5 mt-4">
                <Button size="2xl" className="bg-[#72A0C1] hover:bg-[#5a8bb0] text-white shadow-xl shadow-[#72A0C1]/20 group" asChild>
                  <a href="#community">
                    Join the Working Group
                    <span className="inline-block transition-transform group-hover:translate-x-1 ml-2">→</span>
                  </a>
                </Button>
                <Button size="2xl" variant="outline" className="bg-white/5 backdrop-blur-md border-white/20 text-white hover:bg-white/80" asChild>
                  <a href="#scenarios">Explore Scenarios</a>
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
            A collaborative initiative by
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
              What is OpenJKN?
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              An open-source plugin built on top of openIMIS — the global platform for
              health financing information systems — adapted for Indonesia&apos;s unique
              JKN complexity: multi-scheme enrollment, tiered referrals, performance-based
              capitation, and HL7 FHIR interoperability.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto">
            {[
              { icon: FlaskConical, title: "Learning Sandbox", desc: "A safe, decoupled environment for students, researchers, and practitioners to explore JKN workflows without risk to production systems." },
              { icon: Workflow, title: "Business Process Simulation", desc: "Simulate enrollment, claims, referrals, capitation, and case-mix logic (INA-CBGs) using realistic JKN business rules." },
              { icon: Microscope, title: "Policy Research Lab", desc: "Experiment with health financing models, fraud detection algorithms, and policy impact analysis in a controlled setting." },
              { icon: Link2, title: "Interoperability Innovation", desc: "Test HL7 FHIR payloads, validate SATUSEHAT integration, and prototype data exchange between JKN ecosystem components." },
              { icon: BrainCircuit, title: "AI Living Laboratory", desc: "Develop and test AI-powered analytics for fraud detection, clinical decision support, and health system optimization." },
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
                  Why OpenJKN?
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                  UGM researchers identified critical functional gaps in the standard
                  openIMIS platform that prevent direct use for JKN Indonesia simulation.
                  OpenJKN bridges these gaps.
                </p>
                <p className="text-sm text-muted-foreground/70 leading-relaxed">
                  OpenJKN&apos;s architecture separates its frontend and backend from openIMIS
                  core while keeping databases synchronized — enabling local adaptation
                  without breaking global compatibility.
                </p>
              </div>
              <div className="space-y-3">
                <p className="text-xs font-semibold text-muted-foreground/70 tracking-widest uppercase mb-4">
                  Gaps addressed by OpenJKN
                </p>
                {[
                  "Multi-scheme premium collection & participant segmentation",
                  "Facility credentialing & contract management",
                  "Performance-based capitation & INA-CBGs case-mix logic",
                  "Virtual claims & electronic claim mechanisms",
                  "HL7 FHIR interoperability & SATUSEHAT integration",
                  "AI-powered fraud detection & analytics",
                  "Member self-services (eligibility, scheduling, appointments)",
                  "Indonesia-specific variables (facility types, membership segments)",
                ].map((gap) => (
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
              Structured Learning Scenarios
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Three simulation workflows mirroring real JKN operations — designed for{" "}
              <span className="font-medium text-slate-700 dark:text-slate-300">decision-driven learning</span>,
              not just button-clicking.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
            {[
              {
                icon: UserPlus,
                num: "01",
                title: "Enrollment & Segmentation",
                items: [
                  "New participant registration (PBI, PPU, PBPU, BP)",
                  "Membership segmentation & premium calculation",
                  "Verification pathway & eligibility check",
                  "Segment-based contribution simulation",
                ],
              },
              {
                icon: Hospital,
                num: "02",
                title: "Service Access & Referral",
                items: [
                  "Primary care access (Puskesmas, clinics, family doctors)",
                  "FKTP → FKRTL referral chain mechanism",
                  "Benefit package & service eligibility check",
                  "Access denial simulation & resolution",
                ],
              },
              {
                icon: ArrowRightLeft,
                num: "03",
                title: "Membership Changes & Interoperability",
                items: [
                  "Job change & segment transition simulation",
                  "Domicile transfer & data update workflow",
                  "Re-verification & temporary inactivation",
                  "FHIR integration & SATUSEHAT synchronization",
                ],
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
              Potential Impact
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              From university classrooms to international policy forums — OpenJKN&apos;s
              potential spans across education, research, capacity building, and
              regional collaboration.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 gap-6 md:gap-8 max-w-4xl mx-auto">
            {[
              {
                icon: GraduationCap,
                title: "Education & Curriculum",
                desc: "Integration into Medical, Public Health, Health Informatics, Hospital Management, and Health Policy programs across Indonesian universities (AIPTKMI).",
              },
              {
                icon: Microscope,
                title: "Research & Policy Innovation",
                desc: "Policy simulation, health financing modeling, AI fraud detection research, interoperability testing, and usability studies — all without production risk.",
              },
              {
                icon: Users,
                title: "Capacity Building",
                desc: "Training programs for BPJS Kesehatan staff, Dinas Kesehatan, Kemenkes, hospital management, health-tech startups, and regulators.",
              },
              {
                icon: Globe,
                title: "Asia-Pacific Regional Model",
                desc: "Indonesia's JKN scale and complexity makes OpenJKN a strong candidate as an international learning laboratory replicable across AeHIN member countries.",
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
              Join the Co-Creation
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mt-4 leading-relaxed">
              OpenJKN is built through <span className="font-medium text-slate-700 dark:text-slate-300">gotong royong</span> and
              open innovation — a multi-stakeholder collaboration between BPJS Kesehatan,
              Kemenkes, UGM, GIZ/openIMIS, AeHIN, universities, developers, and students.
            </p>
          </div>
          <div className="grid lg:grid-cols-2 gap-8 md:gap-12 max-w-5xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Become a Contributor</CardTitle>
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
      <section id="updates" className="py-16 md:py-24 border-t border-border/40 bg-white dark:bg-slate-950">
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

      {/* Closing Statement */}
      <section className="py-16 md:py-20 border-t border-border/40 bg-gradient-to-b from-slate-50 to-white dark:from-slate-900/40 dark:to-slate-950">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-xl md:text-2xl font-medium text-slate-700 dark:text-slate-300 leading-relaxed italic">
              &ldquo;OpenJKN is not just a technology platform — it is an investment in
              human capital development, innovation, and the long-term sustainability
              of Indonesia&apos;s National Health Insurance.&rdquo;
            </p>
            <p className="text-sm text-muted-foreground mt-6">— OpenJKN Policy Brief, May 2026</p>
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
                href="#community"
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
