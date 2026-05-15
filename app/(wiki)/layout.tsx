import { Layout, Navbar } from 'nextra-theme-docs'
import { Head } from 'nextra/components'
import { getPageMap } from 'nextra/page-map'
import type { PageMapItem } from 'nextra'
import 'nextra-theme-docs/style.css'
import Image from 'next/image'
import Link from 'next/link'

export const metadata = {
  title: 'OpenJKN Wiki',
  description: 'Documentation and specifications for the OpenJKN Initiative.',
}

const navbar = (
  <Navbar
    logo={
      <div className="flex items-center gap-2 hover:opacity-80 transition-opacity">
        <Image src="/icon.png" alt="OpenJKN Logo" width={24} height={24} />
        <span className="font-['Open_Sans'] font-bold tracking-tight text-slate-900 dark:text-white">
          <span className="text-[#44AA44]">Open</span>
          <span className="text-[#72A0C1]">JKN</span>
          <span className="ml-2 font-normal text-muted-foreground text-sm">Wiki</span>
        </span>
      </div>
    }
    projectLink="https://github.com/openjkn"
  />
)

export default async function WikiLayout({
  children
}: {
  children: React.ReactNode
}) {
  let map = await getPageMap()

  // FORCE correctly ordered and named wiki menu
  const wikiOrder = [
    { name: 'wiki', title: 'Overview' },
    { name: 'adaptation-logic', title: 'Adaptation Logic' },
    { name: 'technical-architecture', title: 'Technical Architecture' }
  ]

  const wikiMap = wikiOrder.map(config => {
    const item = map.find((i: PageMapItem) => 'name' in i && i.name === config.name)
    return item ? { ...item, title: config.title } : null
  }).filter((item): item is NonNullable<typeof item> => item !== null) as PageMapItem[]

  return (
    <div className="nextra-wiki-wrapper bg-white min-h-screen text-slate-900">
      <Layout
        navbar={navbar}
        pageMap={wikiMap}
        docsRepositoryBase="https://github.com/openjkn/openjkn-landing/tree/main"
        footer={<div className="py-8 text-center text-sm text-slate-500 border-t bg-slate-50">© {new Date().getFullYear()} OpenJKN Initiative</div>}
        editLink="Edit this page on GitHub"
        sidebar={{ defaultMenuCollapseLevel: 1 }}
      >
        {children}
      </Layout>
    </div>
  )
}
