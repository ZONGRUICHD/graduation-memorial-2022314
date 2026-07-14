import { useCallback, useMemo, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

import { galleryCategories, galleryImages, type GalleryCategory } from '../galleryImages'
import { PhotoLightbox } from './PhotoLightbox'

export type GalleryArchiveProps = {
  onHome: () => void
}

type ActiveCategory = 'all' | GalleryCategory

function orientationFor(width: number, height: number) {
  if (width === height) return 'square'
  return width > height ? 'landscape' : 'portrait'
}

export function GalleryArchive({ onHome }: GalleryArchiveProps) {
  const [activeCategory, setActiveCategory] = useState<ActiveCategory>('all')
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
  const lightboxTriggerRef = useRef<HTMLButtonElement | null>(null)
  const getLightboxTrigger = useCallback(() => lightboxTriggerRef.current, [])

  const categoryCounts = useMemo(() => {
    const counts = new Map<GalleryCategory, number>()
    galleryCategories.forEach(({ value }) => counts.set(value, 0))
    galleryImages.forEach(({ category }) => counts.set(category, (counts.get(category) ?? 0) + 1))
    return counts
  }, [])

  const visibleImages = useMemo(
    () => activeCategory === 'all'
      ? galleryImages
      : galleryImages.filter((image) => image.category === activeCategory),
    [activeCategory],
  )

  const selectCategory = (category: ActiveCategory) => {
    setActiveCategory(category)
    setSelectedIndex(null)
  }

  return (
    <>
      <main
        id="main-content"
        className="yearbook gallery-archive"
        tabIndex={-1}
        aria-labelledby="gallery-title"
        aria-hidden={selectedIndex !== null ? true : undefined}
        inert={selectedIndex !== null ? true : undefined}
      >
        <header className="gallery-archive-header gallery-hero">
          <div className="gallery-archive-header__copy">
            <p className="section-kicker">909 MEMORY INDEX · 2025</p>
            <h1 id="gallery-title" tabIndex={-1}>
              <span className="gallery-title__number">909</span>
              <span className="gallery-title__label">照片档案</span>
            </h1>
            <p className="gallery-count" aria-live="polite" aria-atomic="true">
              {visibleImages.length} 张照片
            </p>
          </div>
          <button className="quote-button gallery-home-button" type="button" onClick={onHome}>
            <span aria-hidden="true">←</span>
            返回首页
          </button>
        </header>

        <nav className="gallery-filters" aria-label="照片分类">
          <div className="gallery-filter-track">
            <button
              type="button"
              aria-pressed={activeCategory === 'all'}
              onClick={() => selectCategory('all')}
            >
              全部 <span>{galleryImages.length}</span>
            </button>
            {galleryCategories.map((category) => (
              <button
                type="button"
                key={category.value}
                aria-pressed={activeCategory === category.value}
                onClick={() => selectCategory(category.value)}
              >
                {category.label} <span>{categoryCounts.get(category.value) ?? 0}</span>
              </button>
            ))}
          </div>
        </nav>

        <section className="gallery-story" aria-labelledby="gallery-grid-title">
          <h2 className="sr-only" id="gallery-grid-title">909 班毕业纪念照片</h2>
          <ol className="gallery-grid">
            {visibleImages.map((image, index) => {
              const captionId = `${image.id}-caption`
              const openLabelId = `${image.id}-open-label`
              const orientation = orientationFor(image.thumbnailWidth, image.thumbnailHeight)

              return (
                <li
                  className={`gallery-grid-item gallery-grid-item--${orientation}`}
                  data-category={image.category}
                  data-photo-index={index + 1}
                  key={image.id}
                >
                  <figure className="photo-chapter gallery-chapter">
                    <button
                      className="gallery-photo-button"
                      type="button"
                      aria-labelledby={`${captionId} ${openLabelId}`}
                      onClick={(event) => {
                        lightboxTriggerRef.current = event.currentTarget
                        setSelectedIndex(index)
                      }}
                    >
                      <img
                        className="memory-image"
                        src={image.thumbnailSrc}
                        srcSet={`${image.thumbnailSrc} ${image.thumbnailWidth}w`}
                        sizes="(max-width: 639px) 94vw, (max-width: 1023px) 47vw, 31vw"
                        width={image.thumbnailWidth}
                        height={image.thumbnailHeight}
                        alt={image.alt}
                        loading={index < 4 ? 'eager' : 'lazy'}
                        decoding="async"
                      />
                      <span className="gallery-photo-open-label" id={openLabelId}>查看照片</span>
                    </button>
                    <figcaption id={captionId}>
                      <span>{String(index + 1).padStart(3, '0')}</span>
                      {image.caption}
                    </figcaption>
                  </figure>
                </li>
              )
            })}
          </ol>
        </section>
      </main>

      {selectedIndex !== null && typeof document !== 'undefined'
        ? createPortal(
            <PhotoLightbox
              images={visibleImages}
              index={selectedIndex}
              onChange={setSelectedIndex}
              onClose={() => setSelectedIndex(null)}
              returnFocus={getLightboxTrigger}
            />,
            document.body,
          )
        : null}
    </>
  )
}
