import {
  ArrayNotEmpty,
  IsArray,
  IsDate,
  ValidateNested,
} from 'class-validator';
import { IngredientDto } from '@/inventory/dto/ingredient.dto';
import { Transform, Type } from 'class-transformer';

export class CreateStockDto {
  @IsDate()
  @Transform(({ value }) => new Date(value))
  stockDate: Date;

  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => IngredientDto)
  ingredients: IngredientDto[];
}
