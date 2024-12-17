export async function getPreviewUrl(id: string): Promise<string | null> {
    const sourceRes = await fetch(
        `https://open.spotify.com/embed/track/${id}`,
        {
            cache: "force-cache",
        }
    )
    const source = await sourceRes.text()
    const matches = source.match(/"url":"(.*?)"/s)
    if (!matches || !matches[1]) {
        return null
    }

    return matches[1] as string | null
}
