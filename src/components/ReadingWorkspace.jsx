import { motion } from 'framer-motion'
import ReaderPanel from './ReaderPanel'

const emptyMessage = 'Paste an article, lesson, email, or document to create a calmer reading preview.'

const ReadingWorkspace = ({ activeParagraph, focusMode, fontSize, paragraphs, setActiveParagraph, setText, text }) => {
  return (
    <motion.section
      id="reader"
      className="min-w-0"
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut', delay: 0.08 }}
    >
      <ReaderPanel
        activeParagraph={activeParagraph}
        emptyMessage={emptyMessage}
        focusMode={focusMode}
        fontSize={fontSize}
        paragraphs={paragraphs}
        setActiveParagraph={setActiveParagraph}
        setText={setText}
        text={text}
      />
    </motion.section>
  )
}

export default ReadingWorkspace
