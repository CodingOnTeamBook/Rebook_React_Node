import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from './user.entity';
import { Review } from './review.entity';

@Entity('like', { schema: 'Rebook' })
export class Like {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  //어떤 유저가 어떤 리뷰에 좋아요를 눌렀는지
  @ManyToOne(() => User, (user) => user.likes, { onDelete: 'CASCADE' })
  user: User;

  @ManyToOne(() => Review, (review) => review.likes, { onDelete: 'CASCADE' })
  review: Review;
}
