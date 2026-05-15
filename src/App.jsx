import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import AccessibilityControls from './components/AccessibilityControls'
import Footer from './components/Footer'
import HeroSection from './components/HeroSection'
import Navbar from './components/Navbar'
import ReadingWorkspace from './components/ReadingWorkspace'

const sampleText = `Reading should feel steady, personal, and possible. Clarity gives you a calmer place to paste long articles, study notes, emails, or instructions.

Use the controls to adjust the size, contrast, theme, and reading style. Focus mode keeps one paragraph in view at a time, while speech support lets you listen when reading feels tiring.

This project is built around independence: fewer distractions, clearer choices, and tools that respect different ways of reading.`

const App = () => {
  const [text, setText] = useState(sampleText)
  const [fontSize, setFontSize] = useState(20)
  const [dyslexiaMode, setDyslexiaMode] = useState(false)
  const [darkMode, setDarkMode] = useState(false)
  const [highContrast, setHighContrast] = useState(false)
  const [focusMode, setFocusMode] = useState(true)
  const [activeParagraph, setActiveParagraph] = useState(0)

  const paragraphs = useMemo(
    () =>
      text
        .split(/\n+/)
        .map((paragraph) => paragraph.trim())
        .filter(Boolean),
    [text],
  )

  const appClasses = [
    'min-h-screen transition-colors duration-300',
    darkMode ? 'dark bg-slate-950 text-slate-100' : 'bg-stone-50 text-slate-900',
    highContrast ? 'contrast-more' : '',
    dyslexiaMode ? 'font-dyslexic tracking-wide' : 'font-readable',
  ].join(' ')

  return (
    <div className={appClasses}>
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />

      <main>
        <div className="mx-auto w-full max-w-7xl px-4 pt-6 sm:px-6 lg:px-8">
          <HeroSection />
        </div>

        <section className="mx-auto grid w-full max-w-7xl gap-8 px-4 pb-8 pt-6 sm:px-6 lg:grid-cols-[320px_1fr] lg:px-8">
          <motion.aside
            id="preferences"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: 'easeOut' }}
            className="lg:sticky lg:top-24 lg:self-start"
            aria-label="Accessibility controls"
          >
            <AccessibilityControls
              activeParagraph={activeParagraph}
              dyslexiaMode={dyslexiaMode}
              focusMode={focusMode}
              fontSize={fontSize}
              highContrast={highContrast}
              paragraphs={paragraphs}
              setActiveParagraph={setActiveParagraph}
              setDyslexiaMode={setDyslexiaMode}
              setFocusMode={setFocusMode}
              setFontSize={setFontSize}
              setHighContrast={setHighContrast}
            />
          </motion.aside>

          <ReadingWorkspace
            activeParagraph={activeParagraph}
            focusMode={focusMode}
            fontSize={fontSize}
            paragraphs={paragraphs}
            setActiveParagraph={setActiveParagraph}
            setText={setText}
            text={text}
          />
        </section>
      </main>

      <Footer />
    </div>
  )
}

export default App
