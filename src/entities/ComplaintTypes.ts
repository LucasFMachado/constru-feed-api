import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

@Entity('complaint_types')
class ComplaintTypes {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column()
  active: boolean

  @Column()
  deleted: boolean

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date
}

export default ComplaintTypes
