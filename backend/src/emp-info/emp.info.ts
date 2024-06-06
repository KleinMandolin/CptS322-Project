import { Entity, Column, PrimaryColumn, OneToOne, JoinColumn } from 'typeorm';
import { EmpCredentials } from '../emp-credentials/emp.credentials';

@Entity()
export class EmpInfo {
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
  @OneToOne(() => EmpCredentials, (empCredentials) => empCredentials.empInfo)
  @JoinColumn({ name: 'username' })
  empCredentials: EmpCredentials;
}
