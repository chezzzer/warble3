import { Image } from "@spotify/web-api-ts-sdk"

export function extractUri(uri: string): { type: string; id: string } {
    const [spotify, type, id] = uri.split(":")
    return { type, id }
}

export function replaceSpotifyUriLinks(html: string): string {
    const regex =
        /<a\s+(?:[^>]*?\s+)?href="(spotify:[^"]*)"([^>]*)>(.*?)<\/a>/gi

    return html.replace(regex, (match, uri, attributes, linkText) => {
        const { type, id } = extractUri(uri)
        const newHref = `/${type}/${id}`
        return `<a href="${newHref}"${attributes}>${linkText}</a>`
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
