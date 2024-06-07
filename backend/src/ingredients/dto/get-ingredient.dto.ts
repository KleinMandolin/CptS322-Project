import { IsNumber } from 'class-validator';

export class GetIngredientDto {
  @IsNumber()
  id: number;
}
