import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn
} from 'typeorm';
import { Project } from './project';
import { View } from './view';

@Entity()
export class Whiteboard {
  @PrimaryGeneratedColumn()
  id = undefined;

  @Column('text')
  name = undefined;

  @OneToMany(() => View, view => view.whiteboard, {
    cascade: true
  })
  views = undefined;

  @ManyToOne(() => Project)
  project = undefined;
}
