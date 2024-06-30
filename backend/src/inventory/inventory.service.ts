import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Ingredients } from '@/ingredients/ingredients';
import { Repository } from 'typeorm';
import { Stock } from '@/inventory/entities/stock';
import { StockIngredients } from '@/inventory/entities/stock-ingredients';
import { CreateStockDto } from '@/inventory/dto/create-stock.dto';
import { CreateIngredientSummaryDto } from '@/inventory/dto/create-ingredient-summary.dto';
import { SummaryIngredientDto } from '@/inventory/dto/summary-ingredient.dto';

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
      const ingredient = await this.ingredientsRepository.findOne({
        where: { ingredientName },
      });

      if (!ingredient) {
        await this.ingredientsRepository.save({
          ingredientName: ingredientName,
        });
      }

      const stockItem = this.stockIngredientsRepository.create({
        stockId: stockEntity.stockId,
        ingredientName: ingredientName,
        qty: qty,
        expirationDate: expirationDate,
      });

      await this.stockIngredientsRepository.save(stockItem);
    }
  }

  async getIngredientSummary(): Promise<CreateIngredientSummaryDto> {
    const ingredients = await this.ingredientsRepository.find();
    const summaryResults: SummaryIngredientDto[] = [];

    for (const item of ingredients) {
      // Get the summation of all ingredients of this name.
      const sumObject = await this.stockIngredientsRepository
        .createQueryBuilder('stock_ingredients')
        .select('SUM(stock_ingredients.qty)', 'sum')
        .where('stock_ingredients.ingredientName = :ingredientName', {
          ingredientName: item.ingredientName,
        })
        .getRawOne();
      const ingredient = await this.ingredientsRepository.findOne({
        where: { ingredientName: item.ingredientName },
      });

      let sum = 0;

      if (!sumObject.sum) {
        sum = 0;
      } else {
        sum = sumObject.sum;
      }
      if (!ingredient) {
        throw new NotFoundException(
          `Ingredient: ${item.ingredientName}, could not be found.`,
        );
      }
      const ingredientMeasure = ingredient.unit;
      summaryResults.push({
        ingredientName: ingredient.ingredientName,
        unit: ingredientMeasure,
        qty: sum,
      });
    }
    return { ingredients: summaryResults };
  }

  async subtractIngredient(ingredientName: string, qty: number): Promise<void> {
    let remainingQty = qty;
    while (remainingQty > 0) {
      const stockIngredient = await this.stockIngredientsRepository
        .createQueryBuilder('stock_ingredients')
        .where('stock_ingredients.ingredientName = :ingredientName', {
          ingredientName,
        })
        .orderBy('stock_ingredients.expirationDate', 'ASC')
        .getOne();
      if (!stockIngredient.qty) {
        throw new NotFoundException(
          `No stock entry for ingredient: ${ingredientName}`,
        );
      }
      if (stockIngredient.qty >= remainingQty) {
        stockIngredient.qty -= remainingQty;
        remainingQty = 0;
      } else {
        remainingQty -= stockIngredient.qty;
        stockIngredient.qty = 0;
      }

      try {
        if (stockIngredient.qty === 0) {
          await this.stockIngredientsRepository.remove(stockIngredient);
        } else {
          await this.stockIngredientsRepository.save(stockIngredient);
        }
      } catch (error) {
        throw new InternalServerErrorException('Error updating stock entry');
      }
    }
  }

  async nearExpiration(): Promise<{
    ingredients: { unit: string; ingredientName: string; qty: number; stockId: number; expirationDate: Date }[]
  }> {
    const currentDate = new Date();
    const sevenDaysLater = new Date();
    sevenDaysLater.setDate(currentDate.getDate() + 7);

    const items = await this.stockIngredientsRepository
      .createQueryBuilder('stock_ingredients')
      .leftJoinAndSelect('stock_ingredients.ingredients', 'ingredients')
      .where(
        'stock_ingredients.expirationDate BETWEEN :currentDate AND :sevenDaysLater',
        {
          currentDate,
          sevenDaysLater,
        },
      )
      .getMany();
    const expiring = items.map((item) => ({
      stockId: item.stockId,
      ingredientName: item.ingredientName,
      qty: item.qty,
      unit: item.ingredients.unit,
      expirationDate: item.expirationDate,
    }));
    return { ingredients: expiring };
  }

  async ingredientSummaryLow(): Promise<CreateIngredientSummaryDto> {
    const ingredientSummary = await this.getIngredientSummary();
    const lowIngredients = [];
    for (const ingredient of ingredientSummary.ingredients) {
      if (ingredient.qty < 10) {
        lowIngredients.push(ingredient);
      }
    }
    return { ingredients: lowIngredients };
  }
}
