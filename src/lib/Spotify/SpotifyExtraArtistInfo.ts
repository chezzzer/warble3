import {
    Image,
    SimplifiedAlbum,
    SimplifiedArtist,
    Track,
} from "@spotify/web-api-ts-sdk"
import { getAccessToken } from "./SpotifyPublicAuthentication"
import { writeFile } from "fs/promises"
import { extractUri } from "./SpotifyUtils"

export default async function getExtraArtistInfo(
    artistId: string
): Promise<ArtistInfo | null> {
    try {
        const accessToken = await getAccessToken()

        const artistRes = await fetch(
            "https://api-partner.spotify.com/pathfinder/v1/query?" +
                new URLSearchParams({
                    operationName: "queryArtistOverview",
                    variables: JSON.stringify({
                        uri: `spotify:artist:${artistId}`,
                        locale: "",
                        includePrerelease: true,
                    }),
                    extensions: JSON.stringify({
                        persistedQuery: {
                            version: 1,
                            sha256Hash:
                                "ea5658c9fdd597665a0be701dae4645451bb803fc01a5d679188c608325c82d1",
                        },
                    }),
                }),
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
                cache: "force-cache",
            }
        )

        const text = await artistRes.text()
        const { data } = JSON.parse(text)

        if (!data.artistUnion) {
            return null
        }

        writeFile("./tmp.json", JSON.stringify(data, null, 4))

        return {
            discography: {
                popularReleases:
                    data.artistUnion.discography.popularReleasesAlbums.items.map(
                        (item) =>
                            ({
                                album_type: item.type.toLowerCase(),
                                name: item.name,
                                release_date: `${item.date.year}-${item.date.month}-${item.date.day}`,
                                images: item.coverArt.sources.sort((a, b) => {
                                    return a.width - b.width
                                }),
                                id: item.id,
                                uri: item.uri,
                                label: item.label,
                                total_tracks: item.tracks.totalCount,
                                external_urls: {
                                    spotify: item.sharingInfo.shareUrl,
                                },
                                copyrights: item.copyright.items,
                                release_date_precision: "year",
                                type: "album",
                            }) as SimplifiedAlbum
                    ),
                topTracks: data.artistUnion.discography.topTracks.items
                    .map((t) => t.track)
                    .map((t) => ({
                        id: t.id,
                        playcount: t.playcount,
                    })),
            },
            profile: {
                biography: data.artistUnion.profile.biography.text,
                name: data.artistUnion.profile.name,
                pinnedItem: data.artistUnion.profile.pinnedItem && {
                    comment: data.artistUnion.profile.pinnedItem.comment,
                    backgroundImage:
                        data.artistUnion.profile.pinnedItem.backgroundImageV2 &&
                        data.artistUnion.profile.pinnedItem.backgroundImageV2
                            .data.sources[0]?.url,
                    item: {
                        name: data.artistUnion.profile.pinnedItem.itemV2.data
                            .name,
                        uri: data.artistUnion.profile.pinnedItem.itemV2.data
                            .uri,
                        type: data.artistUnion.profile.pinnedItem.itemV2.data
                            .__typename,
                        images:
                            data.artistUnion.profile.pinnedItem.itemV2.data
                                .coverArt?.sources ||
                            data.artistUnion.profile.pinnedItem.itemV2.data
                                .images?.sources ||
                            data.artistUnion.profile.pinnedItem.itemV2.data
                                .albumOfTrack?.coverArt.sources ||
                            data.artistUnion.profile.pinnedItem.itemV2.data
                                .images?.items[0].sources,
                    },
                    type: data.artistUnion.profile.pinnedItem.type,
                },
            },
            stats: data.artistUnion.stats,
            visuals: {
                avatarImage: {
                    images: data.artistUnion.visuals.avatarImage?.sources,
                    extractedColor:
                        data.artistUnion.visuals.avatarImage?.extractedColors
                            .colorRaw.hex,
                },
                gallery: data.artistUnion.visuals.gallery.items.map((item) => ({
                    height: item.sources[0].height,
                    url: item.sources[0].url,
                    width: item.sources[0].width,
                })),
                headerImage: data.artistUnion.visuals.headerImage && {
                    images: data.artistUnion.visuals.headerImage.sources,
                    color: data.artistUnion.visuals.headerImage.extractedColors
                        .colorRaw.hex,
                },
            },
        } as ArtistInfo
    } catch {
        return null
    }
}

export type ArtistInfo = {
    discography: {
        popularReleases: SimplifiedAlbum[]
        topTracks: ArtistTopTrack[]
    }
    profile: {
        biography: string
        name: string
        pinnedItem?: ArtistInfoPinnedItem
    }
    stats: ArtistInfoStats
    visuals: {
        avatarImage: {
            images: Image[]
            extractedColor: string
        }
        gallery: Image[]
        headerImage?: {
            images: Image[]
            color: string
        }
    }
}

export type ArtistTopTrack = {
    id: string
    playcount: number
}

export type ArtistInfoStats = {
    followers: number
    monthlyListeners: number
    topCities: Array<{
        city: string
        country: string
        numberOfListeners: number
        region: string
    }>
    worldRank: number
}

export type ArtistInfoPinnedItem = {
    comment: string
    backgroundImage?: string
    item: {
        name: string
        uri: string
        type: string
        images?: Array<{
            url: string
            width: number
            height: number
        }>
    }
    type: string
}
