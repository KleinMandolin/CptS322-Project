import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { Order } from "./Order";
import { OrderItems } from "./OrderItems";
import { Recipe } from "./Recipe";

@Entity()
export class FullOrders {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Order, order => order.fullOrders, { eager: true })
    @JoinColumn({ name: "order_id" })
    order: Order;

    @ManyToOne(() => OrderItems, orderItems => orderItems.fullOrders, { eager: true })
    @JoinColumn({ name: "order_items_id" })
    orderItems: OrderItems;

    @ManyToOne(() => Recipe, recipe => recipe.fullOrders, { eager: true })
    @JoinColumn({ name: "recipe_id" })
    recipe: Recipe;
}
