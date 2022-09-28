import { useCallback, useEffect, useRef, useState } from 'react'
import { useVideo } from 'react-use'
import { useGetParam } from '@/hooks'
import type { Album, Track } from '@/types'

export interface IAlbum extends Omit<Album, 'directory'> {
  episodes: Omit<Track, 'fileName'>[]
}

export default function AlbumContainer() {
  // __STATE <React.Hooks>
  const videoRef = useRef<HTMLVideoElement>(null)

  const albumId = useGetParam('albumId')
  const [state, setState] = useState<IAlbum>()

  // __FUNCTIONS
  const handlePlay = useCallback(
    (id: string, autoPlay: boolean = true) => {
      const { current: elm } = videoRef
      if (elm) {
        elm.pause()
        elm.currentTime = 0

        elm.setAttribute('src', `/services/stream/${id}`)
        elm.load()

        if (autoPlay) elm.play()
      }
    },
    [videoRef]
  )

  // __EFFECTS
  useEffect(() => {
    if (albumId) {
      fetch(`/services/space/albums?albumId=${albumId}`)
        .then<IAlbum>((resp) => resp.json())
        .then((resp) => {
          setState(resp)
          if (resp.episodes.length) handlePlay(resp.episodes[0].id, false)
        })
    }
  }, [albumId, handlePlay])

  // __RENDER
  return (
    <div className='ui--browse-album container'>
      <video controls ref={videoRef} />

      <div className='ui--browse-album-episodes'>
        {state?.episodes.map((record, index) => (
          <button className='btn btn-secondary' onClick={() => handlePlay(record.id)} key={index}>
            <span className='text'>EP {String(index + 1).padStart(2, '0')}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
