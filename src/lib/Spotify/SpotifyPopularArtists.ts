import { Image } from "@spotify/web-api-ts-sdk"
import { getAccessToken } from "./SpotifyPublicAuthentication"

export async function getPopularArtists(limit: number = 20) {
    const accessToken = await getAccessToken()

    const artists = await fetch(
        "https://api-partner.spotify.com/pathfinder/v1/query?" +
            new URLSearchParams({
                operationName: "homeSection",
                variables: JSON.stringify({
                    uri: "spotify:section:0JQ5DAnM3wGh0gz1MXnu3C",
                    sp_t: "edab46d4ee3db6c3c6497caa37d16a4f",
                    timeZone: "Pacific/Auckland",
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

    const data = await artists.json()

    return data.data.homeSections.sections[0].sectionItems.items.map(
        (a: any) => a.content.data
    ) as PopularArtist[]
}

export async function getRandomPopularArtist() {
    const artists = await getPopularArtists(50)
    return artists[Math.floor(Math.random() * artists.length)]
}

export type PopularArtist = {
    profile: {
        name: string
    }
    uri: string
    visuals: {
        avatarImage: {
            extractedColors: {
                colorDark: {
                    hex: string
                    isFallback: boolean
                }
            }
            sources: Image[]
        }
    }
}
