import { SpotifyProvider } from "@/lib/Spotify/SpotifyProvider"
import { authProcedure, createTRPCRouter } from "@/server/api/trpc"
import { db } from "@/server/db"
import { TRPCError } from "@trpc/server"
import { z } from "zod"
import { Layout } from "@prisma/client"
import { revalidateTag } from "next/cache"

export const settingsRouter = createTRPCRouter({
    set: authProcedure
        .input(
            z.object({
                name: z.string(),
                value: z.string(),
            })
        )
        .mutation(async ({ input }) => {
            await db.settings.upsert({
                where: {
                    name: input.name,
                },
                update: {
                    value: input.value,
                },
                create: {
                    name: input.name,
                    value: input.value,
                },
            })

            return {
                name: input.name,
                value: input.value,
            }
        }),

    get: authProcedure
        .input(
            z.object({
                name: z.string(),
            })
        )
        .query(async ({ input }) => {
            const setting = await db.settings.findFirst({
                where: {
                    name: input.name,
                },
            })

            if (!setting) {
                throw new TRPCError({
                    code: "NOT_FOUND",
                    message: "Setting not found",
                })
            }

            return {
                name: input.name,
                value: setting.value,
            }
        }),

    setLayout: authProcedure
        .input(
            z.object({
                layouts: z.array(
                    z.object({
                        name: z.string(),
                        position: z.number(),
                        row_type: z.string(),
                        row_data: z.string(),
                    })
                ),
            })
        )
        .mutation(async ({ input }) => {
            const layouts = input.layouts as Layout[]
            await db.layout.deleteMany()
            await db.layout.createMany({
                data: layouts,
            })

            revalidateTag("homeLayout")
        }),
})
