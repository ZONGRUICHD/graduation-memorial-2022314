import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { TeacherMessageArchive } from './TeacherMessageArchive'

describe('TeacherMessageArchive', () => {
  it('renders verified teacher messages with their attribution', () => {
    render(
      <TeacherMessageArchive
        messages={[{
          id: 'example',
          name: '示例老师',
          subject: '示例学科',
          message: '愿你们一直保有好奇心。',
        }]}
        onClose={vi.fn()}
      />,
    )

    expect(screen.getByRole('dialog', { name: '老师寄语' })).toBeInTheDocument()
    expect(screen.getByText('愿你们一直保有好奇心。')).toBeInTheDocument()
    expect(screen.getByText('示例老师 · 示例学科')).toBeInTheDocument()
  })
})
