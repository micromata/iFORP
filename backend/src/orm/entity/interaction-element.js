import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { View } from './view';

@Entity()
export class InteractionElement {
  @PrimaryGeneratedColumn() id = undefined;

  @ManyToOne(() => View)
  view = undefined;
}
