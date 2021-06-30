import {
  Column,
  Model,
  Table,
  HasMany,
  BelongsToMany,
  CreatedAt,
  UpdatedAt,
} from 'sequelize-typescript';

@Table({
  timestamps: true,
  underscored: true,
  modelName: 'User',
  tableName: 'users',
  paranoid: true,
  charset: 'utf8',
  collate: 'utf8_general_ci',
})
export class User extends Model<User> {
  @Column({ allowNull: false, unique: true })
  userId: string;

  @Column({ allowNull: false, unique: true })
  nickname: string;

  @Column({ allowNull: true })
  gender: string;

  @Column({ allowNull: true })
  ageRange: string;

  @Column({ allowNull: true })
  genres: string;

  @Column({ allowNull: true })
  profileImg: string;

  @Column({ allowNull: true })
  info: string;
}
