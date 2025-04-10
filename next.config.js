/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import("./src/env.js")

/** @type {import("next").NextConfig} */
const config = {
    reactStrictMode: false,
    async redirects() {
        return [
            {
                source: "/",
                destination: "/app/",
                permanent: true,
            },
        ]
    },
}

export default config
