import { query } from '@/lib/db'
import { parseMarkdown } from '@/lib/markdown'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, Calendar, User, Sparkles, ChevronRight } from 'lucide-react'

type RouteContext = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata(context: RouteContext) {
  const { slug } = await context.params
  try {
    const result = await query(
      'SELECT title, excerpt FROM articles WHERE slug = $1 AND published = true',
      [slug]
    )
    if (!result.rows || result.rows.length === 0) return {}

    const article = result.rows[0]
    return {
      title: `${article.title} | OpenJKN Articles`,
      description: article.excerpt || 'Read the latest updates from the OpenJKN Initiative.'
    }
  } catch (e) {
    return {}
  }
}

export default async function ArticlePage(context: RouteContext) {
  const { slug } = await context.params
  let article = null

  try {
    const result = await query(
      'SELECT id, title, excerpt, content, image_url, published_at FROM articles WHERE slug = $1 AND published = true',
      [slug]
    )
    if (result.rows && result.rows.length > 0) {
      article = result.rows[0]
    }
  } catch (err) {
    console.error('Error fetching public article:', err)
  }

  if (!article) {
    notFound()
  }

  const parsedHtml = parseMarkdown(article.content)

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans">
      
      {/* Top micro navbar */}
      <nav className="border-b border-slate-200/60 dark:border-slate-800/40 bg-white/70 dark:bg-slate-950/70 backdrop-blur-md sticky top-0 z-40 py-4 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto flex justify-between items-center w-full">
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <Image src="/icon.png" alt="OpenJKN Logo" width={24} height={24} />
            <span className="font-['Open_Sans'] font-bold tracking-tight text-slate-900 dark:text-white text-sm">
              <span className="text-[#44AA44]">Open</span>
              <span className="text-[#72A0C1]">JKN</span>
            </span>
          </Link>
          <Link
            href="/#updates"
            className="text-xs font-mono text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors flex items-center gap-1"
          >
            All Updates
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </nav>

      {/* Main content body */}
      <main className="flex-1 max-w-4xl mx-auto w-full px-4 sm:px-6 py-10">
        
        {/* Back Link */}
        <Link
          href="/#updates"
          className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#72A0C1] hover:text-[#5a8bb0] transition-colors mb-8 group"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          Back to updates
        </Link>

        {/* Article header details */}
        <article className="space-y-6">
          <div className="space-y-4">
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 dark:text-white leading-[1.15]">
              {article.title}
            </h1>
            
            {article.excerpt && (
              <p className="text-lg sm:text-xl text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
                {article.excerpt}
              </p>
            )}

            {/* Metas */}
            <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-slate-500 dark:text-slate-500 border-b border-slate-200 dark:border-slate-900 pb-6 pt-2">
              <div className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-slate-400" />
                <span>
                  {new Date(article.published_at).toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric'
                  })}
                </span>
              </div>
              <span className="text-slate-300 dark:text-slate-800">&bull;</span>
              <div className="flex items-center gap-1.5">
                <User className="w-4 h-4 text-slate-400" />
                <span>OpenJKN Working Group</span>
              </div>
            </div>
          </div>

          {/* Banner image if available */}
          {article.image_url && article.image_url !== '/icon.png' && (
            <div className="w-full aspect-video rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-900 bg-slate-100 dark:bg-slate-900 shadow-sm relative my-8">
              <img
                src={article.image_url}
                alt={article.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Markdown Output body */}
          <div className="prose prose-slate dark:prose-invert max-w-none prose-headings:font-black prose-a:text-[#72A0C1] prose-pre:bg-slate-900 prose-pre:border prose-pre:border-slate-800 my-8">
            <div
              dangerouslySetInnerHTML={{ __html: parsedHtml }}
              className="space-y-5 leading-relaxed text-base sm:text-lg text-slate-800 dark:text-slate-200"
            />
          </div>
        </article>

        {/* Gorgeous call-to-action bottom box */}
        <section className="mt-16 p-8 rounded-2xl border border-slate-200 dark:border-slate-800/80 bg-slate-100/50 dark:bg-slate-900/30 backdrop-blur-sm relative overflow-hidden flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm">
          <div className="absolute inset-0 bg-[#72A0C1]/5 blur-[60px] rounded-full pointer-events-none" />
          <div className="space-y-2 text-center sm:text-left">
            <h3 className="font-extrabold text-xl text-slate-900 dark:text-white flex items-center justify-center sm:justify-start gap-2">
              <Sparkles className="w-5 h-5 text-emerald-400" />
              Shape Indonesia&apos;s JKN Sandbox
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md">
              Are you passionate about healthcare tech, policy simulations, or data science? Join the OpenJKN co-creation movement!
            </p>
          </div>
          <Link
            href="/#community"
            className="px-6 py-3 bg-[#72A0C1] hover:bg-[#5a8bb0] text-white font-semibold text-sm rounded-xl transition-all shadow-md shadow-[#72A0C1]/20 whitespace-nowrap shrink-0 hover:-translate-y-0.5"
          >
            Join Working Group
          </Link>
        </section>

      </main>

      {/* Mini footer */}
      <footer className="py-8 border-t border-slate-200/60 dark:border-slate-900 bg-white dark:bg-slate-950 text-center text-xs text-slate-500">
        <div className="max-w-4xl mx-auto px-4">
          © {new Date().getFullYear()} OpenJKN Initiative. Powered by hybrid static/dynamic CMS architecture.
        </div>
      </footer>

    </div>
  )
}
