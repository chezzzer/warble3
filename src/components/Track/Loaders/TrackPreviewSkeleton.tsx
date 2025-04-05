import { useEffect, useRef, useState } from "react"
import { Skeleton } from "../../ui/skeleton"

export default function TrackPreviewSkeleton() {
    const element = useRef<HTMLDivElement>(null)
    const [width, setWidth] = useState(0)

    useEffect(() => {
        if (element.current) {
            setWidth(element.current.clientWidth)
        }
    }, [element])

    const randomHeight = () => {
        return Math.floor(Math.random() * 30) + 30
    }

    return (
        <div className="flex items-center gap-3" ref={element}>
            <div>
                <Skeleton className="h-[45px] w-[45px] rounded-full" />
            </div>
            <div className="flex w-full items-center gap-[2px]">
                {Array.from({ length: width / 6 }).map((_, index) => (
                    <Skeleton
                        key={index}
                        className="flex-1"
                        style={{
                            height: `${randomHeight()}px`,
                        }}
                    />
                ))}
            </div>
        </div>
    )
}
