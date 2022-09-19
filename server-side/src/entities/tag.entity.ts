import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { AlbumEntity as Album } from './album.entity'

@Entity({ name: 'tags', orderBy: { label: 'ASC' } })
export class TagEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: 'varchar' })
  label: string

  // __Relation's
  @ManyToOne(() => Album, (album) => album.tags)
  albumId: number
}
