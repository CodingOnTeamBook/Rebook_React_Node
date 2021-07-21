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

  @Column('varchar', { name: 'isbn', length: 13 })
  isbn: string;

  // 내용
  @Column('varchar', { name: 'text' })
  text: string;

  //bookInfo
  @Column('text', { name: 'book_info' })
  book_info: string;

  //요약
  @Column('varchar', { name: 'summary', default: '' })
  summary: string;

  // 점수
  @Column('float', { name: 'score', default: 0 })
  score: number;

  // 조회수
  @Column('int', { name: 'view_count', default: 0 })
  view_count: number;

  // 공개 여부
  @Column('boolean', { name: 'isPublic', default: true })
  isPublic: boolean;

  //좋아요 수
  @Column('int', { name: 'like_count', default: 0 })
  like_count: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  //writer: userId가 FK로 저장됨
  @ManyToOne(() => User, (user) => user.reviews, { onDelete: 'SET NULL' })
  user: User;

  @OneToMany(() => Comment, (comment) => comment.review)
  comments: Comment[];

  @OneToMany(() => Like, (like) => like.review)
  likes: Like[];

  @ManyToMany(() => Tag, { cascade: true })
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
