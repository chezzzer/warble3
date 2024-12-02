"use client"

import type { RequestItem } from "@/server/api/routers/request"
import { api } from "@/trpc/react"
import { Layout, Request } from "@prisma/client"
import { PlaybackState, Track } from "@spotify/web-api-ts-sdk"
import { createContext, useContext, useEffect, useState } from "react"
import type { PropsWithChildren } from "react"
import { useSpotify } from "./SpotifyContext"
import { useDebounce } from "@uidotdev/usehooks"

function useProviderValue(list: Layout[]) {
    const [layouts, setLayouts] = useState<Layout[]>(list)

    const { mutateAsync } = api.settings.setLayout.useMutation()

    useEffect(() => {
        if (!layouts) return

        mutateAsync({
            layouts: layouts.map((layout, i) => ({
                name: layout.name,
                position: i,
                row_type: layout.row_type,
                row_data: layout.row_data,
            })),
        })
    }, [layouts])

    return {
        layouts,
    }
}

export type Context = ReturnType<typeof useProviderValue>

const HomeLayoutContext = createContext<Context | undefined>(undefined)
HomeLayoutContext.displayName = "HomeLayoutProvider"

export const HomeLayoutProvider = (
    props: PropsWithChildren & { layouts: Layout[] }
) => {
    const value = useProviderValue(props.layouts)
    return <HomeLayoutContext.Provider value={value} {...props} />
}

export function useHomeLayout() {
    const context = useContext(HomeLayoutContext)
    if (context === undefined) {
        throw new Error(`useHomeLayout must be used within a HomeLayoutContext`)
    }
    return context
}
