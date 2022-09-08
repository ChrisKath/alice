import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
import { BaseEntity } from '@/helpers/base.entity'

@Entity({ name: 'users' })
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: 'varchar', length: 255, nullable: true, default: '' })
  displayName: string
}

export type UserDocument = User & BaseEntity
