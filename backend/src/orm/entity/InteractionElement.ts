import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { View } from './View';

@Entity()
export class InteractionElement {
  @PrimaryGeneratedColumn() id: number;

  @ManyToOne(type => View)
  view: View;
}
