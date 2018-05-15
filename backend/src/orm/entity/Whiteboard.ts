import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn
} from 'typeorm';
import { Project } from './Project';
import { View } from './View';

@Entity()
export class Whiteboard {
  @PrimaryGeneratedColumn() id: string;

  @Column() name: string;

  @OneToMany(type => View, view => view.whiteboard)
  views: View[];

  @ManyToOne(type => Project)
  project: Project;
}
