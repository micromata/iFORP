import { Whiteboard } from './whiteboard';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn
} from 'typeorm';
import { ViewAsset } from './asset';
import { InteractionElement } from './interaction-element';
import { htmlElementAttributeTransformer } from '../../lib/utils';

@Entity()
export class View {
  @PrimaryGeneratedColumn() id = undefined;

  @Column('text') name = undefined;

  @Column('boolean') hasFile = undefined;

  @Column('text', { nullable: true })
  head = undefined;

  @Column('text', { nullable: true })
  body = undefined;

  @Column('text', {
    nullable: true,
    transformer: htmlElementAttributeTransformer()
  })
  htmlElementAttributes = undefined;

  @OneToMany(() => InteractionElement, ie => ie.view, {
    cascade: true,
    eager: true
  })
  interactionElements = undefined;

  @OneToMany(() => ViewAsset, asset => asset.view, {
    cascade: true,
    eager: true
  })
  assets = undefined;

  @ManyToOne(() => Whiteboard, whiteboard => whiteboard.views, {
    onDelete: 'CASCADE'
  })
  whiteboard = undefined;
}
