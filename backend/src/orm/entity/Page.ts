import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn
} from 'typeorm';
import { Directory } from './Directory';
import { PageAsset } from './Asset';
import { htmlElementAttributeTransformer } from '../../lib/utils';

@Entity()
export class Page {
  @PrimaryGeneratedColumn() id: number;

  @Column() name: string;

  @Column() head: string;

  @Column() body: string;

  @Column('text', {
    nullable: true,
    transformer: new htmlElementAttributeTransformer()
  })
  htmlElementAttributes: { [k: string]: string };

  @OneToMany(() => PageAsset, asset => asset.page, {
    cascade: true,
    eager: true
  })
  assets: PageAsset[];

  @ManyToOne(() => Directory)
  directory: Directory;
}
