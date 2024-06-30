import { ArrayNotEmpty, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { SummaryIngredientDto } from '@/inventory/dto/summary-ingredient.dto';

export class CreateIngredientSummaryDto {
  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => SummaryIngredientDto)
  ingredients: SummaryIngredientDto[];
}
