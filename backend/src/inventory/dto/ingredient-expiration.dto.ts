import { IsDate, IsNumber, IsString } from 'class-validator';
import { Transform } from 'class-transformer';

export class IngredientExpirationDto {
  @IsString()
  ingredientName: string;

  @IsDate()
  @Transform(({ value }) => new Date(value))
  expirationDate: Date;

  @IsNumber()
  qty: number;
}
