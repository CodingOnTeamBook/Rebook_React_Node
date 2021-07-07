import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Review } from './review.entity';
import { User } from './user.entity';

@Entity('like', { schema: 'Rebook' })
export class Like {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  //어떤 유저가 어떤 리뷰에 좋아요를 눌렀는지
  @ManyToOne(() => User, (user) => user.likes)
  user: User;

  @ManyToOne(() => Review, (review) => review.likes)
  review: Review;
}
