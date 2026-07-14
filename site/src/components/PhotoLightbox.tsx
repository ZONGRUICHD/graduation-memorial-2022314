import { useCallback, useEffect, useId, useRef, useState, type TouchEvent } from 'react'

import type { GalleryImage } from '../galleryImages'
import { useModalDialog } from './useModalDialog'

export type PhotoLightboxProps = {
  images: GalleryImage[]
  index: number
  onChange: (index: number) => void
  onClose: () => void
  returnFocus?: () => HTMLElement | null
}

function wrapIndex(index: number, length: number) {
  return ((index % length) + length) % length
}

function LightboxMedia({ image }: { image: GalleryImage }) {
  const [loadedImageId, setLoadedImageId] = useState<string | null>(null)
  const [failedImageId, setFailedImageId] = useState<string | null>(null)
  const state = loadedImageId === image.id ? 'loaded' : failedImageId === image.id ? 'error' : 'loading'

  return (
    <div className="photo-lightbox-media" data-state={state} aria-busy={state === 'loading'}>
      <img
        className="photo-lightbox-placeholder"
        src={image.thumbnailSrc}
        width={image.thumbnailWidth}
        height={image.thumbnailHeight}
        alt=""
        aria-hidden="true"
        decoding="async"
      />
      <img
        className="photo-lightbox-image"
        src={image.src}
        width={image.width}
        height={image.height}
        alt={image.alt}
        decoding="async"
        fetchPriority="high"
        draggable="false"
        onLoad={() => setLoadedImageId(image.id)}
        onError={() => setFailedImageId(image.id)}
      />
      <span className="photo-lightbox-loading" role="status">
        {state === 'error' ? '原图加载失败，已显示预览图' : '正在加载原图…'}
      </span>
    </div>
  )
}

export function PhotoLightbox({ images, index, onChange, onClose, returnFocus }: PhotoLightboxProps) {
  const titleId = useId()
  const captionId = useId()
  const touchStart = useRef({ x: 0, y: 0 })
  const dialogRef = useModalDialog<HTMLDivElement>(onClose, returnFocus)
  const imageCount = images.length
  const safeIndex = imageCount > 0 ? wrapIndex(index, imageCount) : 0
  const image = images[safeIndex]

  const move = useCallback((direction: -1 | 1) => {
    if (imageCount < 2) return
    onChange(wrapIndex(safeIndex + direction, imageCount))
  }, [imageCount, onChange, safeIndex])

  useEffect(() => {
    if (imageCount < 2) return

    const handleArrowKeys = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') {
        event.preventDefault()
        move(-1)
      } else if (event.key === 'ArrowRight') {
        event.preventDefault()
        move(1)
      }
    }

    document.addEventListener('keydown', handleArrowKeys)
    return () => document.removeEventListener('keydown', handleArrowKeys)
  }, [imageCount, move])

  useEffect(() => {
    if (imageCount < 2) return

    const adjacentSources = new Set([
      images[wrapIndex(safeIndex - 1, imageCount)].src,
      images[wrapIndex(safeIndex + 1, imageCount)].src,
    ])

    adjacentSources.forEach((src) => {
      const adjacentImage = new Image()
      adjacentImage.decoding = 'async'
      adjacentImage.src = src
    })
  }, [imageCount, images, safeIndex])

  useEffect(() => {
    const chrome = document.querySelector<HTMLElement>('.site-chrome')
    if (!chrome) return
    const previousInert = chrome.inert
    const previousAriaHidden = chrome.getAttribute('aria-hidden')
    chrome.inert = true
    chrome.setAttribute('aria-hidden', 'true')
    return () => {
      chrome.inert = previousInert
      if (previousAriaHidden === null) chrome.removeAttribute('aria-hidden')
      else chrome.setAttribute('aria-hidden', previousAriaHidden)
    }
  }, [])

  if (image === undefined) return null

  const handleTouchEnd = (event: TouchEvent<HTMLDivElement>) => {
    const touch = event.changedTouches[0]
    const deltaX = touch.clientX - touchStart.current.x
    const deltaY = touch.clientY - touchStart.current.y

    if (Math.abs(deltaX) < 52 || Math.abs(deltaX) < Math.abs(deltaY) * 1.2) return
    move(deltaX < 0 ? 1 : -1)
  }

  return (
    <div
      ref={dialogRef}
      className="photo-lightbox"
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      aria-describedby={captionId}
      tabIndex={-1}
    >
      <h2 className="sr-only" id={titleId}>照片查看器</h2>

      <div
        className="photo-lightbox-stage"
        onTouchStart={(event) => {
          const touch = event.touches[0]
          touchStart.current = { x: touch.clientX, y: touch.clientY }
        }}
        onTouchEnd={handleTouchEnd}
      >
        <figure className="photo-lightbox-figure">
          <LightboxMedia image={image} />
          <figcaption className="photo-lightbox-meta" id={captionId}>
            <span aria-live="polite" aria-atomic="true">{safeIndex + 1} / {imageCount}</span>
            <span>{image.caption}</span>
          </figcaption>
        </figure>
      </div>

      <button
        className="photo-lightbox-close"
        type="button"
        aria-label="关闭照片查看器"
        data-dialog-initial-focus
        onClick={onClose}
      >
        <span aria-hidden="true">×</span>
        <span className="photo-lightbox-control-label">关闭</span>
      </button>
      <button
        className="photo-lightbox-nav photo-lightbox-prev"
        type="button"
        aria-label="上一张照片"
        disabled={imageCount < 2}
        onClick={() => move(-1)}
      >
        <span aria-hidden="true">←</span>
        <span className="photo-lightbox-control-label">上一张</span>
      </button>
      <button
        className="photo-lightbox-nav photo-lightbox-next"
        type="button"
        aria-label="下一张照片"
        disabled={imageCount < 2}
        onClick={() => move(1)}
      >
        <span className="photo-lightbox-control-label">下一张</span>
        <span aria-hidden="true">→</span>
      </button>
    </div>
  )
}
