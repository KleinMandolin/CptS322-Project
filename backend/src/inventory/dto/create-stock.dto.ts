import {
  ArrayNotEmpty,
  IsArray,
  IsDate,
  ValidateNested,
} from 'class-validator';
import { IngredientExpirationDto } from '@/inventory/dto/ingredient-expiration.dto';
import { Transform, Type } from 'class-transformer';

export class CreateStockDto {
  @IsDate()
  @Transform(({ value }) => new Date(value))
  stockDate: Date;

  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => IngredientExpirationDto)
  ingredients: IngredientExpirationDto[];
}
