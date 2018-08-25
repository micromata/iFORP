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

@Entity()
export class View {
  @PrimaryGeneratedColumn()
  id = undefined;

  @Column('text')
  name = undefined;

  @Column('boolean')
  hasFile = undefined;

  @Column('text', { nullable: true })
  head = undefined;

  @Column('text', { nullable: true })
  body = undefined;

  @Column('text', {
    nullable: true,
    transformer: {
      to(value = {}) {
        return Object.keys(value)
          .reduce((acc, cur) => [...acc, `${cur}=${value[cur]}`], [])
          .join(';');
      },
      from(value = '') {
        return value.split(';').reduce((acc, cur) => {
          const [key, val] = cur.split('=');
          return { ...acc, [key]: val };
        }, {});
      }
    }
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
