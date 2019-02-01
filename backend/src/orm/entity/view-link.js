import { Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { View } from './view';

@Entity()
export class ViewLink {
  @PrimaryColumn('text')
  interactionId = undefined;

  @PrimaryColumn('int')
  @ManyToOne(() => View, view => view.viewLinks, {
    onDelete: 'CASCADE'
  })
  fromView = undefined;

  @PrimaryColumn('int')
  toView = undefined;
}
