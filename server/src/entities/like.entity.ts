import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from './user.entity';
import { Review } from './review.entity';

@Entity('like', { schema: 'Rebook' })
export class Like {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @ManyToOne(() => User, (user) => user.likes)
  user: User;

  @ManyToOne(() => Review, (review) => review.likes)
  review: Review;
}
