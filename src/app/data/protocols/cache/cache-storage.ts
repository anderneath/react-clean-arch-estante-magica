export interface CacheStorage {
  read: (key: string) => any
  write: (key: string, value: any) => void
  delete: (key: string) => void
  contains: (key: string) => boolean
}
