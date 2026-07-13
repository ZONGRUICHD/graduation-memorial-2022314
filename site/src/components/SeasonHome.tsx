import { useRef, type ButtonHTMLAttributes, type ReactNode } from 'react'

import { featuredGalleryImages } from '../galleryImages'
import {
  gsap,
  motionQueries,
  prefersReducedMotion,
  ScrollTrigger,
  splitGraphemes,
  useGSAP,
} from '../motion'
import { featuredTeacherQuotes } from '../teacherQuotes'

type SeasonHomeProps = {
  onOpenQuotes: (trigger: HTMLButtonElement) => void
  onGallery: () => void
}

const storyChapters = [
  {
    number: '01',
    kicker: 'THE CEREMONY',
    title: '掌声与夏日',
    caption: '毕业典礼，掌声和夏日一起抵达。',
    src: '/assets/graduation-ceremony-20250701-1280.webp',
    alt: '909毕业典礼现场合影',
    width: 1280,
    height: 960,
    tone: 'cyan',
  },
  {
    number: '02',
    kicker: 'SIDE BY SIDE',
    title: '同桌与笑声',
    caption: '我们把三年的同桌与笑声留在这一帧。',
    src: '/assets/graduation-group.webp',
    alt: '909班级毕业合影',
    width: 1400,
    height: 1050,
    tone: 'blue',
  },
  {
    number: '03',
    kicker: 'OUR CLASSROOM',
    title: '平常也珍贵',
    caption: '熟悉的教室，收藏着最平常也最珍贵的日子。',
    src: '/assets/classroom-memory.webp',
    alt: '909教室里的毕业纪念照',
    width: 1400,
    height: 787,
    tone: 'red',
  },
] as const

type MagneticButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode
}

function MagneticButton({ children, className = '', ...props }: MagneticButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null)

  useGSAP(
    () => {
      const button = buttonRef.current
      if (!button || prefersReducedMotion()) return

      const media = window.matchMedia(motionQueries.finePointer)
      if (!media.matches) return

      const xTo = gsap.quickTo(button, 'x', { duration: 0.35, ease: 'power3.out' })
      const yTo = gsap.quickTo(button, 'y', { duration: 0.35, ease: 'power3.out' })

      const onMove = (event: PointerEvent) => {
        const bounds = button.getBoundingClientRect()
        xTo((event.clientX - bounds.left - bounds.width / 2) * 0.18)
        yTo((event.clientY - bounds.top - bounds.height / 2) * 0.18)
      }
      const onLeave = () => {
        xTo(0)
        yTo(0)
      }

      button.addEventListener('pointermove', onMove)
      button.addEventListener('pointerleave', onLeave)
      return () => {
        button.removeEventListener('pointermove', onMove)
        button.removeEventListener('pointerleave', onLeave)
      }
    },
    { scope: buttonRef },
  )

  return (
    <button ref={buttonRef} className={`magnetic-button ${className}`.trim()} {...props}>
      {children}
    </button>
  )
}

function HeroScene({ onGallery }: Pick<SeasonHomeProps, 'onGallery'>) {
  const rootRef = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const root = rootRef.current
      if (!root) return

      const numberParts = root.querySelectorAll('.hero-scene__digit')
      const image = root.querySelector<HTMLElement>('.hero-scene__image-wrap')
      const labels = root.querySelectorAll('.hero-scene__eyebrow, .hero-scene__meta, .hero-scene__scroll')

      if (prefersReducedMotion()) {
        gsap.set([numberParts, image, labels], { clearProps: 'all' })
        return
      }

      const intro = gsap.timeline({ defaults: { ease: 'power4.out' } })
      intro
        .from(numberParts, { yPercent: 115, rotation: 4, duration: 0.9, stagger: 0.08 })
        .from(image, { scale: 1.12, duration: 1.1 }, '<0.08')
        .from(labels, { y: 22, autoAlpha: 0, duration: 0.55, stagger: 0.08 }, '<0.28')

      const mm = gsap.matchMedia()
      mm.add(motionQueries.desktop, () => {
        const scrollTimeline = gsap.timeline({
          defaults: { ease: 'none' },
          scrollTrigger: {
            trigger: root,
            start: 'top top',
            end: '+=95%',
            scrub: 0.7,
            pin: '.hero-scene__stage',
            anticipatePin: 1,
          },
        })

        scrollTimeline
          .to(image, { yPercent: 8, scale: 1.075 }, 0)
          .to(numberParts[0], { xPercent: -38 }, 0)
          .to(numberParts[1], { yPercent: -24 }, 0)
          .to(numberParts[2], { xPercent: 38 }, 0)
          .to('.hero-scene__meta', { yPercent: -80, autoAlpha: 0 }, 0.35)

        return () => scrollTimeline.kill()
      })

      mm.add(motionQueries.finePointer, () => {
        if (!image) return

        const imageX = gsap.quickTo(image, 'x', { duration: 0.65, ease: 'power3.out' })
        const imageY = gsap.quickTo(image, 'y', { duration: 0.65, ease: 'power3.out' })
        const onPointerMove = (event: PointerEvent) => {
          const bounds = root.getBoundingClientRect()
          imageX(((event.clientX - bounds.left) / bounds.width - 0.5) * 20)
          imageY(((event.clientY - bounds.top) / bounds.height - 0.5) * 14)
        }
        const onPointerLeave = () => {
          imageX(0)
          imageY(0)
        }

        root.addEventListener('pointermove', onPointerMove)
        root.addEventListener('pointerleave', onPointerLeave)
        return () => {
          root.removeEventListener('pointermove', onPointerMove)
          root.removeEventListener('pointerleave', onPointerLeave)
        }
      })

      return () => {
        intro.kill()
        mm.revert()
      }
    },
    { scope: rootRef },
  )

  return (
    <section className="hero-scene" id="top" ref={rootRef} aria-labelledby="page-title">
      <div className="hero-scene__stage">
        <div className="hero-scene__pattern" aria-hidden="true" />
        <p className="hero-scene__eyebrow">SHENZHEN · LONGHUA / CLASS OF 2025</p>
        <div className="hero-scene__image-wrap">
          <picture>
            <source
              media="(max-width: 520px)"
              srcSet="/assets/graduation-ceremony-20250701-portrait-768.webp 768w, /assets/graduation-ceremony-20250701-portrait-864.webp 864w"
              sizes="92vw"
            />
            <img
              src="/assets/graduation-ceremony-20250701-1280.webp"
              srcSet="/assets/graduation-ceremony-20250701-768.webp 768w, /assets/graduation-ceremony-20250701-1280.webp 1280w, /assets/graduation-ceremony-20250701.webp 1600w"
              sizes="(max-width: 899px) 142vw, 68vw"
              alt="909毕业典礼现场合影"
              width="1600"
              height="1201"
              fetchPriority="high"
              decoding="async"
            />
          </picture>
          <span className="hero-scene__image-tag">OUR PEOPLE · OUR SUMMER</span>
        </div>
        <h1 className="sr-only" id="page-title" tabIndex={-1}>
          深圳市龙华区高峰学校2025届909毕业纪念
        </h1>
        <div className="hero-scene__number" aria-hidden="true">
          <span className="hero-scene__digit">9</span>
          <span className="hero-scene__digit">0</span>
          <span className="hero-scene__digit">9</span>
        </div>
        <div className="hero-scene__meta">
          <span>高峰学校</span>
          <strong>2025 GRADUATION MEMORIAL</strong>
          <MagneticButton
            className="hero-scene__cta"
            type="button"
            aria-label="打开完整照片档案，共 137 张"
            onClick={onGallery}
          >
            <span>打开 137 帧记忆</span>
            <i aria-hidden="true">↗</i>
          </MagneticButton>
        </div>
        <div className="hero-scene__scroll" aria-hidden="true">
          <span />
          SCROLL TO REPLAY
        </div>
      </div>
    </section>
  )
}

function Manifesto() {
  const rootRef = useRef<HTMLElement>(null)
  const statement = '三年不是一条直线。是铃声、黑板、跑道、合照，也是每一次并肩向前。'

  useGSAP(
    () => {
      if (prefersReducedMotion()) return

      gsap.from('.manifesto__character', {
        yPercent: 105,
        autoAlpha: 0,
        rotation: 2,
        duration: 0.8,
        ease: 'power4.out',
        stagger: 0.022,
        scrollTrigger: {
          trigger: rootRef.current,
          start: 'top 72%',
          once: true,
        },
      })
    },
    { scope: rootRef },
  )

  return (
    <section className="manifesto" ref={rootRef} aria-labelledby="manifesto-title">
      <div className="section-label">
        <span>00</span>
        <p>写给 909</p>
      </div>
      <h2 className="sr-only" id="manifesto-title">
        写给909
      </h2>
      <p className="manifesto__statement" aria-hidden="true">
        {splitGraphemes(statement).map((character, index) => (
          <span className="manifesto__character-wrap" key={`${character}-${index}`}>
            <span className="manifesto__character">{character}</span>
          </span>
        ))}
      </p>
      <p className="sr-only">{statement}</p>
      <div className="manifesto__closing">
        <span>2022 — 2025</span>
        <p>毕业不是散场，只是下一段赛程开始。</p>
      </div>
    </section>
  )
}

function MemoryRun() {
  const rootRef = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const root = rootRef.current
      if (!root) return
      const scenes = gsap.utils.toArray<HTMLElement>('.memory-scene', root)

      if (prefersReducedMotion() || !window.matchMedia(motionQueries.desktop).matches) {
        gsap.set(scenes, { clearProps: 'all' })
        return
      }

      gsap.set(scenes, { autoAlpha: 0, yPercent: 8 })
      gsap.set(scenes[0], { autoAlpha: 1, yPercent: 0 })

      const timeline = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: root,
          start: 'top top',
          end: '+=240%',
          scrub: 0.8,
          pin: '.memory-run__stage',
          anticipatePin: 1,
        },
      })

      scenes.slice(1).forEach((scene, index) => {
        const previous = scenes[index]
        timeline
          .to(previous.querySelector('img'), { scale: 1.06, duration: 0.7 })
          .to(previous, { autoAlpha: 0, yPercent: -8, duration: 0.35 }, '<0.36')
          .fromTo(scene, { autoAlpha: 0, yPercent: 8 }, { autoAlpha: 1, yPercent: 0, duration: 0.38 }, '<0.1')
      })

      return () => timeline.kill()
    },
    { scope: rootRef },
  )

  return (
    <section className="memory-run" id="story" ref={rootRef} aria-labelledby="story-title">
      <div className="memory-run__stage">
        <div className="memory-run__heading">
          <div className="section-label section-label--light">
            <span>01</span>
            <p>三年三幕</p>
          </div>
          <h2 id="story-title" tabIndex={-1}>把三年，重新播放一次。</h2>
        </div>
        <div className="memory-run__scenes">
          {storyChapters.map((chapter) => (
            <article className="memory-scene" data-tone={chapter.tone} key={chapter.number}>
              <div className="memory-scene__media">
                <img
                  src={chapter.src}
                  alt={chapter.alt}
                  width={chapter.width}
                  height={chapter.height}
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div className="memory-scene__copy">
                <span className="memory-scene__number">{chapter.number}</span>
                <p>{chapter.kicker}</p>
                <h3>{chapter.title}</h3>
                <small>{chapter.caption}</small>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function TrackSplit() {
  const rootRef = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      if (prefersReducedMotion() || !window.matchMedia(motionQueries.desktop).matches) return

      gsap.fromTo(
        '.track-panel--inside img',
        { yPercent: -5, scale: 1.06 },
        {
          yPercent: 5,
          scale: 1,
          ease: 'none',
          scrollTrigger: { trigger: rootRef.current, start: 'top bottom', end: 'bottom top', scrub: 0.8 },
        },
      )
      gsap.fromTo(
        '.track-panel--outside img',
        { yPercent: 5, scale: 1.06 },
        {
          yPercent: -5,
          scale: 1,
          ease: 'none',
          scrollTrigger: { trigger: rootRef.current, start: 'top bottom', end: 'bottom top', scrub: 0.8 },
        },
      )
    },
    { scope: rootRef },
  )

  return (
    <section className="track-split" ref={rootRef} aria-labelledby="track-title">
      <h2 className="sr-only" id="track-title">
        课堂内与课堂外
      </h2>
      <article className="track-panel track-panel--inside">
        <img
          src="/assets/classroom-memory.webp"
          alt="909班熟悉的教室"
          width="1400"
          height="787"
          loading="lazy"
          decoding="async"
        />
        <div className="track-panel__copy">
          <span>ON CLASS</span>
          <h3>课堂内</h3>
          <p>黑板、课桌、窗帘，还有每一声熟悉的“抬头”。</p>
        </div>
      </article>
      <article className="track-panel track-panel--outside">
        <img
          src="/assets/graduation-group.webp"
          alt="909班同学在课堂外留下的合影"
          width="1400"
          height="1050"
          loading="lazy"
          decoding="async"
        />
        <div className="track-panel__copy">
          <span>OFF CLASS</span>
          <h3>课堂外</h3>
          <p>活动、操场、毕业现场，我们一直在同一支队伍里。</p>
        </div>
      </article>
    </section>
  )
}

function QuoteRail({ onOpenQuotes }: Pick<SeasonHomeProps, 'onOpenQuotes'>) {
  const rows = [featuredTeacherQuotes.slice(0, 6), featuredTeacherQuotes.slice(6)]

  return (
    <section className="quote-rail" id="quotes" aria-labelledby="quotes-title">
      <div className="quote-rail__heading">
        <div className="section-label">
          <span>02</span>
          <p>声音档案</p>
        </div>
        <h2 id="quotes-title" tabIndex={-1}>一开口，<br />就回到那间教室。</h2>
        <MagneticButton type="button" onClick={(event) => onOpenQuotes(event.currentTarget)}>
          <span>查看全部 103 条</span>
          <i aria-hidden="true">↗</i>
        </MagneticButton>
      </div>
      <div className="quote-rail__rows" aria-label="精选教师名言">
        {rows.map((row, rowIndex) => (
          <div className="quote-rail__viewport" key={rowIndex}>
            <div className="quote-rail__track" data-direction={rowIndex === 0 ? 'forward' : 'reverse'}>
              {[...row, ...row].map((quote, index) => (
                <blockquote aria-hidden={index >= row.length ? 'true' : undefined} key={`${quote.id}-${index}`}>
                  <p>{quote.text}</p>
                  {quote.author ? <cite>— {quote.author}</cite> : <cite>— 909 课堂</cite>}
                </blockquote>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

function MemoryIndex({ onGallery }: Pick<SeasonHomeProps, 'onGallery'>) {
  const rootRef = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      if (prefersReducedMotion()) return

      const items = gsap.utils.toArray<HTMLElement>('.memory-index__item', rootRef.current)
      gsap.set(items, { autoAlpha: 0, y: 48 })
      ScrollTrigger.batch(items, {
        start: 'top 88%',
        once: true,
        interval: 0.08,
        batchMax: 4,
        onEnter: (batch) => {
          gsap.to(batch, { autoAlpha: 1, y: 0, duration: 0.75, stagger: 0.08, ease: 'power3.out' })
        },
      })
    },
    { scope: rootRef },
  )

  return (
    <section className="memory-index" id="photos" ref={rootRef} aria-labelledby="photos-title">
      <div className="memory-index__heading">
        <div className="section-label section-label--light">
          <span>03</span>
          <p>记忆索引</p>
        </div>
        <h2 id="photos-title" tabIndex={-1}>十二个入口，<br />通向一百三十七帧。</h2>
      </div>
      <div className="memory-index__grid">
        {featuredGalleryImages.map((image, index) => (
          <button
            className="memory-index__item"
            data-layout={String((index % 6) + 1)}
            type="button"
            key={image.id}
            onClick={onGallery}
            aria-label={`打开完整图库：${image.caption}`}
          >
            <span className="memory-index__media">
              <img
                src={image.thumbnailSrc}
                alt={image.alt}
                width={image.thumbnailWidth}
                height={image.thumbnailHeight}
                loading="lazy"
                decoding="async"
              />
            </span>
            <span className="memory-index__meta">
              <strong>{String(index + 1).padStart(2, '0')}</strong>
              <small>{image.caption}</small>
            </span>
          </button>
        ))}
      </div>
      <MagneticButton className="memory-index__all" type="button" onClick={onGallery}>
        <span>进入完整照片档案</span>
        <i aria-hidden="true">137 ↗</i>
      </MagneticButton>
    </section>
  )
}

function SeasonEnding({ onGallery }: Pick<SeasonHomeProps, 'onGallery'>) {
  const rootRef = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      if (prefersReducedMotion()) return
      gsap.from('.season-ending__number span', {
        yPercent: 110,
        duration: 0.9,
        stagger: 0.08,
        ease: 'power4.out',
        scrollTrigger: { trigger: rootRef.current, start: 'top 70%', once: true },
      })
    },
    { scope: rootRef },
  )

  return (
    <footer className="season-ending" id="ending" ref={rootRef}>
      <div className="season-ending__ticker" aria-hidden="true">
        <span>GRADUATION IS NOT THE END · 毕业不是终点 · </span>
        <span>GRADUATION IS NOT THE END · 毕业不是终点 · </span>
      </div>
      <div className="season-ending__number" aria-hidden="true">
        <span>9</span><span>0</span><span>9</span>
      </div>
      <div className="season-ending__copy">
        <p>THE NEXT CHAPTER</p>
        <h2>毕业不是终点。</h2>
        <span>只是我们从同一间教室，出发去往更远的地方。</span>
      </div>
      <div className="season-ending__actions">
        <MagneticButton type="button" onClick={onGallery}>重看 137 帧记忆 ↗</MagneticButton>
        <a href="https://zongtech.xyz/" rel="noopener noreferrer">ZongRui 的个人博客 ↗</a>
      </div>
      <div className="season-ending__credit">
        <span>深圳市龙华区高峰学校 · 2025 届 909</span>
        <span>Designed by ZongRui</span>
      </div>
    </footer>
  )
}

export function SeasonHome({ onOpenQuotes, onGallery }: SeasonHomeProps) {
  return (
    <main className="season-home" id="main-content">
      <HeroScene onGallery={onGallery} />
      <Manifesto />
      <MemoryRun />
      <TrackSplit />
      <QuoteRail onOpenQuotes={onOpenQuotes} />
      <MemoryIndex onGallery={onGallery} />
      <SeasonEnding onGallery={onGallery} />
    </main>
  )
}
