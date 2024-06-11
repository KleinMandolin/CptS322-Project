import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { StockCustomerOrder } from "./StockCustomerOrder";
import { FullOrders } from "./FullOrders";

@Entity()
export class Order {
    @PrimaryGeneratedColumn()
    order_id: number;

    @Column()
    price: number;

    @Column()
    order_date: Date;

    @OneToMany(() => StockCustomerOrder, stockCustomerOrder => stockCustomerOrder.order)
    stockCustomerOrders: StockCustomerOrder[];

    @OneToMany(() => FullOrders, fullOrders => fullOrders.order)
    fullOrders: FullOrders[];
}
