import { Column, Entity, PrimaryGeneratedColumn, OneToOne, OneToMany, JoinColumn } from 'typeorm'
import { BaseEntity } from '@/helpers/base.entity'
import { TrackEntity as Track } from './track.entity'
import { GenreEntity as Genre } from './genre.entity'
import { TagEntity as Tag } from './tag.entity'

@Entity({ name: 'albums', orderBy: { name: 'ASC' } })
export class AlbumEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: 'varchar' })
  name: string

  @Column({ type: 'varchar', default: '' })
  description: string

  @Column({ type: 'varchar' })
  poster: string

  @Column({ type: 'int', default: 1 })
  seasons: number

  @Column({ type: 'boolean', default: true })
  isActive: boolean

  // __Relation's
  @OneToOne(() => Genre)
  @JoinColumn()
  genre: Genre

  @OneToMany(() => Tag, (tag) => tag.albumId)
  tags: Tag[]

  @OneToMany(() => Track, (track) => track.albumId)
  tracks: Track[]
}
