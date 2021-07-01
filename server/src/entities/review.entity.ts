import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  ManyToMany,
  JoinTable, 
} from 'typeorm';
import { Tag } from './tag.entity';
import { User } from './user.entity';
import { Comment } from './comment.entity';
import { Like } from './like.entity';

@Entity()
export class Review {
  @PrimaryGeneratedColumn()
  id: number;

  // 내용
  //@Column('text', { name: 'text' })
  //text: string;
  // ISBN
  //@Column('varchar', { name: 'book_id', length: 20 })
  //book_id: string;

  //요약
  @Column('varchar', { name: 'summary' })
  summary: string;

  // 점수
  @Column('float', { name: 'score', default: 0 })
  score: number;

  // 조회수
  @Column('int', { name: 'view_count', default: 0 })
  view_count: number;

  // 공개 여부
  @Column('boolean', { name: 'public', default: true })
  public: boolean;

  //좋아요 수
  @Column('int', { name: 'like', default: 0 })
  like_count: number;

  //imageurl
  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  //writer: userId가 FK로 저장됨
  @ManyToOne(() => User, (user) => user.reviews)
  user: User;

  @OneToMany(() => Comment, (comment) => comment.review, { cascade: true })
  comments: Comment[];

  @OneToMany(() => Like, (like) => like.review, { cascade: true })
  likes: Like[];

  @ManyToMany(() => Tag)
  @JoinTable({
    name: 'review_tags',
    joinColumn: {
      name: 'review',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'tag',
      referencedColumnName: 'id',
    },
  })
  tags: Tag[];
}
