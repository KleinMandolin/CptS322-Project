import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Ingredients } from '@/ingredients/ingredients';
import { Repository } from 'typeorm';
import { Stock } from '@/inventory/entities/stock';
import { StockIngredients } from '@/inventory/entities/stock-ingredients';
import { CreateStockDto } from '@/inventory/dto/create-stock.dto';

@Injectable()
export class InventoryService {
  constructor(
    @InjectRepository(Ingredients)
    private readonly ingredientsRepository: Repository<Ingredients>,
    @InjectRepository(Stock)
    private readonly stockRepository: Repository<Stock>,
    @InjectRepository(StockIngredients)
    private readonly stockIngredientsRepository: Repository<StockIngredients>,
  ) {}

  async createStock(createStockDto: CreateStockDto): Promise<void> {
    const { ingredients, stockDate } = createStockDto;
    // Create the stock entity.
    const stockEntity = await this.stockRepository.save({ stockDate });

    for (const ingredientDto of ingredients) {
      const { ingredientName, expirationDate, qty } = ingredientDto;
      console.log(`Attempting to create ingredient: ${ingredientName}`);
      const ingredient = await this.ingredientsRepository.findOne({
        where: { ingredientName },
      });

      if (!ingredient) {
        await this.ingredientsRepository.save({
          ingredientName: ingredientName,
        });
      }

      console.log({
        stockId: stockEntity.stockId,
        ingredientName,
        qty,
        expirationDate,
      });

      const stockItem = this.stockIngredientsRepository.create({
        stockId: stockEntity.stockId,
        ingredientName: ingredientName,
        qty: qty,
        expirationDate: expirationDate,
      });

      console.log(JSON.stringify(stockItem));

      await this.stockIngredientsRepository.save(stockItem);
    }
  }

  async getIngredientSummary(
    ingredientName: string,
  ): Promise<{ unit: string; qty: any }> {
    console.log(ingredientName); // Todo: remove this line
    // Get the summation of all ingredients of this name.
    let sum = await this.stockIngredientsRepository
      .createQueryBuilder('stock_ingredients')
      .select('SUM(stock_ingredients.qty)', 'sum')
      .where('stock_ingredients.ingredientName = :ingredientName', {
        ingredientName,
      })
      .getRawOne();
    const ingredient = await this.ingredientsRepository.findOne({
      where: { ingredientName: ingredientName },
    });

    if (!sum) {
      sum = 0;
    }
    if (!ingredient) {
      throw new NotFoundException(
        `Ingredient: ${ingredientName}, could not be found.`,
      );
    }
    const ingredientMeasure = ingredient.unit || null;
    return { qty: sum, unit: ingredientMeasure };
  }
}
