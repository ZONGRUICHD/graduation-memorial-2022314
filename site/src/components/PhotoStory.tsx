type Photo = { src: string; alt: string; caption: string }

export function PhotoStory({ photos }: { photos: Photo[] }) {
  return (
    <section className="story photo-story" aria-label="毕业纪念照片">
      {photos.map((photo) => (
        <figure className="photo-chapter" key={photo.src}>
          <img className="memory-image" src={photo.src} alt={photo.alt} decoding="async" />
          <figcaption>{photo.caption}</figcaption>
        </figure>
      ))}
    </section>
  )
}
