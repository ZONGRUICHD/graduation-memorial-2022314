import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import App from '../App'

describe('App', () => {
  it('renders the single-page 909 graduation memorial', () => {
    render(<App />)

    expect(
      screen.getByRole('heading', {
        name: '深圳市龙华区高峰学校2025届909毕业纪念',
      }),
    ).toBeInTheDocument()
    expect(screen.getByRole('link', { name: '个人博客' })).toHaveAttribute(
      'href',
      'https://zongtech.xyz/',
    )
    expect(screen.getAllByRole('img')).toHaveLength(3)
    expect(screen.getByText('Designed by ZongRui')).toBeInTheDocument()
  })
})


