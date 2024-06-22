import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import UserRoles, { _Role } from '@/user-roles/user-roles';
import { UserCredentials } from '@/user-credentials/user-credentials';

@Entity()
export default class UserCredentialRoles {
  @PrimaryColumn()
  username: string;

  @PrimaryColumn()
  _role: _Role;

  @ManyToOne(() => UserCredentials, (user) => user.username)
  @JoinColumn({ name: 'username' })
  // -- user -- is the entity relationship UserCredentialRoles has to UserCredentials.
  user: UserCredentials;

  @ManyToOne(() => UserRoles, (userRoles) => userRoles.userRole)
  @JoinColumn({ name: '_role' })
  // -- roleEntity -- is the entity relationship UserCredentialRoles has to UserRoles.
  roleEntity: UserRoles;
}
