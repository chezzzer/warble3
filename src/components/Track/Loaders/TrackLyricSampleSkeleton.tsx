import { Skeleton } from "@/components/ui/skeleton"

export default function TrackLyricSampleSkeleton() {
    return (
        <Skeleton
            className="h-[275px] w-full opacity-75"
            style={{
                maskImage: `linear-gradient(to bottom, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 1) calc(100% - 100px), rgba(0, 0, 0, 0) 100%)`,
            }}
        />
    )
}
