import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Whiteboard } from './whiteboard';

@Entity()
export class Project {
  @PrimaryGeneratedColumn() id = undefined;

  @Column('text') name = undefined;

  @OneToMany(() => Whiteboard, whiteboard => whiteboard.project, {
    cascade: true,
    eager: true
  })
  whiteboards = undefined;
}
