import NowPlaying from "@/components/Header/Nav/NowPlaying"
import CurrentTrack from "@/components/Player/CurrentTrack"
import QueueList from "@/components/Queue/QueueList"
import QueueTime from "@/components/Queue/QueueTime"

export default function QueuePage() {
    return (
        <>
            <div className="border-b bg-slate-950 px-10">
                <div className="mx-auto flex max-w-7xl items-end justify-between pb-10 pt-32">
                    <div className="flex flex-col gap-5">
                        <QueueTime />
                        <h1 className="text-6xl font-bold">Coming Up</h1>
                    </div>
                    <CurrentTrack display={true} />
                </div>
            </div>
            <div className="mx-auto my-10 max-w-7xl px-10">
                <div>
                    <QueueList display={true} />
                </div>
            </div>
        </>
    )
}
