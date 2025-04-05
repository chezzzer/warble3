import { Card, CardContent, CardHeader } from "../../ui/card"
import { Skeleton } from "../../ui/skeleton"

export default function TrackCarouselLoader() {
    return (
        <>
            <h1 className="mb-3 mt-10 px-5 text-2xl opacity-75">
                <Skeleton className="h-4 w-[100px]" />
            </h1>
            <div className="flex px-5">
                {Array.from({ length: 10 }).map((_, i) => (
                    <div
                        className="min-w-0 shrink-0 grow-0 basis-[250px] animate-pulse"
                        key={i}
                    >
                        <div className="pr-4">
                            <Card>
                                <CardHeader>
                                    <div className="aspect-square rounded-lg bg-slate-800" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-md">
                                        <Skeleton className="h-4 w-[100px]" />
                                    </div>
                                    <div className="mt-2 text-sm">
                                        <Skeleton className="h-3 w-[50px]" />
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}
