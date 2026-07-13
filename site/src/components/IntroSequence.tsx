import { useRef, useState } from 'react'

import { gsap, prefersReducedMotion, useGSAP } from '../motion'

const INTRO_SESSION_KEY = '909:intro:season-v1'

function shouldPlayIntro() {
  if (typeof window === 'undefined' || prefersReducedMotion()) return false

  try {
    return window.sessionStorage.getItem(INTRO_SESSION_KEY) !== 'seen'
  } catch {
    return true
  }
}

export function IntroSequence() {
  const rootRef = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(shouldPlayIntro)

  useGSAP(
    (_context, contextSafe) => {
      if (!visible) return

      try {
        window.sessionStorage.setItem(INTRO_SESSION_KEY, 'seen')
      } catch {
        // Storage can be unavailable in strict privacy modes; the intro still works.
      }

      const finish = contextSafe
        ? contextSafe(() => setVisible(false))
        : () => setVisible(false)
      const hardStop = window.setTimeout(finish, 900)
      const timeline = gsap.timeline({
        defaults: { ease: 'power3.inOut' },
        onComplete: finish,
      })

      timeline
        .fromTo('.intro-sequence__bar', { scaleX: 0 }, { scaleX: 1, duration: 0.32, stagger: 0.06 })
        .fromTo('.intro-sequence__mark', { yPercent: 115 }, { yPercent: 0, duration: 0.34 }, '<0.08')
        .to('.intro-sequence__mark', { yPercent: -115, duration: 0.26 }, '+=0.04')
        .to('.intro-sequence', { yPercent: -100, duration: 0.36 }, '<')

      return () => {
        window.clearTimeout(hardStop)
        timeline.kill()
      }
    },
    { scope: rootRef, dependencies: [visible], revertOnUpdate: true },
  )

  if (!visible) return null

  return (
    <div className="intro-sequence" ref={rootRef} aria-hidden="true">
      <div className="intro-sequence__bars">
        <span className="intro-sequence__bar" />
        <span className="intro-sequence__bar" />
        <span className="intro-sequence__bar" />
      </div>
      <div className="intro-sequence__crop">
        <span className="intro-sequence__mark">909</span>
      </div>
      <span className="intro-sequence__caption">THE NEXT CHAPTER IS LOADING</span>
    </div>
  )
}
