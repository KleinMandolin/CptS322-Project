import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { RecipeIngredients } from "./RecipeIngredients";

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
}
