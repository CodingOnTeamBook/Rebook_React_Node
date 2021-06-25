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

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, unique: true })
  userId: string;

  @Column({ nullable: false, unique: true })
  nickname: string;

  @Column({ nullable: true })
  gender: string;

  @Column({ nullable: true })
  ageRange: string;

  @Column({ nullable: true })
  genres: string;

  @Column({ nullable: true })
  profileImg: string;

  @Column({ nullable: true })
  info: string;
}
