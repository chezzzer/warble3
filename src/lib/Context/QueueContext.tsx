"use client"

import type { RequestItem } from "@/server/api/routers/request"
import { api } from "@/trpc/react"
import { Request } from "@prisma/client"
import { PlaybackState, Track } from "@spotify/web-api-ts-sdk"
import { createContext, useContext, useEffect, useState } from "react"
import type { PropsWithChildren } from "react"
import { useSpotify } from "./SpotifyContext"

function useProviderValue() {
    const mutation = api.request.create.useMutation()
    const [queue, setQueue] = useState<RequestItem[]>([])

    api.request.onChange.useSubscription(undefined, {
        onData: (requests) => {
            setQueue(
                requests.filter((r) => !r.current) as unknown as RequestItem[]
            )
        },
    })

    return {
        queue,
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
