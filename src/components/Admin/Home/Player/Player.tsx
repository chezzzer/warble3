import { Card, CardContent, CardHeader } from "@/components/ui/card"
import PlayPause from "./PlayPause"
import Next from "./Next"
import Previous from "./Previous"
import Rewind from "./Rewind"
import Volume from "./Volume"

export default function Player() {
    return (
        <Card>
            <CardHeader>
                <div className="flex flex-col gap-5">
                    <div className="flex items-center justify-between gap-3">
                        <Rewind />
                        <Previous />
                        <PlayPause />
                        <Next />
                    </div>
                    <div>
                        <Volume />
                    </div>
                </div>
            </CardHeader>
        </Card>
    )
}
