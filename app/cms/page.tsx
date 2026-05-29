'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import {
  BookOpen,
  Newspaper,
  Users,
  Plus,
  Save,
  Trash2,
  ArrowUp,
  ArrowDown,
  Search,
  Eye,
  ExternalLink,
  Loader2,
  Sparkles,
  Calendar,
  FileText,
  Home,
  Bold,
  Italic,
  Code,
  Link as LinkIcon,
  Image as ImageIcon,
  AlertCircle
} from 'lucide-react'
import { parseMarkdown } from '@/lib/markdown'
import { Toaster, toast } from 'sonner'

type WikiItem = {
  name: string
  title: string
}

type ArticleItem = {
  id?: number
  slug: string
  title: string
  excerpt: string
  content: string
  image_url: string
  published: boolean
  published_at?: string
  created_at?: string
}

type MemberItem = {
  id: number
  name: string
  email: string
  organization: string
  role: string
  motivation: string
  created_at: string
}

export default function CMSDashboard() {
  const [activeTab, setActiveTab] = useState<'wiki' | 'articles' | 'members'>('wiki')
  const [loading, setLoading] = useState(false)

  // Textarea Refs for WYSIWYG manipulation
  const wikiTextareaRef = useRef<HTMLTextAreaElement>(null)
  const articleTextareaRef = useRef<HTMLTextAreaElement>(null)

  // Upload state
  const [uploadingImage, setUploadingImage] = useState(false)

  // ==========================================
  // WIKI PAGES STATE & ACTIONS
  // ==========================================
  const [wikiPages, setWikiPages] = useState<WikiItem[]>([])
  const [selectedWiki, setSelectedWiki] = useState<WikiItem | null>(null)
  const [wikiContent, setWikiContent] = useState('')
  const [originalWikiSlug, setOriginalWikiSlug] = useState('')
  const [wikiSlug, setWikiSlug] = useState('')
  const [wikiTitle, setWikiTitle] = useState('')
  const [wikiSearch, setWikiSearch] = useState('')
  const [wikiUnsaved, setWikiUnsaved] = useState(false)
  const [wikiSaving, setWikiSaving] = useState(false)
  const [wikiLocale, setWikiLocale] = useState<'id' | 'en'>('id') // Active editing locale!

  // ==========================================
  // ARTICLES STATE & ACTIONS
  // ==========================================
  const [articles, setArticles] = useState<ArticleItem[]>([])
  const [selectedArticle, setSelectedArticle] = useState<ArticleItem | null>(null)
  const [articleTitle, setArticleTitle] = useState('')
  const [articleSlug, setArticleSlug] = useState('')
  const [articleExcerpt, setArticleExcerpt] = useState('')
  const [articleContent, setArticleContent] = useState('')
  const [articleImageUrl, setArticleImageUrl] = useState('')
  const [articlePublished, setArticlePublished] = useState(true)
  const [articleSearch, setArticleSearch] = useState('')
  const [articleSaving, setArticleSaving] = useState(false)

  // ==========================================
  // MEMBERS STATE & ACTIONS
  // ==========================================
  const [members, setMembers] = useState<MemberItem[]>([])
  const [memberSearch, setMemberSearch] = useState('')

  // View state
  const [editorPreviewMode, setEditorPreviewMode] = useState<'split' | 'edit' | 'preview'>('split')

  // Load Initial Data
  useEffect(() => {
    fetchWikiPages()
    fetchArticles()
    fetchMembers()
  }, [])

  // Wiki fetch
  const fetchWikiPages = async () => {
    try {
      const res = await fetch('/api/cms/pages')
      if (res.ok) {
        const data = await res.json()
        setWikiPages(data)
        if (data.length > 0 && !selectedWiki) {
          loadWikiPage(data[0], wikiLocale)
        }
      }
    } catch (e) {
      toast.error('Failed to load wiki index')
    }
  }

  // Load single wiki file content
  const loadWikiPage = async (item: WikiItem, targetLocale = wikiLocale) => {
    setLoading(true)
    try {
      const res = await fetch(`/api/cms/page?slug=${item.name}&locale=${targetLocale}`)
      if (res.ok) {
        const data = await res.json()
        setSelectedWiki(item)
        setWikiTitle(item.title)
        setWikiSlug(item.name)
        setOriginalWikiSlug(item.name)
        setWikiContent(data.content)
        setWikiUnsaved(false)
      } else {
        toast.error(`Failed to load content for ${item.title}`)
      }
    } catch (e) {
      toast.error('Network error loading wiki content')
    } finally {
      setLoading(false)
    }
  }

  // Handle Wiki language change
  const handleWikiLocaleChange = (locale: 'id' | 'en') => {
    setWikiLocale(locale)
    if (selectedWiki) {
      loadWikiPage(selectedWiki, locale)
      toast.info(`Switched editing locale to ${locale.toUpperCase()}`)
    }
  }

  // Save wiki page
  const saveWikiPage = async () => {
    if (!wikiTitle.trim()) {
      toast.error('Page Title is required!')
      return
    }
    if (!wikiSlug.trim()) {
      toast.error('Page Slug is required!')
      return
    }

    setWikiSaving(true)
    try {
      const res = await fetch('/api/cms/page', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          slug: wikiSlug,
          title: wikiTitle,
          content: wikiContent,
          oldSlug: originalWikiSlug,
          locale: wikiLocale // Pass active locale!
        })
      })

      if (res.ok) {
        toast.success(`Wiki page "${wikiTitle}" [${wikiLocale.toUpperCase()}] saved successfully!`)
        setWikiUnsaved(false)
        setOriginalWikiSlug(wikiSlug)
        await fetchWikiPages()
      } else {
        const err = await res.json()
        toast.error(err.error || 'Failed to save wiki page')
      }
    } catch (e) {
      toast.error('Network error saving wiki page')
    } finally {
      setWikiSaving(false)
    }
  }

  // Delete wiki page
  const deleteWikiPage = async (item: WikiItem) => {
    if (item.name === 'wiki') {
      toast.error('Cannot delete the primary Wiki Overview page.')
      return
    }

    if (!confirm(`Are you absolutely sure you want to delete the wiki page "${item.title}"?\nThis deletes both the Indonesian and English MDX files and cannot be undone.`)) {
      return
    }

    try {
      const res = await fetch(`/api/cms/page?slug=${item.name}`, {
        method: 'DELETE'
      })

      if (res.ok) {
        toast.success(`Deleted wiki page "${item.title}"`)
        setSelectedWiki(null)
        setWikiTitle('')
        setWikiSlug('')
        setOriginalWikiSlug('')
        setWikiContent('')
        await fetchWikiPages()
      } else {
        const err = await res.json()
        toast.error(err.error || 'Failed to delete wiki page')
      }
    } catch (e) {
      toast.error('Network error deleting wiki page')
    }
  }

  // Re-order wiki pages
  const moveWikiItem = async (index: number, direction: 'up' | 'down') => {
    const newIndex = direction === 'up' ? index - 1 : index + 1
    if (newIndex < 0 || newIndex >= wikiPages.length) return

    const updatedPages = [...wikiPages]
    const temp = updatedPages[index]
    updatedPages[index] = updatedPages[newIndex]
    updatedPages[newIndex] = temp

    setWikiPages(updatedPages)

    try {
      const res = await fetch('/api/cms/pages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedPages)
      })
      if (res.ok) {
        toast.success('Sidebar order updated live!')
      } else {
        toast.error('Failed to save updated sidebar order')
      }
    } catch (e) {
      toast.error('Network error updating sidebar order')
    }
  }

  // Create new wiki template
  const createNewWiki = () => {
    setSelectedWiki(null)
    setWikiTitle('New Wiki Page')
    setWikiSlug('new-wiki-page')
    setOriginalWikiSlug('')
    setWikiContent('# New Wiki Page\n\nStart writing your new wiki content here using MDX.\n\n> [!NOTE]\n> Nextra will render this page beautifully in the wiki navigation sidebar.')
    setWikiUnsaved(true)
  }

  // ==========================================
  // ARTICLES ACTIONS
  // ==========================================
  const fetchArticles = async () => {
    try {
      const res = await fetch('/api/cms/articles')
      if (res.ok) {
        const data = await res.json()
        setArticles(data)
      }
    } catch (e) {
      toast.error('Failed to load articles from database')
    }
  }

  const loadArticle = (item: ArticleItem) => {
    setSelectedArticle(item)
    setArticleTitle(item.title)
    setArticleSlug(item.slug)
    setArticleExcerpt(item.excerpt)
    setArticleContent(item.content)
    setArticleImageUrl(item.image_url)
    setArticlePublished(item.published)
  }

  const createNewArticle = () => {
    setSelectedArticle({
      slug: 'new-article',
      title: 'New Article Title',
      excerpt: 'Brief summary of the article...',
      content: '# New Article\n\nWrite your PostgreSQL article here using Markdown.',
      image_url: '/icon.png',
      published: true
    })
    setArticleTitle('New Article Title')
    setArticleSlug('new-article')
    setArticleExcerpt('Brief summary of the article...')
    setArticleContent('# New Article\n\nWrite your PostgreSQL article here using Markdown.')
    setArticleImageUrl('/icon.png')
    setArticlePublished(true)
  }

  const saveArticle = async () => {
    if (!articleTitle.trim() || !articleSlug.trim() || !articleContent.trim()) {
      toast.error('Missing required fields (Title, Slug, or Content)')
      return
    }

    setArticleSaving(true)
    try {
      const res = await fetch('/api/cms/articles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: selectedArticle?.id,
          slug: articleSlug,
          title: articleTitle,
          excerpt: articleExcerpt,
          content: articleContent,
          image_url: articleImageUrl,
          published: articlePublished
        })
      })

      if (res.ok) {
        const data = await res.json()
        toast.success(`Article "${articleTitle}" saved to PostgreSQL database!`)
        setSelectedArticle(data.article)
        fetchArticles()
      } else {
        const err = await res.json()
        toast.error(err.error || 'Failed to save article')
      }
    } catch (e) {
      toast.error('Network error saving article')
    } finally {
      setArticleSaving(false)
    }
  }

  const deleteArticle = async (item: ArticleItem) => {
    if (!item.id) return
    if (!confirm(`Are you sure you want to delete "${item.title}"?\nThis will remove it from the PostgreSQL database.`)) return

    try {
      const res = await fetch(`/api/cms/articles/${item.id}`, {
        method: 'DELETE'
      })

      if (res.ok) {
        toast.success('Article deleted from database')
        if (selectedArticle?.id === item.id) {
          setSelectedArticle(null)
          setArticleTitle('')
          setArticleSlug('')
          setArticleExcerpt('')
          setArticleContent('')
          setArticleImageUrl('')
        }
        fetchArticles()
      } else {
        const err = await res.json()
        toast.error(err.error || 'Failed to delete article')
      }
    } catch (e) {
      toast.error('Network error deleting article')
    }
  }

  // ==========================================
  // MEMBERS ACTIONS
  // ==========================================
  const fetchMembers = async () => {
    try {
      const res = await fetch('/api/cms/members')
      if (res.ok) {
        const data = await res.json()
        setMembers(data)
      }
    } catch (e) {
      toast.error('Failed to load registered members')
    }
  }

  const deleteMember = async (id: number, name: string) => {
    if (!confirm(`Are you sure you want to remove applicant "${name}" from the Registry?`)) return

    try {
      const res = await fetch(`/api/cms/members?id=${id}`, {
        method: 'DELETE'
      })

      if (res.ok) {
        toast.success(`Removed "${name}" from the Registry`)
        fetchMembers()
      } else {
        const err = await res.json()
        toast.error(err.error || 'Failed to delete member')
      }
    } catch (e) {
      toast.error('Network error deleting member')
    }
  }

  // Helper slug generator
  const formatSlug = (text: string) => {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
  }

  // ==========================================
  // WYSIWYG FORMATTING HELPER
  // ==========================================
  const insertMarkdown = (syntax: string, placeholder = '') => {
    const isWiki = activeTab === 'wiki'
    const textarea = isWiki ? wikiTextareaRef.current : articleTextareaRef.current
    if (!textarea) return

    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const currentText = isWiki ? wikiContent : articleContent

    const selectedText = currentText.substring(start, end)
    const replacement = syntax.replace('$1', selectedText || placeholder)
    const newText = currentText.substring(0, start) + replacement + currentText.substring(end)

    if (isWiki) {
      setWikiContent(newText)
      setWikiUnsaved(true)
    } else {
      setArticleContent(newText)
    }

    // Reset selection & focus
    setTimeout(() => {
      textarea.focus()
      const newCursorPos = start + replacement.length
      textarea.setSelectionRange(newCursorPos, newCursorPos)
    }, 50)
  }

  // Image Upload helper
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploadingImage(true)
    const toastId = toast.loading(`Compressing and uploading image "${file.name}" locally...`)

    try {
      const compressedBlob = await compressAndResizeImage(file)
      
      const originalNameWithoutExt = file.name.substring(0, file.name.lastIndexOf('.')) || file.name
      const uploadFilename = `${originalNameWithoutExt}_compressed.jpg`

      const formData = new FormData()
      formData.append('file', compressedBlob, uploadFilename)

      const res = await fetch('/api/cms/upload', {
        method: 'POST',
        body: formData
      })

      const data = await res.json()
      if (res.ok) {
        toast.success(`Image compressed & uploaded successfully!`, { id: toastId })
        insertMarkdown(`![${originalNameWithoutExt}](${data.url})`)
      } else {
        toast.error(data.error || 'Failed to upload image', { id: toastId })
      }
    } catch (err) {
      toast.error('Network error during image compression or upload', { id: toastId })
    } finally {
      setUploadingImage(false)
      e.target.value = ''
    }
  }

  // Image compress helper
  const compressAndResizeImage = (file: File, maxWidth = 1200, quality = 0.8): Promise<Blob | File> => {
    return new Promise((resolve) => {
      if (!file.type.startsWith('image/')) {
        resolve(file)
        return
      }

      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = (event) => {
        const img = document.createElement('img')
        img.src = event.target?.result as string
        
        img.onload = () => {
          let width = img.width
          let height = img.height

          if (width > maxWidth) {
            height = Math.round((maxWidth / width) * height)
            width = maxWidth
          }

          const canvas = document.createElement('canvas')
          canvas.width = width
          canvas.height = height

          const ctx = canvas.getContext('2d')
          if (!ctx) {
            resolve(file)
            return
          }

          ctx.drawImage(img, 0, 0, width, height)

          canvas.toBlob(
            (blob) => {
              if (blob) {
                resolve(blob)
              } else {
                resolve(file)
              }
            },
            'image/jpeg',
            quality
          )
        }

        img.onerror = () => {
          resolve(file)
        }
      }

      reader.onerror = () => {
        resolve(file)
      }
    })
  }

  // Search filters
  const filteredWikiPages = wikiPages.filter(p =>
    p.title.toLowerCase().includes(wikiSearch.toLowerCase()) ||
    p.name.toLowerCase().includes(wikiSearch.toLowerCase())
  )

  const filteredArticles = articles.filter(a =>
    a.title.toLowerCase().includes(articleSearch.toLowerCase()) ||
    a.slug.toLowerCase().includes(articleSearch.toLowerCase())
  )

  const filteredMembers = members.filter(m =>
    m.name.toLowerCase().includes(memberSearch.toLowerCase()) ||
    m.email.toLowerCase().includes(memberSearch.toLowerCase()) ||
    m.organization.toLowerCase().includes(memberSearch.toLowerCase()) ||
    m.role.toLowerCase().includes(memberSearch.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans antialiased">
      <Toaster richColors position="top-right" theme="light" />

      {/* Glassmorphic Light Navbar */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200/80 px-6 py-4 flex justify-between items-center shadow-sm">
        <div className="flex items-center gap-3">
          <Image src="/icon.png" alt="OpenJKN Logo" width={32} height={32} />
          <div>
            <h1 className="font-['Open_Sans'] tracking-tight text-xl text-slate-900 flex items-center gap-2">
              <span className="font-bold">
                <span className="text-[#44AA44]">Open</span>
                <span className="text-[#72A0C1]">JKN</span>
              </span>
              <span className="bg-emerald-500/10 text-emerald-600 border border-emerald-500/20 text-xs px-2 py-0.5 rounded-full font-semibold font-sans">
                CMS Console
              </span>
            </h1>
            <p className="text-slate-500 text-xs font-mono">Engine: Hybrid MDX & Postgresql</p>
          </div>
        </div>

        {/* Tab Switcher - Light Mode */}
        <div className="bg-slate-200/60 border border-slate-200 p-1 rounded-xl flex gap-1">
          <button
            onClick={() => setActiveTab('wiki')}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all flex items-center gap-2 ${
              activeTab === 'wiki'
                ? 'bg-white text-slate-950 shadow-sm border border-slate-200/30'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            Wiki
          </button>
          <button
            onClick={() => setActiveTab('articles')}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all flex items-center gap-2 ${
              activeTab === 'articles'
                ? 'bg-white text-slate-950 shadow-sm border border-slate-200/30'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Newspaper className="w-4 h-4" />
            Articles
          </button>
          <button
            onClick={() => setActiveTab('members')}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all flex items-center gap-2 ${
              activeTab === 'members'
                ? 'bg-white text-slate-950 shadow-sm border border-slate-200/30'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Users className="w-4 h-4" />
            Members
          </button>
        </div>

        {/* Back to Home Portal */}
        <a
          href="/"
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold text-slate-650 hover:text-slate-900 hover:bg-slate-100 border border-slate-200/55 transition-all font-mono"
        >
          <Home className="w-4 h-4" />
          View Live Website
        </a>
      </header>

      {/* Main Workspace */}
      <main className="flex-1 flex overflow-hidden min-h-[calc(100vh-76px)]">
        {/* ============================================================== */}
        {/* TAB 1: NEXTRA WIKI PAGES CMS (Light) */}
        {/* ============================================================== */}
        {activeTab === 'wiki' && (
          <div className="flex-1 flex overflow-hidden">
            {/* Sidebar List */}
            <aside className="w-80 border-r border-slate-200 bg-slate-100/40 flex flex-col p-4 shrink-0">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-slate-500 text-xs tracking-wide uppercase font-mono">Wiki Pages</h3>
                <button
                  onClick={createNewWiki}
                  className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold px-3 py-1.5 rounded-lg flex items-center gap-1 transition-all shadow-sm"
                >
                  <Plus className="w-3.5 h-3.5" />
                  New Page
                </button>
              </div>

              {/* Search */}
              <div className="relative mb-4">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search pages..."
                  value={wikiSearch}
                  onChange={(e) => setWikiSearch(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-lg pl-9 pr-4 py-2 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-emerald-500 transition-colors"
                />
              </div>

              {/* Navigation Ordered List */}
              <div className="flex-1 overflow-y-auto space-y-1 pr-1">
                {filteredWikiPages.map((item, index) => (
                  <div
                    key={item.name}
                    className={`group w-full flex items-center justify-between p-2 rounded-lg text-left text-sm transition-all border ${
                      selectedWiki?.name === item.name
                        ? 'bg-white border-slate-200 text-slate-900 font-semibold shadow-sm border-l-4 border-l-emerald-500'
                        : 'border-transparent text-slate-500 hover:bg-slate-200/50 hover:text-slate-800'
                    }`}
                  >
                    <button
                      onClick={() => loadWikiPage(item, wikiLocale)}
                      className="flex-1 flex items-center gap-2 text-left truncate mr-2"
                    >
                      <FileText className={`w-4 h-4 shrink-0 ${selectedWiki?.name === item.name ? 'text-emerald-600' : 'text-slate-400'}`} />
                      <span className="truncate">{item.title}</span>
                    </button>

                    {/* Sorting Reorder Controls */}
                    <div className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => moveWikiItem(index, 'up')}
                        disabled={index === 0}
                        title="Move Up"
                        className="p-1 rounded text-slate-400 hover:text-emerald-600 disabled:opacity-30 disabled:hover:text-slate-400 transition-colors"
                      >
                        <ArrowUp className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => moveWikiItem(index, 'down')}
                        disabled={index === wikiPages.length - 1}
                        title="Move Down"
                        className="p-1 rounded text-slate-400 hover:text-emerald-600 disabled:opacity-30 disabled:hover:text-slate-400 transition-colors"
                      >
                        <ArrowDown className="w-3.5 h-3.5" />
                      </button>
                      {item.name !== 'wiki' && (
                        <button
                          onClick={() => deleteWikiPage(item)}
                          title="Delete Page"
                          className="p-1 rounded text-slate-400 hover:text-rose-600 transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>
                ))}

                {filteredWikiPages.length === 0 && (
                  <p className="text-center text-slate-400 py-8 text-sm">No wiki pages found.</p>
                )}
              </div>
              <div className="pt-3 border-t border-slate-200 text-[10px] text-slate-400 font-mono">
                Order represents real Nextra sidebar navigation list hierarchy.
              </div>
            </aside>

            {/* Split Screen Workspace Area */}
            {loading ? (
              <div className="flex-1 flex flex-col items-center justify-center bg-white/40">
                <Loader2 className="w-8 h-8 text-emerald-600 animate-spin mb-2" />
                <p className="text-sm text-slate-500 font-mono">Reading MDX from local git workspace...</p>
              </div>
            ) : (
              <div className="flex-1 flex flex-col bg-white overflow-hidden">
                {/* Editor Control Panel */}
                <div className="bg-slate-50/75 px-6 py-3 border-b border-slate-200 flex justify-between items-center shrink-0">
                  <div className="flex items-center gap-4 flex-1 max-w-2xl">
                    {/* Title */}
                    <div className="flex-1">
                      <label className="block text-[10px] uppercase font-bold font-mono tracking-wider text-slate-400 mb-1">Page Title</label>
                      <input
                        type="text"
                        value={wikiTitle}
                        onChange={(e) => {
                          setWikiTitle(e.target.value)
                          setWikiUnsaved(true)
                        }}
                        className="w-full bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-sm text-slate-800 placeholder-slate-350 focus:outline-none focus:border-emerald-500 transition-colors"
                        placeholder="Overview"
                      />
                    </div>
                    {/* Slug */}
                    <div className="w-48">
                      <label className="block text-[10px] uppercase font-bold font-mono tracking-wider text-slate-400 mb-1">
                        URL Slug {originalWikiSlug === 'wiki' && <span className="text-rose-500">(Locked)</span>}
                      </label>
                      <input
                        type="text"
                        value={wikiSlug}
                        disabled={originalWikiSlug === 'wiki'}
                        onChange={(e) => {
                          setWikiSlug(formatSlug(e.target.value))
                          setWikiUnsaved(true)
                        }}
                        className="w-full bg-white border border-slate-200 disabled:bg-slate-100 disabled:text-slate-400 rounded-lg px-3 py-1.5 text-sm text-slate-800 placeholder-slate-350 focus:outline-none focus:border-emerald-500 transition-colors font-mono"
                        placeholder="overview-slug"
                      />
                    </div>
                    {/* Wiki translation locale switch */}
                    <div className="w-28">
                      <label className="block text-[10px] uppercase font-bold font-mono tracking-wider text-slate-400 mb-1">Locale</label>
                      <div className="bg-slate-200/40 p-1 rounded-lg border border-slate-200 flex gap-0.5 text-xs h-[38px] items-center">
                        <button
                          type="button"
                          onClick={() => handleWikiLocaleChange('id')}
                          className={`flex-1 h-full rounded transition-colors font-bold cursor-pointer ${wikiLocale === 'id' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                        >
                          ID
                        </button>
                        <button
                          type="button"
                          onClick={() => handleWikiLocaleChange('en')}
                          className={`flex-1 h-full rounded transition-colors font-bold cursor-pointer ${wikiLocale === 'en' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                        >
                          EN
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Mode switcher & Save Actions */}
                  <div className="flex items-center gap-3">
                    <div className="bg-slate-200/40 p-1 rounded-lg border border-slate-200 flex gap-0.5 text-xs">
                      <button
                        onClick={() => setEditorPreviewMode('edit')}
                        className={`px-2.5 py-1 rounded transition-colors ${editorPreviewMode === 'edit' ? 'bg-white text-slate-900 shadow-sm font-semibold' : 'text-slate-500 hover:text-slate-700'}`}
                      >
                        Code
                      </button>
                      <button
                        onClick={() => setEditorPreviewMode('split')}
                        className={`px-2.5 py-1 rounded transition-colors ${editorPreviewMode === 'split' ? 'bg-white text-slate-900 shadow-sm font-semibold' : 'text-slate-500 hover:text-slate-700'}`}
                      >
                        Split
                      </button>
                      <button
                        onClick={() => setEditorPreviewMode('preview')}
                        className={`px-2.5 py-1 rounded transition-colors ${editorPreviewMode === 'preview' ? 'bg-white text-slate-900 shadow-sm font-semibold' : 'text-slate-500 hover:text-slate-700'}`}
                      >
                        Preview
                      </button>
                    </div>

                    <button
                      onClick={saveWikiPage}
                      disabled={wikiSaving}
                      className="bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white text-sm font-semibold px-4 py-1.5 rounded-lg flex items-center gap-1.5 transition-all shadow-sm font-sans cursor-pointer"
                    >
                      {wikiSaving ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <Save className="w-4 h-4" />
                      )}
                      <span>Save {wikiLocale.toUpperCase()}</span>
                      {wikiUnsaved && <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse ml-0.5" />}
                    </button>
                  </div>
                </div>

                {/* WYSIWYG FORMATTING TOOLBAR */}
                <div className="bg-slate-100/60 border-b border-slate-200/80 px-4 py-2 flex items-center gap-1 shrink-0 select-none">
                  <button
                    onClick={() => insertMarkdown('**$1**', 'bold text')}
                    title="Bold"
                    className="p-1.5 rounded hover:bg-slate-200 text-slate-655 hover:text-slate-900 transition-colors cursor-pointer"
                  >
                    <Bold className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => insertMarkdown('*$1*', 'italic text')}
                    title="Italic"
                    className="p-1.5 rounded hover:bg-slate-200 text-slate-655 hover:text-slate-900 transition-colors cursor-pointer"
                  >
                    <Italic className="w-4 h-4" />
                  </button>
                  <div className="w-px h-4 bg-slate-300 mx-1" />
                  <button
                    onClick={() => insertMarkdown('# $1', 'Header 1')}
                    title="Header 1"
                    className="p-1.5 rounded hover:bg-slate-200 text-slate-655 hover:text-slate-900 transition-colors cursor-pointer font-bold font-mono text-xs flex items-center"
                  >
                    H1
                  </button>
                  <button
                    onClick={() => insertMarkdown('## $1', 'Header 2')}
                    title="Header 2"
                    className="p-1.5 rounded hover:bg-slate-200 text-slate-655 hover:text-slate-900 transition-colors cursor-pointer font-bold font-mono text-xs flex items-center"
                  >
                    H2
                  </button>
                  <button
                    onClick={() => insertMarkdown('### $1', 'Header 3')}
                    title="Header 3"
                    className="p-1.5 rounded hover:bg-slate-200 text-slate-655 hover:text-slate-900 transition-colors cursor-pointer font-bold font-mono text-xs flex items-center"
                  >
                    H3
                  </button>
                  <div className="w-px h-4 bg-slate-300 mx-1" />
                  <button
                    onClick={() => insertMarkdown('`$1`', 'code snippet')}
                    title="Inline Code"
                    className="p-1.5 rounded hover:bg-slate-200 text-slate-655 hover:text-slate-900 transition-colors cursor-pointer"
                  >
                    <Code className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => insertMarkdown('```$1\n\n```', 'typescript')}
                    title="Code Block"
                    className="p-1.5 rounded hover:bg-slate-200 text-slate-655 hover:text-slate-900 transition-colors cursor-pointer font-bold font-mono text-[10px]"
                  >
                    CODE
                  </button>
                  <div className="w-px h-4 bg-slate-300 mx-1" />
                  <button
                    onClick={() => insertMarkdown('[$1](url)', 'link text')}
                    title="Insert Link"
                    className="p-1.5 rounded hover:bg-slate-200 text-slate-655 hover:text-slate-900 transition-colors cursor-pointer"
                  >
                    <LinkIcon className="w-4 h-4" />
                  </button>
                  <div className="w-px h-4 bg-slate-300 mx-1" />
                  {/* Local Image Uploader trigger */}
                  <label
                    title="Upload Local Image"
                    className={`p-1.5 rounded hover:bg-slate-200 text-slate-655 hover:text-slate-900 transition-colors cursor-pointer flex items-center justify-center ${uploadingImage ? 'animate-pulse text-emerald-600' : ''}`}
                  >
                    <input
                      type="file"
                      accept="image/*"
                      disabled={uploadingImage}
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                    {uploadingImage ? (
                      <Loader2 className="w-4 h-4 animate-spin text-emerald-600" />
                    ) : (
                      <ImageIcon className="w-4 h-4" />
                    )}
                  </label>
                  <div className="w-px h-4 bg-slate-300 mx-1" />
                  <button
                    onClick={() => insertMarkdown('> [!NOTE]\n> $1', 'Note details...')}
                    title="Callout Note"
                    className="p-1.5 rounded hover:bg-slate-200 text-slate-655 hover:text-slate-900 transition-colors cursor-pointer flex items-center gap-1 text-[10px] font-bold"
                  >
                    <AlertCircle className="w-3.5 h-3.5 text-blue-500" />
                    NOTE
                  </button>
                  <button
                    onClick={() => insertMarkdown('> [!IMPORTANT]\n> $1', 'Important details...')}
                    title="Callout Important"
                    className="p-1.5 rounded hover:bg-slate-200 text-slate-655 hover:text-slate-900 transition-colors cursor-pointer flex items-center gap-1 text-[10px] font-bold"
                  >
                    <AlertCircle className="w-3.5 h-3.5 text-purple-500" />
                    IMPORTANT
                  </button>
                </div>

                {/* Editor Split panes */}
                <div className="flex-1 flex overflow-hidden">
                  {/* Left Pane: Code Textarea */}
                  {(editorPreviewMode === 'edit' || editorPreviewMode === 'split') && (
                    <div className="flex-1 flex flex-col h-full bg-white p-4 overflow-hidden border-r border-slate-200">
                      <textarea
                        ref={wikiTextareaRef}
                        value={wikiContent}
                        onChange={(e) => {
                          setWikiContent(e.target.value)
                          setWikiUnsaved(true)
                        }}
                        placeholder="# Title..."
                        className="flex-1 w-full h-full bg-transparent resize-none border-none text-slate-800 placeholder-slate-300 font-mono text-sm leading-relaxed focus:outline-none focus:ring-0 overflow-y-auto pr-2"
                        style={{ outline: 'none' }}
                      />
                    </div>
                  )}

                  {/* Right Pane: High Fidelity Live Render Preview */}
                  {(editorPreviewMode === 'preview' || editorPreviewMode === 'split') && (
                    <div className="flex-1 h-full bg-slate-50/50 overflow-y-auto p-8 prose prose-slate max-w-none">
                      <div className="max-w-3xl mx-auto">
                        <div className="text-[10px] font-mono text-[#72A0C1] uppercase tracking-widest mb-4 font-bold border-b border-slate-200 pb-2 flex items-center gap-1.5">
                          <Eye className="w-3 h-3" />
                          Live MDX Sandbox Compilation
                        </div>
                        <div
                          dangerouslySetInnerHTML={{ __html: parseMarkdown(wikiContent) }}
                          className="wiki-preview-content space-y-4"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {/* ============================================================== */}
        {/* TAB 2: POSTGRESQL ARTICLES CMS (Light) */}
        {/* ============================================================== */}
        {activeTab === 'articles' && (
          <div className="flex-1 flex overflow-hidden">
            {/* Sidebar list */}
            <aside className="w-80 border-r border-slate-200 bg-slate-100/40 flex flex-col p-4 shrink-0">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-slate-500 text-xs tracking-wide uppercase font-mono">News Articles</h3>
                <button
                  onClick={createNewArticle}
                  className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold px-3 py-1.5 rounded-lg flex items-center gap-1 transition-all shadow-sm"
                >
                  <Plus className="w-3.5 h-3.5" />
                  New Article
                </button>
              </div>

              {/* Search */}
              <div className="relative mb-4">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={articleSearch}
                  onChange={(e) => setArticleSearch(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-lg pl-9 pr-4 py-2 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-emerald-500 transition-colors"
                />
              </div>

              {/* Articles dynamic list */}
              <div className="flex-1 overflow-y-auto space-y-2 pr-1">
                {filteredArticles.map((item) => (
                  <div
                    key={item.id}
                    className={`group w-full flex flex-col p-3 rounded-lg text-left text-sm transition-all border ${
                      selectedArticle?.id === item.id
                        ? 'bg-white border-slate-200 text-slate-900 font-semibold shadow-sm border-l-4 border-l-emerald-500'
                        : 'border-slate-100 bg-white/40 text-slate-500 hover:bg-slate-200/50 hover:text-slate-800'
                    }`}
                  >
                    <div className="flex justify-between items-start gap-2 mb-1">
                      <button
                        onClick={() => loadArticle(item)}
                        className="font-semibold text-slate-800 hover:text-slate-900 truncate flex-1 text-left"
                      >
                        {item.title}
                      </button>
                      <button
                        onClick={() => deleteArticle(item)}
                        title="Delete Article"
                        className="p-1.5 rounded opacity-0 group-hover:opacity-100 text-slate-400 hover:text-rose-600 transition-all shrink-0"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <p className="text-xs text-slate-400 truncate mb-2">{item.excerpt || 'No excerpt.'}</p>
                    <div className="flex justify-between items-center text-[10px] text-slate-400 font-mono">
                      <span>/{item.slug}</span>
                      <span className={`px-1.5 py-0.5 rounded-full ${item.published ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-slate-100 text-slate-500 border border-slate-200'}`}>
                        {item.published ? 'Published' : 'Draft'}
                      </span>
                    </div>
                  </div>
                ))}

                {filteredArticles.length === 0 && (
                  <p className="text-center text-slate-400 py-8 text-sm">No articles in database.</p>
                )}
              </div>
              <div className="pt-3 border-t border-slate-200 text-[10px] text-slate-400 font-mono">
                Stored in Postgres database. Shows instantly in Landing Page Latest Updates section.
              </div>
            </aside>

            {/* Articles Workspace */}
            {selectedArticle ? (
              <div className="flex-1 flex flex-col bg-white overflow-hidden">
                {/* Control bar */}
                <div className="bg-slate-50/75 px-6 py-3 border-b border-slate-200 flex justify-between items-center shrink-0">
                  <div>
                    <h4 className="text-sm font-bold text-slate-700">
                      {selectedArticle.id ? `Editing Article: ID ${selectedArticle.id}` : 'Creating New Database Article'}
                    </h4>
                  </div>

                  <div className="flex items-center gap-3">
                    {/* Toggle Preview splits */}
                    <div className="bg-slate-200/40 p-1 rounded-lg border border-slate-200 flex gap-0.5 text-xs">
                      <button
                        onClick={() => setEditorPreviewMode('edit')}
                        className={`px-2.5 py-1 rounded transition-colors ${editorPreviewMode === 'edit' ? 'bg-white text-slate-900 shadow-sm font-semibold' : 'text-slate-500 hover:text-slate-700'}`}
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => setEditorPreviewMode('split')}
                        className={`px-2.5 py-1 rounded transition-colors ${editorPreviewMode === 'split' ? 'bg-white text-slate-900 shadow-sm font-semibold' : 'text-slate-500 hover:text-slate-700'}`}
                      >
                        Split
                      </button>
                      <button
                        onClick={() => setEditorPreviewMode('preview')}
                        className={`px-2.5 py-1 rounded transition-colors ${editorPreviewMode === 'preview' ? 'bg-white text-slate-900 shadow-sm font-semibold' : 'text-slate-500 hover:text-slate-700'}`}
                      >
                        Preview
                      </button>
                    </div>

                    <button
                      onClick={saveArticle}
                      disabled={articleSaving}
                      className="bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white text-sm font-semibold px-4 py-1.5 rounded-lg flex items-center gap-1.5 transition-all shadow-sm font-sans cursor-pointer"
                    >
                      {articleSaving ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <Save className="w-4 h-4" />
                      )}
                      Save to Postgres
                    </button>
                  </div>
                </div>

                {/* Metadata Editors */}
                <div className="bg-slate-100/35 border-b border-slate-200 p-6 grid grid-cols-3 gap-4 shrink-0">
                  {/* Title */}
                  <div className="col-span-2">
                    <label className="block text-[10px] uppercase font-bold font-mono tracking-wider text-slate-400 mb-1">Article Title</label>
                    <input
                      type="text"
                      value={articleTitle}
                      onChange={(e) => {
                        setArticleTitle(e.target.value)
                        setArticleSlug(formatSlug(e.target.value))
                      }}
                      className="w-full bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-sm text-slate-800 focus:outline-none focus:border-emerald-500 transition-colors"
                      placeholder="Title..."
                    />
                  </div>
                  {/* Slug */}
                  <div>
                    <label className="block text-[10px] uppercase font-bold font-mono tracking-wider text-slate-400 mb-1">Slug path</label>
                    <input
                      type="text"
                      value={articleSlug}
                      onChange={(e) => setArticleSlug(formatSlug(e.target.value))}
                      className="w-full bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-sm text-slate-800 focus:outline-none focus:border-emerald-500 transition-colors font-mono"
                      placeholder="slug-path"
                    />
                  </div>
                  {/* Excerpt */}
                  <div className="col-span-2">
                    <label className="block text-[10px] uppercase font-bold font-mono tracking-wider text-slate-400 mb-1">Excerpt Summary</label>
                    <input
                      type="text"
                      value={articleExcerpt}
                      onChange={(e) => setArticleExcerpt(e.target.value)}
                      className="w-full bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-sm text-slate-800 focus:outline-none focus:border-emerald-500 transition-colors"
                      placeholder="Brief excerpt for card preview..."
                    />
                  </div>
                  {/* Image URL & Published */}
                  <div className="flex gap-4 items-end">
                    <div className="flex-1">
                      <label className="block text-[10px] uppercase font-bold font-mono tracking-wider text-slate-400 mb-1">Cover Image URL</label>
                      <input
                        type="text"
                        value={articleImageUrl}
                        onChange={(e) => setArticleImageUrl(e.target.value)}
                        className="w-full bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-sm text-slate-850 focus:outline-none focus:border-emerald-500 transition-colors font-mono text-xs"
                        placeholder="/icon.png"
                      />
                    </div>
                    {/* Checkbox */}
                    <div className="h-[38px] flex items-center gap-2 border border-slate-200 bg-white rounded-lg px-3 hover:bg-slate-50 transition-colors">
                      <input
                        type="checkbox"
                        id="pub-check"
                        checked={articlePublished}
                        onChange={(e) => setArticlePublished(e.target.checked)}
                        className="w-4 h-4 accent-emerald-650 bg-white border-slate-200 rounded focus:ring-emerald-500"
                      />
                      <label htmlFor="pub-check" className="text-xs text-slate-700 font-semibold select-none cursor-pointer">Published</label>
                    </div>
                  </div>
                </div>

                {/* WYSIWYG FORMATTING TOOLBAR FOR ARTICLES */}
                <div className="bg-slate-100/60 border-b border-slate-200/80 px-4 py-2 flex items-center gap-1 shrink-0 select-none">
                  <button
                    onClick={() => insertMarkdown('**$1**', 'bold text')}
                    title="Bold"
                    className="p-1.5 rounded hover:bg-slate-200 text-slate-655 hover:text-slate-900 transition-colors cursor-pointer"
                  >
                    <Bold className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => insertMarkdown('*$1*', 'italic text')}
                    title="Italic"
                    className="p-1.5 rounded hover:bg-slate-200 text-slate-655 hover:text-slate-900 transition-colors cursor-pointer"
                  >
                    <Italic className="w-4 h-4" />
                  </button>
                  <div className="w-px h-4 bg-slate-300 mx-1" />
                  <button
                    onClick={() => insertMarkdown('# $1', 'Header 1')}
                    title="Header 1"
                    className="p-1.5 rounded hover:bg-slate-200 text-slate-655 hover:text-slate-900 transition-colors cursor-pointer font-bold font-mono text-xs flex items-center"
                  >
                    H1
                  </button>
                  <button
                    onClick={() => insertMarkdown('## $1', 'Header 2')}
                    title="Header 2"
                    className="p-1.5 rounded hover:bg-slate-200 text-slate-655 hover:text-slate-900 transition-colors cursor-pointer font-bold font-mono text-xs flex items-center"
                  >
                    H2
                  </button>
                  <button
                    onClick={() => insertMarkdown('### $1', 'Header 3')}
                    title="Header 3"
                    className="p-1.5 rounded hover:bg-slate-200 text-slate-655 hover:text-slate-900 transition-colors cursor-pointer font-bold font-mono text-xs flex items-center"
                  >
                    H3
                  </button>
                  <div className="w-px h-4 bg-slate-300 mx-1" />
                  <button
                    onClick={() => insertMarkdown('`$1`', 'code snippet')}
                    title="Inline Code"
                    className="p-1.5 rounded hover:bg-slate-200 text-slate-655 hover:text-slate-900 transition-colors cursor-pointer"
                  >
                    <Code className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => insertMarkdown('```$1\n\n```', 'typescript')}
                    title="Code Block"
                    className="p-1.5 rounded hover:bg-slate-200 text-slate-655 hover:text-slate-900 transition-colors cursor-pointer font-bold font-mono text-[10px]"
                  >
                    CODE
                  </button>
                  <div className="w-px h-4 bg-slate-300 mx-1" />
                  <button
                    onClick={() => insertMarkdown('[$1](url)', 'link text')}
                    title="Insert Link"
                    className="p-1.5 rounded hover:bg-slate-200 text-slate-655 hover:text-slate-900 transition-colors cursor-pointer"
                  >
                    <LinkIcon className="w-4 h-4" />
                  </button>
                  <div className="w-px h-4 bg-slate-300 mx-1" />
                  {/* Local Image Uploader trigger */}
                  <label
                    title="Upload Local Image"
                    className={`p-1.5 rounded hover:bg-slate-200 text-slate-655 hover:text-slate-900 transition-colors cursor-pointer flex items-center justify-center ${uploadingImage ? 'animate-pulse text-emerald-600' : ''}`}
                  >
                    <input
                      type="file"
                      accept="image/*"
                      disabled={uploadingImage}
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                    {uploadingImage ? (
                      <Loader2 className="w-4 h-4 animate-spin text-emerald-600" />
                    ) : (
                      <ImageIcon className="w-4 h-4" />
                    )}
                  </label>
                  <div className="w-px h-4 bg-slate-300 mx-1" />
                  <button
                    onClick={() => insertMarkdown('> [!NOTE]\n> $1', 'Note details...')}
                    title="Callout Note"
                    className="p-1.5 rounded hover:bg-slate-200 text-slate-655 hover:text-slate-900 transition-colors cursor-pointer flex items-center gap-1 text-[10px] font-bold"
                  >
                    <AlertCircle className="w-3.5 h-3.5 text-blue-500" />
                    NOTE
                  </button>
                  <button
                    onClick={() => insertMarkdown('> [!IMPORTANT]\n> $1', 'Important details...')}
                    title="Callout Important"
                    className="p-1.5 rounded hover:bg-slate-200 text-slate-655 hover:text-slate-900 transition-colors cursor-pointer flex items-center gap-1 text-[10px] font-bold"
                  >
                    <AlertCircle className="w-3.5 h-3.5 text-purple-500" />
                    IMPORTANT
                  </button>
                </div>

                {/* Markdown body editor */}
                <div className="flex-1 flex overflow-hidden">
                  {/* Editor */}
                  {(editorPreviewMode === 'edit' || editorPreviewMode === 'split') && (
                    <div className="flex-1 flex flex-col h-full bg-white p-4 overflow-hidden border-r border-slate-200">
                      <textarea
                        ref={articleTextareaRef}
                        value={articleContent}
                        onChange={(e) => setArticleContent(e.target.value)}
                        placeholder="# Write article body in markdown..."
                        className="flex-1 w-full h-full bg-transparent resize-none border-none text-slate-800 placeholder-slate-355 font-mono text-sm leading-relaxed focus:outline-none focus:ring-0 overflow-y-auto pr-2"
                        style={{ outline: 'none' }}
                      />
                    </div>
                  )}

                  {/* HTML Live Preview */}
                  {(editorPreviewMode === 'preview' || editorPreviewMode === 'split') && (
                    <div className="flex-1 h-full bg-slate-50/50 overflow-y-auto p-8 prose prose-slate max-w-none">
                      <div className="max-w-3xl mx-auto">
                        {articleImageUrl && (
                          <div className="w-full aspect-video rounded-xl overflow-hidden mb-6 border border-slate-200 bg-slate-100 flex justify-center items-center">
                            <img src={articleImageUrl} alt="Article Preview" className="max-h-full max-w-full object-contain" />
                          </div>
                        )}
                        <h1 className="text-4xl font-black tracking-tight mb-2 text-slate-900">{articleTitle || 'Untitled Article'}</h1>
                        <p className="text-slate-400 font-mono text-xs mb-6 border-b border-slate-250 pb-3 flex items-center gap-2">
                          <Calendar className="w-3.5 h-3.5" />
                          Published At: {new Date().toLocaleDateString()}
                        </p>
                        <div
                          dangerouslySetInnerHTML={{ __html: parseMarkdown(articleContent) }}
                          className="article-preview-content space-y-4"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center bg-slate-50/50 p-8">
                <Newspaper className="w-12 h-12 text-slate-300 mb-3 animate-pulse" />
                <h4 className="font-bold text-slate-500 mb-1">No Article Selected</h4>
                <p className="text-xs text-slate-400 max-w-[280px] text-center mb-4">
                  Select an article from the sidebar database registry, or create a new one instantly!
                </p>
                <button
                  onClick={createNewArticle}
                  className="bg-slate-900 border border-slate-850 hover:bg-slate-800 text-white text-xs font-semibold px-4 py-2 rounded-lg transition-all"
                >
                  Create Article
                </button>
              </div>
            )}
          </div>
        )}

        {/* ============================================================== */}
        {/* TAB 3: MEMBERS REGISTRY DATA TABLE (Light) */}
        {/* ============================================================== */}
        {activeTab === 'members' && (
          <div className="flex-1 flex flex-col p-8 overflow-y-auto bg-slate-50/20">
            <div className="max-w-6xl mx-auto w-full flex flex-col flex-1 h-full">
              {/* Header */}
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className="font-extrabold text-2xl tracking-tight text-slate-900 flex items-center gap-2">
                    <Users className="w-6 h-6 text-emerald-600" />
                    Working Group Members Registry
                  </h3>
                  <p className="text-slate-500 text-sm mt-1">
                    Manage and review participant registrations saved dynamically in local PostgreSQL database.
                  </p>
                </div>
                {/* Search */}
                <div className="relative w-80">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search applicant registry..."
                    value={memberSearch}
                    onChange={(e) => setMemberSearch(e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-lg pl-9 pr-4 py-2 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-emerald-500 transition-colors"
                  />
                </div>
              </div>

              {/* Members Registry Grid Table */}
              <div className="flex-1 bg-white border border-slate-200 rounded-xl overflow-hidden flex flex-col shadow-sm">
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse text-left text-sm text-slate-655">
                    <thead className="bg-slate-50 text-slate-500 border-b border-slate-200 font-mono text-xs uppercase tracking-wider">
                      <tr>
                        <th className="p-4 font-bold">ID</th>
                        <th className="p-4 font-bold">Full Name</th>
                        <th className="p-4 font-bold">Contact Email</th>
                        <th className="p-4 font-bold">Organization</th>
                        <th className="p-4 font-bold">Role/Title</th>
                        <th className="p-4 font-bold">Motivation Statement</th>
                        <th className="p-4 font-bold text-right">Sign-up Date</th>
                        <th className="p-4 text-center">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 bg-white">
                      {filteredMembers.map((member) => (
                        <tr key={member.id} className="hover:bg-slate-50/50 transition-colors">
                          <td className="p-4 font-mono text-slate-400 text-xs">#{member.id}</td>
                          <td className="p-4 font-semibold text-slate-900 truncate max-w-[150px]">{member.name}</td>
                          <td className="p-4 text-emerald-600 font-mono text-xs truncate max-w-[180px]">
                            <a href={`mailto:${member.email}`} className="hover:underline flex items-center gap-1">
                              {member.email}
                              <ExternalLink className="w-2.5 h-2.5 shrink-0 opacity-50" />
                            </a>
                          </td>
                          <td className="p-4 text-slate-800 truncate max-w-[150px]">{member.organization || '—'}</td>
                          <td className="p-4 text-slate-700 truncate max-w-[120px]">{member.role || '—'}</td>
                          <td className="p-4 text-slate-500 max-w-sm truncate" title={member.motivation}>
                            {member.motivation || '—'}
                          </td>
                          <td className="p-4 text-right font-mono text-xs text-slate-400">
                            {new Date(member.created_at).toLocaleDateString(undefined, {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </td>
                          <td className="p-4 text-center">
                            <button
                              onClick={() => deleteMember(member.id, member.name)}
                              title="Delete Member"
                              className="p-2 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))}

                      {filteredMembers.length === 0 && (
                        <tr>
                          <td colSpan={8} className="p-8 text-center text-slate-400 font-mono">
                            No member signups in PostgreSQL database found.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
