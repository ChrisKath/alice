import { NextApiRequest, NextApiResponse } from 'next'
import { createReadStream, statSync } from 'fs'
import { Low, JSONFile } from 'lowdb'
import { configs } from '@/constants'
import { ArrayService } from '@/utils'
import type { Track } from '@/types'

// Use JSON file for storage
const tracksAdapter = new JSONFile<Track[]>('data/_tracks.json')
const tracks = new Low(tracksAdapter)

export interface Params {
  trackId: string
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      await tracks.read()

      const { range } = req.headers
      const { trackId } = req.query as unknown as Params
      const track = ArrayService.findOne(tracks.data || [], 'id', trackId)

      if (track && range) {
        const { size: fileSize } = statSync(track.fileName)

        const chunkSize = 1 * 1e6
        const start = Number(range.replace(/\D/g, ''))
        const end = Math.min(start + chunkSize, fileSize - 1)
        const contentLangth = end - start + 1

        res.writeHead(206, {
          [configs.CONTENT_TYPE]: `video/${track.fileName.split('.')[1]}`,
          [configs.ACCEPT_RANGES]: `bytes`,
          [configs.CONTENT_RANGE]: `bytes ${start}-${end}/${fileSize}`,
          [configs.CONTENT_LENGTH]: contentLangth
        })

        const stream = createReadStream(track.fileName, { start, end })
        stream.pipe(res)
      } else {
        res.status(400)
        res.send('Request Not Allowed (400).')
      }
      break

    default:
      res.setHeader('Allow', ['GET'])
      res.status(405)
      res.end(`Method ${req.method} Not Allowed`)
  }
}
