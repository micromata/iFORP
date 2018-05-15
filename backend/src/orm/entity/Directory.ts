import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Page } from './Page';

@Entity()
export class Directory {
  @PrimaryGeneratedColumn() id: string;

  @Column() name: string;

  @OneToMany(type => Page, page => page.directory)
  pages: Page[];
}
