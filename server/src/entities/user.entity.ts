import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Comment } from './comment.entity';
import { Genre } from './genre.entity';
import { Like } from './like.entity';
import { Review } from './review.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { nullable: false, length: 30, unique: true })
  userId: string;

  @Column('varchar', { nullable: false, length: 20, unique: true })
  nickname: string;

  @Column('varchar', { nullable: true, length: 10 })
  gender: string;

  @Column('varchar', { nullable: true, length: 10 })
  ageRange: string;

  @Column('varchar', { nullable: true })
  profileImg: string;

  @Column('varchar', { nullable: true })
  info: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Review, (review) => review.user)
  reviews: Review[];

  @OneToMany(() => Comment, (comment) => comment.user)
  comments: Comment[];

  @OneToMany(() => Like, (like) => like.user)
  likes: Like[];

  @ManyToMany(() => Genre, { cascade: true })
  @JoinTable({ name: 'user_genres' })
  genres: Genre[];

  @ManyToMany(() => User, { cascade: true })
  @JoinTable({
    name: 'following',
    joinColumn: {
      name: 'following',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'userId',
      referencedColumnName: 'id',
    },
  })
  followings: User[];

  @ManyToMany(() => User, { cascade: true })
  @JoinTable({
    name: 'follower',
    joinColumn: {
      name: 'follower',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'userId',
      referencedColumnName: 'id',
    },
  })
  followers: User[];
}
