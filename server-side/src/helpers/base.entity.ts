import { UpdateDateColumn, CreateDateColumn, PrimaryGeneratedColumn } from 'typeorm'

export class BaseEntity {
  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date
}
