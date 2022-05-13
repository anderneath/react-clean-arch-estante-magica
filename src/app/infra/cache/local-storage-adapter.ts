import { CacheStorage } from '@/app/data/protocols/cache'

export class LocalStorageAdapter implements CacheStorage {
  read(key: string): any {
    const value = localStorage.getItem(key)
    return value ? JSON.parse(value) : undefined
  }

  write(key: string, value?: any): void {
    value ? localStorage.setItem(key, JSON.stringify(value)) : this.delete(key)
  }

  delete(key: string): void {
    localStorage.removeItem(key)
  }

  contains(key: string): boolean {
    return !!localStorage.getItem(key)
  }
}
