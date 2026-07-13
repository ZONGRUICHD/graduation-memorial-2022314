import { cleanup, render, screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { galleryCategories, galleryImages } from '../galleryImages'
import { GalleryArchive } from './GalleryArchive'

afterEach(() => {
  cleanup()
})

describe('GalleryArchive', () => {
  it('renders all 137 thumbnails in curated order with real dimensions', () => {
    render(<GalleryArchive onHome={vi.fn()} />)

    const figures = screen.getAllByRole('figure')
    const images = screen.getAllByRole('img')

    expect(figures).toHaveLength(137)
    expect(images).toHaveLength(137)
    expect(images.map((image) => image.getAttribute('src'))).toEqual(
      galleryImages.map((image) => image.thumbnailSrc),
    )
    expect(images.map((image) => image.getAttribute('alt'))).toEqual(
      galleryImages.map((image) => image.alt),
    )
    images.forEach((image, index) => {
      expect(image).toHaveAttribute('width', String(galleryImages[index].thumbnailWidth))
      expect(image).toHaveAttribute('height', String(galleryImages[index].thumbnailHeight))
      expect(image).toHaveAttribute('srcset', `${galleryImages[index].thumbnailSrc} ${galleryImages[index].thumbnailWidth}w`)
      expect(image).not.toHaveAttribute('src', galleryImages[index].src)
    })
    expect(images.slice(0, 4).every((image) => image.getAttribute('loading') === 'eager')).toBe(true)
    expect(images.slice(4).every((image) => image.getAttribute('loading') === 'lazy')).toBe(true)
  })

  it('keeps every category complete and preserves its archive order', async () => {
    const user = userEvent.setup()
    render(<GalleryArchive onHome={vi.fn()} />)

    for (const category of galleryCategories) {
      const expected = galleryImages.filter((image) => image.category === category.value)
      await user.click(screen.getByRole('button', { name: `${category.label} ${expected.length}` }))

      const visibleImages = screen.getAllByRole('img')
      expect(visibleImages.map((image) => image.getAttribute('src'))).toEqual(
        expected.map((image) => image.thumbnailSrc),
      )
      expect(screen.getByText(`${expected.length} 张照片`)).toBeInTheDocument()
    }
  })

  it('loads originals only in the lightbox and restores focus after keyboard navigation', async () => {
    const user = userEvent.setup()
    render(<GalleryArchive onHome={vi.fn()} />)
    const firstPhoto = screen.getAllByRole('button', { name: /查看照片/ })[0]

    await user.click(firstPhoto)
    const dialog = screen.getByRole('dialog', { name: '照片查看器' })
    const lightboxImage = within(dialog).getByRole('img')
    expect(lightboxImage).toHaveAttribute('src', galleryImages[0].src)
    expect(lightboxImage).toHaveAttribute('width', String(galleryImages[0].width))
    expect(within(dialog).getByText(`1 / ${galleryImages.length}`)).toBeInTheDocument()
    expect(within(dialog).getByRole('button', { name: '关闭照片查看器' })).toHaveFocus()
    expect(document.body).toHaveAttribute('data-modal-open', 'true')

    await user.keyboard('{ArrowRight}')
    expect(within(dialog).getByText(`2 / ${galleryImages.length}`)).toBeInTheDocument()
    expect(lightboxImage).toHaveAttribute('src', galleryImages[1].src)

    await user.keyboard('{ArrowLeft}')
    expect(within(dialog).getByText(`1 / ${galleryImages.length}`)).toBeInTheDocument()

    await user.keyboard('{Escape}')
    expect(screen.queryByRole('dialog', { name: '照片查看器' })).not.toBeInTheDocument()
    await waitFor(() => expect(firstPhoto).toHaveFocus())
    expect(document.body).not.toHaveAttribute('data-modal-open')
  })
})
