import { SpotifyProvider } from "@/lib/Spotify/SpotifyProvider"
import { warbleLog } from "@/lib/Warble"

export default async function checkForRefresh() {
    await SpotifyProvider.makeFromDatabaseCache()

    if (SpotifyProvider.access_token?.expires! < Date.now()) {
        if (!SpotifyProvider.access_token) {
            warbleLog("No access token found, please run setup")
            return
        }
        warbleLog("Refreshing Spotify token")

        const newToken = await SpotifyProvider.getAccessTokenFromRefreshToken(
            SpotifyProvider.access_token.refresh_token
        )

        SpotifyProvider.access_token = newToken

        await SpotifyProvider.replaceAccessToken(newToken)
    }
}
