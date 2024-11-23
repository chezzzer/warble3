import { env } from "@/env"
import MusixMatch from "musixmatch-richsync"

const tokens = env.MUSIXMATCH_USERTOKENS?.split(",")

if (!tokens) {
    throw new Error("No tokens found, please add some in env.")
}

const musixmatch = new MusixMatch(tokens)

export default musixmatch
