import PlaylistContext from "@/components/Admin/Home/PlaylistContext"
import NowPlaying from "@/components/Admin/Home/NowPlaying"
import QueueList from "@/components/Queue/QueueList"

export default async function AdminHome() {
    return (
        <>
            <div className="flex grid-cols-3 flex-col gap-5 md:grid">
                <NowPlaying />
                <div>
                    <PlaylistContext />
                </div>
            </div>
        </>
    )
}
