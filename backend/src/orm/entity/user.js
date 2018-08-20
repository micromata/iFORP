import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id = undefined;

  @Column('text', {
    unique: true
  })
  emailAddress = undefined;

  @Column('text')
  username = undefined;

  @Column('text')
  passwordHash = undefined;
}
