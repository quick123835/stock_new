/**
 * 平台判斷 — shared 內所有「只有某個平台才有」的 API 都要先經過這裡。
 *
 * 注意 isWeb 不代表有 window：Next.js 在伺服器端 render 時也是 web，
 * 但那時沒有 window / document。要碰瀏覽器 API 請用 isBrowser 或 getWindow()。
 */

export type Platform = 'web' | 'app'

type RuntimeGlobals = {
  navigator?: { product?: string }
  window?: unknown
  document?: unknown
}

const runtime = globalThis as RuntimeGlobals

/** React Native 執行環境（iOS / Android） */
export const isApp = runtime.navigator?.product === 'ReactNative'

/** Next.js 網站，包含伺服器端與瀏覽器端 */
export const isWeb = !isApp

/** 真的在瀏覽器裡，window / document 可用 */
export const isBrowser =
  isWeb && typeof runtime.window !== 'undefined' && typeof runtime.document !== 'undefined'

/** Next.js 伺服器端 */
export const isServer = isWeb && !isBrowser

export const platform: Platform = isApp ? 'app' : 'web'

/**
 * 取得 window；不在瀏覽器時回傳 undefined。
 * 用泛型讓呼叫端自己宣告需要的形狀，shared 不必依賴 DOM 型別：
 *
 *   const win = getWindow<{ scrollTo(x: number, y: number): void }>()
 *   win?.scrollTo(0, 0)
 */
export function getWindow<T = unknown>(): T | undefined {
  return isBrowser ? (runtime.window as T) : undefined
}
