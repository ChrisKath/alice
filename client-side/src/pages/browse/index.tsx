import { useEffect, useState } from 'react'
import type { Album } from '@/types'
import { ArrayService } from '@/utils'
import { NextLink } from '@/components'

export interface IAlbum extends Omit<Album, 'directory'> {}

export default function BrowseContainer() {
  // __STATE <React.Hooks>
  const [albums, setAlbums] = useState<IAlbum[]>([])

  // __EFFECTS
  useEffect(() => {
    fetch('/services/space/albums')
      .then<IAlbum[]>((resp) => resp.json())
      .then((resp) => {
        const arr = ArrayService.orderBy(resp, 'name', 'asc')
        setAlbums(arr)
      })
  }, [])

  // __RENDER
  return (
    <div className='ui--browse-container container'>
      <div className='ui--browse-title'>
        <h1 className='h1'>Browse</h1>
      </div>

      <div className='ui--browse-group'>
        {albums.map((record, index) => (
          <NextLink href={`/browse/${record.id}`} key={index}>
            <div className='ui--browse-list'>
              <img className='poster' src={record.posters[0]} />
            </div>
          </NextLink>
        ))}
      </div>
    </div>
  )
}
