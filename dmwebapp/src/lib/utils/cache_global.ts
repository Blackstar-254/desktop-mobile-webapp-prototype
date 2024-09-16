export function CacheItem(key: string, val: () => any) {
  let tmp_key = key as unknown as keyof typeof globalThis
  if (globalThis[tmp_key]) {
    return globalThis[tmp_key]
  }

  let tmp_this = globalThis as unknown as Record<string, any>
  tmp_this[tmp_key] = val()

  console.log(`caching: ${key}`)
  return CacheItem(key, val)
}
