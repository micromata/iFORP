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

  @OneToMany(() => View, view => view.whiteboard, {
    cascade: true
  })
  views: View[];

  @ManyToOne(() => Project)
  project: Project;
}
