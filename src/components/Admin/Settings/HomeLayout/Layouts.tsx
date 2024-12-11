import { db } from "@/server/db"
import Layout from "./LayoutRow"
import LayoutTable from "./LayoutTable"

export default async function Layouts() {
    const layouts = await db.layout.findMany({
        where: {
            name: "home",
        },
    })

    return <LayoutTable initialLayouts={layouts} />
}
