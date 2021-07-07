import { Column, Entity, JoinTable, ManyToMany, PrimaryColumn } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Genre {
  @PrimaryColumn()
  id: number;

  @Column('varchar', { length: 10 })
  title: string;
}
