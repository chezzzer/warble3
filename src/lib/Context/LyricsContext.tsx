"use client"

import { api } from "@/trpc/react"
import { PlaybackState, Track } from "@spotify/web-api-ts-sdk"
import { createContext, useContext, useEffect, useMemo, useState } from "react"
import type { PropsWithChildren } from "react"
import type { Progress } from "@/lib/Context/SpotifyContext"
import type { LyricLine } from "../Lyrics/LyricsCacheProvider"

function useProviderValue() {
    const [context, setContext] = useState<PlaybackState | null>()
    const [track, setTrack] = useState<Track | null>()
    const [paused, setPaused] = useState<boolean>(false)
    const [progress, setProgress] = useState(0)
    const [lyrics, setLyrics] = useState<LyricLine[] | null>()

    useEffect(() => {
        const interval = setInterval(() => {
            if (!context?.is_playing) return
            setProgress((prev) => prev + 100)
        }, 100)

        return () => clearInterval(interval)
    }, [context])

    api.lyrics.subscribe.useSubscription(undefined, {
        onData: (event) => {
            if (event.name === "progress") {
                setProgress(event.data as Progress)
                return
            }

            if (event.name === "context") {
                const context = event.data as PlaybackState | null

                setTrack((context?.item as Track | null) || null)
                setContext(context as PlaybackState | null)
                setPaused(!context?.is_playing)
            }

            if (event.name === "lyrics") {
                setLyrics(event.data as LyricLine[] | null)
            }
        },
    })

    const currentIndex = useMemo(() => {
        if (!lyrics) return null
        for (let i = 0; i < lyrics.length; i++) {
            if (lyrics[i].start >= progress / 1000) {
                return i - 1
            }
        }
    }, [progress, lyrics])

    return {
        context,
        track,
        paused,
        progress,
        lyrics,
        currentIndex,
    }
}

export type Context = ReturnType<typeof useProviderValue>

const LyricsContext = createContext<Context | undefined>(undefined)
LyricsContext.displayName = "LyricsProvider"

export const LyricsProvider = (props: PropsWithChildren) => {
    const value = useProviderValue()
    return <LyricsContext.Provider value={value} {...props} />
}

export function useLyrics() {
    const context = useContext(LyricsContext)
    if (context === undefined) {
        throw new Error(`useLyrics must be used within a LyricsContext`)
    }
    return context
}
