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

import { User } from './user.entity';
// import { Comment } from './comment.entity';

@Entity()
export class Review {
  @PrimaryGeneratedColumn()
  id: number;

  // 내용
  @Column('text', { name: 'text' })
  text: string;

  // ISBN
  @Column('text', { name: 'book_id' })
  book_id: number;

  // 점수
  @Column('int', { name: 'score', default: 0 })
  score: number;

  // 조회수
  @Column('int', { name: 'view_count', default: 0 })
  view_count: number;

  // 공개 여부
  @Column('boolean', { name: 'public', default: true })
  public: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  //   @ManyToOne(() => User, (user) => user.reviews)
  //   user: User;

  //   @OneToMany(() => Comment, (comment) => comment.review)
  //   comments: Comment[];

  //   @ManyToMany(() => Tag)
  //   @JoinTable({
  //     name: 'review_tags',
  //     joinColumn: {
  //       name: 'review',
  //       referencedColumnName: 'id',
  //     },
  //     inverseJoinColumn: {
  //       name: 'tag',
  //       referencedColumnName: 'id',
  //     },
  //   })
  //   tags: Tag[];
}
