import { motion } from 'framer-motion'
import { Moon, Sun } from 'lucide-react'
import { Link } from 'react-router-dom'

const navLinks = [
  { label: 'About', to: '/#about' },
  { label: 'Reader', to: '/#reader' },
  { label: 'Preferences', to: '/#preferences' },
  { label: 'Privacy', to: '/#privacy' },
]

const Navbar = ({ darkMode, setDarkMode }) => {
  return (
    <motion.header
      className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/75 backdrop-blur transition-shadow dark:border-slate-800 dark:bg-slate-950/75"
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
    >
      <nav
        className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8"
        aria-label="Primary navigation"
      >
        <Link to="/#about" className="group flex items-center gap-3 rounded-full focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-teal-500">
          <motion.span
            aria-hidden="true"
            className="grid h-11 w-11 place-items-center rounded-2xl bg-teal-700 text-lg font-bold text-white shadow-soft"
            initial={{ scale: 0.94, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            C
          </motion.span>
          <span>
            <span className="block text-lg font-semibold leading-tight text-slate-950 dark:text-white">Clarity</span>
            <span className="block text-sm leading-tight text-slate-600 dark:text-slate-300">Accessible reading workspace</span>
          </span>
        </Link>

        <div className="flex items-center gap-2 text-sm font-medium text-slate-600 dark:text-slate-300 sm:gap-3">
          {navLinks.map((link) => (
            <Link
              className="hidden rounded-full px-3 py-2 hover:bg-slate-100 focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-teal-500 dark:hover:bg-slate-900 md:inline-flex"
              key={link.label}
              to={link.to}
            >
              {link.label}
            </Link>
          ))}
          <button
            aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            aria-pressed={darkMode}
            className="grid h-11 w-11 place-items-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:border-teal-200 hover:bg-teal-50 focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-teal-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:border-teal-700 dark:hover:bg-slate-800"
            onClick={() => setDarkMode((current) => !current)}
            type="button"
          >
            {darkMode ? <Sun aria-hidden="true" size={20} strokeWidth={2.2} /> : <Moon aria-hidden="true" size={20} strokeWidth={2.2} />}
          </button>
        </div>
      </nav>
    </motion.header>
  )
}

export default Navbar
