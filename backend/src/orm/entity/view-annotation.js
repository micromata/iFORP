import { View } from './view';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ViewAnnotation {
  @PrimaryGeneratedColumn()
  id = undefined;

  @ManyToOne(() => View, view => view.annotations, {
    onDelete: 'CASCADE'
  })
  view = undefined;

  @Column('text')
  author = undefined;

  @Column('text')
  text = undefined;

  @Column('text')
  isoDate = undefined;

  @Column('text')
  viewportSize = undefined;

  @Column('int')
  x = undefined;

  @Column('int')
  y = undefined;
}
