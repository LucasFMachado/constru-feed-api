import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, JoinColumn, ManyToOne } from 'typeorm'
import Tags from './Tags'
import Users from './Users'

@Entity('feedbacks')
class Feedbacks {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  sender_id: number

  @JoinColumn({ name: 'sender_id' })
  @ManyToOne(() => Users)
  userSender: Users

  @Column()
  receiver_id: number

  @JoinColumn({ name: 'receiver_id' })
  @ManyToOne(() => Users)
  userReceiver: Users

  @Column()
  tag_id: number

  @JoinColumn({ name: 'tag_id' })
  @ManyToOne(() => Tags)
  tag: Tags

  @Column()
  message: string

  @Column()
  anonymous: boolean

  @Column()
  deleted: boolean

  @CreateDateColumn()
  created_at: Date
}

export default Feedbacks
