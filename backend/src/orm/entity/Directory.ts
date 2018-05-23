import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Page } from './Page';

@Entity()
export class Directory {
  @PrimaryGeneratedColumn() id: number;

  @Column() name: string;

  @OneToMany(() => Page, page => page.directory, {
    cascade: true
  })
  pages: Page[];
}
