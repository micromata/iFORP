import { Whiteboard } from './Whiteboard';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn
} from 'typeorm';
import { ViewAsset } from './Asset';
import { InteractionElement } from './InteractionElement';
import { htmlElementAttributeTransformer } from '../../lib/utils';

@Entity()
export class View {
  @PrimaryGeneratedColumn() id: number;

  @Column() name: string;

  @Column() hasFile: boolean;

  @Column('text', { nullable: true })
  head: string;

  @Column('text', { nullable: true })
  body: string;

  @Column('text', {
    nullable: true,
    transformer: new htmlElementAttributeTransformer()
  })
  htmlElementAttributes: { [k: string]: string };

  @OneToMany(() => InteractionElement, ie => ie.view, {
    cascade: true,
    eager: true
  })
  interactionElements: InteractionElement[];

  @OneToMany(() => ViewAsset, asset => asset.view, {
    cascade: true,
    eager: true
  })
  assets: ViewAsset[];

  @ManyToOne(() => Whiteboard, whiteboard => whiteboard.views, {
    onDelete: 'CASCADE'
  })
  whiteboard: Whiteboard;
}
