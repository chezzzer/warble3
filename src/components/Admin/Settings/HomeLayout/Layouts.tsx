import { db } from "@/server/db"
import Layout from "./LayoutRow"
import LayoutList from "./LayoutList"

export default async function Layouts() {
    const layouts = await db.layout.findMany({
        where: {
            name: "home",
        },
    })

    return <LayoutList layouts={layouts} />
}
