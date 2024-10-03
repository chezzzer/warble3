import { SpotifyApi } from "@spotify/web-api-ts-sdk"

import open from "open"

import Fastify from "fastify"
import { db } from "@/server/db"
import { env } from "@/env"
import { SpotifyProvider } from "@/lib/Spotify/SpotifyProvider"

const fastify = Fastify()

const start = async () => {
    fastify.get("/linkSpotify", async function handler(request, reply) {
        const { code } = request.query as {
            code: string
        }

        const data = await SpotifyProvider.getAccessTokenFromCode(code)

        const spotify = SpotifyApi.withAccessToken(env.SPOTIFY_CLIENT_ID, data)

        const profile = await spotify.currentUser.profile()
        console.log("Linked to " + profile.email)

        await SpotifyProvider.replaceAccessToken(data)

        return `Linked to ${profile.email}`
    })

    await fastify.listen({ port: 3000 })

    openAuthURL()
}

start()

function openAuthURL() {
    let state = generateState()
    let scope = [
        "user-read-private",
        "user-read-email",
        "user-read-playback-state",
        "user-read-currently-playing",
        "user-modify-playback-state",
        "user-read-recently-played",
    ].join(" ")

    const authURL =
        "https://accounts.spotify.com/authorize?" +
        new URLSearchParams({
            response_type: "code",
            client_id: env.SPOTIFY_CLIENT_ID,
            scope: scope,
            redirect_uri: env.SPOTIFY_REDIRECT_URI,
            state: state,
        })

    open(authURL)
}

function generateState() {
    const length = 16
    let result = ""
    let characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
    let charactersLength = characters.length
    for (let i = 0; i < length; i++) {
        result += characters.charAt(
            Math.floor(Math.random() * charactersLength)
        )
    }
    return result
}

