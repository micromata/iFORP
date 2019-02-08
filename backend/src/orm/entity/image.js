import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Directory } from './directory';

@Entity()
export class Image {
  @PrimaryGeneratedColumn()
  id = undefined;

  @Column('text')
  name = undefined;

  @Column('int')
  width = undefined;

  @Column('int')
  height = undefined;

  @ManyToOne(() => Directory)
  directory = undefined;
}
