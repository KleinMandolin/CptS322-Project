import {
  Body,
  Controller,
  Get,
  InternalServerErrorException,
  Param,
  Post,
} from '@nestjs/common';
import { InventoryService } from '@/inventory/inventory.service';
import { CreateStockDto } from '@/inventory/dto/create-stock.dto';

@Controller('inventory')
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {}

  @Post('stock')
  async createStock(
    @Body() createStockDto: CreateStockDto,
  ): Promise<{ success: boolean }> {
    try {
      await this.inventoryService.createStock(createStockDto);
      return { success: true };
    } catch (error) {
      throw new InternalServerErrorException(
        'Could not add items to inventory',
      );
    }
  }

  @Get('ingredient-summary')
  async getIngredientSummary() {
    try {
      return this.inventoryService.getIngredientSummary();
    } catch (error) {
      throw new InternalServerErrorException(
        `Could not retrieve summary of ingredients`,
      );
    }
  }

  @Get('low-summary')
  async getLow() {
    return this.inventoryService.ingredientSummaryLow();
  }

  @Get('expiring-summary')
  async getExpiring() {
    try {
      return this.inventoryService.nearExpiration();
    } catch (error) {
      throw new InternalServerErrorException('Error getting expired items');
    }
  }
}
