import { Entity, OneToMany, PrimaryColumn } from 'typeorm';
import UserCredentialRoles from '@/user-credential-roles/user-credential-roles';

// Role is a keyword in postgresql; it's probably best to avoid conflict.
export enum _Role {
  EMPLOYEE = 'employee',
  ADMIN = 'admin',
}

@Entity()
export default class UserRoles {
  @PrimaryColumn({
    type: 'enum',
    enum: _Role,
  })
  userRole: _Role;

  @OneToMany(
    () => UserCredentialRoles,
    (userCredentialRoles) => userCredentialRoles.roleEntity,
  )
  userCredentialRoles: UserCredentialRoles[];
}
