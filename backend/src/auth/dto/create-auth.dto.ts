import { IsString, IsEmail, Length } from 'class-validator';

export class CreateAuthDto {
  @IsString()
  @Length(8, 20)
  username: string;

  @IsString()
  @Length(8, 100)
  password: string;

  @IsEmail()
  email: string;

  @IsString()
  @Length(2, 50)
  firstName: string;

  @IsString()
  @Length(2, 50)
  lastName: string;
}
