import { fetchRequestHandler } from "@trpc/server/adapters/fetch"
import { type NextRequest } from "next/server"

import { env } from "@/env"
import { appRouter } from "@/server/api/root"
import { createTRPCContext } from "@/server/api/trpc"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/Auth/auth"
import { getToken } from "next-auth/jwt"

/**
 * This wraps the `createTRPCContext` helper and provides the required context for the tRPC API when
 * handling a HTTP request (e.g. when you make requests from Client Components).
 */
const createContext = async (req: NextRequest) => {
    // const token = await getToken({
    //     req: {
    //         headers: Object.fromEntries(req.headers.entries()),
    //         cookies: Object.fromEntries(
    //             (req.headers.get("cookie") ?? "")
    //                 .split("; ")
    //                 .map((cookie) => cookie.split("="))
    //         ),
    //     } as any,
    // })
    // console.log(token)
    return createTRPCContext({
        headers: req.headers,
    })
}

const handler = (req: NextRequest) =>
    fetchRequestHandler({
        endpoint: "/api/trpc",
        req,
        router: appRouter,
        createContext: () => createContext(req),
        onError:
            env.NODE_ENV === "development"
                ? ({ path, error }) => {
                      console.error(
                          `❌ tRPC failed on ${path ?? "<no-path>"}: ${error}, ${error.stack}`
                      )
                  }
                : undefined,
    })

export { handler as GET, handler as POST }
