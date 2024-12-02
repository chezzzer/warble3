import { env } from "@/env"
import { createClient } from "redis"
import { SpotifyProvider } from "./lib/Spotify/SpotifyProvider"
import getExtraArtistInfo from "./lib/Spotify/SpotifyExtraArtistInfo"
const homeTracks = await getExtraArtistInfo("0kObWap02DEg9EAJ3PBxzf")
console.log(homeTracks)
