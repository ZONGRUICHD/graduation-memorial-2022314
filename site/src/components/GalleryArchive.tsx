import { galleryImages } from '../galleryImages'

export function GalleryArchive({ onHome }: { onHome: () => void }) {
  return (
    <main className="yearbook gallery-archive" aria-labelledby="gallery-title">
      <section className="gallery-archive-header gallery-hero">
        <h1 id="gallery-title">909照片档案</h1>
        <p className="gallery-count">{galleryImages.length} 张照片</p>
        <button className="quote-button" type="button" onClick={onHome}>返回封面</button>
      </section>
      <section className="gallery-story" aria-label="909照片档案照片">
        {galleryImages.map((image, index) => (
          <figure className="photo-chapter gallery-chapter" key={image.src}>
            <img
              className="memory-image"
              src={image.src}
              alt={`909班毕业纪念照片 ${String(index + 1).padStart(3, '0')}`}
              loading={index < 2 ? 'eager' : 'lazy'}
              decoding="async"
            />
            <figcaption>照片 {String(index + 1).padStart(3, '0')}</figcaption>
          </figure>
        ))}
      </section>
    </main>
  )
}
