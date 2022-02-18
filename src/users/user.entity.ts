import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  AfterInsert,
  AfterRemove,
  AfterUpdate,
  OneToMany,
} from 'typeorm';

import { Report } from 'src/reports/report.entity';
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @OneToMany(() => Report, (report) => report.user)
  reports: Report[];

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
