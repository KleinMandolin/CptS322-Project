import { Entity, Column, PrimaryColumn, OneToOne } from 'typeorm';
import { EmpInfo } from '../emp-info/emp.info';

@Entity()
export class EmpCredentials {
  @PrimaryColumn()
  username: string;

  @Column()
  password: string;

  // The credential contains the original copy of the username.
  @OneToOne(() => EmpInfo, (empInfo) => empInfo.empCredentials, {
    cascade: true,
  })
  empInfo: EmpInfo;
}
