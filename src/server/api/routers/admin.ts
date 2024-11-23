import { authProcedure, createTRPCRouter } from "@/server/api/trpc"

export const adminRouter = createTRPCRouter({
    test: authProcedure.query(async (ctx) => {
        return "Hello, world!"
    }),
})
