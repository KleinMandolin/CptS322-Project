import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Recipes } from './recipes';
import { Repository } from 'typeorm';

@Injectable()
export class RecipesService {
  constructor(
    @InjectRepository(Recipes)
    private readonly recipesRepository: Repository<Recipes>,
  ) {}

  async findRecipe(id: number): Promise<Recipes> {
    return await this.recipesRepository.findOne({ where: { id } });
  }

  async addRecipe(name: string, price: number): Promise<Recipes> {
    const recipe = new Recipes();
    recipe.recipeName = name;
    recipe.price = price;
    return await this.recipesRepository.save(recipe);
  }

  async removeRecipe(id: number): Promise<void> {
    const recipe = await this.findRecipe(id);
    await this.recipesRepository.remove(recipe);
  }
}
