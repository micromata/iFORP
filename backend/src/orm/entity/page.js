import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn
} from 'typeorm';
import { Directory } from './directory';
import { PageAsset } from './asset';
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

  @OneToMany(() => PageAsset, asset => asset.page, {
    cascade: true,
    eager: true
  })
  assets = undefined;

  @ManyToOne(() => Directory)
  directory = undefined;
}
