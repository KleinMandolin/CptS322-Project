import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Recipes } from '@/recipes/recipes';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderDetails } from './order-details';
import { Orders } from '@/orders/orders';
import { GetOrderDetailsDto } from './dto/get-order-details.dto';
import { CreateOrderRecipesDto } from './dto/create-order-recipes.dto';
import { GetOrderRecipeDto } from './dto/get-order-recipe.dto';
import { CreateOrderRecipeDto } from '@/order-details/dto/create-order-recipe.dto';
import { InventoryService } from '@/inventory/inventory.service';

@Injectable()
export class OrderDetailsService {
  constructor(
    @InjectRepository(Recipes)
    private readonly recipesRepository: Repository<Recipes>,
    @InjectRepository(OrderDetails)
    private readonly orderDetailsRepository: Repository<OrderDetails>,
    @InjectRepository(Orders)
    private readonly ordersRepository: Repository<Orders>,
    private readonly inventoryService: InventoryService,
  ) {}

  async createOrder(
    createOrderRecipesDto: CreateOrderRecipesDto,
  ): Promise<GetOrderDetailsDto> {
    let total = 0;

    // Create and save the order entity
    const order = this.ordersRepository.create();
    const savedOrder = await this.ordersRepository.save(order);

    // Create order details and calculate total
    const orderDetailsList: GetOrderRecipeDto[] = [];
    for (const orderRecipeDto of createOrderRecipesDto.orderDetails) {
      const recipe = await this.recipesRepository.findOne({
        where: { recipeName: orderRecipeDto.recipeName },
      });
      if (!recipe) {
        throw new Error(`Recipe ${orderRecipeDto.recipeName} not found`);
      }

      const price = recipe.price;
      const qty = orderRecipeDto.qty;
      const cost = price * qty;
      total += cost;

      const orderDetails = this.orderDetailsRepository.create({
        orderId: savedOrder.orderId,
        recipeName: recipe.recipeName,
        qty: qty,
      });
      await this.orderDetailsRepository.save(orderDetails);

      orderDetailsList.push({
        recipeName: recipe.recipeName,
        qty: qty,
        price: price,
      });

      await this.subtractStockFromIngredientAggregate(
        createOrderRecipesDto.orderDetails,
      );
    }

    // Update the order total and save the order again
    savedOrder.total = total;
    await this.ordersRepository.save(savedOrder);

    // Return the order details DTO
    return {
      orderId: savedOrder.orderId,
      total: savedOrder.total,
      orderDetails: orderDetailsList,
    };
  }

  private async subtractStockFromIngredientAggregate(
    orderDetails: CreateOrderRecipeDto[],
  ): Promise<void> {
    const aggregatedIngredients: { [ingredientName: string]: number } = {};

    for (const createOrderRecipeDto of orderDetails) {
      const { recipeName, qty } = createOrderRecipeDto;
      const recipe = await this.recipesRepository.findOne({
        where: { recipeName },
        relations: ['recipeDetails'],
      });
      if (!recipe) {
        throw new NotFoundException(`Recipe: ${recipeName} not found`);
      }
      for (const ingredient of recipe.recipeDetails) {
        const ingredientQty = ingredient.qty * qty;

        if (!aggregatedIngredients[ingredient.ingredientName]) {
          aggregatedIngredients[ingredient.ingredientName] = 0;
        }

        aggregatedIngredients[ingredient.ingredientName] += ingredientQty;
      }
    }

    for (const [ingredientName, qty] of Object.entries(aggregatedIngredients)) {
      await this.inventoryService.subtractIngredient(ingredientName, qty);
    }
  }

  async getOrders(): Promise<any[]> {
    const unformattedOrders = await this.ordersRepository.find({
      relations: ['orderDetails', 'orderDetails.recipe'],
    });

    const transformedOrders = [];

    for (const order of unformattedOrders) {
      if (Array.isArray(order.orderDetails)) {
        for (const detail of order.orderDetails) {
          transformedOrders.push({
            orderId: order.orderId,
            recipeName: detail.recipe.recipeName,
            mealType: detail.recipe.mealType,
            total: order.total,
          });
        }
      }
    }

    return { orders: transformedOrders };
  }
}
