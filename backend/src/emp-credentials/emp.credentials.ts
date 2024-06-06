import {
  Entity,
  Column,
  OneToOne,
  PrimaryColumn,
} from 'typeorm';
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

  // Need to include 2-factor authentication in the credentials table.
  // Code
  @Column({ nullable: true })
  twoFactorCode: string;

  // Expiration date
  @Column({ nullable: true })
  twoFactorCodeExpires: Date;
}
