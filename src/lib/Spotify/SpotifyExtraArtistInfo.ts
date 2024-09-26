export default async function getExtraArtistInfo(artistId: string) {
    const sourceRes = await fetch("https://open.spotify.com/artist/" + artistId)
    const source = await sourceRes.text()
    const matches = source.match(
        /<script id="session" data-testid="session" type="application\/json">(.*?)<\/script>/s
    )
    if (!matches || !matches[1]) {
        return null
    }
    const { accessToken } = JSON.parse(matches[1])

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
        }
    )
    const { data } = await artistRes.json()

    if (!data.artistUnion) {
        return getExtraArtistInfo(artistId)
    }

    return {
        stats: data.artistUnion.stats,
        visuals: data.artistUnion.visuals,
    } as ArtistInfo
}

export type ArtistInfo = {
    stats:
        | {
              followers: number
              monthlyListeners: number
              topCities: {
                  items: Array<{
                      city: string
                      country: string
                      numberOfListeners: number
                      region: string
                  }>
              }
              worldRank: number
          }
        | undefined
    visuals:
        | {
              avatarImage: {
                  extractedColors: {
                      colorRaw: {
                          hex: string
                      }
                  }
                  sources: Array<{
                      height: number
                      url: string
                      width: number
                  }>
              }
              gallery: {
                  items: Array<{
                      sources: Array<{
                          height: number
                          url: string
                          width: number
                      }>
                  }>
              }
              headerImage:
                  | {
                        extractedColors: {
                            colorRaw: {
                                hex: string
                            }
                        }
                        sources: Array<{
                            height: number
                            url: string
                            width: number
                        }>
                    }
                  | undefined
          }
        | undefined
}

