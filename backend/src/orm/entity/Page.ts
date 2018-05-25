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

  @Column('text', { nullable: true })
  htmlElementAttributes: string;

  @OneToMany(() => PageAsset, asset => asset.page, {
    cascade: true,
    eager: true
  })
  css: PageAsset[];

  @OneToMany(() => PageAsset, asset => asset.page, {
    cascade: true,
    eager: true
  })
  js: PageAsset[];

  @ManyToOne(() => Directory)
  directory: Directory;
}
