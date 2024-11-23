export type LyricEventName = "context" | "progress" | "lyrics"

export type LyricEvent<T> = {
    name: LyricEventName
    data: T
}
