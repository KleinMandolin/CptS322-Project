import { IsNumber, IsString } from 'class-validator';

export class SummaryIngredientDto {
  @IsString()
  ingredientName: string;

  @IsNumber()
  qty: number;

  @IsString()
  unit: string;
}
