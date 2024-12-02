export interface CacheRepo<T> {
    get(): Promise<T | null>
    set(value: T): Promise<void>
    clear(): Promise<void>
}

export interface KeyedCacheRepo<T> {
    get(key: string): Promise<T | null>
    set(key: string, value: T): Promise<void>
    clear(key: string): Promise<void>
}
