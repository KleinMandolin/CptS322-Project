import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderDetailsService } from './order-details.service';
import { OrderDetails } from './order-details';
import { Orders } from '@/orders/orders';
import { Recipes } from '@/recipes/recipes';
import { OrderDetailsController } from './order-details.controller';
import { InventoryService } from '@/inventory/inventory.service';
import { Ingredients } from '@/ingredients/ingredients';
import { Stock } from '@/inventory/entities/stock';
import { StockIngredients } from '@/inventory/entities/stock-ingredients';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Orders,
      OrderDetails,
      Recipes,
      Ingredients,
      Stock,
      StockIngredients,
    ]),
  ],
  providers: [OrderDetailsService, InventoryService, Ingredients],
  controllers: [OrderDetailsController],
})
export class OrderDetailsModule {}
