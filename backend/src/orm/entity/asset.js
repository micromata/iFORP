import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Asset {
  @PrimaryGeneratedColumn()
  id = undefined;

  @Column('text')
  type = undefined;

  @Column('text', { nullable: true })
  contents = undefined;

  @Column('text', { nullable: true })
  location = undefined;

  get isInline() {
    return !this.location && this.contents;
  }
}
