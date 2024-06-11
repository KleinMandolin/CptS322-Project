import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Restock } from "./Restock";
import { Order } from "./Order";

@Entity()
export class StockCustomerOrder {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Restock, restock => restock.stockCustomerOrders, { eager: true })
    @JoinColumn({ name: "restock_id" })
    restock: Restock;

    @ManyToOne(() => Order, order => order.stockCustomerOrders, { eager: true })
    @JoinColumn({ name: "order_id" })
    order: Order;

    @Column()
    qty: number;
}
