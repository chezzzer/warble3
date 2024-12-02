import { db } from "@/server/db"
import { PlaybackState, Track } from "@spotify/web-api-ts-sdk"
import EventEmitter from "events"
import { SpotifyPlaybackState } from "./SpotifyPlaybackState"

export default class SpotifyContext {
    public events: EventEmitter = new EventEmitter()

    private state: PlaybackState | null | undefined = undefined
    private spotifyPlaybackState = new SpotifyPlaybackState()

    static make(): SpotifyContext {
        const context = new SpotifyContext()
        return context
    }

    constructor() {}

    public getContext() {
        return this.state
    }

    public getCurrentTrack(): Track | null {
        if (!this.state) {
            return null
        }

        if (this.state.item.type !== "track") {
            return null
        }

        return this.state.item as Track
    }

    public startTracking(interval: number): NodeJS.Timeout {
        this.updateFromPlaybackState()
        return setInterval(() => {
            this.updateFromPlaybackState()
        }, interval)
    }

    private async updateFromPlaybackState(): Promise<void> {
        const state = await this.spotifyPlaybackState.get()

        if (
            this.state === undefined ||
            this.state?.timestamp !== state?.timestamp
        ) {
            this.events.emit("progress", state?.progress_ms ?? 0)
            this.events.emit("change", state)
        }

        if (
            this.state === undefined ||
            this.state?.item?.id !== state?.item?.id
        ) {
            this.events.emit("track", state)
        }

        if (state?.is_playing) {
            this.events.emit("progress", state?.progress_ms ?? 0)
        }

        this.state = state
    }
}
