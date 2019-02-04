import { Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { View } from './view';

@Entity()
export class ViewLink {
  @PrimaryColumn('text')
  interactionId = undefined;

  @ManyToOne(() => View, view => view.viewLinks, {
    onDelete: 'CASCADE'
  })
  fromView = undefined;

  @PrimaryColumn('int')
  toViewId = undefined;
}
