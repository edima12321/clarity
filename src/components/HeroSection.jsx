import { motion } from 'framer-motion'
import { Eye, Heart, Zap } from 'lucide-react'

const heroPills = [
  { icon: Eye, label: 'Dyslexia friendly' },
  { icon: Zap, label: 'Focus mode' },
  { icon: Heart, label: 'Calm by design' },
]

const HeroSection = () => {
  return (
    <motion.section
      id="about"
      className="rounded-3xl border border-teal-100 bg-gradient-to-br from-teal-50/80 via-white to-sky-50/80 px-6 py-8 shadow-soft dark:border-teal-900/70 dark:from-teal-950/30 dark:via-slate-900 dark:to-sky-950/30 sm:px-8 lg:px-10 lg:py-10"
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      aria-labelledby="clarity-hero-heading"
    >
      <h1 id="clarity-hero-heading" className="max-w-4xl text-3xl font-semibold leading-tight text-slate-950 dark:text-white sm:text-4xl lg:text-[2.75rem]">
        Read with ease. <span className="text-teal-600 dark:text-teal-300">Your way.</span>
      </h1>
      <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-700 dark:text-slate-300">
        Clarity adapts to how you read, not the other way around. Paste any text and customize every aspect of your reading experience.
      </p>

      <div className="mt-7 flex flex-wrap gap-3" aria-label="Clarity highlights">
        {heroPills.map(({ icon: Icon, label }) => (
          <div
            className="inline-flex min-h-11 items-center gap-3 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-800 shadow-sm dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 sm:text-base"
            key={label}
          >
            <Icon aria-hidden="true" className="text-teal-600 dark:text-teal-300" size={19} strokeWidth={2.2} />
            <span>{label}</span>
          </div>
        ))}
      </div>
    </motion.section>
  )
}

export default HeroSection
