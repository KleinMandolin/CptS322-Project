import {
  ArrayNotEmpty,
  IsArray,
  IsDecimal,
  IsNotEmpty,
  IsString,
  ValidateNested,
} from 'class-validator';
import { CreateRecipeDetailDto } from './create-recipe-detail.dto';
import { Type } from 'class-transformer';

export class CreateRecipeDto {
  @IsString()
  @IsNotEmpty()
  recipeName: string;

  @IsDecimal()
  @IsNotEmpty()
  price: string;

  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => CreateRecipeDetailDto)
  ingredients: CreateRecipeDetailDto[];
}
