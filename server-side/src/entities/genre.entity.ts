import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity({ name: 'genres', orderBy: { label: 'ASC' } })
export class GenreEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: 'varchar', default: '' })
  label: string
}
