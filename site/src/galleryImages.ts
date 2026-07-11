export type GalleryCategory = 'graduation' | 'portrait' | 'campus' | 'activity'

export type GalleryImage = {
  id: string
  src: string
  thumbnailSrc: string
  alt: string
  category: GalleryCategory
  caption: string
}

type RawGalleryImage = Pick<GalleryImage, 'src' | 'alt'>

const rawGalleryImages: RawGalleryImage[] = [
  { src: '/assets/gallery/gallery-031.webp?v=20260525-1', alt: '909 graduation memorial photo 001' },
  { src: '/assets/gallery/gallery-090.webp?v=20260525-1', alt: '909 graduation memorial photo 002' },
  { src: '/assets/gallery/gallery-100.webp?v=20260525-1', alt: '909 graduation memorial photo 003' },
  { src: '/assets/gallery/gallery-036.webp?v=20260525-1', alt: '909 graduation memorial photo 004' },
  { src: '/assets/gallery/gallery-125.webp?v=20260526-1', alt: '909 graduation memorial photo 005' },
  { src: '/assets/gallery/gallery-131.webp?v=20260526-1', alt: '909 graduation memorial photo 006' },
  { src: '/assets/gallery/gallery-096.webp?v=20260525-1', alt: '909 graduation memorial photo 007' },
  { src: '/assets/gallery/gallery-113.webp?v=20260526-1', alt: '909 graduation memorial photo 008' },
  { src: '/assets/gallery/gallery-083.webp?v=20260525-1', alt: '909 graduation memorial photo 009' },
  { src: '/assets/gallery/gallery-108.webp?v=20260526-1', alt: '909 graduation memorial photo 010' },
  { src: '/assets/gallery/gallery-138.webp?v=20260526-1', alt: '909 graduation memorial photo 011' },
  { src: '/assets/gallery/gallery-085.webp?v=20260525-1', alt: '909 graduation memorial photo 012' },
  { src: '/assets/gallery/gallery-068.webp?v=20260525-1', alt: '909 graduation memorial photo 013' },
  { src: '/assets/gallery/gallery-106.webp?v=20260526-1', alt: '909 graduation memorial photo 014' },
  { src: '/assets/gallery/gallery-063.webp?v=20260525-1', alt: '909 graduation memorial photo 015' },
  { src: '/assets/gallery/gallery-052.webp?v=20260525-1', alt: '909 graduation memorial photo 016' },
  { src: '/assets/gallery/gallery-074.webp?v=20260525-1', alt: '909 graduation memorial photo 017' },
  { src: '/assets/gallery/gallery-061.webp?v=20260525-1', alt: '909 graduation memorial photo 018' },
  { src: '/assets/gallery/gallery-101.webp?v=20260526-1', alt: '909 graduation memorial photo 019' },
  { src: '/assets/gallery/gallery-124.webp?v=20260526-1', alt: '909 graduation memorial photo 020' },
  { src: '/assets/gallery/gallery-087.webp?v=20260525-1', alt: '909 graduation memorial photo 021' },
  { src: '/assets/gallery/gallery-015.webp?v=20260525-1', alt: '909 graduation memorial photo 022' },
  { src: '/assets/gallery/gallery-137.webp?v=20260526-1', alt: '909 graduation memorial photo 023' },
  { src: '/assets/gallery/gallery-126.webp?v=20260526-1', alt: '909 graduation memorial photo 024' },
  { src: '/assets/gallery/gallery-078.webp?v=20260525-1', alt: '909 graduation memorial photo 025' },
  { src: '/assets/gallery/gallery-005.webp?v=20260525-1', alt: '909 graduation memorial photo 026' },
  { src: '/assets/gallery/gallery-056.webp?v=20260525-1', alt: '909 graduation memorial photo 027' },
  { src: '/assets/gallery/gallery-062.webp?v=20260525-1', alt: '909 graduation memorial photo 028' },
  { src: '/assets/gallery/gallery-006.webp?v=20260525-1', alt: '909 graduation memorial photo 029' },
  { src: '/assets/gallery/gallery-014.webp?v=20260525-1', alt: '909 graduation memorial photo 030' },
  { src: '/assets/gallery/gallery-019.webp?v=20260525-1', alt: '909 graduation memorial photo 031' },
  { src: '/assets/gallery/gallery-136.webp?v=20260526-1', alt: '909 graduation memorial photo 032' },
  { src: '/assets/gallery/gallery-120.webp?v=20260526-1', alt: '909 graduation memorial photo 033' },
  { src: '/assets/gallery/gallery-003.webp?v=20260525-1', alt: '909 graduation memorial photo 034' },
  { src: '/assets/gallery/gallery-051.webp?v=20260525-1', alt: '909 graduation memorial photo 035' },
  { src: '/assets/gallery/gallery-009.webp?v=20260525-1', alt: '909 graduation memorial photo 036' },
  { src: '/assets/gallery/gallery-097.webp?v=20260525-1', alt: '909 graduation memorial photo 037' },
  { src: '/assets/gallery/gallery-042.webp?v=20260525-1', alt: '909 graduation memorial photo 038' },
  { src: '/assets/gallery/gallery-016.webp?v=20260525-1', alt: '909 graduation memorial photo 039' },
  { src: '/assets/gallery/gallery-002.webp?v=20260525-1', alt: '909 graduation memorial photo 040' },
  { src: '/assets/gallery/gallery-098.webp?v=20260525-1', alt: '909 graduation memorial photo 041' },
  { src: '/assets/gallery/gallery-129.webp?v=20260526-1', alt: '909 graduation memorial photo 042' },
  { src: '/assets/gallery/gallery-086.webp?v=20260525-1', alt: '909 graduation memorial photo 043' },
  { src: '/assets/gallery/gallery-088.webp?v=20260525-1', alt: '909 graduation memorial photo 044' },
  { src: '/assets/gallery/gallery-011.webp?v=20260525-1', alt: '909 graduation memorial photo 045' },
  { src: '/assets/gallery/gallery-069.webp?v=20260525-1', alt: '909 graduation memorial photo 046' },
  { src: '/assets/gallery/gallery-040.webp?v=20260525-1', alt: '909 graduation memorial photo 047' },
  { src: '/assets/gallery/gallery-030.webp?v=20260525-1', alt: '909 graduation memorial photo 048' },
  { src: '/assets/gallery/gallery-070.webp?v=20260525-1', alt: '909 graduation memorial photo 049' },
  { src: '/assets/gallery/gallery-091.webp?v=20260525-1', alt: '909 graduation memorial photo 050' },
  { src: '/assets/gallery/gallery-020.webp?v=20260525-1', alt: '909 graduation memorial photo 051' },
  { src: '/assets/gallery/gallery-043.webp?v=20260525-1', alt: '909 graduation memorial photo 052' },
  { src: '/assets/gallery/gallery-099.webp?v=20260525-1', alt: '909 graduation memorial photo 053' },
  { src: '/assets/gallery/gallery-067.webp?v=20260525-1', alt: '909 graduation memorial photo 054' },
  { src: '/assets/gallery/gallery-117.webp?v=20260526-1', alt: '909 graduation memorial photo 055' },
  { src: '/assets/gallery/gallery-082.webp?v=20260525-1', alt: '909 graduation memorial photo 056' },
  { src: '/assets/gallery/gallery-080.webp?v=20260525-1', alt: '909 graduation memorial photo 057' },
  { src: '/assets/gallery/gallery-115.webp?v=20260526-1', alt: '909 graduation memorial photo 058' },
  { src: '/assets/gallery/gallery-027.webp?v=20260525-1', alt: '909 graduation memorial photo 059' },
  { src: '/assets/gallery/gallery-139.webp?v=20260526-1', alt: '909 graduation memorial photo 060' },
  { src: '/assets/gallery/gallery-029.webp?v=20260525-1', alt: '909 graduation memorial photo 061' },
  { src: '/assets/gallery/gallery-114.webp?v=20260526-1', alt: '909 graduation memorial photo 062' },
  { src: '/assets/gallery/gallery-007.webp?v=20260525-1', alt: '909 graduation memorial photo 063' },
  { src: '/assets/gallery/gallery-075.webp?v=20260525-1', alt: '909 graduation memorial photo 064' },
  { src: '/assets/gallery/gallery-021.webp?v=20260525-1', alt: '909 graduation memorial photo 065' },
  { src: '/assets/gallery/gallery-130.webp?v=20260526-1', alt: '909 graduation memorial photo 066' },
  { src: '/assets/gallery/gallery-032.webp?v=20260525-1', alt: '909 graduation memorial photo 067' },
  { src: '/assets/gallery/gallery-111.webp?v=20260526-1', alt: '909 graduation memorial photo 068' },
  { src: '/assets/gallery/gallery-055.webp?v=20260525-1', alt: '909 graduation memorial photo 069' },
  { src: '/assets/gallery/gallery-065.webp?v=20260525-1', alt: '909 graduation memorial photo 070' },
  { src: '/assets/gallery/gallery-050.webp?v=20260525-1', alt: '909 graduation memorial photo 071' },
  { src: '/assets/gallery/gallery-046.webp?v=20260525-1', alt: '909 graduation memorial photo 072' },
  { src: '/assets/gallery/gallery-081.webp?v=20260525-1', alt: '909 graduation memorial photo 073' },
  { src: '/assets/gallery/gallery-122.webp?v=20260526-1', alt: '909 graduation memorial photo 074' },
  { src: '/assets/gallery/gallery-054.webp?v=20260525-1', alt: '909 graduation memorial photo 075' },
  { src: '/assets/gallery/gallery-073.webp?v=20260525-1', alt: '909 graduation memorial photo 076' },
  { src: '/assets/gallery/gallery-105.webp?v=20260526-1', alt: '909 graduation memorial photo 077' },
  { src: '/assets/gallery/gallery-048.webp?v=20260525-1', alt: '909 graduation memorial photo 078' },
  { src: '/assets/gallery/gallery-018.webp?v=20260525-1', alt: '909 graduation memorial photo 079' },
  { src: '/assets/gallery/gallery-034.webp?v=20260525-1', alt: '909 graduation memorial photo 080' },
  { src: '/assets/gallery/gallery-133.webp?v=20260526-1', alt: '909 graduation memorial photo 081' },
  { src: '/assets/gallery/gallery-084.webp?v=20260525-1', alt: '909 graduation memorial photo 082' },
  { src: '/assets/gallery/gallery-039.webp?v=20260525-1', alt: '909 graduation memorial photo 083' },
  { src: '/assets/gallery/gallery-112.webp?v=20260526-1', alt: '909 graduation memorial photo 084' },
  { src: '/assets/gallery/gallery-104.webp?v=20260526-1', alt: '909 graduation memorial photo 085' },
  { src: '/assets/gallery/gallery-123.webp?v=20260526-1', alt: '909 graduation memorial photo 086' },
  { src: '/assets/gallery/gallery-076.webp?v=20260525-1', alt: '909 graduation memorial photo 087' },
  { src: '/assets/gallery/gallery-037.webp?v=20260525-1', alt: '909 graduation memorial photo 088' },
  { src: '/assets/gallery/gallery-089.webp?v=20260525-1', alt: '909 graduation memorial photo 089' },
  { src: '/assets/gallery/gallery-107.webp?v=20260526-1', alt: '909 graduation memorial photo 090' },
  { src: '/assets/gallery/gallery-093.webp?v=20260525-1', alt: '909 graduation memorial photo 091' },
  { src: '/assets/gallery/gallery-004.webp?v=20260525-1', alt: '909 graduation memorial photo 092' },
  { src: '/assets/gallery/gallery-118.webp?v=20260526-1', alt: '909 graduation memorial photo 093' },
  { src: '/assets/gallery/gallery-012.webp?v=20260525-1', alt: '909 graduation memorial photo 094' },
  { src: '/assets/gallery/gallery-092.webp?v=20260525-1', alt: '909 graduation memorial photo 095' },
  { src: '/assets/gallery/gallery-057.webp?v=20260525-1', alt: '909 graduation memorial photo 096' },
  { src: '/assets/gallery/gallery-041.webp?v=20260525-1', alt: '909 graduation memorial photo 097' },
  { src: '/assets/gallery/gallery-079.webp?v=20260525-1', alt: '909 graduation memorial photo 098' },
  { src: '/assets/gallery/gallery-072.webp?v=20260525-1', alt: '909 graduation memorial photo 099' },
  { src: '/assets/gallery/gallery-026.webp?v=20260525-1', alt: '909 graduation memorial photo 100' },
  { src: '/assets/gallery/gallery-044.webp?v=20260525-1', alt: '909 graduation memorial photo 101' },
  { src: '/assets/gallery/gallery-116.webp?v=20260526-1', alt: '909 graduation memorial photo 102' },
  { src: '/assets/gallery/gallery-045.webp?v=20260525-1', alt: '909 graduation memorial photo 103' },
  { src: '/assets/gallery/gallery-128.webp?v=20260526-1', alt: '909 graduation memorial photo 104' },
  { src: '/assets/gallery/gallery-022.webp?v=20260525-1', alt: '909 graduation memorial photo 105' },
  { src: '/assets/gallery/gallery-049.webp?v=20260525-1', alt: '909 graduation memorial photo 106' },
  { src: '/assets/gallery/gallery-058.webp?v=20260525-1', alt: '909 graduation memorial photo 107' },
  { src: '/assets/gallery/gallery-071.webp?v=20260525-1', alt: '909 graduation memorial photo 108' },
  { src: '/assets/gallery/gallery-028.webp?v=20260525-1', alt: '909 graduation memorial photo 109' },
  { src: '/assets/gallery/gallery-103.webp?v=20260526-1', alt: '909 graduation memorial photo 110' },
  { src: '/assets/gallery/gallery-109.webp?v=20260526-1', alt: '909 graduation memorial photo 111' },
  { src: '/assets/gallery/gallery-064.webp?v=20260525-1', alt: '909 graduation memorial photo 112' },
  { src: '/assets/gallery/gallery-132.webp?v=20260526-1', alt: '909 graduation memorial photo 113' },
  { src: '/assets/gallery/gallery-134.webp?v=20260526-1', alt: '909 graduation memorial photo 114' },
  { src: '/assets/gallery/gallery-024.webp?v=20260525-1', alt: '909 graduation memorial photo 115' },
  { src: '/assets/gallery/gallery-135.webp?v=20260526-1', alt: '909 graduation memorial photo 116' },
  { src: '/assets/gallery/gallery-025.webp?v=20260525-1', alt: '909 graduation memorial photo 117' },
  { src: '/assets/gallery/gallery-047.webp?v=20260525-1', alt: '909 graduation memorial photo 118' },
  { src: '/assets/gallery/gallery-008.webp?v=20260525-1', alt: '909 graduation memorial photo 119' },
  { src: '/assets/gallery/gallery-102.webp?v=20260526-1', alt: '909 graduation memorial photo 120' },
  { src: '/assets/gallery/gallery-095.webp?v=20260525-1', alt: '909 graduation memorial photo 121' },
  { src: '/assets/gallery/gallery-059.webp?v=20260525-1', alt: '909 graduation memorial photo 122' },
  { src: '/assets/gallery/gallery-053.webp?v=20260525-1', alt: '909 graduation memorial photo 123' },
  { src: '/assets/gallery/gallery-010.webp?v=20260525-1', alt: '909 graduation memorial photo 124' },
  { src: '/assets/gallery/gallery-060.webp?v=20260525-1', alt: '909 graduation memorial photo 125' },
  { src: '/assets/gallery/gallery-066.webp?v=20260525-1', alt: '909 graduation memorial photo 126' },
  { src: '/assets/gallery/gallery-035.webp?v=20260525-1', alt: '909 graduation memorial photo 127' },
  { src: '/assets/gallery/gallery-013.webp?v=20260525-1', alt: '909 graduation memorial photo 128' },
  { src: '/assets/gallery/gallery-038.webp?v=20260525-1', alt: '909 graduation memorial photo 129' },
  { src: '/assets/gallery/gallery-001.webp?v=20260525-1', alt: '909 graduation memorial photo 130' },
  { src: '/assets/gallery/gallery-017.webp?v=20260525-1', alt: '909 graduation memorial photo 131' },
  { src: '/assets/gallery/gallery-023.webp?v=20260525-1', alt: '909 graduation memorial photo 132' },
  { src: '/assets/gallery/gallery-127.webp?v=20260526-1', alt: '909 graduation memorial photo 133' },
  { src: '/assets/gallery/gallery-119.webp?v=20260526-1', alt: '909 graduation memorial photo 134' },
  { src: '/assets/gallery/gallery-094.webp?v=20260525-1', alt: '909 graduation memorial photo 135' },
  { src: '/assets/gallery/gallery-110.webp?v=20260526-1', alt: '909 graduation memorial photo 136' },
  { src: '/assets/gallery/gallery-121.webp?v=20260526-1', alt: '909 graduation memorial photo 137' },
]

export const galleryCategories = [
  { value: 'graduation', label: '毕业现场' },
  { value: 'portrait', label: '师生合影' },
  { value: 'campus', label: '校园日常' },
  { value: 'activity', label: '活动瞬间' },
] as const

const graduationPhotos = new Set([
  1, 9, 11, 15, 17, 18, 21, 22, 27, 28, 29, 32, 34, 41, 43, 44, 47, 52, 59, 60, 61, 65, 75, 83, 91, 95, 96, 98, 106, 119, 121, 126,
])

const portraitPhotos = new Set([
  3, 14, 19, 20, 23, 25, 38, 54, 55, 56, 57, 66, 68, 70, 73, 84, 85, 86, 87, 92, 93, 104, 114, 115, 116, 117, 123, 129, 134, 135, 137,
])

const activityPhotos = new Set([
  4, 5, 7, 8, 10, 13, 24, 26, 30, 31, 33, 35, 36, 37, 39, 40, 45, 48, 49, 58, 62, 63, 67, 69, 71, 72, 74, 79, 82, 88, 94, 99, 100, 102, 103, 105, 107, 109, 111, 112, 118, 120, 122, 124, 127, 128, 130, 131, 132, 133, 136,
])

function categoryFor(index: number): GalleryCategory {
  if (graduationPhotos.has(index)) return 'graduation'
  if (portraitPhotos.has(index)) return 'portrait'
  if (activityPhotos.has(index)) return 'activity'
  return 'campus'
}

export const galleryImages: GalleryImage[] = rawGalleryImages.map((image, itemIndex) => {
  const index = itemIndex + 1
  const category = categoryFor(index)
  const categoryLabel = galleryCategories.find((item) => item.value === category)?.label ?? '校园日常'
  const number = String(index).padStart(3, '0')
  const id = image.src.match(/gallery-(\d+)/)?.[1] ?? number

  return {
    ...image,
    id: `gallery-${id}`,
    thumbnailSrc: `/assets/gallery/thumbs/gallery-${id}.webp`,
    alt: `909班毕业纪念照片 ${number}`,
    category,
    caption: `${categoryLabel} · 照片 ${number}`,
  }
})
