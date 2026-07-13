import { expect, test, type Page } from '@playwright/test'

const homeHeadingName = '深圳市龙华区高峰学校2025届909毕业纪念'

async function openHome(page: Page) {
  await page.goto('/', { waitUntil: 'domcontentloaded' })
  const heading = page.getByRole('heading', { name: homeHeadingName })
  await expect(heading).toBeAttached()
  await expect(heading).toBeFocused()
  return heading
}

async function openGallery(page: Page) {
  await page.goto('/#gallery', { waitUntil: 'domcontentloaded' })
  const heading = page.getByRole('heading', { name: /909\s*照片档案/ })
  await expect(heading).toBeAttached()
  await expect(heading).toBeFocused()
  return heading
}

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => {
    window.sessionStorage.setItem('909:intro:season-v1', 'seen')
  })
})

test('home exposes the complete story and twelve memory-index entries', async ({ page }) => {
  await openHome(page)

  await expect(page.getByRole('heading', { name: '把三年，重新播放一次。' })).toBeAttached()
  await expect(page.getByRole('heading', { name: /十二个入口/ })).toBeAttached()
  const featuredItems = page.locator('.memory-index__item')
  await expect(featuredItems).toHaveCount(12)
  await expect(featuredItems.first()).toHaveAttribute('aria-label', /^打开完整图库：/)
  await expect(featuredItems.first().locator('img')).toHaveAttribute('src', /\/assets\/gallery\/thumbs\/gallery-\d+\.webp$/)
  await expect(page.getByRole('link', { name: /个人博客/ }).first()).toHaveAttribute('href', 'https://zongtech.xyz/')
})

test('menu traps focus, closes with Escape, and routes to a home chapter', async ({ page }) => {
  await openHome(page)
  const trigger = page.getByRole('button', { name: '打开网站目录' })

  await trigger.click()
  const menu = page.getByRole('dialog', { name: '网站目录' })
  await expect(menu).toBeVisible()
  await expect(menu.getByRole('button', { name: '关闭网站目录' })).toBeFocused()

  await page.keyboard.press('Escape')
  await expect(menu).toBeHidden()
  await expect(trigger).toBeFocused()

  await trigger.click()
  await menu.getByRole('button', { name: /三年三幕/ }).click()
  await expect(page).toHaveURL(/#story$/)
  await expect(page.getByRole('heading', { name: '把三年，重新播放一次。' })).toBeFocused()
})

test('direct gallery route keeps thumbnail order and the lightbox uses originals', async ({ page }) => {
  await openGallery(page)

  const photoButtons = page.getByRole('button', { name: /查看照片/ })
  const thumbnails = page.locator('.gallery-grid img')
  await expect(photoButtons).toHaveCount(137)
  await expect(thumbnails).toHaveCount(137)
  await expect(thumbnails.first()).toHaveAttribute('src', /\/assets\/gallery\/thumbs\/gallery-\d+\.webp$/)

  const firstPhoto = photoButtons.first()
  await firstPhoto.click()
  const lightbox = page.getByRole('dialog', { name: '照片查看器' })
  await expect(lightbox).toBeVisible()
  await expect(lightbox.getByRole('img')).toHaveAttribute('src', /\/assets\/gallery\/gallery-\d+\.webp/)
  await expect(lightbox.getByText('1 / 137', { exact: true })).toBeVisible()
  await expect(lightbox.getByRole('button', { name: '关闭照片查看器' })).toBeFocused()

  await page.keyboard.press('ArrowRight')
  await expect(lightbox.getByText('2 / 137', { exact: true })).toBeVisible()
  await page.keyboard.press('Escape')
  await expect(lightbox).toBeHidden()
  await expect(firstPhoto).toBeFocused()
})

test('lightbox swipe advances and reverses on touch @touch', async ({ page }) => {
  await openGallery(page)
  await page.getByRole('button', { name: /查看照片/ }).first().click()

  const lightbox = page.getByRole('dialog', { name: '照片查看器' })
  const stage = lightbox.locator('.photo-lightbox-stage')
  await expect(lightbox.getByText('1 / 137', { exact: true })).toBeVisible()

  await stage.evaluate((element) => {
    const start = new Touch({ identifier: 1, target: element, clientX: 320, clientY: 280 })
    const end = new Touch({ identifier: 1, target: element, clientX: 90, clientY: 285 })
    element.dispatchEvent(new TouchEvent('touchstart', {
      bubbles: true,
      cancelable: true,
      touches: [start],
      changedTouches: [start],
    }))
    element.dispatchEvent(new TouchEvent('touchend', {
      bubbles: true,
      cancelable: true,
      changedTouches: [end],
    }))
  })
  await expect(lightbox.getByText('2 / 137', { exact: true })).toBeVisible()

  await stage.evaluate((element) => {
    const start = new Touch({ identifier: 2, target: element, clientX: 90, clientY: 280 })
    const end = new Touch({ identifier: 2, target: element, clientX: 320, clientY: 285 })
    element.dispatchEvent(new TouchEvent('touchstart', {
      bubbles: true,
      cancelable: true,
      touches: [start],
      changedTouches: [start],
    }))
    element.dispatchEvent(new TouchEvent('touchend', {
      bubbles: true,
      cancelable: true,
      changedTouches: [end],
    }))
  })
  await expect(lightbox.getByText('1 / 137', { exact: true })).toBeVisible()
})

test('browser back and forward preserve the gallery hash route', async ({ page }) => {
  await openHome(page)

  await page.getByRole('button', { name: /打开完整照片档案/ }).click()
  await expect(page).toHaveURL(/#gallery$/)
  await expect(page.getByRole('heading', { name: /909\s*照片档案/ })).toBeFocused()

  await page.goBack()
  await expect(page).not.toHaveURL(/#gallery$/)
  await expect(page.getByRole('heading', { name: homeHeadingName })).toBeFocused()

  await page.goForward()
  await expect(page).toHaveURL(/#gallery$/)
  await expect(page.getByRole('heading', { name: /909\s*照片档案/ })).toBeFocused()
})

test('home and gallery never create horizontal page overflow', async ({ page }) => {
  const hasNoHorizontalOverflow = () => page.evaluate(() => (
    document.documentElement.scrollWidth <= window.innerWidth + 1
  ))

  await page.goto('/', { waitUntil: 'domcontentloaded' })
  await expect.poll(hasNoHorizontalOverflow).toBe(true)

  await page.goto('/#gallery', { waitUntil: 'domcontentloaded' })
  await expect.poll(hasNoHorizontalOverflow).toBe(true)
})

test('reduced motion keeps content available without intro or pinned spacers @reduced', async ({ page }) => {
  await openHome(page)

  await expect.poll(() => page.evaluate(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches)).toBe(true)
  await expect(page.locator('.intro-sequence')).toHaveCount(0)
  await expect(page.locator('.pin-spacer')).toHaveCount(0)
  await expect(page.locator('.memory-index__item')).toHaveCount(12)

  await page.getByRole('button', { name: '打开网站目录' }).click()
  await page.getByRole('dialog', { name: '网站目录' }).getByRole('button', { name: /记忆索引/ }).click()
  await expect(page).toHaveURL(/#photos$/)
  await expect(page.getByRole('heading', { name: /十二个入口/ })).toBeFocused()
})
