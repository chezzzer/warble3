import RangeSetting from "@/components/Admin/Settings/RangeSetting"
import ToggleSetting from "@/components/Admin/Settings/ToggleSetting"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { db } from "@/server/db"
import { Settings } from "@prisma/client"

export default async function KaraokePage() {
    const settings = await db.settings.findMany()

    const findSetting = (name: string): Settings | undefined => {
        return settings.find((s) => s.name === name)
    }

    return (
        <div className="flex flex-col gap-5">
            <Card>
                <CardHeader>
                    <h5 className="text-lg font-semibold">Sync</h5>
                    <p>Sync added to lyrics</p>
                </CardHeader>
                <CardContent className="flex flex-col gap-5">
                    <div>
                        <div className="flex justify-between">
                            <div>Faster</div>
                            <div>Slower</div>
                        </div>
                        <RangeSetting
                            name="lyrics.karaoke_sync"
                            initialValue={
                                findSetting("lyrics.karaoke_sync")
                                    ? Number.parseInt(
                                          findSetting("lyrics.karaoke_sync")
                                              ?.value
                                      )
                                    : 0
                            }
                            min={-5000}
                            max={5000}
                        />
                    </div>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <h5 className="text-lg font-semibold">Lyric Type</h5>
                    <p>Type of lyrics to use</p>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center gap-5">
                        <div>Subtitles</div>
                        <div>
                            <ToggleSetting
                                name="lyrics.richsync_enabled"
                                initialValue={
                                    findSetting("lyrics.richsync_enabled")
                                        ? Boolean(
                                              findSetting(
                                                  "lyrics.richsync_enabled"
                                              )?.value
                                          )
                                        : true
                                }
                            />
                        </div>
                        <div>Richsync</div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
