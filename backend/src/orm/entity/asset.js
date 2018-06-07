import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { View } from './view';
import { Page } from './page';

export class Asset {
  @PrimaryGeneratedColumn() id = undefined;

  @Column('text') type = undefined;

  @Column('text', { nullable: true })
  contents = undefined;

  @Column('text', { nullable: true })
  location = undefined;

  get isInline() {
    return !this.location && this.contents;
  }
}

@Entity()
export class ViewAsset extends Asset {
  @ManyToOne(() => View)
  view = undefined;
}

@Entity()
export class PageAsset extends Asset {
  @ManyToOne(() => Page)
  page = undefined;
}
