import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
import { BaseEntity } from '@/helpers/base.entity'

@Entity({ name: 'playlists', orderBy: { createdAt: 'ASC' } })
export class PlaylistEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: 'varchar', default: '' })
  name: string
}
