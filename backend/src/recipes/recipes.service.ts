import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Recipes } from './recipes';
import { Repository } from 'typeorm';
import { CreateRecipeDto } from '../recipe-details/dto/create-recipe-dto';

@Injectable()
export class RecipesService {
  constructor(
    @InjectRepository(Recipes)
    private readonly recipesRepository: Repository<Recipes>,
  ) {}

  async allRecipes(): Promise<Recipes[]> {
    return await this.recipesRepository.find();
  }

  async findRecipe(recipeName: string): Promise<Recipes> {
    return await this.recipesRepository.findOne({ where: { recipeName } });
  }

  async addRecipe(recipeDto: CreateRecipeDto): Promise<Recipes> {
    const recipe = new Recipes();
    recipe.recipeName = recipeDto.recipeName;
    recipe.price = parseFloat(recipeDto.price);
    return await this.recipesRepository.save(recipe);
  }

  async removeRecipe(recipeName: string): Promise<void> {
    const recipe = await this.findRecipe(recipeName);
    await this.recipesRepository.remove(recipe);
  }
}
