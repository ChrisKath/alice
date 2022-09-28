import { NextApiRequest, NextApiResponse } from 'next'
import { Low, JSONFile } from 'lowdb'
import type { Album, Track } from '@/types'
import { ArrayService } from '@/utils'

// Use JSON file for storage
const albumsAdapter = new JSONFile<Album[]>('data/_albums.json')
const albums = new Low(albumsAdapter)

const tracksAdapter = new JSONFile<Track[]>('data/_tracks.json')
const tracks = new Low(tracksAdapter)

interface IQuery {
  albumId?: string
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      const { albumId }: IQuery = req.query

      await albums.read()

      if (albumId) {
        const _albums = albums.data || []
        const _album = ArrayService.findOne(_albums, 'id', albumId)

        if (_album) {
          await tracks.read()

          const _tracks = tracks.data || []
          const _track = ArrayService.findAll(_tracks, 'albumId', albumId)

          res.json({
            id: _album.id,
            name: _album.name,
            posters: _album.posters,
            episodes: _track.map((r, index) => ({
              index: index + 1,
              id: r.id,
              albumId: r.albumId
            }))
          })
        }
      } else {
        res.json(albums.data?.map(({ directory, ...r }) => r))
      }
      break

    default:
      res.setHeader('Allow', ['GET'])
      res.status(405)
      res.end(`Method ${req.method} Not Allowed`)
  }
}
