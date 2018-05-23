import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { View } from './View';
import { Page } from './Page';

export class Asset {
  @PrimaryGeneratedColumn() id: number;
  @Column() type: 'css' | 'js';
  @Column('text', { nullable: true })
  contents: string;
  @Column('text', { nullable: true })
  location: string;

  get isInline() {
    return !this.location && this.contents;
  }
}

@Entity()
export class ViewAsset extends Asset {
  @ManyToOne(() => View)
  view: View;
}

@Entity()
export class PageAsset extends Asset {
  @ManyToOne(() => Page)
  page: Page;
}
