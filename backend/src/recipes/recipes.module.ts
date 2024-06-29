import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Recipes } from './recipes';
import { RecipesService } from './recipes.service';
import { RecipeController } from '@/recipes/recipe.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Recipes])],
  providers: [RecipesService],
  controllers: [RecipeController],
})
export class RecipesModule {}
