"use client"

import { api } from "@/trpc/react"
import { PlaybackState, Track } from "@spotify/web-api-ts-sdk"
import { createContext, useContext, useState } from "react"
import type { PropsWithChildren } from "react"

export type Progress = number

function useProviderValue() {
    const [context, setContext] = useState<PlaybackState | null>(null)
    const [track, setTrack] = useState<Track | null>()
    const [paused, setPaused] = useState<boolean>(false)
    const [progress, setProgress] = useState<Progress>(0)

    api.player.subscribe.useSubscription(undefined, {
        onData: (event) => {
            if (event.name === "context") {
                const context = event.data as PlaybackState | null
                setTrack((context?.item as Track | null) || null)
                setContext(context as PlaybackState | null)
                setPaused(!context?.is_playing)
            }

            if (event.name === "progress") {
                const progress = event.data as Progress | null
                if (progress === null) return
                setProgress(progress)
            }
        },
    })

    return {
        context,
        track,
        paused,
        progress: progress as Progress,
    }
}

export type Context = ReturnType<typeof useProviderValue>

const SpotifyContext = createContext<Context | undefined>(undefined)
SpotifyContext.displayName = "SpotifyProvider"

export const SpotifyProvider = (props: PropsWithChildren) => {
    const value = useProviderValue()
    return <SpotifyContext.Provider value={value} {...props} />
}

export function useSpotify() {
    const context = useContext(SpotifyContext)
    if (context === undefined) {
        throw new Error(`useSpotify must be used within a SpotifyContext`)
    }
    return context
}
