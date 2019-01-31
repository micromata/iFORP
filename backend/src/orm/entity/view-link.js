import { Entity, Column, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { View } from './view';

@Entity()
export class ViewLink {
  @PrimaryGeneratedColumn()
  id = undefined;

  @Column('text')
  interactionId = undefined;

  @ManyToOne(() => View, view => view.viewLinks, {
    onDelete: 'CASCADE'
  })
  fromView = undefined;

  @Column('int')
  toView = undefined;
}
