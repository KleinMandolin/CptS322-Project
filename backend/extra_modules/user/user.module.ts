import { Module } from '@nestjs/common'; // Auto-generated
import { TypeOrmModule } from "@nestjs/typeorm"; // Need to import typeorm module for database use
import { UserService } from './user.service'; // Auto-generated
import { UserController } from './user.controller'; // Auto-generated
import { User } from './user.entity' // The user is always the user entity.

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UserService], // Auto-generated
  controllers: [UserController] // Auto-generated
})
export class UserModule {}
