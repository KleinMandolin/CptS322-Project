import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Order } from "./Order";
import { FullOrders } from "./FullOrders";

@Entity()
export class OrderItems {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Order, order => order.fullOrders, { eager: true })
    @JoinColumn({ name: "order_id" })
    order: Order;

    @Column()
    item_name: string;

    @Column()
    item_price: number;

    @Column()
    qty: number;

    @ManyToOne(() => FullOrders, fullOrders => fullOrders.orderItems)
    fullOrders: FullOrders[];
}
