import { describe, expect, it } from 'vitest'

import { prefersReducedMotion, splitGraphemes } from './motion'
import { setReducedMotionForTest } from './test/setup'

describe('motion accessibility helpers', () => {
  it('reads the reduced-motion media preference', () => {
    setReducedMotionForTest(true)
    expect(prefersReducedMotion()).toBe(true)

    setReducedMotionForTest(false)
    expect(prefersReducedMotion()).toBe(false)
  })

  it('segments Chinese copy and compound emoji by grapheme', () => {
    expect(splitGraphemes('909毕业')).toEqual(['9', '0', '9', '毕', '业'])
    expect(splitGraphemes('👩‍🎓出发')).toEqual(['👩‍🎓', '出', '发'])
  })
})
