import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Restock } from "./Restock";
import { Ingredient } from "./Ingredient";

@Entity()
export class RestockItems {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Restock, restock => restock.ingredients, { eager: true })
    @JoinColumn({ name: "fkey_restock_id" })
    restock: Restock;

    @ManyToOne(() => Ingredient, ingredient => ingredient.restockItems, { eager: true })
    @JoinColumn({ name: "fkey_ing_id" })
    ingredient: Ingredient;

    @Column()
    qty: number;

    @Column()
    expiration_date: Date;

    @Column()
    price_restock: number;

    @Column()
    price_current: number;
}
