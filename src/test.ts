import { env } from "@/env"
import { createClient } from "redis"
import { SpotifyProvider } from "./lib/Spotify/SpotifyProvider"
import getExtraArtistInfo from "./lib/Spotify/SpotifyExtraArtistInfo"
import { getRandomPopularArtist } from "./lib/Spotify/SpotifyPopularArtists"
const homeTracks = await getRandomPopularArtist()
console.log(homeTracks)
