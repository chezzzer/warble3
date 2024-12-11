import { Image } from "@spotify/web-api-ts-sdk"
import { getAccessToken } from "./SpotifyPublicAuthentication"

export async function getPopularReleases(limit: number = 20) {
    const accessToken = await getAccessToken()

    const releases = await fetch(
        "https://api-partner.spotify.com/pathfinder/v1/query?" +
            new URLSearchParams({
                operationName: "homeSection",
                variables: JSON.stringify({
                    uri: "spotify:section:0JQ5DAnM3wGh0gz1MXnu3B",
                    timeZone: "Pacific/Auckland",
                    sp_t: "36554f5f8b00f58aacde73ac9da6ac95",
                    sectionItemsOffset: 0,
                    sectionItemsLimit: limit,
                }),
                extensions: JSON.stringify({
                    persistedQuery: {
                        version: 1,
                        sha256Hash:
                            "dac9a6cb698abb556f79172acb8dea3daacecd2b0509797e846d58a8c6f21b0c",
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

    return data.data.homeSections.sections[0].sectionItems.items.map(
        (i) => i.content.data
    ) as PopularRelease[]
}

type PopularRelease = {
    albumType: string
    artists: {
        items: {
            profile: {
                name: string
            }
            uri: string
        }[]
    }
    coverArt: {
        extractedColors: {
            colorDark: {
                hex: string
                isFallback: boolean
            }
        }
        sources: Image[]
    }
    name: string
    playability: {
        playable: boolean
        reason: string
    }
    uri: string
}