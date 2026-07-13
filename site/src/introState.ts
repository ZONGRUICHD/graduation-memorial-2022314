import { prefersReducedMotion } from './motion'

export const INTRO_SESSION_KEY = '909:intro:season-v1'

export function shouldPlayIntro() {
  if (typeof window === 'undefined' || prefersReducedMotion()) return false

  try {
    return window.sessionStorage.getItem(INTRO_SESSION_KEY) !== 'seen'
  } catch {
    return true
  }
}

export function markIntroSeen() {
  try {
    window.sessionStorage.setItem(INTRO_SESSION_KEY, 'seen')
  } catch {
    // Storage can be unavailable in strict privacy modes; the intro still works.
  }
}
