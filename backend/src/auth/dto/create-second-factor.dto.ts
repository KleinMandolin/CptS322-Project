import { IsString, Length } from 'class-validator';

export class CreateSecondFactorDto {
  @IsString()
  @Length(8, 20)
  username: string;

  @IsString()
  @Length(6, 6)
  code: string;
}
