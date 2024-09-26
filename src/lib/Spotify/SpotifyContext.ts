import { db } from "@/server/db"
import { PlaybackState, Track } from "@spotify/web-api-ts-sdk"
import EventEmitter from "events"

export default class SpotifyContext {
    public events: EventEmitter = new EventEmitter()

    private state: PlaybackState | null = null

    static make(): SpotifyContext {
        const context = new SpotifyContext()
        return context
    }

    constructor() {}

    public getContext(): PlaybackState | null {
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
        this.updateFromDatabase()
        return setInterval(() => {
            this.updateFromDatabase()
        }, interval)
    }

    private async updateFromDatabase(): Promise<void> {
        const spotifyPlaybackState = await db.spotifyPlaybackState.findFirst()

        const state: PlaybackState | null = spotifyPlaybackState
            ? JSON.parse(spotifyPlaybackState.state_json)
            : null

        if (this.state?.timestamp !== state?.timestamp) {
            this.events.emit("change", state)
        }

        this.events.emit("progress", state?.progress_ms ?? 0)

        this.state = state
    }
}

