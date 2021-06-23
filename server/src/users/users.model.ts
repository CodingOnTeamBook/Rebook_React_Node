import { Column, Model, Table, HasMany, BelongsToMany } from "sequelize-typescript";
//import { Review } from '../reviews/review.model';

@Table
export class User extends Model {
  @Column({ allowNull: false, unique: true })
  userId: string;

  @Column({ allowNull: false, unique: true })
  nickname: string;

  @Column({ allowNull: true })
  password: string;

  @Column({ allowNull: true })
  gender: string;

  @Column({ allowNull: true })
  provider: string;

  @Column({ allowNull: true })
  ageRange: string;

  @Column({ allowNull: true })
  genres: string;

  @Column({ allowNull: true })
  profileImg: string;
  
  //@HasMany(() => Review)
  //reviews: Review[];
}