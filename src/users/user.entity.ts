import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  AfterInsert,
  AfterRemove,
  AfterUpdate,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @AfterInsert()
  logInsert() {
    console.log('INSERTED USER WITH ID', this.id);
  }

  @AfterUpdate()
  logUpdate() {
    console.log('UPDATED USER WITH ID', this.id);
  }

  @AfterRemove()
  logRemove() {
    console.log('REMOVED USER WITH ID', this.id);
  }
}
