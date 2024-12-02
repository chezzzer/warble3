import { db } from "@/server/db"

export class SettingsRepo {
    async get(key: string) {
        return await db.settings.findFirst({
            where: {
                name: key,
            },
        })
    }

    async set(key: string, value: string) {
        await db.settings.upsert({
            where: {
                name: key,
            },
            update: {
                value,
            },
            create: {
                name: key,
                value,
            },
        })
    }
}
