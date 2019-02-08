import { View } from './view';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ViewImageInteractionElement {
  @PrimaryGeneratedColumn()
  id = undefined;

  @ManyToOne(() => View, view => view.imageInteractionElements, {
    onDelete: 'CASCADE'
  })
  view = undefined;

  @Column('int')
  x = undefined;

  @Column('int')
  y = undefined;

  @Column('int')
  width = undefined;

  @Column('int')
  height = undefined;
}
