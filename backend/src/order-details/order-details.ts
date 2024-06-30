import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Recipes } from '@/recipes/recipes';
import { Orders } from '@/orders/orders';

@Entity()
export class OrderDetails {
  @PrimaryColumn()
  orderId: number;

  @PrimaryColumn()
  recipeName: string;

  @Column({ nullable: false })
  qty: number;

  @ManyToOne(() => Orders, (order) => order.orderDetails)
  @JoinColumn({ name: 'orderId', referencedColumnName: 'orderId' })
  order: Orders;

  @ManyToOne(() => Recipes, (recipe) => recipe.orderDetails)
  @JoinColumn({ name: 'recipeName', referencedColumnName: 'recipeName' })
  recipe: Recipes;
}
