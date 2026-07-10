import { PhotoStory } from './PhotoStory'

const coverPhotos = [
  {
    src: '/assets/graduation-ceremony-20250701.webp',
    alt: '909毕业典礼现场合影',
    caption: '毕业典礼，掌声和夏日一起抵达。',
  },
  {
    src: '/assets/graduation-group.webp',
    alt: '909班级毕业合影',
    caption: '我们把三年的同桌与笑声留在这一帧。',
  },
  {
    src: '/assets/classroom-memory.webp',
    alt: '909教室里的毕业纪念照',
    caption: '熟悉的教室，收藏着最平常也最珍贵的日子。',
  },
]

export function YearbookCover({ onQuotes, onGallery }: { onQuotes: (trigger: HTMLButtonElement) => void; onGallery: () => void }) {
  return (
    <main className="yearbook cover" aria-labelledby="page-title">
      <section className="cover-chapter hero-section">
        <h1 id="page-title" aria-label="深圳市龙华区高峰学校2025届909毕业纪念">
          <span className="title-line">深圳市龙华区<span className="cover-school">高峰学校</span></span>
          <span className="title-line">2025届909毕业纪念</span>
        </h1>
      </section>
      <PhotoStory photos={coverPhotos} />
      <section className="yearbook-actions quote-control" aria-label="纪念册操作">
        <button className="quote-button" type="button" onClick={(event) => onQuotes(event.currentTarget)}>教师名言</button>
        <button className="quote-button" type="button" onClick={onGallery}>照片档案</button>
      </section>
    </main>
  )
}
