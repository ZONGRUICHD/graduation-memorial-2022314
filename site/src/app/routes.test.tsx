import { cleanup, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import App from '../App'
import { galleryImages } from '../galleryImages'
import { teacherQuotes } from '../teacherQuotes'

beforeEach(() => {
  vi.stubGlobal('scrollTo', vi.fn())
  window.history.replaceState(null, '', `${window.location.pathname}${window.location.search}`)
})

afterEach(() => {
  cleanup()
  vi.unstubAllGlobals()
  window.history.replaceState(null, '', `${window.location.pathname}${window.location.search}`)
  document.body.style.overflow = ''
})

describe('memorial routes', () => {
  it('renders the cover title, three core photos, blog, and signature', () => {
    render(<App />)

    expect(screen.getByRole('heading', { name: '深圳市龙华区高峰学校2025届909毕业纪念' })).toBeInTheDocument()
    expect(screen.getByText('高峰学校')).toHaveClass('cover-school')
    expect(screen.getAllByRole('img')).toHaveLength(3)
    expect(screen.getByRole('link', { name: '个人博客' })).toHaveAttribute('href', 'https://zongtech.xyz/')
    expect(screen.getByText('Designed by ZongRui')).toBeInTheDocument()
  })

  it('opens the teacher quote dialog and closes with Escape', async () => {
    const user = userEvent.setup()
    render(<App />)
    const trigger = screen.getByRole('button', { name: '教师名言' })
    const brandControl = screen.getByRole('button', { name: '毕业纪念' })
    document.addEventListener('click', () => brandControl.focus(), { capture: true, once: true })

    await user.click(trigger)
    const dialog = screen.getByRole('dialog', { name: '教师名言' })
    expect(dialog).toBeInTheDocument()
    const closeButton = screen.getByRole('button', { name: '关闭教师名言' })
    expect(document.activeElement).toBe(closeButton)
    await user.tab()
    expect(document.activeElement).toBe(closeButton)
    const animationLayer = dialog.querySelector('.quote-animation-layer')
    expect(animationLayer?.querySelectorAll('.quote-stream')).toHaveLength(4)
    const chunks = Array.from({ length: 3 }, (_, streamIndex) =>
      teacherQuotes.filter((_, quoteIndex) => quoteIndex % 3 === streamIndex),
    )
    chunks.forEach((chunk, index) => {
      const stream = dialog.querySelector(`[data-stream="desktop-${index}"]`)
      expect(stream).toBeInTheDocument()
      expect(Array.from(stream?.querySelectorAll('p') ?? []).map((line) => line.textContent)).toEqual([...chunk, ...chunk])
    })
    const mobileStream = dialog.querySelector('[data-stream="mobile"]')
    expect(Array.from(mobileStream?.querySelectorAll('p') ?? []).map((line) => line.textContent)).toEqual([
      ...teacherQuotes,
      ...teacherQuotes,
    ])
    expect(Array.from(dialog.querySelectorAll('.quote-complete-list li')).map((item) => item.textContent)).toEqual(teacherQuotes)
    expect(document.body.style.overflow).toBe('hidden')

    await user.keyboard('{Escape}')
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    await waitFor(() => expect(document.activeElement).toBe(trigger))
  })

  it('navigates to the photo archive and back home', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.click(screen.getByRole('button', { name: '照片档案' }))
    expect(window.location.hash).toBe('#gallery')
    expect(screen.getByRole('heading', { name: '909照片档案' })).toBeInTheDocument()
    expect(screen.getByText(`${galleryImages.length} 张照片`)).toBeInTheDocument()
    expect(screen.getAllByRole('figure')).toHaveLength(galleryImages.length)
    const images = screen.getAllByRole('img')
    expect(images).toHaveLength(galleryImages.length)
    expect(images.map((image) => image.getAttribute('src'))).toEqual(galleryImages.map((image) => image.src))
    expect(images.map((image) => image.getAttribute('alt'))).toEqual(
      galleryImages.map((_, index) => `909班毕业纪念照片 ${String(index + 1).padStart(3, '0')}`),
    )
    expect(images.slice(0, 2).every((image) => image.getAttribute('loading') === 'eager')).toBe(true)
    expect(images.slice(2).every((image) => image.getAttribute('loading') === 'lazy')).toBe(true)

    await user.click(screen.getByRole('button', { name: '返回封面' }))
    expect(window.location.hash).toBe('')
    expect(screen.getByRole('heading', { name: '深圳市龙华区高峰学校2025届909毕业纪念' })).toBeInTheDocument()
  })
})
