import { Controller, Get, Post, Body } from '@nestjs/common';
import { RecipeDetailsService } from './recipe-details.service';
import { CreateRecipeDto } from './dto/create-recipe-dto';
import { GetRecipeDetailsDto } from './dto/get-recipe-details.dto';
import { Recipes } from '../recipes/recipes';

@Controller('recipe-details')
export class RecipeDetailsController {
  constructor(private readonly recipeDetailsService: RecipeDetailsService) {}

  @Get()
  async getAllRecipes(): Promise<GetRecipeDetailsDto[]> {
    return this.recipeDetailsService.getAllRecipes();
  }

  @Post()
  async createRecipe(
    @Body() createRecipeDto: CreateRecipeDto,
  ): Promise<Recipes> {
    return this.recipeDetailsService.createRecipe(createRecipeDto);
  }

  @Get('details')
  async getRecipesDetails(): Promise<GetRecipeDetailsDto[]> {
    return this.recipeDetailsService.getAllRecipes();
  }
}
