import { getAccessToken } from "./SpotifyPublicAuthentication"

export default async function getExtractedColors(
    uris: string[]
): Promise<ExtractedColor[] | undefined> {
    const accessToken = await getAccessToken()

    const albumRes = await fetch(
        "https://api-partner.spotify.com/pathfinder/v1/query?" +
            new URLSearchParams({
                operationName: "fetchExtractedColors",
                variables: JSON.stringify({
                    uris: uris,
                }),
                extensions: JSON.stringify({
                    persistedQuery: {
                        version: 1,
                        sha256Hash:
                            "86bdf61bb598ee07dc85d6c3456d9c88eb94f33178509ddc9b33fc9710aa9e9c",
                    },
                }),
            }),
        {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        }
    )
    const { data } = await albumRes.json()

    return data.extractedColors.map((color) => ({
        colorDark: color.colorDark.hex,
        colorLight: color.colorLight.hex,
        color: color.colorRaw.hex,
    })) as ExtractedColor[]
}

export type ExtractedColor = {
    colorDark: string
    colorLight: string
    color: string
}
