import { Column, Entity, PrimaryColumn } from 'typeorm'
import { BaseEntity } from '@/helpers/base.entity'
import { v4 as uuidV4 } from 'uuid'

@Entity({ name: 'tracks' })
export class Track extends BaseEntity {
  @PrimaryColumn({ type: 'uuid', default: uuidV4() })
  id: string

  @Column({ type: 'varchar', default: '' })
  name: string

  @Column({ type: 'int2', default: 1 })
  albumId: number

  @Column({ type: 'int8', default: 0 })
  milliseconds: number

  @Column({ type: 'int8', default: 0 })
  bytes: number
}

export type TrackDocument = Track & BaseEntity
