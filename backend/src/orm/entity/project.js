import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn
} from 'typeorm';
import { Whiteboard } from './whiteboard';
import { User } from './user';

@Entity()
export class Project {
  @PrimaryGeneratedColumn()
  id = undefined;

  @Column('text')
  name = undefined;

  @ManyToOne(() => User)
  owner = undefined;

  @OneToMany(() => Whiteboard, whiteboard => whiteboard.project, {
    cascade: true,
    eager: true,
    onDelete: 'CASCADE'
  })
  whiteboards = undefined;
}
