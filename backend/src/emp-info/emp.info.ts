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

  @OneToOne(() => EmpCredentials, (empCredentials) => empCredentials.empInfo)
  @JoinColumn({ name: 'username' })
  empCredentials: EmpCredentials;
}
