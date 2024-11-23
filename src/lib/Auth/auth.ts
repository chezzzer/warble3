import { env } from "@/env"
import { db } from "@/server/db"
import { AuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { compare } from "./encrypt"
import { NextRequest } from "next/server"
import { getToken } from "next-auth/jwt"

export const authOptions: AuthOptions = {
    secret: env.AUTH_SECRET,
    providers: [
        CredentialsProvider({
            name: "Warble",
            credentials: {
                username: {
                    label: "Username",
                    type: "text",
                    placeholder: "John Smith",
                },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials, req) {
                const user = await db.admins.findFirst({
                    where: {
                        username: credentials.username,
                    },
                })

                if (!user) {
                    return null
                }

                if (!(await compare(credentials.password, user.password))) {
                    return null
                }

                return { id: user.id.toString(), name: user.username }
            },
        }),
    ],
    callbacks: {
        redirect: () => {
            return Promise.resolve("/admin")
        },
    },
    theme: {
        colorScheme: "dark",
    },
}

export async function getTokenFromHeaders(headers: Headers) {
    return await getToken({
        req: {
            headers: Object.fromEntries(headers.entries()),
            cookies: Object.fromEntries(
                (headers.get("cookie") ?? "")
                    .split("; ")
                    .map((cookie) => cookie.split("="))
            ),
        } as any,
    })
}
