import { Controller, Get, Post, Body } from '@nestjs/common';
import { OrderDetailsService } from './order-details.service';
import { CreateOrderRecipesDto } from './dto/create-order-recipes.dto';
import { GetOrderDetailsDto } from './dto/get-order-details.dto';

@Controller('order-details')
export class OrderDetailsController {
  constructor(private readonly orderDetailsService: OrderDetailsService) {}

  @Post('create')
  async createOrder(
    @Body() createOrderDto: CreateOrderRecipesDto,
  ): Promise<GetOrderDetailsDto> {
    return this.orderDetailsService.createOrder(createOrderDto);
  }
}
