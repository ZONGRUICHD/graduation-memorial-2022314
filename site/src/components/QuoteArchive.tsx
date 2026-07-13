import { useId, useMemo } from 'react'

import type { TeacherQuote } from '../teacherQuotes'
import { useModalDialog } from './useModalDialog'

export type QuoteArchiveProps = {
  teacherQuotes: TeacherQuote[]
  onClose: () => void
}

type QuoteStreamProps = {
  name: string
  className: string
  quotes: TeacherQuote[]
}

function QuoteStream({ name, className, quotes }: QuoteStreamProps) {
  return (
    <div className={`quote-stream ${className}`} data-stream={name} aria-hidden="true">
      {[...quotes, ...quotes].map((quote, index) => (
        <p className="quote-stream-line" key={`${name}-${quote.id}-${index}`}>
          <span>{quote.text}</span>
          {quote.author ? <span className="quote-stream-author">— {quote.author}</span> : null}
        </p>
      ))}
    </div>
  )
}

export function QuoteArchive({ teacherQuotes, onClose }: QuoteArchiveProps) {
  const titleId = useId()
  const descriptionId = useId()
  const dialogRef = useModalDialog<HTMLDivElement>(onClose)
  const desktopStreams = useMemo(
    () => Array.from({ length: 3 }, (_, streamIndex) => (
      teacherQuotes.filter((_, quoteIndex) => quoteIndex % 3 === streamIndex)
    )),
    [teacherQuotes],
  )

  return (
    <div
      ref={dialogRef}
      className="quote-archive quote-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      aria-describedby={descriptionId}
      tabIndex={-1}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      <div className="quote-animation-layer" aria-hidden="true">
        {desktopStreams.map((quotes, index) => (
          <QuoteStream
            key={`desktop-${index}`}
            name={`desktop-${index}`}
            className="quote-stream-desktop"
            quotes={quotes}
          />
        ))}
        <QuoteStream name="mobile" className="quote-stream-mobile" quotes={teacherQuotes} />
      </div>

      <section className="quote-archive-panel">
        <header className="quote-archive-header">
          <div>
            <p className="section-kicker">909 VOICE ARCHIVE · {teacherQuotes.length}</p>
            <h2 id={titleId}>
              教师名言<span aria-hidden="true">档案</span>
            </h2>
            <p id={descriptionId}>完整收录三年里留在教室中的 {teacherQuotes.length} 句话。</p>
          </div>
          <button
            className="quote-close"
            type="button"
            aria-label="关闭教师名言"
            data-dialog-initial-focus
            onClick={onClose}
          >
            <span aria-hidden="true">×</span>
            <span className="quote-close-label">关闭档案</span>
          </button>
        </header>

        <ol className="quote-complete-list">
          {teacherQuotes.map((quote, index) => (
            <li className="quote-complete-item" data-quote-id={quote.id} key={quote.id}>
              <article>
                <p className="quote-archive-number" aria-hidden="true">
                  {String(index + 1).padStart(3, '0')}
                </p>
                <blockquote>
                  <p>{quote.text}</p>
                  {quote.author ? <cite>— {quote.author}</cite> : null}
                </blockquote>
              </article>
            </li>
          ))}
        </ol>
      </section>
    </div>
  )
}
