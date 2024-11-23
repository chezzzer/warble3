export type PlayerEventName = "context" | "progress"

export type PlayerEvent<T> = {
    name: PlayerEventName
    data: T
}
