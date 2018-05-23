import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn
} from 'typeorm';
import { Directory } from './Directory';
import { PageAsset } from './Asset';

@Entity()
export class Page {
  @PrimaryGeneratedColumn() id: number;

  @Column() name: string;

  @Column() head: string;

  @Column() body: string;

  @Column() htmlElementAttributes: string;

  @OneToMany(() => PageAsset, asset => asset.page, {
    cascade: true
  })
  css: PageAsset[];

  @OneToMany(() => PageAsset, asset => asset.page, {
    cascade: true
  })
  js: PageAsset[];

  @ManyToOne(() => Directory)
  directory: Directory;
}
