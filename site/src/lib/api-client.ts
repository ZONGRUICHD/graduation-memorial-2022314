import { seededBlessings } from '../data/blessings'
import type { Blessing } from '../types'

export type ApiMode = 'mock' | 'wsl' | 'prod'

export interface BlessingPayload {
  author: string
  role: string
  message: string
}

export interface ApiClientConfig {
  mode: ApiMode
  baseUrl: string
}

export interface ApiClient {
  getBlessings: () => Promise<Blessing[]>
  submitBlessing: (payload: BlessingPayload) => Promise<Blessing>
  getHealth: () => Promise<{ status: string }>
}

function trimSlash(value: string) {
  return value.endsWith('/') ? value.slice(0, -1) : value
}

export function createApiClient(config: ApiClientConfig): ApiClient {
  const baseUrl = trimSlash(config.baseUrl)

  return {
    async getBlessings() {
      if (config.mode === 'mock') {
        return seededBlessings
      }

      try {
        const response = await fetch(`${baseUrl}/api/blessings`)

        if (!response.ok) {
          throw new Error('Failed to load blessings.')
        }

        return response.json() as Promise<Blessing[]>
      } catch {
        return seededBlessings
      }
    },
    async submitBlessing(payload) {
      if (config.mode === 'mock') {
        return {
          id: `mock-${Date.now()}`,
          author: payload.author,
          role: payload.role,
          message: payload.message,
          createdAt: new Date().toISOString().slice(0, 10),
        }
      }

      const response = await fetch(`${baseUrl}/api/blessings`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })

      if (!response.ok) {
        throw new Error('Failed to submit blessing.')
      }

      return response.json() as Promise<Blessing>
    },
    async getHealth() {
      if (config.mode === 'mock') {
        return { status: 'mock-ok' }
      }

      const response = await fetch(`${baseUrl}/api/health`)

      if (!response.ok) {
        throw new Error('Failed to reach API health endpoint.')
      }

      return response.json() as Promise<{ status: string }>
    },
  }
}
