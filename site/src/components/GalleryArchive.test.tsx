import { cleanup, render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { galleryCategories, galleryImages } from '../galleryImages'
import { GalleryArchive } from './GalleryArchive'

afterEach(() => {
  cleanup()
  document.body.style.overflow = ''
})

describe('GalleryArchive', () => {
  it('keeps every gallery image identifiable and categorized', () => {
    expect(galleryImages).toHaveLength(137)
    expect(new Set(galleryImages.map((image) => image.id)).size).toBe(137)
    expect(galleryImages.every((image) => galleryCategories.some((category) => category.value === image.category))).toBe(true)
    expect(galleryCategories.every((category) => galleryImages.some((image) => image.category === category.value))).toBe(true)
  })

  it('filters the archive without changing the order inside a category', async () => {
    const user = userEvent.setup()
    render(<GalleryArchive onHome={vi.fn()} />)
    const graduationImages = galleryImages.filter((image) => image.category === 'graduation')

    await user.click(screen.getByRole('button', { name: /^毕业现场 \d+$/ }))

    const visibleImages = screen.getAllByRole('img')
    expect(visibleImages).toHaveLength(graduationImages.length)
    expect(visibleImages.map((image) => image.getAttribute('src'))).toEqual(graduationImages.map((image) => image.src))
  })

  it('opens a focused lightbox and supports keyboard navigation and closing', async () => {
    const user = userEvent.setup()
    render(<GalleryArchive onHome={vi.fn()} />)
    const firstPhoto = screen.getAllByRole('button', { name: /查看照片/ })[0]

    await user.click(firstPhoto)
    const dialog = screen.getByRole('dialog', { name: '照片查看器' })
    expect(dialog).toBeInTheDocument()
    expect(within(dialog).getByText(`1 / ${galleryImages.length}`)).toBeInTheDocument()
    expect(document.body.style.overflow).toBe('hidden')

    await user.keyboard('{ArrowRight}')
    expect(within(dialog).getByText(`2 / ${galleryImages.length}`)).toBeInTheDocument()

    await user.keyboard('{ArrowLeft}')
    expect(within(dialog).getByText(`1 / ${galleryImages.length}`)).toBeInTheDocument()

    await user.keyboard('{Escape}')
    expect(screen.queryByRole('dialog', { name: '照片查看器' })).not.toBeInTheDocument()
    expect(document.body.style.overflow).toBe('')
    expect(document.activeElement).toBe(firstPhoto)
  })
})
