import PlaylistContext from "@/components/Admin/Home/PlaylistContext"
import NowPlaying from "@/components/Admin/Home/NowPlaying"
import LyricStatus from "@/components/Admin/Home/LyricStatus"

export default async function AdminHome() {
    return (
        <>
            <div className="flex grid-cols-3 flex-col gap-5 md:grid">
                <NowPlaying />
                <div>
                    <PlaylistContext />
                </div>
                <div>
                    <LyricStatus />
                </div>
            </div>
        </>
    )
}
