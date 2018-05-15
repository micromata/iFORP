import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { View } from './View';

@Entity()
export class InteractionElement {
  @PrimaryGeneratedColumn() id: string;

  @ManyToOne(type => View)
  view: View;
}
