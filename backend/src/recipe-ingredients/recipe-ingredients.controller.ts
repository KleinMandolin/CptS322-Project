import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { RecipeIngredientsService } from './recipe-ingredients.service';
import { CreateRecipeDto } from './dto/create-recipe-dto';
import { GetRecipeDetailsDto } from './dto/get-recipe-details.dto';
import { Recipes } from '../recipes/recipes';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from '@/auth/guards/jwt-auth.guard';
import { RolesGuard } from '@/auth/guards/roles.guard';
import { Roles } from '@/auth/decorators/roles.decorator';
import { _Role } from '@/user-management/enums/role-enum';

@Controller('recipe-details')
@UseGuards(JwtAuthGuard, RolesGuard)
export class RecipeIngredientsController {
  constructor(
    private readonly recipeDetailsService: RecipeIngredientsService,
  ) {}

  @Get()
  @Roles(_Role.ADMIN, _Role.EMPLOYEE)
  async getAllRecipes(): Promise<GetRecipeDetailsDto[]> {
    return this.recipeDetailsService.getAllRecipes();
  }

  @Post()
  @Roles(_Role.ADMIN)
  async createRecipe(
    @Body() createRecipeDto: CreateRecipeDto,
  ): Promise<Recipes> {
    return this.recipeDetailsService.createRecipe(createRecipeDto);
  }

  @Get('details')
  @Roles(_Role.ADMIN, _Role.EMPLOYEE)
  async getRecipesDetails(): Promise<GetRecipeDetailsDto[]> {
    return this.recipeDetailsService.getAllRecipes();
  }
}
