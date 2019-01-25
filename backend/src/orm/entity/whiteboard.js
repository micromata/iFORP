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
    cascade: true,
    onDelete: 'CASCADE'
  })
  views = undefined;

  @ManyToOne(() => Project, project => project.whiteboards, {
    onDelete: 'CASCADE'
  })
  project = undefined;
}
