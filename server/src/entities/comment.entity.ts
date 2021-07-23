import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
} from 'typeorm';
import { User } from './user.entity';
import { Review } from './review.entity';

@Entity('comment', { schema: 'Rebook' })
export class Comment {
  @PrimaryGeneratedColumn()
  commentid: number;

  @Column('text', { nullable: false })
  text: string;

  @CreateDateColumn()
  createAt: Date;

  @UpdateDateColumn()
  updateAt: Date;

  @DeleteDateColumn()
  deleteAt: Date;

  @ManyToOne(() => User, (user) => user.comments, { onDelete: 'SET NULL' })
  user: User;

  @ManyToOne(() => Review, (review) => review.comments, { onDelete: 'CASCADE' })
  review: Review;
}
