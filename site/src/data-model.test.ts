import { describe, expect, it } from 'vitest'
import {
  featuredGalleryImages,
  galleryCategories,
  galleryImages,
  type GalleryCategory,
} from './galleryImages'
import { featuredTeacherQuotes, teacherQuotes } from './teacherQuotes'

describe('gallery image data', () => {
  it('keeps the curated 137-photo archive with stable unique IDs and dimensions', () => {
    expect(galleryImages).toHaveLength(137)
    expect(new Set(galleryImages.map((image) => image.id)).size).toBe(137)
    expect(
      galleryImages.every(
        (image) =>
          image.width > 0 &&
          image.height > 0 &&
          image.thumbnailWidth > 0 &&
          image.thumbnailHeight > 0,
      ),
    ).toBe(true)

    expect(galleryImages.find((image) => image.id === 'gallery-001')).toMatchObject({
      width: 1500,
      height: 1000,
      thumbnailWidth: 750,
      thumbnailHeight: 500,
    })
    expect(galleryImages.find((image) => image.id === 'gallery-094')).toMatchObject({
      width: 619,
      height: 1100,
      thumbnailWidth: 619,
      thumbnailHeight: 1100,
    })
    expect(galleryImages.find((image) => image.id === 'gallery-085')).toMatchObject({
      src: '/assets/gallery/gallery-085.webp?v=20260714-1',
      thumbnailSrc: '/assets/gallery/thumbs/gallery-085.webp?v=20260714-1',
      width: 1467,
      height: 1100,
      thumbnailWidth: 750,
      thumbnailHeight: 562,
    })
  })

  it('features exactly the first three photos in each category', () => {
    expect(featuredGalleryImages).toHaveLength(12)

    for (const { value } of galleryCategories) {
      const category = value as GalleryCategory
      const expectedIds = galleryImages
        .filter((image) => image.category === category)
        .slice(0, 3)
        .map((image) => image.id)
      const featuredIds = featuredGalleryImages
        .filter((image) => image.category === category)
        .map((image) => image.id)

      expect(featuredIds).toEqual(expectedIds)
    }
  })
})

describe('teacher quote data', () => {
  it('keeps all 103 quotes and parses only trailing attributions', () => {
    expect(teacherQuotes).toHaveLength(103)
    expect(new Set(teacherQuotes.map((quote) => quote.id)).size).toBe(103)
    expect(teacherQuotes[0]).toMatchObject({
      id: 'quote-001',
      text: '人才！',
      author: 'lgh',
    })
    expect(teacherQuotes[6]).toMatchObject({
      id: 'quote-007',
      text: '栓掉！！',
      author: null,
    })
    expect(teacherQuotes.at(-1)).toMatchObject({
      id: 'quote-103',
      text: 'XXX，快回去，要下雨了！',
      author: null,
    })
  })

  it('exposes the fixed featured quote selection in archive order', () => {
    expect(featuredTeacherQuotes.map((quote) => quote.id)).toEqual([
      'quote-001',
      'quote-008',
      'quote-036',
      'quote-041',
      'quote-045',
      'quote-050',
      'quote-052',
      'quote-056',
      'quote-065',
      'quote-069',
      'quote-084',
      'quote-102',
    ])
  })
})
