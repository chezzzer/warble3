import { fastify } from "fastify"
import { join } from "path"
import next from "next"

const port = parseInt(process.env.PORT || "3000", 10)
const dev = process.env.NODE_ENV !== "production"

const app = next({
    dev,
})
const handle = app.getRequestHandler()

app.prepare().then(() => {
    const server = fastify()

    server.all("*", async (req, reply) => {
        try {
            await handle(req.raw, reply.raw)
            reply.sent = true
        } catch (err) {
            console.error(err)
            reply.send(err)
        }
    })

    server.listen({ port }, (err) => {
        if (err) throw err
        console.log(`> Ready on http://localhost:${port}`)
    })
})
