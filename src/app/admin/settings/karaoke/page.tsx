import RangeSetting from "@/components/Admin/Settings/RangeSetting"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { db } from "@/server/db"
import { Settings } from "@prisma/client"

export default async function KaraokePage() {
    const settings = await db.settings.findMany()

    const findSetting = (name: string): Settings | undefined => {
        return settings.find((s) => s.name === name)
    }

    return (
        <div className="flex flex-col gap-5 md:grid md:grid-cols-2">
            <Card>
                <CardHeader>Volume Settings</CardHeader>
                <CardContent className="flex flex-col gap-5">
                    <div>
                        <h4 className="font-semibold">Karaoke Volume</h4>
                        <p>Set the volume while playing a karaoke request.</p>
                        <RangeSetting
                            name="lyrics.karaoke_volume"
                            initialValue={
                                findSetting("lyrics.karaoke_volume")
                                    ? Number.parseInt(
                                          findSetting("lyrics.karaoke_volume")
                                              ?.value
                                      )
                                    : 50
                            }
                            min={0}
                            max={100}
                            unit="%"
                        />
                    </div>
                    <div>
                        <h4 className="font-semibold">Regular Volume</h4>
                        <p>
                            Set the volume while playing from a non-request
                            source.
                        </p>
                        <RangeSetting
                            name="lyrics.volume"
                            initialValue={
                                findSetting("lyrics.volume")
                                    ? Number.parseInt(
                                          findSetting("lyrics.volume")?.value
                                      )
                                    : 50
                            }
                            min={0}
                            max={100}
                            unit="%"
                        />
                    </div>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>App Settings</CardHeader>
                <CardContent className="flex flex-col gap-5">
                    <div>
                        <h4 className="font-semibold">App Timeout</h4>
                        <p>
                            Set the amount of time before the app redirects to
                            the home page after no activity.
                        </p>
                        <RangeSetting
                            name="app.timeout"
                            initialValue={
                                findSetting("app.timeout")
                                    ? Number.parseInt(
                                          findSetting("app.timeout")?.value
                                      )
                                    : 50
                            }
                            min={0}
                            max={60}
                            unit="s"
                        />
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
