import {Injectable, InternalServerErrorException, NotFoundException,} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Recipes} from './recipes';
import {Repository} from 'typeorm';
import {CreateRecipeDto} from '@/recipe-ingredients/dto/create-recipe-dto';
import {GetRecipesDto} from '@/recipes/dto/get-recipes.dto';
import {plainToInstance} from 'class-transformer';

@Injectable()
export class RecipesService {
  constructor(
    @InjectRepository(Recipes)
    private readonly recipesRepository: Repository<Recipes>,
  ) {}

  async allRecipes(): Promise<Recipes[]> {
    return this.recipesRepository.find();
  }

  async findRecipe(recipeName: string): Promise<Recipes> {
    return this.recipesRepository.findOne({ where: { recipeName } });
  }

  async addRecipe(recipeDto: CreateRecipeDto): Promise<Recipes> {
    const recipe = new Recipes();
    recipe.recipeName = recipeDto.recipeName;
    recipe.price = parseFloat(recipeDto.price);
    recipe.mealType = recipeDto.mealType;
    recipe.descriptions = recipeDto.description;
    try {
      return this.recipesRepository.save(recipe);
    } catch (error) {
      throw new InternalServerErrorException(`Error adding recipe`);
    }
  }

  async getRecipes(): Promise<GetRecipesDto> {
    const recipes = await this.recipesRepository.find();
    return plainToInstance(GetRecipesDto, { recipes });
  }

  async removeRecipe(recipeName: string): Promise<void> {
    try {
      const recipe = await this.findRecipe(recipeName);
      if (recipe) {
        await this.recipesRepository.remove(recipe);
      } else {
        throw new NotFoundException(`Recipe not found`);
      }
    } catch (error) {
      throw new InternalServerErrorException(`Error removing recipe`);
    }
  }
}
