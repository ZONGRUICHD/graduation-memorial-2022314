import { type CSSProperties, useEffect, useState } from 'react'

import { galleryImages } from './galleryImages'
import { teacherQuotes } from './teacherQuotes'

type QuoteDrop = {
  id: string
  text: string
  style: CSSProperties
}

const quoteCycleDuration = 118

const quoteDrops: QuoteDrop[] = teacherQuotes.map((quote, index) => {
  return {
    id: `quote-${index}`,
    text: quote,
    style: {
      '--quote-x': `${5 + ((index * 37) % 90)}%`,
      '--duration': `${quoteCycleDuration}s`,
      '--delay': `${-(index / teacherQuotes.length) * quoteCycleDuration}s`,
    } as CSSProperties,
  }
})

function DynamicBackdrop() {
  return (
    <div className="dynamic-backdrop" aria-hidden="true">
      <span className="backdrop-glow glow-blue" />
      <span className="backdrop-glow glow-red" />
      <span className="backdrop-glow glow-yellow" />
      <span className="backdrop-glow glow-green" />
      <span className="backdrop-glow glow-cyan" />
    </div>
  )
}

function QuoteRain() {
  return (
    <section className="quote-stage" aria-label="毕业语录">
      <div className="quote-rain" aria-hidden="true">
        {quoteDrops.map((quote) => (
          <span className="quote-rain-line" key={quote.id} style={quote.style}>
            {quote.text}
          </span>
        ))}
      </div>
      <p className="quote-placeholder">毕业语录合集</p>
    </section>
  )
}

function getCurrentRoute() {
  if (typeof window === 'undefined') {
    return 'home'
  }

  return window.location.hash === '#gallery' ? 'gallery' : 'home'
}

function App() {
  const [showQuotes, setShowQuotes] = useState(false)
  const [route, setRoute] = useState(getCurrentRoute)

  useEffect(() => {
    const syncRoute = () => setRoute(getCurrentRoute())

    window.addEventListener('hashchange', syncRoute)
    return () => window.removeEventListener('hashchange', syncRoute)
  }, [])

  const openGallery = () => {
    window.location.hash = 'gallery'
    setRoute('gallery')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const openHome = () => {
    window.history.pushState('', document.title, window.location.pathname + window.location.search)
    setRoute('home')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="memorial-page">
      <DynamicBackdrop />

      <header className="site-header">
        <button className="brand brand-control" type="button" onClick={openHome}>
          毕业纪念
        </button>
        <a className="blog-link" href="https://zongtech.xyz/" rel="noopener">
          个人博客
        </a>
      </header>

      {route === 'gallery' ? (
        <main className="memorial gallery-page" aria-labelledby="gallery-title">
          <section className="hero-section gallery-hero">
            <h1 id="gallery-title" aria-label="909毕业纪念照片墙">
              <span className="title-line">909毕业纪念</span>
              <span className="title-line">照片墙</span>
            </h1>
          </section>

          <section className="quote-control gallery-nav" aria-label="照片墙导航">
            <button className="quote-button" type="button" onClick={openHome}>
              返回首页
            </button>
            <span className="gallery-count">{galleryImages.length} 张照片</span>
          </section>

          <section className="image-stack gallery-stack" aria-label="照片墙图片">
            {galleryImages.map((image) => (
              <picture key={image.src}>
                <source srcSet={image.src} type="image/webp" />
                <img className="memory-image" src={image.src} alt={image.alt} loading="lazy" decoding="async" />
              </picture>
            ))}
          </section>
        </main>
      ) : (
        <main className="memorial" aria-labelledby="page-title">
          <section className="hero-section">
            <h1 id="page-title" aria-label="深圳市龙华区高峰学校2025届909毕业纪念">
              <span className="title-line">深圳市龙华区高峰学校</span>
              <span className="title-line">2025届909毕业纪念</span>
            </h1>
          </section>

          <section className="image-stack" aria-label="毕业纪念图片">
            <picture>
              <source srcSet="/assets/graduation-ceremony-20250701.webp?v=20260525-1" type="image/webp" />
              <img className="memory-image" src="/assets/graduation-ceremony-20250701.webp?v=20260525-1" alt="2025届909毕业活动合影" />
            </picture>
            <picture>
              <source srcSet="/assets/graduation-group.webp?v=20260522-2" type="image/webp" />
              <img className="memory-image" src="/assets/graduation-group.jpg?v=20260522-2" alt="2025届909毕业合影" />
            </picture>
            <picture>
              <source srcSet="/assets/classroom-memory.webp?v=20260522-2" type="image/webp" />
              <img className="memory-image" src="/assets/classroom-memory.jpg?v=20260522-2" alt="2025届909教室纪念照" />
            </picture>
          </section>

          <section className="quote-control" aria-label="页面操作">
            <button className="quote-button" type="button" aria-expanded={showQuotes} onClick={() => setShowQuotes((current) => !current)}>
              {showQuotes ? '收起毕业语录' : '显示毕业语录'}
            </button>
            <button className="quote-button" type="button" onClick={openGallery}>
              照片墙
            </button>
          </section>

          {showQuotes ? <QuoteRain /> : null}
        </main>
      )}

      <footer className="signature">Designed by ZongRui</footer>
    </div>
  )
}

export default App
