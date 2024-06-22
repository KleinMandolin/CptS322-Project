import { Entity, Column, OneToOne, PrimaryColumn, OneToMany } from 'typeorm';
import { UserInfo } from '@/user-info/user-info';
import UserCredentialRoles from '@/user-credential-roles/user-credential-roles';

@Entity()
export class UserCredentials {
  @PrimaryColumn()
  username: string;

  @Column()
  password: string;

  // The credential contains the original copy of the username.
  @OneToOne(() => UserInfo, (userInfo) => userInfo.userCredentials, {
    cascade: true,
  })
  empInfo: UserInfo;

  // Need to include 2-factor authentication in the credentials table.
  // Code
  @Column({ nullable: true })
  twoFactorCode: string;

  // Expiration date
  @Column({ nullable: true })
  twoFactorCodeExpires: Date;

  @OneToMany(
    () => UserCredentialRoles,
    (userCredentialRoles) => userCredentialRoles.user,
  )
  userCredentialRoles: UserCredentialRoles;
}
