import { Whiteboard } from './whiteboard';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn
} from 'typeorm';
import { Asset } from './asset';
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

  @ManyToMany(() => Asset, {
    cascade: true,
    eager: true
  })
  @JoinTable()
  assets = undefined;

  @ManyToOne(() => Whiteboard, whiteboard => whiteboard.views, {
    onDelete: 'CASCADE'
  })
  whiteboard = undefined;
}
