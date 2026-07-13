import { useEffect, useRef, useState } from 'react'

import { gsap, prefersReducedMotion, useGSAP } from '../motion'

export type NavigationTarget = 'top' | 'story' | 'quotes' | 'photos' | 'gallery'

type SiteChromeProps = {
  currentView: 'home' | 'gallery'
  currentSection?: Exclude<NavigationTarget, 'gallery'>
  onNavigate: (target: NavigationTarget) => void
}

const menuItems: Array<{ target: NavigationTarget; eyebrow: string; label: string }> = [
  { target: 'top', eyebrow: '00', label: '首页' },
  { target: 'story', eyebrow: '01', label: '三年三幕' },
  { target: 'quotes', eyebrow: '02', label: '教师名言' },
  { target: 'photos', eyebrow: '03', label: '记忆索引' },
  { target: 'gallery', eyebrow: '04', label: '完整图库' },
]

export function SiteChrome({ currentView, currentSection, onNavigate }: SiteChromeProps) {
  const rootRef = useRef<HTMLElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)
  const progressRef = useRef<HTMLSpanElement>(null)
  const restoreFocusRef = useRef(true)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    let frame = 0

    const updateProgress = () => {
      frame = 0
      const max = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1)
      const progress = Math.min(Math.max(window.scrollY / max, 0), 1)
      progressRef.current?.style.setProperty('--scroll-progress', String(progress))
    }

    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(updateProgress)
    }

    updateProgress()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (frame) window.cancelAnimationFrame(frame)
    }
  }, [currentView])

  useEffect(() => {
    if (!open || !panelRef.current) return

    const panel = panelRef.current
    const trigger = triggerRef.current
    const previousOverflow = document.body.style.overflow
    const focusable = Array.from(
      panel.querySelectorAll<HTMLElement>('button:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])'),
    )

    document.body.style.overflow = 'hidden'
    restoreFocusRef.current = true
    window.requestAnimationFrame(() => focusable[0]?.focus())

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        setOpen(false)
        return
      }

      if (event.key !== 'Tab' || focusable.length === 0) return
      const first = focusable[0]
      const last = focusable[focusable.length - 1]

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = previousOverflow
      if (restoreFocusRef.current) window.requestAnimationFrame(() => trigger?.focus())
    }
  }, [open])

  useGSAP(
    () => {
      if (!open || prefersReducedMotion()) return

      const timeline = gsap.timeline({ defaults: { ease: 'power4.out' } })
      timeline
        .fromTo('.menu-panel__wash', { scaleY: 0 }, { scaleY: 1, duration: 0.5, stagger: 0.06 })
        .fromTo(
          '.menu-panel__item, .menu-panel__footer',
          { yPercent: 45, opacity: 0 },
          { yPercent: 0, opacity: 1, duration: 0.55, stagger: 0.055 },
          '-=0.24',
        )

      return () => timeline.kill()
    },
    { scope: rootRef, dependencies: [open], revertOnUpdate: true },
  )

  const handleNavigate = (target: NavigationTarget) => {
    restoreFocusRef.current = false
    setOpen(false)
    onNavigate(target)
  }

  return (
    <header className="site-chrome" ref={rootRef}>
      <a className="skip-link" href="#main-content">跳到主要内容</a>
      <button className="site-mark" type="button" onClick={() => onNavigate('top')} aria-label="返回首页">
        <span>909</span>
        <small>2025</small>
      </button>

      <div className="site-chrome__actions">
        <button className="gallery-shortcut" type="button" onClick={() => onNavigate('gallery')}>
          <span>PHOTO ARCHIVE</span>
          <strong>137</strong>
        </button>
        <button
          className="menu-trigger"
          ref={triggerRef}
          type="button"
          aria-label={open ? '关闭网站目录' : '打开网站目录'}
          aria-expanded={open}
          aria-controls="site-menu"
          onClick={() => setOpen((value) => !value)}
        >
          <span className="menu-trigger__label">{open ? '关闭' : '菜单'}</span>
          <span className="menu-trigger__icon" aria-hidden="true">
            <i />
            <i />
          </span>
        </button>
      </div>

      <div className="scroll-progress" aria-hidden="true">
        <span ref={progressRef} />
      </div>

      {open ? (
        <div
          className="menu-panel"
          id="site-menu"
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-label="网站目录"
        >
          <button className="menu-panel__close" type="button" aria-label="关闭网站目录" onClick={() => setOpen(false)}>
            <span>关闭</span>
            <i aria-hidden="true">×</i>
          </button>
          <div className="menu-panel__washes" aria-hidden="true">
            <span className="menu-panel__wash" />
            <span className="menu-panel__wash" />
            <span className="menu-panel__wash" />
          </div>
          <nav className="menu-panel__nav" aria-label="章节导航">
            {menuItems.map((item) => (
              <button
                className="menu-panel__item"
                data-active={item.target === 'gallery'
                  ? currentView === 'gallery'
                  : currentView === 'home' && currentSection === item.target}
                key={item.target}
                type="button"
                onClick={() => handleNavigate(item.target)}
              >
                <span>{item.eyebrow}</span>
                <strong>{item.label}</strong>
                <i aria-hidden="true">↗</i>
              </button>
            ))}
          </nav>
          <div className="menu-panel__footer">
            <span>SHENZHEN · LONGHUA</span>
            <a href="https://zongtech.xyz/" rel="noopener noreferrer">
              ZongRui 的个人博客 ↗
            </a>
          </div>
        </div>
      ) : null}
    </header>
  )
}
