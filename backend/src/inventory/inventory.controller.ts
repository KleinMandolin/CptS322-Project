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

  @Get('ingredient-summary/:name')
  async getIngredientSummary(@Param('name') ingredientName: string) {
    try {
      return this.inventoryService.getIngredientSummary(ingredientName);
    } catch (error) {
      throw new InternalServerErrorException(
        `Could not retrieve summary of ${ingredientName}`,
      );
    }
  }
}
