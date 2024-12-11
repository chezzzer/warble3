import { Image } from "@spotify/web-api-ts-sdk"
import { getAccessToken } from "./SpotifyPublicAuthentication"

export async function getNewReleases(limit: number = 20) {
    const accessToken = await getAccessToken()

    const releases = await fetch(
        "https://api-partner.spotify.com/pathfinder/v1/query?" +
            new URLSearchParams({
                operationName: "browseSection",
                variables: JSON.stringify({
                    pagination: { offset: 0, limit },
                    uri: "spotify:section:0JQ5IMCbQBLC0DY87kyeG2",
                }),
                extensions: JSON.stringify({
                    persistedQuery: {
                        version: 1,
                        sha256Hash:
                            "a8d6aef2cf35afad6ee2b3845dd7d609b808e44900ebd978da47be952dfb6774",
                    },
                }),
            }),
        {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
            next: {
                revalidate: 3600,
            },
        }
    )

    const data = await releases.json()

    return data.data.browseSection.sectionItems.items.map(
        (i) => i.content.data
    ) as NewRelease[]
}

type NewRelease = {
    name: string
    uri: string
    artists: {
        items: {
            profile: {
                name: string
            }
            uri: string
        }[]
    }
    coverArt: {
        sources: Image[]
    }
}
