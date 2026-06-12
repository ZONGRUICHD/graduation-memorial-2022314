import type { ApiMode } from './api-client'

export interface RuntimeConfig {
  apiMode: ApiMode
  apiBaseUrl: string
}

const rawMode = import.meta.env.VITE_API_MODE
const productionApiBaseUrl = 'https://api.2022314.xyz'

function normalizeMode(value: string | undefined): ApiMode {
  if (value === 'wsl' || value === 'prod') {
    return value
  }

  return 'mock'
}

const normalizedMode = normalizeMode(rawMode)

export const runtimeConfig: RuntimeConfig = {
  apiMode: normalizedMode,
  apiBaseUrl:
    import.meta.env.VITE_API_BASE_URL ||
    (normalizedMode === 'prod' ? productionApiBaseUrl : 'http://localhost:8787'),
}
