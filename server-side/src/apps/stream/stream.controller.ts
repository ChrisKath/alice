import { Controller, Get, Header, Headers, HttpException, HttpStatus, Param, Res, StreamableFile } from '@nestjs/common'
import type { Response } from 'express'
import { createReadStream, statSync } from 'fs'
import { TracksService } from '@/apps/tracks/tracks.service'

@Controller('stream')
export class StreamController {
  constructor(private trackService: TracksService) {}

  @Get(':trackId')
  @Header('Accept-Ranges', 'bytes')
  async index(
    @Headers('range') range: string,
    @Param('trackId') trackId: string,
    @Res({ passthrough: true }) res: Response
  ): Promise<StreamableFile> {
    if (!range) throw new HttpException('Request Not Allowed', HttpStatus.BAD_REQUEST)

    try {
      const track = await this.trackService.findOne(trackId)
      const { size: fileSize } = statSync(track.pathFile)

      const chunkSize = 128e4
      const start = Number(range.replace(/\D/g, ''))
      const end = Math.min(start + chunkSize, fileSize - 1)
      const contentLangth = end - start + 1

      res.sendStatus(HttpStatus.PARTIAL_CONTENT)
      res.set({
        'Content-Type': `video/${track.pathFile.split('.')[1]}`,
        'Content-Range': `bytes ${start}-${end}/${fileSize}`,
        'Content-Lenght': contentLangth
      })

      const stream = createReadStream(track.pathFile, { start, end })
      return new StreamableFile(stream)
    } catch (error) {
      throw new HttpException('Streaming Service Failed: ' + error.message, HttpStatus.SERVICE_UNAVAILABLE)
    }
  }
}
