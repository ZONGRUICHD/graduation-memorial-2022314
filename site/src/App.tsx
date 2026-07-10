import { useCallback, useEffect, useRef, useState } from 'react'

import { teacherQuotes } from './teacherQuotes'
import { DynamicBackdrop } from './components/DynamicBackdrop'
import { GalleryArchive } from './components/GalleryArchive'
import { QuoteArchive } from './components/QuoteArchive'
import { YearbookCover } from './components/YearbookCover'

type Route = 'home' | 'gallery'

function currentRoute(): Route {
  return typeof window !== 'undefined' && window.location.hash === '#gallery' ? 'gallery' : 'home'
}

function App() {
  const [route, setRoute] = useState<Route>(currentRoute)
  const [showQuotes, setShowQuotes] = useState(false)
  const quoteTriggerRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    const syncRoute = () => setRoute(currentRoute())
    window.addEventListener('hashchange', syncRoute)
    return () => window.removeEventListener('hashchange', syncRoute)
  }, [])

  const openGallery = useCallback(() => {
    window.location.hash = 'gallery'
    setRoute('gallery')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  const openHome = useCallback(() => {
    window.history.pushState('', document.title, window.location.pathname + window.location.search)
    setRoute('home')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  const openQuotes = (trigger: HTMLButtonElement) => {
    quoteTriggerRef.current = trigger
    setShowQuotes(true)
  }

  const closeQuotes = useCallback(() => {
    setShowQuotes(false)
    requestAnimationFrame(() => {
      if (quoteTriggerRef.current?.isConnected) {
        quoteTriggerRef.current.focus()
      } else {
        document.querySelector<HTMLElement>('.brand-control')?.focus()
      }
    })
  }, [])

  return (
    <div className="memorial-page">
      <DynamicBackdrop />
      <header className="site-header">
        <button className="brand brand-control" type="button" onClick={openHome}>毕业纪念</button>
        <a className="blog-link" href="https://zongtech.xyz/" rel="noopener">个人博客</a>
      </header>
      {route === 'gallery' ? <GalleryArchive onHome={openHome} /> : <YearbookCover onQuotes={openQuotes} onGallery={openGallery} />}
      <footer className="signature">Designed by ZongRui</footer>
      {showQuotes ? <QuoteArchive teacherQuotes={teacherQuotes} onClose={closeQuotes} /> : null}
    </div>
  )
}

export default App
