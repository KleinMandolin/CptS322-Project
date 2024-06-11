import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { RecipeIngredients } from "./RecipeIngredients";
import { ItemsInStock } from "./ItemsInStock";
import { RestockItems } from "./RestockItems";

@Entity()
export class Ingredient {
    @PrimaryGeneratedColumn()
    ing_id: number;

    @Column()
    ingredient: string;

    @Column()
    qty: number;

    @OneToMany(() => RecipeIngredients, recipeIngredients => recipeIngredients.ingredient)
    recipeIngredients: RecipeIngredients[];

    @OneToMany(() => ItemsInStock, itemsInStock => itemsInStock.ingredient)
    itemsInStock: ItemsInStock[];

    @OneToMany(() => RestockItems, restockItems => restockItems.ingredient)
    restockItems: RestockItems[];
}
