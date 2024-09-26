import { SpotifyProvider } from "@/lib/Spotify/SpotifyProvider"

export default async function checkForRefresh() {
    await SpotifyProvider.makeFromDatabaseCache()

    if (SpotifyProvider.access_token?.expires! < Date.now()) {
        if (!SpotifyProvider.access_token) {
            console.log("No access token found, please run setup")
            return
        }
        console.log("Refreshing token")

        const newToken = await SpotifyProvider.getAccessTokenFromRefreshToken(
            SpotifyProvider.access_token.refresh_token
        )

        SpotifyProvider.access_token = newToken

        await SpotifyProvider.replaceAccessToken(newToken)
    }
}

