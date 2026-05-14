import { Button } from "@/components/ui/button"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card"

export default function Page() {
  return (
    <div className="min-h-svh">
      {/* Hero Section */}
      <header className="py-24 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="flex flex-col gap-6">
              <h1 className="text-4xl lg:text-5xl font-bold tracking-tight">
                The Safe Sandbox for Indonesia&apos;s Digital Health Future.
              </h1>
              <p className="text-lg text-muted-foreground max-w-xl">
                OpenJKN provides a risk-free, decoupled simulation environment to
                test FHIR payloads, validate BPJS business rules, and accelerate
                SATUSEHAT integration without touching live clinical data.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button size="lg" asChild>
                  <a href="#community">Join the Working Group</a>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <a href="#docs">Read the Docs</a>
                </Button>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="w-full max-w-lg aspect-video bg-slate-100 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 flex items-center justify-center">
                <span className="text-muted-foreground text-sm">
                  Dashboard Interface Placeholder
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Trusted By Section */}
      <section className="py-24 border-t border-border/40">
        <div className="container mx-auto px-4">
          <p className="text-center text-sm text-muted-foreground mb-12">
            Initiated and supported by leading health informatics institutions:
          </p>
          <div className="flex flex-wrap justify-center items-center gap-12 md:gap-16">
            <div className="w-24 h-12 bg-slate-100 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 flex items-center justify-center">
              <span className="text-xs text-muted-foreground">UGM</span>
            </div>
            <div className="w-24 h-12 bg-slate-100 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 flex items-center justify-center">
              <span className="text-xs text-muted-foreground">AeHIN</span>
            </div>
            <div className="w-24 h-12 bg-slate-100 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 flex items-center justify-center">
              <span className="text-xs text-muted-foreground">BPJS Kesehatan</span>
            </div>
            <div className="w-24 h-12 bg-slate-100 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 flex items-center justify-center">
              <span className="text-xs text-muted-foreground">openIMIS</span>
            </div>
          </div>
        </div>
      </section>

      {/* Three Pillars Section */}
      <section className="py-24 border-t border-border/40">
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
                <div className="w-full aspect-[4/3] bg-slate-100 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 flex items-center justify-center">
                  <span className="text-sm text-muted-foreground">
                    Registration Form Placeholder
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Working Group Events</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="w-full aspect-[4/3] bg-slate-100 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 flex items-center justify-center">
                  <span className="text-sm text-muted-foreground">
                    Events Calendar Placeholder
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-24 border-t border-border/40 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold tracking-tight mb-4">
              Stay Updated
            </h2>
            <p className="text-muted-foreground mb-8">
              Get the latest updates on OpenJKN development, community events, and
              healthcare interoperability news.
            </p>
            <div className="w-full max-w-md mx-auto h-16 bg-slate-100 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 flex items-center justify-center">
              <span className="text-sm text-muted-foreground">
                Newsletter Form Placeholder
              </span>
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
