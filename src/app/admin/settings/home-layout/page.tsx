import Layouts from "@/components/Admin/Settings/HomeLayout/Layouts"
import RangeSetting from "@/components/Admin/Settings/RangeSetting"
import { Card, CardHeader, CardContent } from "@/components/ui/card"
import { HomeLayoutProvider } from "@/lib/Context/HomeLayoutContext"
import { db } from "@/server/db"
import { Settings } from "@prisma/client"

export default async function HomeLayout() {
    return (
        <Card>
            <CardHeader>Home Layout</CardHeader>
            <CardContent>
                <Layouts />
            </CardContent>
        </Card>
    )
}
