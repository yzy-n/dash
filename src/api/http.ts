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
  const url = path.startsWith('http')
    ? new URL(path)
    : new URL(path, baseUrl || window.location.origin)
  if (params) {
    for (const [k, v] of Object.entries(params)) {
      if (v === null || v === undefined) continue
      url.searchParams.set(k, String(v))
    }
  }
  return url.toString()
}

/* =========================================================
   Token 读取（按你项目实际存储位置修改）
   ========================================================= */
const TOKEN_KEY = 'token'                 // ⚠️ 改这里
const TOKEN_HEADER = 'Authorization'      // ⚠️ 改这里（'token' / 'Admin-Token' / ...）

const getToken = (): string | null => {
  try {
    return (
      localStorage.getItem(TOKEN_KEY) ||
      sessionStorage.getItem(TOKEN_KEY) ||
      null
    )
  } catch {
    return null
  }
}

const withBearer = (name: string, token: string) => {
  return name.toLowerCase() === 'authorization' ? `Bearer ${token}` : token
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

  const token = getToken()

  const res = await fetch(url, {
    method: method ?? (data ? 'POST' : 'GET'),
    headers: {
      ...(data ? { 'Content-Type': 'application/json' } : {}),
      ...(token ? { [TOKEN_HEADER]: withBearer(TOKEN_HEADER, token) } : {}),
      ...(headers ?? {})
    },
    body: data ? JSON.stringify(data) : undefined,
    ...rest
  })

  const contentType = res.headers.get('content-type') ?? ''
  const payload = contentType.includes('application/json') ? await res.json() : await res.text()

  if (!res.ok) {
    const message =
      typeof payload === 'string' ? payload : (payload?.message ?? payload?.msg ?? res.statusText)

    if (res.status === 401 || res.status === 403) {
      try {
        localStorage.removeItem(TOKEN_KEY)
        sessionStorage.removeItem(TOKEN_KEY)
      } catch {}
      // 需要自动跳登录就放开下面这行
      // window.location.href = '/login'
    }

    throw new ApiError(String(message || res.statusText), { status: res.status })
  }

  return payload as T
}

export const requestData = async <T>(path: string, options: RequestOptions = {}): Promise<T> => {
  const envelope = await request<ApiEnvelope<T> | T>(path, options)
  if (!envelope || typeof envelope !== 'object' || !('data' in envelope)) {
    return envelope as T
  }

  if (typeof envelope?.code === 'number' && ![0, 200].includes(envelope.code)) {
    const message = envelope.message ?? envelope.msg ?? '请求失败'
    throw new ApiError(message, { code: envelope.code })
  }
  return envelope.data
}