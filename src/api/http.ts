export type ApiEnvelope<T> = {
  code: number
  message?: string
  msg?: string
  data: T
}

export type RequestOptions = Omit<RequestInit, 'body' | 'headers'> & {
  params?: Record<string, string | number | boolean | null | undefined>
  data?: unknown
  headers?: Record<string, string>
}

const baseUrl = (import.meta.env.VITE_API_BASE_URL as string | undefined) ?? ''

const buildUrl = (path: string, params?: RequestOptions['params']) => {
  const url = path.startsWith('http') ? new URL(path) : new URL(path, baseUrl || window.location.origin)
  if (params) {
    for (const [k, v] of Object.entries(params)) {
      if (v === null || v === undefined) continue
      url.searchParams.set(k, String(v))
    }
  }
  return url.toString()
}

export class ApiError extends Error {
  code?: number
  status?: number

  constructor(message: string, opts?: { code?: number; status?: number }) {
    super(message)
    this.name = 'ApiError'
    this.code = opts?.code
    this.status = opts?.status
  }
}

export const request = async <T>(path: string, options: RequestOptions = {}): Promise<T> => {
  const { params, data, headers, method, ...rest } = options
  const url = buildUrl(path, params)

  const res = await fetch(url, {
    method: method ?? (data ? 'POST' : 'GET'),
    headers: {
      ...(data ? { 'Content-Type': 'application/json' } : {}),
      ...(headers ?? {})
    },
    body: data ? JSON.stringify(data) : undefined,
    ...rest
  })

  const contentType = res.headers.get('content-type') ?? ''
  const payload = contentType.includes('application/json') ? await res.json() : await res.text()

  if (!res.ok) {
    const message = typeof payload === 'string' ? payload : (payload?.message ?? payload?.msg ?? res.statusText)
    throw new ApiError(String(message || res.statusText), { status: res.status })
  }

  return payload as T
}

export const requestData = async <T>(path: string, options: RequestOptions = {}): Promise<T> => {
  const envelope = await request<ApiEnvelope<T>>(path, options)
  if (typeof envelope?.code === 'number' && envelope.code !== 0) {
    const message = envelope.message ?? envelope.msg ?? '请求失败'
    throw new ApiError(message, { code: envelope.code })
  }
  return envelope.data
}
