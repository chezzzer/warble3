import { env } from "@/env"
import { db } from "@/server/db"
import { AccessToken, SpotifyApi } from "@spotify/web-api-ts-sdk"

export class SpotifyProvider {
    private static spotify: SpotifyApi | undefined
    public static access_token: AccessToken | undefined

    public static async makeFromDatabase() {
        const credentials = await this.getAccessTokenFromDatabase()

        this.access_token = credentials

        this.spotify = SpotifyApi.withAccessToken(
            env.SPOTIFY_CLIENT_ID,
            this.access_token
        )

        this.spotify.switchAuthenticationStrategy({
            async getAccessToken() {
                return this.getOrCreateAccessToken()
            },
            async getOrCreateAccessToken() {
                if (
                    !SpotifyProvider.access_token ||
                    SpotifyProvider.access_token.expires! < Date.now()
                ) {
                    const newToken =
                        await SpotifyProvider.getAccessTokenFromDatabase()

                    SpotifyProvider.access_token = newToken

                    return newToken
                }

                return SpotifyProvider.access_token
            },
            removeAccessToken() {},
            setConfiguration(configuration) {},
        })

        return this.spotify
    }

    public static async makeFromDatabaseCache() {
        if (this.spotify) {
            return this.spotify
        }

        return SpotifyProvider.makeFromDatabase()
    }

    public static async getAccessTokenFromRefreshToken(
        refreshToken: string
    ): Promise<AccessToken> {
        const res = await fetch("https://accounts.spotify.com/api/token", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: new URLSearchParams({
                refresh_token: refreshToken,
                grant_type: "refresh_token",
                client_id: env.SPOTIFY_CLIENT_ID,
                client_secret: env.SPOTIFY_CLIENT_SECRET,
            }),
        })
        const data = (await res.json()) as AccessToken

        if (!data.expires) {
            data.expires = new Date().getTime() + (data.expires_in - 60) * 1000
        }

        if (!data.refresh_token) {
            data.refresh_token = refreshToken
        }

        return data
    }

    public static async getAccessTokenFromCode(
        code: string
    ): Promise<AccessToken> {
        const res = await fetch("https://accounts.spotify.com/api/token", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: new URLSearchParams({
                code: code,
                redirect_uri: env.SPOTIFY_REDIRECT_URI,
                grant_type: "authorization_code",
                client_id: env.SPOTIFY_CLIENT_ID,
                client_secret: env.SPOTIFY_CLIENT_SECRET,
            }),
        })
        const data = (await res.json()) as AccessToken

        if (!data.expires) {
            data.expires = new Date().getTime() + (data.expires_in - 60) * 1000
        }

        return data
    }

    public static async getAccessTokenFromDatabase(): Promise<AccessToken> {
        const credentials = await db.spotifyCredentials.findFirst()

        if (!credentials) {
            throw new Error("No credentials found, please run setup")
        }

        return {
            access_token: credentials.accessToken,
            refresh_token: credentials.refreshToken,
            expires_in: credentials.expiresIn,
            expires: Number(credentials.expires),
            token_type: credentials.tokenType,
        } as AccessToken
    }

    public static async replaceAccessToken(data: AccessToken) {
        if (!data.expires) {
            throw new Error("AccessToken is incomplete, must have expires")
        }
        await db.spotifyCredentials.deleteMany()
        await db.spotifyCredentials.create({
            data: {
                accessToken: data.access_token,
                refreshToken: data.refresh_token,
                expiresIn: data.expires_in,
                expires: data.expires,
                tokenType: data.token_type,
            },
        })
    }
}

