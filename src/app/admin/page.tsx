import PlaylistContext from "@/components/Admin/Home/PlaylistContext"
import NowPlaying from "@/components/Admin/Home/NowPlaying"
import LyricStatus from "@/components/Admin/Home/LyricStatus"
import Player from "@/components/Admin/Home/Player/Player"

export default async function AdminHome() {
    return (
        <>
            <div className="flex grid-cols-3 flex-col gap-5 md:grid">
                <NowPlaying />
                <div className="flex flex-col gap-5">
                    <Player />
                    <PlaylistContext />
                </div>
                <div>
                    <LyricStatus />
                </div>
            </div>
        </>
    )
}
