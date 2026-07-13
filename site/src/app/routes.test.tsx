import { act, cleanup, fireEvent, render, screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import App from '../App'
import { featuredGalleryImages, galleryImages } from '../galleryImages'
import { teacherQuotes } from '../teacherQuotes'

function replaceHash(hash = '') {
  const suffix = hash ? `#${hash}` : ''
  window.history.replaceState(null, '', `${window.location.pathname}${window.location.search}${suffix}`)
}

function installManualAnimationFrames() {
  let nextId = 1
  const callbacks = new Map<number, FrameRequestCallback>()

  vi.spyOn(window, 'requestAnimationFrame').mockImplementation((callback) => {
    const id = nextId
    nextId += 1
    callbacks.set(id, callback)
    return id
  })
  vi.spyOn(window, 'cancelAnimationFrame').mockImplementation((id) => {
    callbacks.delete(id)
  })

  return {
    flush(frameCount = 1) {
      for (let frame = 0; frame < frameCount; frame += 1) {
        const pending = Array.from(callbacks.values())
        callbacks.clear()
        act(() => pending.forEach((callback) => callback(performance.now())))
      }
    },
  }
}

beforeEach(() => {
  replaceHash()
})

afterEach(() => {
  cleanup()
  vi.restoreAllMocks()
  replaceHash()
})

describe('909 memorial routes', () => {
  it('renders the complete home story and the twelve featured thumbnails', () => {
    render(<App />)

    expect(screen.getByRole('heading', { name: '深圳市龙华区高峰学校2025届909毕业纪念' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: '写给909' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: '把三年，重新播放一次。' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: '课堂内与课堂外' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /一开口/ })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /十二个入口/ })).toBeInTheDocument()

    const featuredButtons = screen.getAllByRole('button', { name: /^打开完整图库：/ })
    expect(featuredButtons).toHaveLength(12)
    expect(featuredButtons.map((button) => within(button).getByRole('img').getAttribute('src'))).toEqual(
      featuredGalleryImages.map((image) => image.thumbnailSrc),
    )
    expect(screen.getAllByRole('link', { name: /个人博客/ })[0]).toHaveAttribute('href', 'https://zongtech.xyz/')
    expect(screen.getByText('Designed by ZongRui')).toBeInTheDocument()
  })

  it('opens all structured teacher quotes and restores focus after Escape', async () => {
    const user = userEvent.setup()
    render(<App />)
    const trigger = screen.getByRole('button', { name: '查看全部 103 条' })

    await user.click(trigger)

    const dialog = screen.getByRole('dialog', { name: /教师名言/ })
    const closeButton = within(dialog).getByRole('button', { name: '关闭教师名言' })
    expect(closeButton).toHaveFocus()
    expect(document.body).toHaveAttribute('data-modal-open', 'true')
    expect(document.body.style.overflow).toBe('hidden')

    const quoteItems = dialog.querySelectorAll('.quote-complete-item')
    expect(quoteItems).toHaveLength(teacherQuotes.length)
    expect(Array.from(quoteItems, (item) => item.getAttribute('data-quote-id'))).toEqual(
      teacherQuotes.map((quote) => quote.id),
    )
    expect(quoteItems[0]).toHaveTextContent(teacherQuotes[0].text)
    expect(quoteItems[0]).toHaveTextContent(teacherQuotes[0].author ?? '')
    expect(quoteItems[quoteItems.length - 1]).toHaveTextContent(teacherQuotes.at(-1)?.text ?? '')

    await user.tab()
    expect(closeButton).toHaveFocus()
    await user.keyboard('{Escape}')

    expect(screen.queryByRole('dialog', { name: /教师名言/ })).not.toBeInTheDocument()
    await waitFor(() => expect(trigger).toHaveFocus())
    expect(document.body).not.toHaveAttribute('data-modal-open')
  })

  it('supports direct gallery hashes and returns to the clean home URL', async () => {
    const user = userEvent.setup()
    replaceHash('gallery')
    render(<App />)

    expect(screen.getByRole('heading', { name: /909\s*照片档案/ })).toBeInTheDocument()
    expect(screen.getByText(`${galleryImages.length} 张照片`)).toBeInTheDocument()
    expect(screen.getAllByRole('figure')).toHaveLength(galleryImages.length)

    await user.click(screen.getAllByRole('button', { name: '返回首页' }).at(-1)!)

    expect(window.location.hash).toBe('')
    expect(screen.getByRole('heading', { name: '深圳市龙华区高峰学校2025届909毕业纪念' })).toBeInTheDocument()
  })

  it('navigates through the full-screen menu, closes with Escape, and reacts to hash history', async () => {
    const user = userEvent.setup()
    render(<App />)
    const menuTrigger = screen.getByRole('button', { name: '打开网站目录' })

    await user.click(menuTrigger)
    const menu = screen.getByRole('dialog', { name: '网站目录' })
    await waitFor(() => expect(within(menu).getByRole('button', { name: '关闭网站目录' })).toHaveFocus())
    expect(document.body.style.overflow).toBe('hidden')

    await user.keyboard('{Escape}')
    expect(screen.queryByRole('dialog', { name: '网站目录' })).not.toBeInTheDocument()
    await waitFor(() => expect(menuTrigger).toHaveFocus())

    await user.click(menuTrigger)
    await user.click(within(screen.getByRole('dialog', { name: '网站目录' })).getByRole('button', { name: /三年三幕/ }))
    expect(window.location.hash).toBe('#story')
    await waitFor(() => expect(screen.getByRole('heading', { name: '把三年，重新播放一次。' })).toHaveFocus())

    act(() => {
      replaceHash('photos')
      window.dispatchEvent(new PopStateEvent('popstate'))
    })
    await waitFor(() => expect(screen.getByRole('heading', { name: /十二个入口/ })).toHaveFocus())
  })

  it('does not let delayed route focus escape a menu opened immediately', () => {
    const frames = installManualAnimationFrames()
    render(<App />)

    fireEvent.click(screen.getByRole('button', { name: '打开网站目录' }))
    const menu = screen.getByRole('dialog', { name: '网站目录' })
    frames.flush(4)

    expect(within(menu).getByRole('button', { name: '关闭网站目录' })).toHaveFocus()
  })

  it('keeps immediate lightbox focus and restores its trigger after Escape', () => {
    const frames = installManualAnimationFrames()
    replaceHash('gallery')
    render(<App />)

    const firstPhoto = screen.getAllByRole('button', { name: /查看照片/ })[0]
    firstPhoto.focus()
    fireEvent.click(firstPhoto)
    const dialog = screen.getByRole('dialog', { name: '照片查看器' })
    const closeButton = within(dialog).getByRole('button', { name: '关闭照片查看器' })

    frames.flush(4)
    expect(closeButton).toHaveFocus()

    fireEvent.keyDown(document, { key: 'Escape' })
    frames.flush(2)
    expect(screen.queryByRole('dialog', { name: '照片查看器' })).not.toBeInTheDocument()
    expect(firstPhoto).toHaveFocus()
  })
})
