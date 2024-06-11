import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Restock } from "./Restock";
import { Ingredient } from "./Ingredient";
import { ItemsInStock } from "./ItemsInStock";
import { Recipe } from "./Recipe";

@Entity()
export class RestockItems {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Restock, restock => restock.restockItems, { eager: true })
    @JoinColumn({ name: "fkey_restock_id" })
    restock: Restock;

    @ManyToOne(() => Ingredient, ingredient => ingredient.restockItems, { eager: true })
    @JoinColumn({ name: "fkey_ing_id" })
    ingredient: Ingredient;

    @ManyToOne(() => ItemsInStock, itemsInStock => itemsInStock.restockItems, { eager: true })
    @JoinColumn({ name: "fkey_item_in_stock_id" })
    itemInStock: ItemsInStock;

    @ManyToOne(() => Recipe, recipe => recipe.restockItems, { eager: true })
    @JoinColumn({ name: "fkey_recipe_id" })
    recipe: Recipe;

    @Column()
    qty: number;

    @Column()
    expiration_date: Date;

    @Column()
    price_restock: number;

    @Column()
    price_current: number;
}
