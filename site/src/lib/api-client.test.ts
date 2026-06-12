import { afterEach, describe, expect, it, vi } from 'vitest'

import { seededBlessings } from '../data/blessings'
import { createApiClient } from './api-client'

describe('createApiClient', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('returns seeded blessings in mock mode', async () => {
    const client = createApiClient({
      mode: 'mock',
      baseUrl: 'http://localhost:8787',
    })

    await expect(client.getBlessings()).resolves.toEqual(expect.arrayContaining(seededBlessings))
  })

  it('falls back to seeded blessings when the remote API is unavailable', async () => {
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('network unavailable')))

    const client = createApiClient({
      mode: 'prod',
      baseUrl: 'https://api.2022314.xyz',
    })

    await expect(client.getBlessings()).resolves.toEqual(seededBlessings)
  })

  it('posts blessing submissions to the configured WSL endpoint', async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => seededBlessings[0],
    })

    vi.stubGlobal('fetch', fetchMock)

    const client = createApiClient({
      mode: 'wsl',
      baseUrl: 'http://localhost:8787',
    })

    const payload = {
      author: 'Visitor',
      role: 'Student',
      message: 'Wishing everyone a bright future.',
    }

    await expect(client.submitBlessing(payload)).resolves.toEqual(seededBlessings[0])
    expect(fetchMock).toHaveBeenCalledWith(
      'http://localhost:8787/api/blessings',
      expect.objectContaining({
        method: 'POST',
      }),
    )
  })
})
