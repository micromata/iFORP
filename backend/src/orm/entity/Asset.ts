import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { View } from './View';
import { Page } from './Page';

abstract class Asset {
  @PrimaryGeneratedColumn() id: string;
  @Column() type: 'css' | 'js';
  @Column() contents: string;
  @Column() location: string;

  get isInline() {
    return !this.location && this.contents;
  }
}

@Entity()
export class ViewAsset extends Asset {
  @ManyToOne(type => View)
  view: View;
}

@Entity()
export class PageAsset extends Asset {
  @ManyToOne(type => Page)
  page: Page;
}
