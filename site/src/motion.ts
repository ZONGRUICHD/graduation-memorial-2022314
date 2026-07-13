import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(useGSAP, ScrollTrigger)

export const motionQueries = {
  desktop: '(min-width: 900px)',
  mobile: '(max-width: 899px)',
  finePointer: '(hover: hover) and (pointer: fine)',
  reduceMotion: '(prefers-reduced-motion: reduce)',
} as const

export function prefersReducedMotion() {
  return typeof window !== 'undefined' && window.matchMedia(motionQueries.reduceMotion).matches
}

export function splitGraphemes(value: string) {
  if (typeof Intl !== 'undefined' && 'Segmenter' in Intl) {
    const segmenter = new Intl.Segmenter('zh-CN', { granularity: 'grapheme' })
    return Array.from(segmenter.segment(value), ({ segment }) => segment)
  }

  return Array.from(value)
}

export { gsap, ScrollTrigger, useGSAP }
