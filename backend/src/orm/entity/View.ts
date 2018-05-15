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

@Entity()
export class View {
  @PrimaryGeneratedColumn() id: string;

  @Column() name: string;

  @Column() head: string;

  @Column() body: string;

  @Column() htmlElementAttributes: string;

  @OneToMany(type => InteractionElement, ie => ie.view)
  interactionElements: InteractionElement[];

  @OneToMany(type => ViewAsset, asset => asset.view)
  css: ViewAsset[];

  @OneToMany(type => ViewAsset, asset => asset.view)
  js: ViewAsset[];

  @ManyToOne(type => Whiteboard)
  whiteboard: Whiteboard;
}
