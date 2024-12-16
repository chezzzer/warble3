# Warble 3

This is my third rendition of Warble, a Spotify karaoke app, using Musixmatch for lyrics and Spotify for playback. This time it features a fully fleshed out picker, so it's not just searching this time, and also features a better queue system with names for each song. I've also tried a few new technologies, like NextAuth for authentication and tRPC for the backend, which has been a journey of its own.

Don't expect this to be maintained, but feel free to learn and fork it. There's no license, so you can do whatever you want with it.

## Please note:

This app is literally illegal if used in a production environment. I'm not responsible for any damages that may occur from using this app. The reason
for this is that it's using an exploit in MusixMatch to get the lyrics, which is against their terms of service. There is also some fun stuff in here like
regex-ing a public Spotify token to get an artists banner, which isn't available via their API and no license is given for this image to be used anywhere.

This is purely a passion project that I plan to use for New Year's Eve and other party occasions.

## Setup

I'm not going to provide a massive deal of documentation here, but I will try to explain how to set this up.
To start, I recommend using bun to run the project.

Copy `.env.example` to `.env` and fill in the values.
For a guide on musixmatch usertokens, see [my guide on npm](https://www.npmjs.com/package/musixmatch-richsync).

```
bun install
bun run spotify:setup
```

This will open a Spotify oauth page. It'll ask you to log in, and then give a confirmation code in the console.
Alternatively you can put the authorization into the database in the SpotifyCredentials model.

Now to run the application, run these three commands in separate terminals.

```
bun run dev
bun run spotify:track
docker-compose up -d
```

This will start the NextJS dev server, the Spotify playback tracker, and the Redis server.

For production, build the app and then run it with `bun run build && bun run start`, then make sure redis and the spotify:track script is running.

## Problems

Obviously the whole illegal part of it isn't great, but here are some other infrastructure things I would redo differently:

- The queue system isn't great with removing tracks. If the queue that warble stores doesn't match Spotify, things can get out of sync real quick. I would like to eventually use Spotify's queue endpoint to sync it up and stop any concurrency errors.
- The realtime method I am using is EventSources, which are fine but aren't technically built for this kind of "always-open" architecture. If you try to open the admin view, the browser and the admin page, you will struggle to open anything else as Chrome has a limit on the number of open EventSources you can have, which is a global tab limit. Websockets would fit a lot better here since they do not have this problem, but implementing them with tRPC looks and sounds like a nightmare, but I would like to implement this at some stage.
- The current NextJS version is out of date and I would like to try all the new fancy caching stuff in v15. I am also using a lot of `unstable_cache` which needs upgrading to the new cache scheme.
- Having to run 3 scripts to do development isn't ideal, it would be nice to combine the NextJS server with the track server, but this involves maintenance I don't think I want.
- There is no way to dockerize this app yet, making a Dockerfile would be nice.

## Technologies

-   [Next.js](https://nextjs.org)
-   [NextAuth.js](https://next-auth.js.org)
-   [Prisma](https://prisma.io)
-   [Tailwind CSS](https://tailwindcss.com)
-   [tRPC](https://trpc.io)
-   [Spotify](https://developer.spotify.com/)
-   [MusixMatch](https://musixmatch.com/)
