import { NextApiRequest, NextApiResponse } from 'next'
import { constants, copyFileSync, readdirSync } from 'fs'
import { join } from 'path'
import { Low, JSONFile } from 'lowdb'
import { v4 as uuid } from 'uuid'
import type { Album, Track } from '@/types'

// Use JSON file for storage
const albumsAdapter = new JSONFile<Album[]>('data/_albums.json')
const albums = new Low(albumsAdapter)

const tracksAdapter = new JSONFile<Track[]>('data/_tracks.json')
const tracks = new Low(tracksAdapter)

interface IQuery {
  album?: any
  track?: any
}

interface IBody {
  rootDir: string
  ignoreDir?: string[]
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      const { album, track }: IQuery = req.query
      let results: { albums?: Album[]; tracks?: Track[] } = {}

      if (album) {
        await albums.read()
        results.albums = albums.data || []
      }

      if (track) {
        await tracks.read()
        results.tracks = tracks.data || []
      }

      res.json(results)
      break

    case 'POST':
      const { rootDir, ignoreDir }: IBody = req.body

      if (!rootDir) {
        res.status(400)
        res.json({ error: 'Parameter `rootDir` is required.' })
        return void 0
      }

      const __dirSync = (path: string) => readdirSync(path, { withFileTypes: true })

      // UPDATE .ALBUMS
      albums.data = []
      __dirSync(rootDir)
        .filter((r) => r.isDirectory() && ignoreDir && ignoreDir.indexOf(r.name) < 0)
        .forEach((r) => {
          let path = join(rootDir, r.name)
          let id = uuid()
          let posters = __dirSync(path)
            .filter((poster) => poster.isFile() && poster.name.match(/.jpg|.png/gi))
            .map(({ name }) => {
              let source = join(path, name)
              let target = `static/media/posters/${id}.${name.split('.')[1]}`

              copyFileSync(source, `public/${target}`, constants.COPYFILE_EXCL)
              return `/${target}`
            })

          albums.data?.push({
            id,
            name: r.name,
            posters,
            directory: {
              base: path,
              episode: __dirSync(path)
                .filter((r) => r.isDirectory())
                .map((r) => join(path, r.name))
            }
          })
        })
      await albums.write()

      // UPDATE .TRACKS
      tracks.data = []
      for await (const album of albums.data) {
        album.directory.episode.forEach((episodeDir: string) => {
          __dirSync(episodeDir).forEach((track) => {
            tracks.data?.push({
              id: uuid(),
              albumId: album.id,
              fileName: join(episodeDir, track.name)
            })
          })
        })
      }
      await tracks.write()

      res.status(201)
      res.send('Update success.')
      break

    default:
      res.setHeader('Allow', ['GET', 'POST'])
      res.status(405)
      res.end(`Method ${req.method} Not Allowed`)
  }
}
