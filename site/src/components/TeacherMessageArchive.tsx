import { useEffect, useRef } from 'react'

import type { TeacherMessage } from '../teacherMessages'

export function TeacherMessageArchive({ messages, onClose }: { messages: TeacherMessage[]; onClose: () => void }) {
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
      window.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = previousOverflow
    }
  }, [onClose])

  return (
    <div className="teacher-message-archive" role="dialog" aria-modal="true" aria-label="老师寄语">
      <header className="teacher-message-header">
        <p>909 · 2025</p>
        <h2>老师寄语</h2>
        <button ref={closeRef} type="button" aria-label="关闭老师寄语" onClick={onClose}>×</button>
      </header>
      <div className="teacher-message-list">
        {messages.map((item) => (
          <article key={item.id}>
            <blockquote>{item.message}</blockquote>
            <p>{item.name} · {item.subject}</p>
          </article>
        ))}
      </div>
    </div>
  )
}
