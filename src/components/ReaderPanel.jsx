import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { Clipboard, Sparkles, Trash2 } from 'lucide-react'
import { getTextStats } from '../utils/textStats'

const tabs = ['Read', 'Edit']

const ReaderPanel = ({ activeParagraph, emptyMessage, focusMode, fontSize, paragraphs, setActiveParagraph, setText, text }) => {
  const [activeTab, setActiveTab] = useState('Read')
  const [status, setStatus] = useState('')

  const readingStats = useMemo(() => getTextStats(text), [text])

  const handlePaste = async () => {
    try {
      const clipboardText = await navigator.clipboard.readText()

      if (!clipboardText.trim()) {
        setStatus('Clipboard is empty.')
        return
      }

      setText(clipboardText)
      setActiveParagraph(0)
      setActiveTab('Read')
      setStatus('Text pasted.')
    } catch {
      setActiveTab('Edit')
      setStatus('Use the edit area to paste text.')
    }
  }

  const handleSimplify = () => {
    const simplifiedText = text
      .replace(/\s+/g, ' ')
      .split(/(?<=[.!?])\s+/)
      .filter(Boolean)
      .slice(0, 3)
      .join('\n\n')

    if (!simplifiedText) {
      setStatus(emptyMessage)
      return
    }

    setText(simplifiedText)
    setActiveParagraph(0)
    setActiveTab('Read')
    setStatus('Simplified into a shorter preview.')
  }

  const handleClear = () => {
    setText('')
    setActiveParagraph(0)
    setActiveTab('Edit')
    setStatus('Text cleared.')
  }

  return (
    <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-soft dark:border-slate-800 dark:bg-slate-900" aria-labelledby="reader-panel-heading">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 px-5 py-4 dark:border-slate-800 sm:px-7">
        <div>
          <h2 id="reader-panel-heading" className="sr-only">
            Reading workspace
          </h2>
          <div className="inline-flex rounded-2xl bg-slate-100 p-1 dark:bg-slate-800" role="tablist" aria-label="Reading workspace mode">
            {tabs.map((tab) => {
              const isSelected = activeTab === tab

              return (
                <button
                  aria-selected={isSelected}
                  className={`min-h-11 rounded-xl px-5 text-base font-semibold transition focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-teal-500 ${
                    isSelected ? 'bg-white text-slate-950 shadow-sm dark:bg-slate-950 dark:text-white' : 'text-slate-600 hover:text-slate-950 dark:text-slate-300 dark:hover:text-white'
                  }`}
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  role="tab"
                  type="button"
                >
                  {tab}
                </button>
              )
            })}
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          <ToolbarButton icon={Clipboard} label="Paste" onClick={handlePaste} />
          <ToolbarButton accent icon={Sparkles} label="Simplify" onClick={handleSimplify} />
          <ToolbarButton icon={Trash2} label="Clear" onClick={handleClear} />
        </div>
      </div>

      <div className="px-5 py-4 text-sm text-slate-500 dark:text-slate-400 sm:px-7">
        {readingStats.words} {readingStats.words === 1 ? 'word' : 'words'} / {readingStats.readingTimeLabel}
        {status ? <span className="ml-3 text-teal-700 dark:text-teal-300">{status}</span> : null}
      </div>

      {activeTab === 'Edit' ? (
        <div className="px-5 pb-6 sm:px-7">
          <label className="sr-only" htmlFor="reader-input">
            Text to read
          </label>
          <textarea
            id="reader-input"
            className="min-h-[520px] w-full resize-y rounded-2xl border border-slate-200 bg-stone-50 p-5 text-base leading-8 text-slate-900 outline-none transition placeholder:text-slate-500 focus:border-teal-500 focus:ring-4 focus:ring-teal-100 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:focus:ring-teal-950"
            onChange={(event) => {
              setText(event.target.value)
              setActiveParagraph(0)
              setStatus('')
            }}
            placeholder={emptyMessage}
            value={text}
          />
        </div>
      ) : (
        <article
          className="min-h-[560px] px-5 pb-10 pt-6 text-slate-950 dark:text-slate-100 sm:px-10 lg:px-16"
          style={{ fontSize: `${fontSize}px` }}
          aria-live="polite"
        >
          {paragraphs.length === 0 ? (
            <p className="leading-loose text-slate-500 dark:text-slate-400">{emptyMessage}</p>
          ) : (
            <div className="mx-auto max-w-4xl space-y-6">
              {paragraphs.map((paragraph, index) => {
                const isActive = focusMode && index === activeParagraph
                const isDimmed = focusMode && index !== activeParagraph

                return (
                  <motion.button
                    className={`block w-full rounded-2xl p-3 text-left leading-loose transition focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-teal-500 ${
                      isActive
                        ? 'bg-teal-50 text-slate-950 shadow-inner-soft dark:bg-teal-900/50 dark:text-white'
                        : 'hover:bg-slate-50 dark:hover:bg-slate-800'
                    } ${isDimmed ? 'opacity-45' : 'opacity-100'}`}
                    key={`${paragraph.slice(0, 24)}-${index}`}
                    layout
                    onClick={() => setActiveParagraph(index)}
                    type="button"
                  >
                    {paragraph}
                  </motion.button>
                )
              })}
            </div>
          )}
        </article>
      )}
    </section>
  )
}

const ToolbarButton = ({ accent = false, icon: Icon, label, onClick }) => (
  <button
    className={`inline-flex min-h-11 items-center gap-2 rounded-2xl border px-4 py-2 text-sm font-semibold shadow-sm transition hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-teal-500 sm:text-base ${
      accent
        ? 'border-teal-100 bg-teal-50 text-teal-800 hover:bg-teal-100 dark:border-teal-800 dark:bg-teal-950/50 dark:text-teal-100 dark:hover:bg-teal-900 dark:hover:text-white'
        : 'border-slate-100 bg-slate-100 text-slate-600 hover:bg-slate-200 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700'
    }`}
    onClick={onClick}
    type="button"
  >
    <Icon aria-hidden="true" size={18} strokeWidth={2.2} />
    {label}
  </button>
)

export default ReaderPanel
