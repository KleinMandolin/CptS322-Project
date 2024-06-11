import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, OneToMany } from "typeorm";
import { Ingredient } from "./Ingredient";
import { RestockItems } from "./RestockItems";
import { FullStockOrders } from "./FullStockOrders";
import { StockCustomerOrder } from "./StockCustomerOrder";

@Entity()
export class Restock {
    @PrimaryGeneratedColumn()
    restock_id: number;

    @Column()
    price: number;

    @Column()
    restock_date: Date;

    @Column()
    distributor: string;

    @ManyToMany(() => Ingredient)
    @JoinTable()
    ingredients: Ingredient[];

    @OneToMany(() => RestockItems, restockItems => restockItems.restock)
    restockItems: RestockItems[];

    @OneToMany(() => FullStockOrders, fullStockOrders => fullStockOrders.restock)
    fullStockOrders: FullStockOrders[];

    @OneToMany(() => StockCustomerOrder, stockCustomerOrder => stockCustomerOrder.restock)
    stockCustomerOrders: StockCustomerOrder[];
}
