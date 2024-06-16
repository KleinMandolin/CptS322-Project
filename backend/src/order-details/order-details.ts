import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { Recipes } from '../recipes/recipes';
import { Orders } from '../orders/orders';

@Entity()
export class OrderDetails {
  @PrimaryColumn()
  orderId: number;

  @PrimaryColumn()
  recipeName: string;

  @Column({ nullable: false })
  qty: number;

  @ManyToOne(() => Orders, (order) => order.orderDetails, {
    onDelete: 'CASCADE',
  })
  order: Orders;

  @ManyToOne(() => Recipes, (recipe) => recipe.orderDetails, {
    onDelete: 'CASCADE',
  })
  recipe: Recipes;
}
