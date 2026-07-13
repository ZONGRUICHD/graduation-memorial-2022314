import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(useGSAP, ScrollTrigger)

export const motionQueries = {
  desktopFinePointer: '(min-width: 900px) and (hover: hover) and (pointer: fine)',
  naturalScroll: '(max-width: 899px), (hover: none) and (pointer: coarse)',
  reduceMotion: '(prefers-reduced-motion: reduce)',
} as const

export function prefersReducedMotion() {
  return typeof window !== 'undefined' && window.matchMedia(motionQueries.reduceMotion).matches
}

export function supportsDesktopFinePointerMotion() {
  return typeof window !== 'undefined'
    && window.matchMedia(motionQueries.desktopFinePointer).matches
}

export function splitGraphemes(value: string) {
  if (typeof Intl !== 'undefined' && 'Segmenter' in Intl) {
    const segmenter = new Intl.Segmenter('zh-CN', { granularity: 'grapheme' })
    return Array.from(segmenter.segment(value), ({ segment }) => segment)
  }

  return Array.from(value)
}

export { gsap, ScrollTrigger, useGSAP }
