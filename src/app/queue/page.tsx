import QueueList from "@/components/Queue/QueueList"

export default function QueuePage() {
    return (
        <>
            <div className="bg-slate-950 px-10">
                <div className="mx-auto max-w-7xl pb-10 pt-32">
                    <h1 className="text-6xl font-bold">Coming Up</h1>
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
