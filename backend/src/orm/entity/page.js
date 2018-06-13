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
import { htmlElementAttributeTransformer } from '../../lib/utils';

@Entity()
export class Page {
  @PrimaryGeneratedColumn() id = undefined;

  @Column('text') name = undefined;

  @Column('text') head = undefined;

  @Column('text') body = undefined;

  @Column('text', {
    nullable: true,
    transformer: htmlElementAttributeTransformer()
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
