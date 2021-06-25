import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from './user.entity';

@Entity('like', { schema: 'Rebook' })
export class Like {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('int', { name: 'count' })
  count: number;

  // @ManyToOne((type) => User, (user) => user.likes)
  // user: User;
}
