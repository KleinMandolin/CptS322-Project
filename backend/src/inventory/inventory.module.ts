import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ingredients } from '@/ingredients/ingredients';
import { Stock } from '@/inventory/entities/stock';
import { StockIngredients } from '@/inventory/entities/stock-ingredients';
import { InventoryService } from '@/inventory/inventory.service';
import { InventoryController } from '@/inventory/inventory.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Ingredients, Stock, StockIngredients])],
  providers: [InventoryService],
  controllers: [InventoryController],
})
export class InventoryModule {}
