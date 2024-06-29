import { IsArray, ValidateNested } from 'class-validator';
import { GetRecipeDto } from '@/recipes/dto/get-recipe.dto';
import { Type } from 'class-transformer';

export class GetRecipesDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => GetRecipeDto)
  recipes: GetRecipeDto[];
}
