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
import { ViewLink } from './view-link';
import { ViewAnnotation } from './view-annotation';

@Entity()
export class View {
  @PrimaryGeneratedColumn()
  id = undefined;

  @Column('text')
  name = undefined;

  @Column('boolean')
  hasFile = undefined;

  @Column('text', { nullable: true })
  fileType = undefined;

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

  @ManyToMany(() => Asset, {
    cascade: true,
    eager: true
  })
  @JoinTable()
  assets = undefined;

  @OneToMany(() => ViewLink, viewLink => viewLink.fromView, {
    cascade: true,
    eager: true,
    onDelete: 'CASCADE'
  })
  viewLinks = undefined;

  @ManyToOne(() => Whiteboard, whiteboard => whiteboard.views, {
    onDelete: 'CASCADE'
  })
  whiteboard = undefined;

  @OneToMany(() => ViewAnnotation, viewAnnotation => viewAnnotation.view, {
    cascade: true,
    eager: true,
    onDelete: 'CASCADE'
  })
  annotations = undefined;
}
