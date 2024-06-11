import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { RestockItems } from "./RestockItems";
import { Restock } from "./Restock";

@Entity()
export class FullStockOrders {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Restock, restock => restock.fullStockOrders, { eager: true })
    @JoinColumn({ name: "restock_id" })
    restock: Restock;

    @ManyToOne(() => RestockItems, restockItems => restockItems.fullStockOrders, { eager: true })
    @JoinColumn({ name: "restock_items_id" })
    restockItems: RestockItems;

    @Column()
    qty: number;

    @Column()
    expiration_date: Date;
}
