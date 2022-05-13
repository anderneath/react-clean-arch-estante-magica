import { CacheStorage } from '@/app/data/protocols/cache'

export class SessionStorageAdapter implements CacheStorage {
  read(key: string): any {
    const value = sessionStorage.getItem(key)
    return value ? JSON.parse(value) : undefined
  }

  write(key: string, value?: any): void {
    value
      ? sessionStorage.setItem(key, JSON.stringify(value))
      : this.delete(key)
  }

  delete(key: string): void {
    sessionStorage.removeItem(key)
  }

  contains(key: string): boolean {
    return !!sessionStorage.getItem(key)
  }
}
