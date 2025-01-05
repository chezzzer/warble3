import { Image } from "@spotify/web-api-ts-sdk"

export type SpotifyType = "track" | "artist" | "album" | "playlist" | "user"

export function extractUri(uri: string): { type: SpotifyType; id: string } {
    const [spotify, type, id] = uri.split(":")
    return { type: type as SpotifyType, id }
}

export function replaceSpotifyUriLinks(html: string): string {
    const regex =
        /<a\s+(?:[^>]*?\s+)?href=(["']?)(spotify:[^"'\s>]*)\1([^>]*)>(.*?)<\/a>/gi

    return html.replace(regex, (match, quote, uri, attributes, linkText) => {
        const { type, id } = extractUri(uri)
        const newHref = `/${type}/${id}`
        return `<a href=${quote}${newHref}${quote}${attributes}>${linkText}</a>`
    })
}

export function getLargestImage(
    images: Image[] | undefined | null
): Image | null {
    if (!images) {
        return null
    }
    return images.sort((a, b) => b.width - a.width)[0]
}

export function getSmallestImage(
    images: Image[] | undefined | null
): Image | null {
    if (!images) {
        return null
    }
    return images.sort((a, b) => a.width - b.width)[0]
}
