"use client"

import type { RequestItem } from "@/server/api/routers/request"
import { api } from "@/trpc/react"
import { Request } from "@prisma/client"
import { PlaybackState, Track } from "@spotify/web-api-ts-sdk"
import { createContext, useContext, useEffect, useState } from "react"
import type { PropsWithChildren } from "react"
import { useSpotify } from "./SpotifyContext"

function useProviderValue() {
    const mutation = api.request.create.useMutation({
        onSuccess: async (item) => {
            const request = item as unknown as RequestItem
            setQueue((q) => [...q, request])
        },
    })
    const [queue, setQueue] = useState<RequestItem[]>([])

    const { track } = useSpotify()

    useEffect(() => {
        refetch()
    }, [track])

    api.request.onRequest.useSubscription(undefined, {
        onData: (request) => {
            const r = request as unknown as RequestItem
            setQueue((q) => [...q, r])
        },
    })

    const { data, refetch } = api.request.get.useQuery()

    useEffect(() => {
        setQueue(data as unknown as RequestItem[])
    }, [data])

    return {
        queue,
        refetch,
        mutation,
    }
}

export type Context = ReturnType<typeof useProviderValue>

const QueueContext = createContext<Context | undefined>(undefined)
QueueContext.displayName = "QueueProvider"

export const QueueProvider = (props: PropsWithChildren) => {
    const value = useProviderValue()
    return <QueueContext.Provider value={value} {...props} />
}

export function useQueue() {
    const context = useContext(QueueContext)
    if (context === undefined) {
        throw new Error(`useQueue must be used within a QueueContext`)
    }
    return context
}

