import {
  Entity,
  Column,
  PrimaryColumn,
  OneToOne,
  JoinColumn,
  Unique,
} from 'typeorm';
import { UserCredentials } from '@/user-credentials/user-credentials';

@Entity()
@Unique(['username'])
export class UserInfo {
  @PrimaryColumn()
  username: string;

  @Column()
  email: string;

  @Column()
  f_name: string;

  @Column()
  l_name: string;

  // Create a one-to-one relationship with the emp_info relation.
  // The join column indicates the username is a foreign key.
  @OneToOne(() => UserCredentials, (empCredentials) => empCredentials.empInfo)
  @JoinColumn({ name: 'username' })
  userCredentials: UserCredentials;
}
