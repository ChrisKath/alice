import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { BaseEntity } from '@/helpers/base.entity'
import { AlbumEntity as Album } from './album.entity'

@Entity({ name: 'tracks', orderBy: { episode: 'ASC' } })
export class TrackEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ type: 'varchar' })
  name: string

  @Column({ type: 'varchar', default: '' })
  description: string

  @Column({ type: 'int', default: 1 })
  season: number

  @Column({ type: 'int', default: 1 })
  episode: number

  @Column({ type: 'varchar' })
  pathFile: string

  @Column({ type: 'int8', default: 0 })
  size: number

  @Column({ type: 'int8', default: 0 })
  duration: number

  @Column({ type: 'json', nullable: true, default: null })
  recap: object

  @Column({ type: 'json', nullable: true, default: null })
  intro: object

  @Column({ type: 'boolean', default: true })
  isActive: boolean

  // __Relation's
  @ManyToOne(() => Album, (album) => album.tracks)
  albumId: number
}
