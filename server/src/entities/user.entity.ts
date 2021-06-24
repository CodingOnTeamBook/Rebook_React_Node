import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToMany,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, type: 'varchar', length: 30, unique: true })
  userId: string;

  @Column({ nullable: false, type: 'varchar', length: 20, unique: true })
  nickname: string;

  @Column({ nullable: true, type: 'varchar', length: 10 })
  gender: string;

  @Column({ nullable: true, type: 'varchar', length: 10 })
  ageRange: string;

  @Column({ nullable: true, type: 'varchar' })
  genres: string;

  @Column({ nullable: true, type: 'varchar' })
  profileImg: string;

  @Column({ nullable: true, type: 'varchar' })
  info: string;

  //@OneToMany(() => Review, review => review.reviewer)
  //reviews: Review[];
}
