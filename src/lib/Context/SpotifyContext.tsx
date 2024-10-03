"use client"

import { api } from "@/trpc/react"
import { PlaybackState, Track } from "@spotify/web-api-ts-sdk"
import { createContext, useContext, useState } from "react"
import type { PropsWithChildren } from "react"

function useProviderValue() {
    const [context, setContext] = useState<PlaybackState | null>(null)
    const [track, setTrack] = useState<Track | null>()
    const [paused, setPaused] = useState<boolean>(false)
    const [progress, setProgress] = useState(0)

    api.player.subscribeContext.useSubscription(undefined, {
        onData: (context) => {
            setTrack((context?.item as Track | null) || null)
            setContext(context as PlaybackState | null)
            setPaused(!context?.is_playing)
        },
    })

    api.player.subscribeProgress.useSubscription(undefined, {
        onData: (progress) => {
            if (progress === null) return
            setProgress(progress)
        },
    })

    return {
        context,
        track,
        paused,
        progress,
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

