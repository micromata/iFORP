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
  @PrimaryGeneratedColumn() id: number;

  @Column() name: string;

  @OneToMany(type => View, view => view.whiteboard, {
    cascade: true,
    eager: true
  })
  views: View[];

  @ManyToOne(type => Project)
  project: Project;
}
