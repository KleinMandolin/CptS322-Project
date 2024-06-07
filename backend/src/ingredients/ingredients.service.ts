import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Ingredients } from './ingredients';
import { Repository } from 'typeorm';

@Injectable()
export class IngredientsService {
  constructor(
    @InjectRepository(Ingredients)
    private readonly ingredientsRepository: Repository<Ingredients>,
  ) {}

  async getIngredient(ingredientId: number): Promise<Ingredients> {
    return await this.ingredientsRepository.findOne({
      where: { id: ingredientId },
    });
  }

  async addIngredient(ingredientName: string): Promise<Ingredients> {
    const ingredient = new Ingredients();
    ingredient.ingredientName = ingredientName;
    return await this.ingredientsRepository.save(ingredient);
  }

  async getQty(ingredientId: number): Promise<number> {
    const ingredient = await this.getIngredient(ingredientId);
    return ingredient.qty;
  }

  async updateQty(ingredientId: number, qty: number): Promise<Ingredients> {
    const ingredient = await this.getIngredient(ingredientId);
    ingredient.qty = qty;
    return this.ingredientsRepository.save(ingredient);
  }
}
