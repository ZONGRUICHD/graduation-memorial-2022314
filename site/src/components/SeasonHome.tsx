import { useRef, type ButtonHTMLAttributes, type ReactNode } from 'react'

import { featuredGalleryImages } from '../galleryImages'
import {
  gsap,
  motionQueries,
  ScrollTrigger,
  splitGraphemes,
  useGSAP,
} from '../motion'
import { featuredTeacherQuotes } from '../teacherQuotes'

type SeasonHomeProps = {
  introComplete: boolean
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
      if (!button) return

      const mm = gsap.matchMedia()
      mm.add(motionQueries.desktopFinePointerMotion, () => {
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
      })

      return () => mm.revert()
    },
    { scope: buttonRef },
  )

  return (
    <button ref={buttonRef} className={`magnetic-button ${className}`.trim()} {...props}>
      {children}
    </button>
  )
}

function HeroScene({ introComplete, onGallery }: Pick<SeasonHomeProps, 'introComplete' | 'onGallery'>) {
  const rootRef = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const root = rootRef.current
      if (!root) return

      const numberParts = root.querySelectorAll('.hero-scene__digit')
      const number = root.querySelector<HTMLElement>('.hero-scene__number')
      const stage = root.querySelector<HTMLElement>('.hero-scene__stage')
      const imageWrap = root.querySelector<HTMLElement>('.hero-scene__image-wrap')
      const image = root.querySelector<HTMLElement>('.hero-scene__image-wrap img')
      const labels = root.querySelectorAll('.hero-scene__eyebrow, .hero-scene__meta, .hero-scene__scroll')

      const mm = gsap.matchMedia()
      mm.add(motionQueries.allowMotion, () => {
        if (!introComplete) return

        const intro = gsap.timeline({ defaults: { ease: 'power4.out' } })
        intro
          .from(numberParts, { yPercent: 115, rotation: 4, duration: 0.9, stagger: 0.08 })
          .from(image, { scale: 1.12, duration: 1.1 }, '<0.08')
          .from(labels, { y: 22, autoAlpha: 0, duration: 0.55, stagger: 0.08 }, '<0.28')

        return () => intro.kill()
      })

      mm.add(motionQueries.reduceMotion, () => {
        gsap.set([numberParts, number, imageWrap, image, labels], { clearProps: 'all' })
      })

      mm.add(motionQueries.desktopFinePointerMotion, () => {
        if (!imageWrap || !stage) return

        const scrollTimeline = gsap.timeline({
          defaults: { ease: 'none' },
          scrollTrigger: {
            trigger: root,
            start: 'top top',
            end: '+=95%',
            scrub: 0.7,
            pin: stage,
            anticipatePin: 1,
          },
        })

        scrollTimeline
          .to(imageWrap, { yPercent: 8, scale: 1.075 }, 0)
          .to(numberParts[0], { xPercent: -38 }, 0)
          .to(numberParts[1], { yPercent: -24 }, 0)
          .to(numberParts[2], { xPercent: 38 }, 0)
          .to('.hero-scene__meta', { yPercent: -80, autoAlpha: 0 }, 0.35)

        return () => scrollTimeline.kill()
      })

      mm.add(motionQueries.naturalScrollMotion, () => {
        if (!imageWrap || !number) return

        const scrollTimeline = gsap.timeline({
          defaults: { ease: 'none' },
          scrollTrigger: {
            trigger: root,
            start: 'top top',
            end: 'bottom top',
            scrub: 0.35,
          },
        })

        scrollTimeline
          .to(imageWrap, { yPercent: 7, scale: 1.035 }, 0)
          .to(number, { yPercent: -7 }, 0)
          .to('.hero-scene__meta', { y: -18, autoAlpha: 0.35 }, 0.3)

        return () => scrollTimeline.kill()
      })

      mm.add(motionQueries.desktopFinePointerMotion, () => {
        if (!imageWrap) return

        const imageX = gsap.quickTo(imageWrap, 'x', { duration: 0.65, ease: 'power3.out' })
        const imageY = gsap.quickTo(imageWrap, 'y', { duration: 0.65, ease: 'power3.out' })
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

      return () => mm.revert()
    },
    { scope: rootRef, dependencies: [introComplete], revertOnUpdate: true },
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
              srcSet="/assets/hero-classroom-909-portrait-480.webp 480w, /assets/hero-classroom-909-portrait-630.webp 630w"
              sizes="92vw"
            />
            <img
              src="/assets/hero-classroom-909.webp"
              srcSet="/assets/hero-classroom-909-768.webp 768w, /assets/hero-classroom-909.webp 1134w"
              sizes="(max-width: 899px) 142vw, 68vw"
              alt="909班教室门口与九班班牌"
              width="1134"
              height="874"
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
  const statementLines = [
    ['三年不是一条直线。'],
    ['是铃声、黑板、'],
    ['跑道、合照，'],
    ['也是每一次', '并肩向前。'],
  ]

  useGSAP(
    () => {
      const characters = rootRef.current?.querySelectorAll('.manifesto__character')
      if (!characters) return

      const mm = gsap.matchMedia()
      mm.add(motionQueries.allowMotion, () => {
        const tween = gsap.from(characters, {
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
        return () => tween.kill()
      })

      mm.add(motionQueries.reduceMotion, () => {
        gsap.set(characters, { clearProps: 'all' })
      })

      return () => mm.revert()
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
        {statementLines.map((chunks, lineIndex) => (
          <span className="manifesto__line" key={chunks.join('')}>
            {chunks.map((chunk, chunkIndex) => (
              <span
                className={chunkIndex === 1 ? 'manifesto__line-chunk manifesto__mobile-continuation' : 'manifesto__line-chunk'}
                key={chunk}
              >
                {splitGraphemes(chunk).map((character, characterIndex) => (
                  <span
                    className="manifesto__character-wrap"
                    key={`${lineIndex}-${chunkIndex}-${character}-${characterIndex}`}
                  >
                    <span className="manifesto__character">{character}</span>
                  </span>
                ))}
              </span>
            ))}
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

      const mm = gsap.matchMedia()
      mm.add(motionQueries.desktopFinePointerMotion, () => {
        gsap.set(scenes, { autoAlpha: 0 })
        gsap.set(scenes[0], { autoAlpha: 1 })

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
            .to(previous.querySelector('img'), { scale: 1.06, duration: 0.55 })
            .to(previous, { autoAlpha: 0, duration: 0.22 }, '<0.24')
            .fromTo(scene, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.28 }, '>')
        })

        return () => {
          timeline.scrollTrigger?.kill(true)
          timeline.kill()

          // matchMedia can switch while a scrubbed tween is between scenes.
          // Remove the presentation-only state synchronously so the natural
          // mobile layout never inherits an invisible desktop panel.
          scenes.forEach((scene) => {
            scene.style.removeProperty('opacity')
            scene.style.removeProperty('visibility')
            scene.style.removeProperty('transform')
            scene.querySelector('img')?.style.removeProperty('transform')
            if (!scene.style.cssText) scene.removeAttribute('style')
          })
        }
      })

      mm.add(motionQueries.reduceMotion, () => {
        gsap.set(scenes, { clearProps: 'all' })
      })

      mm.add(motionQueries.naturalScrollMotion, () => {
        // Desktop scene crossfades are presentation-only. Reassert the
        // document-flow state whenever the viewport switches to natural
        // scrolling, including while a scrub is mid-transition.
        gsap.set(scenes, { clearProps: 'all' })
        gsap.set(scenes.map((scene) => scene.querySelector('img')).filter(Boolean), { clearProps: 'all' })
      })

      return () => mm.revert()
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
      const root = rootRef.current
      if (!root) return
      const images = root.querySelectorAll('img')
      const mm = gsap.matchMedia()

      mm.add(motionQueries.desktopFinePointerMotion, () => {
        const inside = gsap.fromTo(
          '.track-panel--inside img',
          { yPercent: -5, scale: 1.06 },
          {
            yPercent: 5,
            scale: 1,
            ease: 'none',
            scrollTrigger: { trigger: root, start: 'top bottom', end: 'bottom top', scrub: 0.8 },
          },
        )
        const outside = gsap.fromTo(
          '.track-panel--outside img',
          { yPercent: 5, scale: 1.06 },
          {
            yPercent: -5,
            scale: 1,
            ease: 'none',
            scrollTrigger: { trigger: root, start: 'top bottom', end: 'bottom top', scrub: 0.8 },
          },
        )
        return () => {
          inside.kill()
          outside.kill()
        }
      })

      mm.add(motionQueries.reduceMotion, () => {
        gsap.set(images, { clearProps: 'all' })
      })

      return () => mm.revert()
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
          <div
            className="quote-rail__viewport"
            key={rowIndex}
            role="group"
            tabIndex={0}
            aria-label={`精选名言第 ${rowIndex + 1} 组，聚焦时暂停滚动`}
          >
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
      const items = gsap.utils.toArray<HTMLElement>('.memory-index__item', rootRef.current)
      const mm = gsap.matchMedia()

      mm.add(motionQueries.allowMotion, () => {
        gsap.set(items, { autoAlpha: 0, y: 48 })
        const revealTweens = new Set<gsap.core.Tween>()
        const triggers = ScrollTrigger.batch(items, {
          start: 'top 88%',
          once: true,
          interval: 0.08,
          batchMax: 4,
          onEnter: (batch) => {
            const tween = gsap.to(batch, {
              autoAlpha: 1,
              y: 0,
              duration: 0.75,
              stagger: 0.08,
              ease: 'power3.out',
              onComplete: () => revealTweens.delete(tween),
            })
            revealTweens.add(tween)
          },
        })

        return () => {
          triggers.forEach((trigger) => trigger.kill())
          revealTweens.forEach((tween) => tween.kill())
          revealTweens.clear()
        }
      })

      mm.add(motionQueries.reduceMotion, () => {
        gsap.set(items, { clearProps: 'all' })
      })

      return () => mm.revert()
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
      const digits = rootRef.current?.querySelectorAll('.season-ending__number span')
      if (!digits) return
      const mm = gsap.matchMedia()

      mm.add(motionQueries.allowMotion, () => {
        const tween = gsap.from(digits, {
          yPercent: 110,
          duration: 0.9,
          stagger: 0.08,
          ease: 'power4.out',
          scrollTrigger: { trigger: rootRef.current, start: 'top 70%', once: true },
        })
        return () => tween.kill()
      })

      mm.add(motionQueries.reduceMotion, () => {
        gsap.set(digits, { clearProps: 'all' })
      })

      return () => mm.revert()
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

export function SeasonHome({ introComplete, onOpenQuotes, onGallery }: SeasonHomeProps) {
  return (
    <main className="season-home" id="main-content" tabIndex={-1}>
      <HeroScene introComplete={introComplete} onGallery={onGallery} />
      <Manifesto />
      <MemoryRun />
      <TrackSplit />
      <QuoteRail onOpenQuotes={onOpenQuotes} />
      <MemoryIndex onGallery={onGallery} />
      <SeasonEnding onGallery={onGallery} />
    </main>
  )
}
