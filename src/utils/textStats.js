const WORDS_PER_MINUTE = 180

export const getTextStats = (text) => {
  const trimmedText = text.trim()

  if (!trimmedText) {
    return {
      estimatedMinutes: 0,
      readingTimeLabel: '0 min read',
      words: 0,
    }
  }

  const words = countWords(trimmedText)
  const estimatedMinutes = words / WORDS_PER_MINUTE
  const estimatedSeconds = Math.ceil(estimatedMinutes * 60)

  return {
    estimatedMinutes,
    readingTimeLabel: formatReadingTime(estimatedSeconds),
    words,
  }
}

const formatReadingTime = (seconds) => {
  if (seconds < 60) {
    return `${seconds} sec read`
  }

  const minutes = Math.ceil(seconds / 60)

  return `${minutes} min read`
}

const countWords = (text) => {
  if (typeof Intl !== 'undefined' && Intl.Segmenter) {
    const segmenter = new Intl.Segmenter('en', { granularity: 'word' })

    return Array.from(segmenter.segment(text)).filter((segment) => segment.isWordLike).length
  }

  return text.match(/\b[\p{L}\p{N}]+(?:['-][\p{L}\p{N}]+)*\b/gu)?.length ?? 0
}
