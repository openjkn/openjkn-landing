/**
 * Sleek, lightweight, zero-dependency Markdown-to-HTML compiler.
 * Specially tuned to support GitHub-style admonitions/callouts and code styling.
 */
export function parseMarkdown(markdown: string): string {
  if (!markdown) return ''

  // 1. Separate code blocks from the rest to prevent parsing markdown syntax inside them
  const placeholders: { [key: string]: string } = {}
  let placeholderCounter = 0
  let processedMd = markdown

  // Match: ```lang ... ```
  const codeBlockRegex = /```(\w*)\n([\s\S]*?)\n```/g
  processedMd = processedMd.replace(codeBlockRegex, (match, lang, code) => {
    const key = `WIKICODEBLOCKPLACEHOLDER${placeholderCounter++}WIKI`
    // Escape HTML inside code blocks
    const escapedCode = code
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;')

    const html = `
      <div class="my-6 rounded-lg overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-900 font-mono text-sm shadow-md">
        ${lang ? `<div class="bg-slate-950 text-slate-400 px-4 py-1.5 text-xs border-b border-slate-800 flex justify-between items-center">
          <span>${lang}</span>
          <span class="opacity-50">code</span>
        </div>` : ''}
        <pre class="p-4 overflow-x-auto text-slate-100 leading-relaxed"><code>${escapedCode}</code></pre>
      </div>
    `
    placeholders[key] = html
    return key
  })

  // 2. Escape HTML for general content, keeping placeholders intact
  // To keep it simple, we don't fully escape everything yet, but let's do safe replacements.
  // We'll replace markdown characters line-by-line first.
  const lines = processedMd.split('\n')
  let inList = false
  let listType: 'ul' | 'ol' | null = null
  let listHtml = ''
  const parsedLines: string[] = []

  let inBlockquote = false
  let blockquoteContent: string[] = []
  let calloutType: 'note' | 'tip' | 'important' | 'warning' | 'caution' | null = null

  const flushList = () => {
    if (inList && listType) {
      parsedLines.push(`<${listType} class="list-decimal pl-6 my-4 space-y-2">${listHtml}</${listType}>`)
      inList = false
      listType = null
      listHtml = ''
    }
  }

  const flushBlockquote = () => {
    if (inBlockquote) {
      const innerText = blockquoteContent.join('<br />')
      if (calloutType) {
        let title = calloutType.toUpperCase()
        let bgClass = 'bg-blue-50 dark:bg-blue-950/20 border-blue-500 text-blue-900 dark:text-blue-200'
        let iconSvg = '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>'

        if (calloutType === 'important') {
          bgClass = 'bg-purple-50 dark:bg-purple-950/20 border-purple-500 text-purple-900 dark:text-purple-200'
          iconSvg = '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>'
        } else if (calloutType === 'warning') {
          bgClass = 'bg-amber-50 dark:bg-amber-950/20 border-amber-500 text-amber-900 dark:text-amber-200'
          iconSvg = '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>'
        } else if (calloutType === 'caution') {
          bgClass = 'bg-red-50 dark:bg-red-950/20 border-red-500 text-red-900 dark:text-red-200'
          iconSvg = '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"></path></svg>'
        } else if (calloutType === 'tip') {
          bgClass = 'bg-emerald-50 dark:bg-emerald-950/20 border-emerald-500 text-emerald-900 dark:text-emerald-200'
          iconSvg = '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path></svg>'
        }

        parsedLines.push(`
          <div class="my-6 p-4 border-l-4 rounded-r-lg flex gap-3 ${bgClass} shadow-sm">
            <div class="shrink-0 mt-0.5">${iconSvg}</div>
            <div>
              <div class="font-bold text-xs uppercase tracking-wider mb-1">${title}</div>
              <div class="text-sm leading-relaxed">${innerText}</div>
            </div>
          </div>
        `)
      } else {
        parsedLines.push(`
          <blockquote class="my-4 pl-4 border-l-4 border-slate-300 dark:border-slate-700 italic text-muted-foreground">
            ${innerText}
          </blockquote>
        `)
      }
      inBlockquote = false
      blockquoteContent = []
      calloutType = null
    }
  }

  for (let line of lines) {
    const trimmed = line.trim()

    // Handle blockquotes & Callouts
    if (trimmed.startsWith('>')) {
      flushList()
      inBlockquote = true
      let content = trimmed.substring(1).trim()

      // Check for Callout header
      if (content.startsWith('[!NOTE]')) {
        calloutType = 'note'
        content = content.replace('[!NOTE]', '').trim()
      } else if (content.startsWith('[!TIP]')) {
        calloutType = 'tip'
        content = content.replace('[!TIP]', '').trim()
      } else if (content.startsWith('[!IMPORTANT]')) {
        calloutType = 'important'
        content = content.replace('[!IMPORTANT]', '').trim()
      } else if (content.startsWith('[!WARNING]')) {
        calloutType = 'warning'
        content = content.replace('[!WARNING]', '').trim()
      } else if (content.startsWith('[!CAUTION]')) {
        calloutType = 'caution'
        content = content.replace('[!CAUTION]', '').trim()
      }

      if (content) {
        blockquoteContent.push(content)
      }
      continue
    } else {
      flushBlockquote()
    }

    // Unordered Lists
    if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
      if (!inList || listType !== 'ul') {
        flushList()
        inList = true
        listType = 'ul'
      }
      const itemContent = trimmed.substring(2)
      listHtml += `<li class="list-disc ml-4 text-slate-700 dark:text-slate-300">${itemContent}</li>`
      continue
    }

    // Ordered Lists
    const olMatch = trimmed.match(/^(\d+)\.\s(.*)/)
    if (olMatch) {
      if (!inList || listType !== 'ol') {
        flushList()
        inList = true
        listType = 'ol'
      }
      const itemContent = olMatch[2]
      listHtml += `<li class="text-slate-700 dark:text-slate-300">${itemContent}</li>`
      continue
    }

    // If we were in a list and this line doesn't match list syntax, flush list!
    if (inList && trimmed === '') {
      flushList()
    }

    // Empty line (Paragraph break)
    if (trimmed === '') {
      parsedLines.push('')
      continue
    }

    // Headers
    if (trimmed.startsWith('# ')) {
      parsedLines.push(`<h1 class="text-3xl lg:text-4xl font-extrabold tracking-tight mt-8 mb-4 border-b pb-2 text-slate-900 dark:text-white">${trimmed.substring(2)}</h1>`)
    } else if (trimmed.startsWith('## ')) {
      parsedLines.push(`<h2 class="text-2xl font-bold tracking-tight mt-6 mb-3 text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-1">${trimmed.substring(3)}</h2>`)
    } else if (trimmed.startsWith('### ')) {
      parsedLines.push(`<h3 class="text-xl font-semibold tracking-tight mt-6 mb-2 text-slate-900 dark:text-white">${trimmed.substring(4)}</h3>`)
    } else if (trimmed.startsWith('#### ')) {
      parsedLines.push(`<h4 class="text-lg font-medium tracking-tight mt-4 mb-2 text-slate-900 dark:text-white">${trimmed.substring(5)}</h4>`)
    } else {
      // Regular paragraph
      parsedLines.push(`<p class="mb-4 leading-relaxed text-slate-700 dark:text-slate-300 text-base">${trimmed}</p>`)
    }
  }

  // Flush any remaining active blocks
  flushList()
  flushBlockquote()

  // Re-assemble and apply inline substitutions
  let body = parsedLines.join('\n')

  // Protect Images and Links by extracting them to inline placeholders first.
  // This prevents the Bold/Italic parser from matching underscores inside image filenames or URLs.
  const inlinePlaceholders: { [key: string]: string } = {}
  let inlinePlaceholderCounter = 0

  // 1. Extract Images
  const imageRegex = /!\[([^\]]*)\]\(([^)]+)\)/g
  body = body.replace(imageRegex, (match, alt, url) => {
    const key = `WIKIIMAGEPLACEHOLDER${inlinePlaceholderCounter++}WIKI`
    const html = `<div class="my-6 flex justify-center"><img src="${url}" alt="${alt}" class="rounded-xl border border-slate-200 dark:border-slate-850 shadow-sm max-w-full h-auto" /></div>`
    inlinePlaceholders[key] = html
    return key
  })

  // 2. Extract Links
  const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g
  body = body.replace(linkRegex, (match, text, url) => {
    const key = `WIKILINKPLACEHOLDER${inlinePlaceholderCounter++}WIKI`
    const html = `<a href="${url}" class="text-[#72A0C1] font-semibold hover:underline hover:text-[#5a8bb0] transition-colors" target="_blank" rel="noreferrer">${text}</a>`
    inlinePlaceholders[key] = html
    return key
  })

  // Inline formatting: Bold
  body = body.replace(/\*\*([\s\S]+?)\*\*/g, '<strong class="font-bold text-slate-900 dark:text-white">$1</strong>')

  // Inline formatting: Italic
  body = body.replace(/\*([\s\S]+?)\*/g, '<em class="italic">$1</em>')
  body = body.replace(/_([\s\S]+?)_/g, '<em class="italic">$1</em>')

  // Inline formatting: Inline code
  // Match `code`
  body = body.replace(/`([^`]+)`/g, '<code class="bg-slate-100 dark:bg-slate-800 text-[#ea580c] dark:text-[#f97316] font-mono text-xs px-1.5 py-0.5 rounded border border-slate-200 dark:border-slate-700">$1</code>')

  // 3. Restore inline placeholders (Links and Images)
  for (const [key, html] of Object.entries(inlinePlaceholders)) {
    body = body.replace(key, html)
  }

  // 4. Restore code block placeholders
  for (const [key, html] of Object.entries(placeholders)) {
    // If a placeholder was wrapped in a <p> by mistake, let's clean it up
    body = body.replace(`<p class="mb-4 leading-relaxed text-slate-700 dark:text-slate-300 text-base">${key}</p>`, key)
    body = body.replace(key, html)
  }

  return body
}
