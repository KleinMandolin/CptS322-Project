import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecipeDetailsService } from './recipe-details.service';
import { RecipeDetailsController } from './recipe-details.controller';
import { Recipes } from '../recipes/recipes';
import { RecipeDetails } from './recipe-details';
import { IngredientsService } from '../ingredients/ingredients.service';
import { RecipesService } from '../recipes/recipes.service';
import { Ingredients } from '../ingredients/ingredients';

@Module({
  imports: [TypeOrmModule.forFeature([Recipes, RecipeDetails, Ingredients])],
  providers: [RecipeDetailsService, IngredientsService, RecipesService],
  controllers: [RecipeDetailsController],
})
export class RecipeDetailsModule {}
