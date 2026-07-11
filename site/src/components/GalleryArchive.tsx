import { useMemo, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

import { galleryCategories, galleryImages, type GalleryCategory } from '../galleryImages'
import { PhotoLightbox } from './PhotoLightbox'

export function GalleryArchive({ onHome }: { onHome: () => void }) {
  const [activeCategory, setActiveCategory] = useState<'all' | GalleryCategory>('all')
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
  const triggerRef = useRef<HTMLButtonElement | null>(null)
  const visibleImages = useMemo(
    () => activeCategory === 'all' ? galleryImages : galleryImages.filter((image) => image.category === activeCategory),
    [activeCategory],
  )

  const closeLightbox = () => {
    setSelectedIndex(null)
    requestAnimationFrame(() => triggerRef.current?.focus())
  }

  return (
    <main className="yearbook gallery-archive" aria-labelledby="gallery-title">
      <section className="gallery-archive-header gallery-hero">
        <h1 id="gallery-title">909照片档案</h1>
        <p className="gallery-count">{visibleImages.length} 张照片</p>
        <button className="quote-button" type="button" onClick={onHome}>返回封面</button>
      </section>
      <nav className="gallery-filters" aria-label="照片分类">
        <div className="gallery-filter-track">
          <button
            type="button"
            aria-pressed={activeCategory === 'all'}
            onClick={() => {
              setActiveCategory('all')
              setSelectedIndex(null)
            }}
          >
            全部 <span>{galleryImages.length}</span>
          </button>
          {galleryCategories.map((category) => {
            const count = galleryImages.filter((image) => image.category === category.value).length
            return (
              <button
                type="button"
                key={category.value}
                aria-pressed={activeCategory === category.value}
                onClick={() => {
                  setActiveCategory(category.value)
                  setSelectedIndex(null)
                }}
              >
                {category.label} <span>{count}</span>
              </button>
            )
          })}
        </div>
      </nav>
      <section className="gallery-story" aria-label="909照片档案照片">
        {visibleImages.map((image, index) => (
          <figure className="photo-chapter gallery-chapter" key={image.id}>
            <button
              className="gallery-photo-button"
              type="button"
              aria-label={`查看照片：${image.caption}`}
              onClick={(event) => {
                triggerRef.current = event.currentTarget
                setSelectedIndex(index)
              }}
            >
              <img
                className="memory-image"
                src={image.src}
                srcSet={`${image.thumbnailSrc} 750w, ${image.src} 1500w`}
                sizes="(max-width: 767px) 100vw, min(88vw, 1400px)"
                alt={image.alt}
                loading={index < 2 ? 'eager' : 'lazy'}
                decoding="async"
              />
            </button>
            <figcaption>{image.caption}</figcaption>
          </figure>
        ))}
      </section>
      {selectedIndex !== null ? createPortal(
        <PhotoLightbox images={visibleImages} index={selectedIndex} onChange={setSelectedIndex} onClose={closeLightbox} />,
        document.body,
      ) : null}
    </main>
  )
}
