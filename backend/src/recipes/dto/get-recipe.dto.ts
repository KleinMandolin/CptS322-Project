import { IsNumber, IsString } from 'class-validator';

export class GetRecipeDto {
  @IsString()
  recipeName: string;

  @IsString()
  description: string;

  @IsString()
  mealType: string;

  @IsNumber()
  price: number;
}
