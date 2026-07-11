import { useCallback, useEffect, useRef } from 'react'

import type { GalleryImage } from '../galleryImages'

type PhotoLightboxProps = {
  images: GalleryImage[]
  index: number
  onChange: (index: number) => void
  onClose: () => void
}

export function PhotoLightbox({ images, index, onChange, onClose }: PhotoLightboxProps) {
  const closeRef = useRef<HTMLButtonElement>(null)
  const touchStart = useRef({ x: 0, y: 0 })
  const indexRef = useRef(index)
  const image = images[index]

  useEffect(() => {
    indexRef.current = index
  }, [index])

  const move = useCallback((direction: -1 | 1) => {
    onChange((indexRef.current + direction + images.length) % images.length)
  }, [images.length, onChange])

  useEffect(() => {
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
      if (event.key === 'ArrowLeft') move(-1)
      if (event.key === 'ArrowRight') move(1)
      if (event.key !== 'Tab') return

      const controls = Array.from(document.querySelectorAll<HTMLElement>('.photo-lightbox button:not([disabled])'))
      if (controls.length === 0) return
      const first = controls[0]
      const last = controls[controls.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = previousOverflow
    }
  }, [move, onClose])

  useEffect(() => {
    const preload = (offset: -1 | 1) => {
      const next = new Image()
      next.src = images[(index + offset + images.length) % images.length].src
    }
    preload(-1)
    preload(1)
  }, [images, index])

  const handleTouchEnd = (event: React.TouchEvent) => {
    const touch = event.changedTouches[0]
    const deltaX = touch.clientX - touchStart.current.x
    const deltaY = touch.clientY - touchStart.current.y
    if (Math.abs(deltaX) < 52 || Math.abs(deltaX) < Math.abs(deltaY) * 1.2) return
    move(deltaX < 0 ? 1 : -1)
  }

  return (
    <div className="photo-lightbox" role="dialog" aria-modal="true" aria-label="照片查看器">
      <div
        className="photo-lightbox-stage"
        onTouchStart={(event) => {
          const touch = event.touches[0]
          touchStart.current = { x: touch.clientX, y: touch.clientY }
        }}
        onTouchEnd={handleTouchEnd}
      >
        <img className="photo-lightbox-image" src={image.src} alt={image.alt} decoding="async" />
      </div>
      <div className="photo-lightbox-meta">
        <p aria-live="polite">{index + 1} / {images.length}</p>
        <p>{image.caption}</p>
      </div>
      <button ref={closeRef} className="photo-lightbox-close" type="button" aria-label="关闭照片查看器" onClick={onClose}>×</button>
      <button className="photo-lightbox-nav photo-lightbox-prev" type="button" aria-label="上一张照片" onClick={() => move(-1)}>‹</button>
      <button className="photo-lightbox-nav photo-lightbox-next" type="button" aria-label="下一张照片" onClick={() => move(1)}>›</button>
    </div>
  )
}
