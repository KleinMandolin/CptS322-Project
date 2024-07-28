import { Body, Controller, Get, InternalServerErrorException, Post, UseGuards } from '@nestjs/common';
import { InventoryService } from '@/inventory/inventory.service';
import { CreateStockDto } from '@/inventory/dto/create-stock.dto';
import { JwtAuthGuard } from '@/auth/guards/jwt-auth.guard';
import { RolesGuard } from '@/auth/guards/roles.guard';
import { Roles } from '@/auth/decorators/roles.decorator';
import { _Role } from '@/user-management/enums/role-enum';

@Controller('inventory')
@UseGuards(JwtAuthGuard, RolesGuard)
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {}

  @Post('stock')
  @Roles(_Role.ADMIN)
  async createStock(
    @Body() createStockDto: CreateStockDto,
  ): Promise<{ success: boolean }> {
    console.log(createStockDto);
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
  @Roles(_Role.EMPLOYEE, _Role.ADMIN)
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
  @Roles(_Role.EMPLOYEE, _Role.ADMIN)
  async getLow() {
    return this.inventoryService.ingredientSummaryLow();
  }

  @Get('expiring-summary')
  @Roles(_Role.EMPLOYEE, _Role.ADMIN)
  async getExpiring() {
    try {
      return this.inventoryService.nearExpiration();
    } catch (error) {
      throw new InternalServerErrorException('Error getting expired items');
    }
  }
}
