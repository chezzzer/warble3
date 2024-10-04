"use client"

import type { RequestItem } from "@/server/api/routers/request"
import { api } from "@/trpc/react"
import { Request } from "@prisma/client"
import { PlaybackState, Track } from "@spotify/web-api-ts-sdk"
import { createContext, useContext, useEffect, useState } from "react"
import type { PropsWithChildren } from "react"
import { useSpotify } from "./SpotifyContext"
import { useDebounce } from "@uidotdev/usehooks"

function useProviderValue() {
    const [search, setSearch] = useState<string>("")

    const debouncedSearch = useDebounce(search, 1000)

    const { refetch, data, isError, isLoading } = api.spotify.search.useQuery(
        {
            query: debouncedSearch,
        },
        {
            enabled: !!debouncedSearch,
        }
    )

    useEffect(() => {
        if (!debouncedSearch) return
        refetch()
    }, [debouncedSearch])

    return {
        search,
        setSearch,
        items: data,
        isLoading,
        isError,
    }
}

export type Context = ReturnType<typeof useProviderValue>

const SearchContext = createContext<Context | undefined>(undefined)
SearchContext.displayName = "SearchProvider"

export const SearchProvider = (props: PropsWithChildren) => {
    const value = useProviderValue()
    return <SearchContext.Provider value={value} {...props} />
}

export function useSearch() {
    const context = useContext(SearchContext)
    if (context === undefined) {
        throw new Error(`useSearch must be used within a SearchContext`)
    }
    return context
}
