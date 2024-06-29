import { Controller, Get } from '@nestjs/common';
import { GetRecipesDto } from '@/recipes/dto/get-recipes.dto';
import { RecipesService } from '@/recipes/recipes.service';

@Controller('recipes')
export class RecipeController {
  constructor(private readonly recipesService: RecipesService) {}
  @Get()
  async getRecipes(): Promise<GetRecipesDto> {
    return this.recipesService.getRecipes();
  }
}
