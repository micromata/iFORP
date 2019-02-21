import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn
} from 'typeorm';
import { Directory } from './directory';
import { Asset } from './asset';

@Entity()
export class Page {
  @PrimaryGeneratedColumn()
  id = undefined;

  @Column('text')
  name = undefined;

  @Column('text')
  head = undefined;

  @Column('text')
  body = undefined;

  @Column('text')
  thumbnailPath = undefined;

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

  @ManyToOne(() => Directory)
  directory = undefined;
}
