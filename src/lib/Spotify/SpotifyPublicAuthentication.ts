export async function getAccessToken(): Promise<string | null> {
    const sourceRes = await fetch("https://open.spotify.com/", {
        next: {
            revalidate: 60,
        },
    })
    const source = await sourceRes.text()
    const matches = source.match(
        /<script id="session" data-testid="session" type="application\/json">(.*?)<\/script>/s
    )
    if (!matches || !matches[1]) {
        return null
    }
    const { accessToken } = JSON.parse(matches[1])

    return accessToken as string | null
}
