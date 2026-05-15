import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

const ControlButton = ({ children, className = '', ...props }) => (
  <button
    className={`min-h-12 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-left text-sm font-semibold text-slate-800 shadow-sm transition hover:-translate-y-0.5 hover:border-teal-200 hover:bg-teal-50 focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-teal-500 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:border-teal-700 dark:hover:bg-slate-800 ${className}`}
    type="button"
    {...props}
  >
    {children}
  </button>
)

const ToggleRow = ({ checked, label, onChange }) => (
  <label className="flex min-h-14 cursor-pointer items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm transition hover:border-teal-200 hover:bg-teal-50 dark:border-slate-700 dark:bg-slate-900 dark:hover:border-teal-700 dark:hover:bg-slate-800">
    <span className="text-sm font-semibold text-slate-800 dark:text-slate-100">{label}</span>
    <input checked={checked} className="sr-only" onChange={(event) => onChange(event.target.checked)} type="checkbox" />
    <span
      aria-hidden="true"
      className={`flex h-7 w-12 items-center rounded-full p-1 transition ${checked ? 'bg-teal-700' : 'bg-slate-300 dark:bg-slate-700'}`}
    >
      <span className={`h-5 w-5 rounded-full bg-white shadow transition ${checked ? 'translate-x-5' : 'translate-x-0'}`} />
    </span>
  </label>
)

const AccessibilityControls = ({
  activeParagraph,
  dyslexiaMode,
  focusMode,
  fontSize,
  highContrast,
  paragraphs,
  setActiveParagraph,
  setDyslexiaMode,
  setFocusMode,
  setFontSize,
  setHighContrast,
}) => {
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const nextIndexRef = useRef(activeParagraph)

  useEffect(() => {
    nextIndexRef.current = activeParagraph
  }, [activeParagraph])

  useEffect(() => {
    return () => {
      window.speechSynthesis?.cancel()
    }
  }, [])

  const speakFrom = (index) => {
    if (!('speechSynthesis' in window) || paragraphs.length === 0) {
      return
    }

    window.speechSynthesis.cancel()
    setIsPaused(false)
    setIsSpeaking(true)
    setActiveParagraph(index)
    nextIndexRef.current = index

    const speakNext = (paragraphIndex) => {
      if (paragraphIndex >= paragraphs.length) {
        setIsSpeaking(false)
        return
      }

      setActiveParagraph(paragraphIndex)
      const utterance = new SpeechSynthesisUtterance(paragraphs[paragraphIndex])
      utterance.rate = 0.9
      utterance.pitch = 1
      utterance.onend = () => {
        nextIndexRef.current = paragraphIndex + 1
        speakNext(paragraphIndex + 1)
      }
      utterance.onerror = () => setIsSpeaking(false)
      window.speechSynthesis.speak(utterance)
    }

    speakNext(index)
  }

  const handlePlay = () => {
    if (isPaused) {
      window.speechSynthesis.resume()
      setIsPaused(false)
      setIsSpeaking(true)
      return
    }

    speakFrom(Math.min(activeParagraph, Math.max(paragraphs.length - 1, 0)))
  }

  const handlePause = () => {
    if (!('speechSynthesis' in window)) {
      return
    }

    window.speechSynthesis.pause()
    setIsPaused(true)
    setIsSpeaking(false)
  }

  const updateFontSize = (amount) => {
    setFontSize((current) => Math.min(30, Math.max(16, current + amount)))
  }

  return (
    <motion.section
      className="rounded-3xl border border-slate-200 bg-white/90 p-5 shadow-soft backdrop-blur dark:border-slate-800 dark:bg-slate-900/90"
      transition={{ staggerChildren: 0.04 }}
    >
      <div className="mb-5">
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-teal-700 dark:text-teal-300">Controls</p>
        <h1 className="mt-2 text-3xl font-semibold leading-tight text-slate-950 dark:text-white">Read with less friction.</h1>
        <p className="mt-3 text-base leading-7 text-slate-600 dark:text-slate-300">
          Tune speech, contrast, type, and focus without leaving the article.
        </p>
      </div>

      <div className="grid gap-3" aria-label="Speech controls">
        <ControlButton disabled={paragraphs.length === 0} onClick={handlePlay}>
          {isPaused ? 'Resume speech' : isSpeaking ? 'Restart speech' : 'Play text-to-speech'}
        </ControlButton>
        <ControlButton disabled={!isSpeaking} onClick={handlePause}>
          Pause speech
        </ControlButton>
      </div>

      <div className="my-5 h-px bg-slate-200 dark:bg-slate-800" />

      <div className="grid gap-3">
        <div className="grid grid-cols-2 gap-3">
          <ControlButton aria-label="Decrease font size" onClick={() => updateFontSize(-2)}>
            Aa -
          </ControlButton>
          <ControlButton aria-label="Increase font size" onClick={() => updateFontSize(2)}>
            Aa +
          </ControlButton>
        </div>
        <p className="text-sm text-slate-600 dark:text-slate-300">Preview font size: {fontSize}px</p>
      </div>

      <div className="my-5 h-px bg-slate-200 dark:bg-slate-800" />

      <div className="grid gap-3" aria-label="Reading preferences">
        <ToggleRow checked={dyslexiaMode} label="Dyslexia mode" onChange={setDyslexiaMode} />
        <ToggleRow checked={highContrast} label="High contrast" onChange={setHighContrast} />
        <ToggleRow checked={focusMode} label="Focus reading" onChange={setFocusMode} />
      </div>

      <div className="mt-5 rounded-2xl bg-teal-50 p-4 text-sm leading-6 text-teal-950 dark:bg-teal-950/40 dark:text-teal-100">
        Paragraph {paragraphs.length ? activeParagraph + 1 : 0} of {paragraphs.length}
      </div>
    </motion.section>
  )
}

export default AccessibilityControls
