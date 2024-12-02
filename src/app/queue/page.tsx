import QueueList from "@/components/Queue/QueueList"
import QueueTime from "@/components/Queue/QueueTime"

export default function QueuePage() {
    return (
        <>
            <div className="border-b bg-slate-950 px-10">
                <div className="mx-auto flex max-w-7xl justify-between pb-10 pt-32">
                    <h1 className="text-6xl font-bold">Coming Up</h1>
                    <QueueTime />
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
