import { prefersReducedMotion } from './motion'

export function shouldPlayIntro() {
  if (typeof window === 'undefined' || prefersReducedMotion()) return false
  return true
}
