import { Fragment, useEffect, useRef } from 'react'

type QuoteArchiveProps = { teacherQuotes: string[]; onClose: () => void }

export function QuoteArchive({ teacherQuotes, onClose }: QuoteArchiveProps) {
  const closeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
      if (event.key === 'Tab') {
        event.preventDefault()
        closeRef.current?.focus()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [onClose])

  const desktopStreams = Array.from({ length: 3 }, (_, streamIndex) =>
    teacherQuotes.filter((_, quoteIndex) => quoteIndex % 3 === streamIndex),
  )

  const stream = (name: string, className: string, quotes = teacherQuotes) => (
    <div className={`quote-stream ${className}`} data-stream={name} aria-hidden="true">
      {[...quotes, ...quotes].map((quote, index) => (
        <p className="quote-stream-line" key={`${name}-${index}`}>{quote}</p>
      ))}
    </div>
  )

  return (
    <div className="quote-archive quote-overlay" role="dialog" aria-modal="true" aria-labelledby="quote-title">
      <div className="quote-archive-panel">
        <button ref={closeRef} className="quote-close" type="button" aria-label="关闭教师名言" onClick={onClose}>×</button>
        <h2 id="quote-title">教师名言</h2>
        <div className="quote-animation-layer">
          {desktopStreams.map((quotes, index) => (
            <Fragment key={`desktop-${index}`}>
              {stream(`desktop-${index}`, 'quote-stream-desktop', quotes)}
            </Fragment>
          ))}
          {stream('mobile', 'quote-stream-mobile')}
        </div>
        <ul className="sr-only quote-complete-list">
          {teacherQuotes.map((quote, index) => <li key={`accessible-${index}`}>{quote}</li>)}
        </ul>
      </div>
    </div>
  )
}
