import RangeSetting from "@/components/Admin/Settings/RangeSetting"
import { db } from "@/server/db"
import { Settings } from "@prisma/client"

export default function SettingsPage() {
    return (
        <div className="flex flex-col gap-3">
            <h1 className="text-2xl font-bold">Warble settings page</h1>
            <div>Configure Warble how you would like here.</div>
        </div>
    )
}
