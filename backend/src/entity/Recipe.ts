import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { RecipeIngredients } from "./RecipeIngredients";
import { FullOrders } from "./FullOrders";
import { RestockItems } from "./RestockItems";

@Entity()
export class Recipe {
    @PrimaryGeneratedColumn()
    recipe_id: number;

    @Column()
    recipe_name: string;

    @Column()
    price: number;

    @OneToMany(() => RecipeIngredients, recipeIngredients => recipeIngredients.recipe)
    recipeIngredients: RecipeIngredients[];

    @OneToMany(() => FullOrders, fullOrders => fullOrders.recipe)
    fullOrders: FullOrders[];

    @OneToMany(() => RestockItems, restockItems => restockItems.recipe)
    restockItems: RestockItems[];
}

